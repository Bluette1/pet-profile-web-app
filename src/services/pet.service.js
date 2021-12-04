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

  getOwnPets() {
    return http.get(`/user/pets`, { headers });
  }

  getPet(id) {
    return http.post(`/pet/${id}`, { headers });
  }

  updatePet(id, data) {
    return http.put(`/pet/${id}`, data, { headers });
  }

  reportMissing(id) {
    return http.put(`/pet/${id}`, { missing: true }, { headers });
  }
}

export default new PetService();
