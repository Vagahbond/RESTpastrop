import { User, PartialUser } from "./model";

import db from "../common/db_handler";

async function createOne(location: Location) {
  const attributesString = Object.keys(location).join(",");
  const valuesString = Object.keys(location)
    .map((k) => `$<${k}>`)
    .join(",");

  return await db.one(
    `INSERT INTO users(${attributesString}) VALUES(${valuesString}) RETURNING *;`,
    location,
  );
}

async function getOne(id: Number): Promise<User | null> {
  return await db.oneOrNone("SELECT * FROM users WHERE id=${id}", { id });
}

async function getOneBy(attribute: string, value: string) {
  return await db.oneOrNone(
    `SELECT * FROM users WHERE ${attribute} = $<value>`,
    {
      attribute,
      value,
    },
  );
}

async function getAll(): Promise<Array<User>> {
  const res = await db.manyOrNone("SELECT * FROM users");

  if (!res) {
    return [];
  }

  return res;
}

async function updateOne(id: Number, user: PartialUser): Promise<User | null> {
  const attrsStr = Object.keys(user)
    .map((k) => ` ${k} = $<${k}> `)
    .join(",");

  const modified = await db.oneOrNone(
    `UPDATE users SET ${attrsStr} WHERE id = $<id> RETURNING *;`,
    { id, ...user },
  );

  return modified;
}

async function deleteOne(id: Number): Promise<Number | null> {
  return await db.oneOrNone("DELETE FROM users WHERE id=${id} RETURNING id;", {
    id,
  });
}

export default { createOne, getOne, getAll, updateOne, deleteOne, getOneBy };
