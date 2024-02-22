import Location from "./location";

import db from "../common/db_handler";

async function createOne(location: Location) {
  return await db.one("SELECT $1 AS value", 123).catch((error) => {
    console.log("ERROR:", error);
  });
}

function getOne(id: Number) {}

function getAll() {}

function patchOne(id: Number, location: Location) {}

function deleteOne(id: Number) {}

export default { createOne, getOne, getAll, patchOne, deleteOne };
