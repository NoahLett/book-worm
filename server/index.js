require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

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
      } else {
        argon2.verify(result.rows[0].hashedPassword, password)
          .then(isMatching => {
            if (!isMatching) {
              throw new ClientError(401, 'invalid login');
            } else {
              const user = {
                userId: result.rows[0].userId,
                username
              };
              const token = jwt.sign(user, process.env.TOKEN_SECRET);
              res.status(200).json({ token, user });
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
