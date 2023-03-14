import './SachMoi.scss'
import { sachMoi } from '../../data/sachMoi.js'
import { BookmarkAddOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { apiUrl } from '../../giaTriMacDinh'
import axios from 'axios'
import { useEffect, useState } from 'react'
const SachMoi = () => {
    const [dataSachMoi, setDataSachMoi] = useState([])
    useEffect(() => {
        const laySachSachMoi = async () => {
            const res = await axios.get(`${apiUrl}api/sachs?sapxep=moi`)
            setDataSachMoi(res.data.data)
        }
        laySachSachMoi()
    }, [])
    return (

        <div className="SachMoi">
            <img src={process.env.PUBLIC_URL + "PhoBien.png"} alt="" />
            <div className="SachMoi__trai">
                <div className="SachMoi__trai__title">
                    <h1>Sách Mới</h1>
                    <p>Sách Mới Phát Hành - Nhà sách trên mạng lớn nhất Việt nam, với trên 30000 đầu sách các loại gồm các chủ đề như: Kinh tế, văn học, tin học, thiếu nhi..., ...</p>
                </div>
                <div className="SachMoi__trai__sach">
                    <Link to="/theloai">

                        <div className="SachMoi__trai__sach__hinhanh">
                            <img src={sachMoi[0].imgUrl || process.env.PUBLIC__URL + sachMoi[0].imgUrl} alt="" />
                        </div>
                    </Link>
                    <div className="SachMoi__trai__sach__thongtin">
                        <div className="SachMoi__trai__sach__thongtin__name">
                            <BookmarkAddOutlined className='SachMoi__trai__sach__thongtin__name--icon' />
                            <div className="SachMoi__trai__sach__thongtin__name__phai">
                                <Link to="/theloai" style={{
                                    textDecoration: 'none'
                                }}>

                                    <h1>{sachMoi[0].name}</h1>
                                </Link>
                                <Link to="/theloai" style={{
                                    textDecoration: 'none'
                                }}>
                                    <p>{`${sachMoi[0].tags[0]},${sachMoi[0].tags[1]},${sachMoi[0].tags[2]}`}</p>
                                </Link>
                            </div>
                        </div>
                        <p>{sachMoi[0].desc}</p>
                        <h1>Tác Giả:</h1>
                        <h2>Nguyễn Thế Điệp</h2>
                        <div className="SachMoi__trai__sach__thongtin__gia">
                            <h1>{sachMoi[0].price} VNĐ</h1>
                            <Link to="/theloai" style={{
                                textDecoration: 'none'
                            }}>
                                <div className="SachMoi__trai__sach__thongtin__gia__mua">
                                    <ShoppingCartOutlined className='SachMoi__trai__sach__thongtin__gia__mua__icon' />
                                    <h1>Xem thêm</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="SachMoi__phai">
                    {
                        sachMoi.map((item, index) => {
                            return (
                                <div className="SachMoi__phai__item" key={index}>
                                    <Link to="/chitiet" style={{
                                        textDecoration: 'none'
                                    }}>
                                        <img src={item.imgUrl || process.env.PUBLIC__URL + item.imgUrl} alt="" />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default SachMoi