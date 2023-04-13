require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => {
  const { firstName, lastName, city, state, username, password } = req.body;
  if (!firstName || !lastName || !city || !state || !username || !password) {
    throw new ClientError(400, 'All fields are required.');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("firstName", "lastName", "username", "hashedPassword", "city", "state")
        values ($1, $2, $3, $4, $5, $6)
        returning "userId", "username", "createdAt"
        `;
      const params = [firstName, lastName, username, hashedPassword, city, state];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
  select "userId",
        "city",
        "state",
        "hashedPassword"
    from "users"
  where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, city, state, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username, city, state };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.post('/api/auth/wanted-post', uploadsMiddleware, (req, res, next) => {
  const { title, isbn, comments, userId, city, state } = req.body;
  if (!title || !isbn || !comments) {
    throw new ClientError(401, 'Post must include an image, title, isbn, and comments');
  }
  const url = req.file.location;
  const sql = `
    insert into "wants" ("wantTitle", "wantPhotoFile", "wantContent", "isbn", "userId", "city", "state")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const params = [title, url, comments, isbn, userId, city, state];
  db.query(sql, params)
    .then(result => {
      const [want] = result.rows;
      res.status(201).json(want);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sale-post', uploadsMiddleware, (req, res, next) => {
  const { title, isbn, comments, userId, city, state } = req.body;
  if (!title || !isbn || !comments) {
    throw new ClientError(401, 'Post must include an image, title, isbn, and comments');
  }
  const url = req.file.location;
  const sql = `
    insert into "sales" ("saleTitle", "salePhotoFile", "saleContent", "isbn", "userId", "city", "state")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const params = [title, url, comments, isbn, userId, city, state];
  db.query(sql, params)
    .then(result => {
      const [sale] = result.rows;
      res.status(201).json(sale);
    })
    .catch(err => next(err));
});

app.get('/api/auth/sales', (req, res, next) => {
  const sql = `
         select "saleId",
                "saleTitle",
                "salePhotoFile",
                "saleContent",
                "userId",
                "isbn",
                "city",
                "state"
              from "sales"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/auth/wants', (req, res, next) => {
  const sql = `
    select "wantId",
          "wantTitle",
          "wantPhotoFile",
          "wantContent",
          "userId",
          "isbn",
          "city",
          "state"
        from "wants"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/auth/edit/sale/:saleId', (req, res, next) => {
  const saleId = Number(req.params.saleId);
  if (!saleId) {
    throw new ClientError(400, 'saleId must be a positive integer');
  }
  const sql = `
    select "saleTitle",
          "salePhotoFile",
          "saleContent",
          "isbn"
        from "sales"
      where "saleId" = $1
  `;
  const params = [saleId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with saleId ${saleId}`);
      }
      res.status(200).json(result.rows[0]);
    });
});

app.get('/api/auth/edit/want/:wantId', (req, res, next) => {
  const wantId = Number(req.params.wantId);
  if (!wantId) {
    throw new ClientError(400, 'wantId must be a positive integer');
  }
  const sql = `
    select "wantTitle",
          "wantPhotoFile",
          "wantContent",
          "isbn"
        from "wants"
      where "wantId" = $1
  `;
  const params = [wantId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with wantId ${wantId}`);
      }
      res.status(200).json(result.rows[0]);
    });
});

app.delete('/api/auth/delete/sales/:saleId', (req, res, next) => {
  const saleId = Number(req.params.saleId);
  if (!saleId) {
    throw new ClientError(400, 'saleId must be a positive integer');
  }
  const sql = `
    delete
        from "sales"
      where "saleId" = $1
    returning *
  `;
  const params = [saleId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with saleId ${saleId}`);
      }
      res.status(200).json(result.rows[0]);
    });
});

app.delete('/api/auth/delete/wants/:wantId', (req, res, next) => {
  const wantId = Number(req.params.wantId);
  if (!wantId) {
    throw new ClientError(400, 'wantId must be a positive integer');
  }
  const sql = `
    delete
        from "wants"
      where "wantId" = $1
    returning *
  `;
  const params = [wantId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with wantId ${wantId}`);
      }
      res.status(200).json(result.rows[0]);
    });
});

app.put('/api/auth/update-sale-post/:saleId', uploadsMiddleware, (req, res, next) => {
  const { title, isbn, comments } = req.body;
  if (!title || !isbn || !comments) {
    throw new ClientError(401, 'Post must include an image, title, isbn, and comments');
  }
  const url = req.file.location;
  const saleId = Number(req.params.saleId);
  if (!saleId) {
    throw new ClientError(400, 'saleId must be a positive integer');
  }
  const sql = `
    update "sales"
      set "saleTitle" = $1,
          "salePhotoFile" = $2,
          "saleContent" = $3,
          "isbn" = $4
      where "saleId" = $5
    returning *
  `;
  const params = [title, url, comments, isbn, saleId];
  db.query(sql, params)
    .then(result => {
      const [sale] = result.rows;
      res.status(201).json(sale);
    })
    .catch(err => next(err));
});

app.put('/api/auth/update-wanted-post/:wantId', uploadsMiddleware, (req, res, next) => {
  const { title, isbn, comments } = req.body;
  if (!title || !isbn || !comments) {
    throw new ClientError(401, 'Post must include an image, title, isbn, and comments');
  }
  const url = req.file.location;
  const wantId = Number(req.params.wantId);
  if (!wantId) {
    throw new ClientError(400, 'wantId must be a positive integer');
  }
  const sql = `
    update "wants"
      set "wantTitle" = $1,
          "wantPhotoFile" = $2,
          "wantContent" = $3,
          "isbn" = $4
      where "wantId" = $5
    returning *
  `;
  const params = [title, url, comments, isbn, wantId];
  db.query(sql, params)
    .then(result => {
      const [sale] = result.rows;
      res.status(201).json(sale);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
