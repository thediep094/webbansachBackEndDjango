import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, Circle, Star } from '@mui/icons-material'
import './NhieuNguoiMua.scss'
import { nhieuNguoiMua } from '../../data/nhieuNguoiMua'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '../../giaTriMacDinh'
const NhieuNguoiMua = () => {
    const [nhieuNguoiMuaSlide, setNhieuNguoiMuaSlide] = useState(0)
    const nutTienNhieuNguoiMuaSlide = () => {
        if (nhieuNguoiMuaSlide < nhieuNguoiMua.length - 6) {
            setNhieuNguoiMuaSlide(nhieuNguoiMuaSlide + 1)
        }
    }
    const nutLuiNhieuNguoiMuaSlide = () => {
        if (nhieuNguoiMuaSlide > 0) {
            setNhieuNguoiMuaSlide(nhieuNguoiMuaSlide - 1)
        }
    }

    const [dataNhieuNguoiMua, setDataNhieuNguoiMua] = useState([])
    useEffect(() => {
        const laySachNhieuNguoiMua = async () => {
            const res = await axios.get(`${apiUrl}api/sachs?sapxep=luotmua`)
            setDataNhieuNguoiMua(res.data.data)
        }
        laySachNhieuNguoiMua()
    }, [])
    return (
        <div className="NhieuNguoiMua">
            <div className="NhieuNguoiMua__title">
                <h3>Nhiều người mua</h3>
                <div className="NhieuNguoiMua__title__nut">
                    <ArrowBackIosNewOutlined className='NhieuNguoiMua__title__nut__icon' onClick={nutLuiNhieuNguoiMuaSlide} />
                    {
                        [0, 1, 2, 3].map(item => {
                            return (
                                <Circle key={item} className={item === nhieuNguoiMuaSlide ? "dot active" : "dot"} />
                            )
                        })
                    }
                    <ArrowForwardIosOutlined className='NhieuNguoiMua__title__nut__icon' onClick={nutTienNhieuNguoiMuaSlide} />
                </div>
            </div>
            <div className="NhieuNguoiMua__items">

                {
                    dataNhieuNguoiMua ? (

                        dataNhieuNguoiMua.map((item, index) => {
                            if (index < 9)
                                return (
                                    <div className={(Math.abs(index - nhieuNguoiMuaSlide) < 6 && index >= nhieuNguoiMuaSlide) ? "NhieuNguoiMua__sach__item active" : "NhieuNguoiMua__sach__item"
                                    }
                                        key={index}
                                    >
                                        <Link to={`/chitiet/${item._id}`} style={{
                                            textDecoration: 'none',
                                        }}>

                                            <div className="NhieuNguoiMua__sach__item__hinhAnh">
                                                <img src={`${apiUrl}images/sachs/${item.imgUrl}`} alt="" />
                                            </div>
                                            <div className="NhieuNguoiMua__sach__item__thongTin">
                                                <h3>{item.tenSach}</h3>
                                                <h4>{`${item.theLoai[0]}`}</h4>
                                            </div>
                                            <div className="NhieuNguoiMua__sach__item__duoi">
                                                <h4>Bán:{item.luotMua} <Star /></h4>
                                                <h5>{item.gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</h5>
                                            </div>
                                        </Link>
                                    </div>
                                )
                        })
                    ) : null
                }
            </div>
        </div >
    )
}

export default NhieuNguoiMua