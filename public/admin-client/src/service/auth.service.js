import Axios from "axios";

class AuthService {
  login(account, password) {
    return Axios.post(process.env.REACT_APP_AUTH_URL + "/login/admin", { account, password });
  }

  logout(setLoginState) {
    localStorage.removeItem("login");
    setLoginState({ isLogin: false, token: "", user: null });
  }
} //end of AuthService

const authService = new AuthService();
export default authService;
