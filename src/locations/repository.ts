import { Location, PartialLocation } from "./model";

import db from "../common/db_handler";

async function createOne(location: Location) {
  const attributesString = Object.keys(location).join(",");
  const valuesString = Object.keys(location)
    .map((k) => `$<${k}>`)
    .join(",");

  return await db.one(
    `INSERT INTO locations(${attributesString}) VALUES(${valuesString}) RETURNING *;`,
    location,
  );
}

async function getOne(id: Number): Promise<Location | null> {
  return await db.oneOrNone("SELECT * FROM locations WHERE id=${id}", { id });
}

async function getAll(): Promise<Array<Location>> {
  const res = await db.manyOrNone("SELECT * FROM locations");

  if (!res) {
    return [];
  }

  return res;
}

async function updateOne(
  id: Number,
  location: PartialLocation,
): Promise<Location | null> {
  const attrsStr = Object.keys(location)
    .map((k) => ` ${k} = $<${k}> `)
    .join(",");

  const modified = await db.oneOrNone(
    `UPDATE locations SET ${attrsStr} WHERE id = $<id> RETURNING *;`,
    { id, ...location },
  );

  return modified;
}

async function deleteOne(id: Number): Promise<Number | null> {
  return await db.oneOrNone(
    "DELETE FROM locations WHERE id=${id} RETURNING id;",
    {
      id,
    },
  );
}

export default { createOne, getOne, getAll, updateOne, deleteOne };
