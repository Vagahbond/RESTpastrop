import Location from "./location";
import Repository from "./repository";

async function createOne(location: Location) {
  return await Repository.createOne(location);
}

function getOne(id: Number) {}

function getAll() {}

function patchOne(id: Number, location: Location) {}

function deleteOne(id: Number) {}

export default { createOne, getOne, getAll, patchOne, deleteOne };
