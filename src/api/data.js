import * as api from "./api.js";

export async function getAllBikes() {
  return api.get("/data/motorcycles?sortBy=_createdOn%20desc");
}

export async function getBikeById(id) {
  return api.get("/data/motorcycles/" + id);
}

export async function createBike(data) {
  return api.post("/data/motorcycles", data);
}

export async function updateBikeById(id, data) {
  return api.put("/data/motorcycles/" + id, data);
}

export async function deleteBikeById(id) {
  return api.del("/data/motorcycles/" + id);
}

export async function likeBikeById(data) {
  return api.post("/data/likes", data);
}

export async function getAllLikesByBikeId(bikeId) {
  // /data/likes?where= BikeId%3D%22{BikeId}%22 & distinct=_ownerId & count
  //  /data/likes?where=BikeId%3D%22{BikeId}%22&distinct=_ownerId&count

  return api.get(
    `/data/likes?where=${encodeURIComponent(
      `motorcycleId="${bikeId}"`
    )}&distinct=_ownerId&count`
  );
}

export async function getAllLikesByBikeIdAndUserId(bikeId, userId) {
  // /data/likes?where=BikeId%3D%22{BikeId}%22%20and%20_ownerId%3D%22{userId}%22&count

  // /data/likes?where=BikeId%3D%22126777f5-3277-42ad-b874-76d043b069cb%22%20and%20_ownerId%3D%2235c62d76-8152-4626-8712-eeb96381bea8%22&count

  // /data/likes?where=BikeId%3D%22126777f5-3277-42ad-b874-76d043b069cb%22and_ownerId%3D%2235c62d76-8152-4626-8712-eeb96381bea8%22&count

  const url = `/data/likes?where=${encodeURIComponent(
    `motorcycleId="${bikeId}"`
  )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`;

  console.log(url);

  return api.get(
    `/data/likes?where=${encodeURIComponent(
      `motorcycleId="${bikeId}"`
    )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`
  );
}