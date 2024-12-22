const pgDatabase = require("../../share/database/pg.database");

class UserModel {
  async getUser({ id }) {
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [id];

    const { rows } = await pgDatabase.query(query, values);

    console.log("rows", rows);
    return rows[0];
  }
}

module.exports = new UserModel(); 