import './GioHangChiTiet.scss'
// import { gioHang } from '../../data/gioHang'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCartOutlined, Star } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { apiUrl } from '../../giaTriMacDinh'
import { useEffect, useState } from 'react'
import axios from 'axios'
function doiSangPhanNghin(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
const GioHangChiTiet = ({ gioHangData }) => {
    const user = useSelector(state => state.user)
    const [gioHangSanPham, setGioHangSanPham] = useState([])
    const [click, setClick] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (user.user) {
            gioHangData.forEach(async item => {
                const res = await axios.get(`${apiUrl}api/sachs/${item.sachId}`)
                res.data.data.soLuong = item.soLuong
                setGioHangSanPham(gioHangSanPham => [...gioHangSanPham, res.data.data])
            }
            )
        }
    }, [user])

    const xoaSachGioHang = async (id) => {
        const res = await axios.delete(`${apiUrl}api/giohangs/${id}`, {
            headers: {
                token: `Bearer ${user.user.accessToken}`
            }
        })
        if (res.data.success) {
            alert('Xóa sách thành công')
            navigate('/')
        }
    }

    const xacNhanMuaHang = async () => {
        gioHangSanPham.forEach(async item => {
            const res = await axios.post(`${apiUrl}api/lichsus`, {
                sachId: item._id,
                soLuong: item.soLuong,
            }, {
                headers: {
                    token: `Bearer ${user.user.accessToken}`
                }
            })
        })
        alert('Đặt hàng thành công')
        const res2 = await axios.delete(`${apiUrl}api/giohangs`, {
            headers: {
                token: `Bearer ${user.user.accessToken}`
            }
        })
        if (res2.data.success) {
            navigate('/')
        }
    }
    return (
        <div className="GioHangChiTiet">
            <div className="GioHangChiTiet__trai">
                <div className="GioHangChiTiet__trai__danhsach">
                    <div className="GioHangChiTiet__trai__danhsach__title">
                        <h1>Danh Sách Sách</h1>
                    </div>
                    <div className="GioHangChiTiet__trai__danhsach__items">
                        {
                            gioHangSanPham ? (
                                gioHangSanPham.map((item, index) => {
                                    return (

                                        <div className="GioHangChiTiet__trai__danhsach__item" key={index}>
                                            <Link to={`/chitiet/${item._id}`} className="GioHangChiTiet__trai__danhsach__item__link">
                                                <div className="GioHangChiTiet__trai__danhsach__item__hinhanh">
                                                    <img src={`${apiUrl}images/sachs/${item.imgUrl}`} alt="" />
                                                </div>
                                            </Link>
                                            <div className="GioHangChiTiet__trai__danhsach__item__thongtin">
                                                <div className="GioHangChiTiet__trai__danhsach__item__thongtin__tren">
                                                    <div className="GioHangChiTiet__trai__danhsach__item__thongtin__title">
                                                        <Link to={`/chitiet`} className="GioHangChiTiet__trai__danhsach__item__link">
                                                            <h1>{item.tenSach}</h1>
                                                        </Link>
                                                        <div className="GioHangChiTiet__trai__danhsach__item__theloai">
                                                            <p>{`${item.theLoai[0]}`}</p>
                                                        </div>
                                                    </div>
                                                    <div className="GioHangChiTiet__trai__danhsach__item__thongtin__phai">
                                                        <div className="GioHangChiTiet__trai__danhsach__item__danhgia">
                                                            {
                                                                [1, 2, 3, 4, 5].map((item1, index) => {
                                                                    return (
                                                                        <Star className={item1 <= 5 ? "GioHangChiTiet__trai__danhsach__item__danhgia__sao active" : "GioHangChiTiet__trai__danhsach__item__danhgia__sao"} key={index} />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <p>{item.luotMua} lượt mua</p>

                                                    </div>
                                                </div>
                                                <div className="GioHangChiTiet__trai__danhsach__item__thongtin__desc">
                                                    <p>{item.mieuTa}</p>
                                                </div>
                                                <div className="GioHangChiTiet__trai__danhsach__item__thongtin__gia">
                                                    <p>{doiSangPhanNghin(item.gia * item.soLuong)} VNĐ</p>
                                                    <h1>Số lượng mua: {item.soLuong}</h1>
                                                </div>
                                                <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi">
                                                    <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__trai">
                                                        <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__trai__tacgia">
                                                            <h1>Tác giả</h1>
                                                            <p>{item.tacGia}</p>
                                                        </div>
                                                        <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__trai__nam">
                                                            <h1>Năm</h1>
                                                            <p>{item.namXuatBan}</p>
                                                        </div>
                                                    </div>
                                                    <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__phai">
                                                        <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__phai__nut" onClick={() => {
                                                            xoaSachGioHang(item._id)
                                                        }}>
                                                            <ShoppingCartOutlined className='GioHangChiTiet__trai__danhsach__item__thongtin__duoi__phai__nut__icon' />
                                                            <p>Xóa khỏi giỏ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            ) : null
                        }
                    </div>
                </div>
            </div>
            <div className="GioHangChiTiet__phai">
                <h1>Số lượng sách trong giỏ: {gioHangSanPham.length}</h1>

                <h2>Tổng số tiền: {doiSangPhanNghin(
                    gioHangSanPham.reduce((total, item) => {
                        return total + item.gia * item.soLuong
                    }
                        , 0)
                )

                } VNĐ</h2>
                <div className="GioHangChiTiet__phai__thanhtoan" onClick={() => xacNhanMuaHang()}>
                    Xác nhận mua hàng
                </div>
            </div>
        </div>
    )
}

export default GioHangChiTiet