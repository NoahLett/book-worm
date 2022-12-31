require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
