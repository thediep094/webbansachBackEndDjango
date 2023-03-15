import './DangKyDangNhap.scss'
import Footer from '../../components/Footer/Footer'
import ThanhMenu from '../../components/ThanhMenu/ThanhMenu'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../../giaTriMacDinh'
const DangKyDangNhap = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: 'acbsc',
        password: 'dsadas',
        fullname: 'dasdasd',
        email: 'dasdsa@gmail.com',
        sdt: '0232183232',
        location: 'dsadsdasd'
    })

    const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState('')
    const thayDoi = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const dangKy = async () => {
        if (nhapLaiMatKhau !== user.password) {
            alert('Mật khẩu nhập lại không đúng')
        }
        else {
            if (!user.username || !user.password || !user.fullname || !user.email || !user.sdt || !user.location) {
                alert('Vui lòng nhập đầy đủ thông tin')
            }
            else {
                try {
                    await axios.post(`http://localhost:8000/accounts/create`, user)
                    alert('Đăng ký thành công')
                    navigate('/dangnhap')
                } catch (error) {
                    alert('Đăng ký không thành công!!')
                }
            }
        }
    }

    return (
        <div className="DangKyDangNhap">
            <ThanhMenu />
            <div className="DangKyDangNhap__giua"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + 'typeemailbackground.png'})`
                }}
            >
                <div className="DangKyDangNhap__giua__dangky">
                    <h1>Đăng Ký</h1>
                    <div className="DangKyDangNhap__giua__dangky__form">
                        <div className="DangKyDangNhap__giua__dangky__form__item">
                            <label>Tên đăng nhập</label>
                            <input type="text" name='username' onChange={thayDoi} />
                        </div>
                        <div className="DangKyDangNhap__giua__dangky__form__item">
                            <label>Mật khẩu</label>
                            <input type="password" name='password' onChange={thayDoi} />
                        </div>
                        <div className="DangKyDangNhap__giua__dangky__form__item">
                            <label>Nhập lại mật khẩu</label>
                            <input type="password" onChange={(e) => {
                                setNhapLaiMatKhau(e.target.value)
                            }} />
                        </div>
                        <div className="DangKyDangNhap__giua__dangky__form__item">
                            <label>Họ và tên</label>
                            <input type="text" name='fullname' onChange={thayDoi} />
                        </div>
                        <div className="DangKyDangNhap__giua__dangky__form__item">
                            <label>Email</label>
                            <input type="email" name='email' onChange={thayDoi} />
                        </div>
                        <div className="DangKyDangNhap__giua__dangky__form__item">
                            <label>Số điện thoại</label>
                            <input type="text" name='sdt' onChange={thayDoi} />
                        </div>
                        <div className="DangKyDangNhap__giua__dangky__form__item">
                            <label>Địa chỉ</label>
                            <input type="text" name='location' onChange={thayDoi} />
                        </div>
                    </div>
                    <Link to="/dangnhap" className='DangKyDangNhap__giua__dangky__link'><span>Bạn đã có tài khoản?</span></Link>
                    <div className="DangKyDangNhap__giua__dangky__button" onClick={dangKy}>
                        Đăng Ký
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DangKyDangNhap