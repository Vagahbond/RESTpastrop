import { User, PartialUser } from "./model";

import db from "../common/db_handler";

async function createOne(user: User) {
  return await db.one(
    "INSERT INTO users(owner, area, address, capacity, price, available) VALUES(${owner}, ${area}, ${address}, ${capacity}, ${price}, ${available}) RETURNING *;",
    user,
  );
}

async function getOne(id: Number): Promise<User | null> {
  return await db.oneOrNone("SELECT * FROM users WHERE id=${id}", { id });
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

export default { createOne, getOne, getAll, updateOne, deleteOne };
