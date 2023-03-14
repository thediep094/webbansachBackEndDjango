import './ThanhMenu.scss'
import { ArrowDropDownOutlined, PersonOutline, SearchOutlined, ShoppingCartOutlined, WidgetsOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { apiUrl } from '../../giaTriMacDinh'
import { useEffect, useState } from 'react'
import axios from 'axios'
const ThanhMenu = () => {
    const user = useSelector(state => state.user)
    const [soLuongGioHang, setSoLuongGioHang] = useState(0)
    const [gioHangSanPham, setGioHangSanPham] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        if (user.user) {
            if (user.user.data.isAdmin) {
                setIsAdmin(true)
            }
            try {
                // console.log(user.user)
                const gioHang = async () => {
                    const res = await axios.get(`${apiUrl}api/giohangs`, {
                        headers: {
                            token: `Bearer ${user.user.accessToken}`
                        }
                    })
                    setSoLuongGioHang(res.data.data.sach.length)
                    setGioHangSanPham(res.data.data.sach)
                }
                gioHang()
            } catch (error) {
                console.log(error)
            }
        }
    }, [user])
    return (
        <div className="ThanhMenu">
            <div className="ThanhMenu__trai">
                <Link to="/" className='ThanhMenu__trai__link'>
                    <div className="ThanhMenu__trai--logo">
                        <img src={process.env.PUBLIC_URL + 'Logo.png'} alt="" />
                        <div className="ThanhMenu__trai--ten">
                            <h1>Bookoe</h1>
                            <p>Book Store 5 Chú Hề</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="ThanhMenu__giua">
                <div className="ThanhMenu__giua--menu">
                    <WidgetsOutlined className='ThanhMenu__giua--menu--icon' />
                    <p>Menus</p>
                    <ArrowDropDownOutlined className='ThanhMenu__giua--menu--icon' />
                    <div className="ThanhMenu__giua--menu--thanhphan">
                        <Link to="/">Trang chủ</Link>
                        <Link to="/theloai">Thể loại</Link>
                        {
                            isAdmin ? <Link to="/dangsach">Đăng sách</Link> : null
                        }

                    </div>
                </div>
                <div className="ThanhMenu__giua--timkiem">
                    <input type="text" placeholder="Tìm kiếm" className='ThanhMenu__giua--timkiem--input' />
                </div>
                <div className="ThanhMenu__giua--icon--timkiem">
                    <SearchOutlined className='ThanhMenu__giua--icon--timkiem--icon' />
                </div>
            </div>

            <div className="ThanhMenu__phai">
                {user.user ? (
                    <>

                        <Link to="/giohang" state={{ gioHangSanPham: gioHangSanPham }}>

                            <div className="ThanhMenu__phai--giohang">
                                <Badge badgeContent={soLuongGioHang} color="primary" max={99}>
                                    <ShoppingCartOutlined />
                                </Badge>
                            </div>
                        </Link>
                        <Link to="/trangcanhan">
                            <div className="ThanhMenu__phai--avatar">
                                <img src={user.user.data.avatar ? `${apiUrl}images/users/${user.user.data.avatar}` : "data:image/jpeg;base64,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"} alt="" />
                            </div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/dangnhap" className='ThanhMenu__phai--dangky--icon'>

                            <div className="ThanhMenu__phai--dangnhap">

                                <Link to="/dangnhap" className='ThanhMenu__phai--dangnhap__link'>Đăng nhập</Link>

                            </div>
                        </Link>
                        <Link to="/dangky" className='ThanhMenu__phai--dangky--icon'>

                            <div className="ThanhMenu__phai--dangky">
                                <PersonOutline className='ThanhMenu__phai--dangky--icon' />
                                <Link to="/dangky" className='ThanhMenu__phai--dangky__link'>Đăng ký</Link>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default ThanhMenu