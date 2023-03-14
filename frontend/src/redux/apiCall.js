import {
    loginStart,
    loginSuccess,
    loginFailure
} from './userSlice';
import {apiUrl} from '../giaTriMacDinh.js'
import axios from 'axios';
export const login = async (dispatch, user) => {

    dispatch(loginStart());
    try {
        const res = await axios.post(`${apiUrl}api/auth/dangnhap`, {
            tenDangNhap: user.taiKhoan,
            matKhau: user.matKhau
        });
        dispatch(loginSuccess(res.data));
        alert('Đăng nhập thành công');
    } catch (error) {
        dispatch(loginFailure());
        alert('Đăng nhập thất bại');
    }

}
