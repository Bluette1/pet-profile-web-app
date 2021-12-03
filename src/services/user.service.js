import http from "../http-common";
import authHeader from './auth.header';

const headers = authHeader();

class UserService {
  getUser() {
    return http.post("/user", {headers});
  }
}

export default new UserService();