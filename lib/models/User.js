const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
  }

  static async insert(user) {
    const { rows } = await pool.query(`
      INSERT INTO users (
          email, 
          password_hash
        ) 
        VALUES ($1, $2) 
        RETURNING *
      `,
      [user.email, user.passwordHash]
    );

    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(`
        SELECT * FROM users 
        WHERE email = $1
      `,
      [email]
    );

    if (!rows[0]) return null;
    else return new User(rows[0]);
  }

  static async updateUser(user, id) {
    const { rows } = await pool.query(`
      UPDATE users
      SET email = $1
          password_hash = $2
      WHERE id = $3
      RETURNING *
    `,
      [user.email, user.passwordHash, id]
    )
  }

  toJSON() {
    const obj = { ...this };
    delete obj.passwordHash;

    return obj;
  };
};
