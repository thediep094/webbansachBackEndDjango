import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import { apiUrl } from "../giaTriMacDinh.js";
import axios from "axios";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`http://127.0.0.1:8000/accounts/login`, {
      username: user.taiKhoan,
      password: user.matKhau,
    });
    dispatch(loginSuccess(res.data));
    alert("Đăng nhập thành công");
  } catch (error) {
    dispatch(loginFailure());
    alert("Đăng nhập thất bại");
  }
};
