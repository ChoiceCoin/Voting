import { Pool } from "pg/lib";
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "xcity",
  port: "5432",
});
