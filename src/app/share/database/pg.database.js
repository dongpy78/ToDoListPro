const {Pool} = require("pg");
const { pgConfig } = require("../configs/db.config");


class PgDatabase {
  constructor() {
    this.pool = new Pool({
      user: pgConfig.User,
      host: pgConfig.Host,
      database: pgConfig.Database,
      password: pgConfig.Password,
      port: pgConfig.Port,
    });
  }

  async connect() {
    const client = await this.pool.connect();
    try {
      console.log("Database connected");
      return client;
    } catch (err) {
      console.error("Error connecting to database:", err);
      throw err;
    }
  }

  async query(query, values) {
    const client = await this.connect();
    try {
      const res = await client.query(query, values);
      return res;
    } catch (err) {
      console.error("Error executing query:", err);
      throw err;
    } finally {
      client.release(); //! Sau khi chay xong thi dong cua lai
    }
  }

}

module.exports = new PgDatabase();