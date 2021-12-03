import http from "../http-common";
import authHeader from './auth.header';

const headers = authHeader();

class PetService {
  createPet(data) {
    return http.post("/pets", data, {headers});
  }
  getPets() {
    return http.get("/pets", {headers});
  }

  getPet(id) {
    return http.post(`/pet/${id}`, {headers});
  }
}

export default new PetService();