import { Reservation, PartialReservation } from "./model";

import db from "../common/db_handler";

async function createOne(location: Location) {
  const attributesString = Object.keys(location).join(",");
  const valuesString = Object.keys(location)
    .map((k) => `$<${k}>`)
    .join(",");

  return await db.one(
    `INSERT INTO reservations(${attributesString}) VALUES(${valuesString}) RETURNING *;`,
    location,
  );
}

async function getOne(id: Number): Promise<Reservation | null> {
  return await db.oneOrNone("SELECT * FROM reservations WHERE id=${id}", {
    id,
  });
}

async function getAll(): Promise<Array<Reservation>> {
  const res = await db.manyOrNone("SELECT * FROM reservations");

  if (!res) {
    return [];
  }

  return res;
}

async function updateOne(
  id: Number,
  reservation: PartialReservation,
): Promise<Reservation | null> {
  const attrsStr = Object.keys(reservation)
    .map((k) => ` ${k} = $<${k}> `)
    .join(",");

  const modified = await db.oneOrNone(
    `UPDATE reservations SET ${attrsStr} WHERE id = $<id> RETURNING *;`,
    { id, ...reservation },
  );

  return modified;
}

async function deleteOne(id: Number): Promise<Number | null> {
  return await db.oneOrNone(
    "DELETE FROM reservations WHERE id=${id} RETURNING id;",
    {
      id,
    },
  );
}

async function getOverlappingReservations(
  start: Date,
  end: Date,
  appartId?: Number,
) {
  return await db.manyOrNone(
    `SELECT * FROM reservations WHERE  
    ($<start>::DATE = date_start::DATE OR
          (date_start::date < $<start>::date AND date_end::date > $<start>::date) OR
          ($<start>::date < date_start::date AND $<end>::date > date_start::date)
    ) 
    ${appartId && false ? " AND location = $<appartId> " : ""};

    `,
    {
      start: start,
      end: end,
      appartId,
    },
  );
}

export default {
  createOne,
  getOne,
  getAll,
  getOverlappingReservations,
  updateOne,
  deleteOne,
};
