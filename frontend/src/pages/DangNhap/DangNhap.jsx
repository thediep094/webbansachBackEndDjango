import './DangNhap.scss'
import Footer from '../../components/Footer/Footer'
import ThanhMenu from '../../components/ThanhMenu/ThanhMenu'
import { Link } from 'react-router-dom'
import { login } from '../../redux/apiCall'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
const DangNhap = () => {
    const [taiKhoan, setTaiKhoan] = useState('')
    const [matKhau, setMatKhau] = useState('')
    const dispatch = useDispatch()
    const dangNhap = () => {
        login(dispatch, { taiKhoan, matKhau })
    }
    const user = useSelector(state => state.user)
    return (
        <div className="DangNhap">
            <ThanhMenu />
            <div className="DangNhap__giua"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + 'typeemailbackground.png'})`
                }}
            >
                <div className="DangNhap__giua__dangky">
                    <h1>Đăng Nhập</h1>
                    <div className="DangNhap__giua__dangky__form">
                        <div className="DangNhap__giua__dangky__form__item">
                            <label>Tên đăng nhập</label>
                            <input type="text" onChange={(e) => {
                                setTaiKhoan(e.target.value)
                            }} />
                        </div>
                        <div className="DangNhap__giua__dangky__form__item">
                            <label>Mật khẩu</label>
                            <input type="password" onChange={(e) => {
                                setMatKhau(e.target.value)
                            }} />
                        </div>
                        <Link to="/dangky" className='DangNhap__giua__dangky__link'><span>Bạn chưa có tài khoản?</span></Link>
                        <div className="DangNhap__giua__dangky__button" onClick={dangNhap}>
                            {user.isLogin ? <CircularProgress /> : "Đăng Nhập"}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DangNhap