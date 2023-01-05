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
  const { firstName, lastName, city, state, username, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !city || !state || !username || !password || !confirmPassword) {
    throw new ClientError(400, 'All fields are required.');
  } else if (password !== confirmPassword) {
    throw new ClientError(400, 'Please ensure your password matches with the confirmation field.');
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
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.post('/api/auth/wanted-post', uploadsMiddleware, (req, res, next) => {
  const { title, isbn, comments, userId } = req.body;
  if (!title || !isbn || !comments) {
    throw new ClientError(401, 'Post must include an image, title, isbn, and comments');
  }
  const url = '/images' + '/' + req.file.filename;
  const sql = `
    insert into "wants" ("wantTitle", "wantPhotoFile", "wantContent", "isbn", "userId")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [title, url, comments, isbn, userId];
  db.query(sql, params)
    .then(result => {
      const [want] = result.rows;
      res.status(201).json(want);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sale-post', uploadsMiddleware, (req, res, next) => {
  const { title, isbn, comments, userId } = req.body;
  if (!title || !isbn || !comments) {
    throw new ClientError(401, 'Post must include an image, title, isbn, and comments');
  }
  const url = '/images' + '/' + req.file.filename;
  const sql = `
    insert into "sales" ("saleTitle", "salePhotoFile", "saleContent", "isbn", "userId")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [title, url, comments, isbn, userId];
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
