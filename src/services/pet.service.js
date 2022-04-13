import http from "../http-common";
import authHeader from "./auth.header";

const headers = authHeader();

class PetService {
  createPet(data) {
    return http.post("/pets", data, { headers });
  }
  getPets() {
    return http.get("/pets", { headers });
  }

  getOwnPets(id) {
    return http.get(`/users/${id}/pets`, { headers });
  }

  getPet(id) {
    return http.post(`/pets/${id}`, { headers });
  }

  updatePet(id, data) {
    return http.put(`/pets/${id}`, data, { headers });
  }

  reportMissing(id) {
    return http.put(`/pets/${id}`, { missing: true }, { headers });
  }
}

export default new PetService();
