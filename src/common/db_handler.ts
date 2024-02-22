import pgp from "pg-promise";

const db = pgp()("postgres://restpastrop:password@database:5432/restpastrop");

console.log("initiated db");
export default db;
