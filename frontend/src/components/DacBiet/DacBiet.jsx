import './DacBiet.scss'
import { dacBiet } from '../../data/dacBiet'
import { ArrowBackOutlined, ArrowForwardOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '../../giaTriMacDinh'
const DacBiet = () => {
    const [dacBietSlide, setDacBietSlide] = useState(0)
    const nutTienDacBietSlide = () => {
        if (dacBietSlide < dacBiet.length - 3) {
            setDacBietSlide(dacBietSlide + 1)
        }
    }
    const nutLuiDacBetSlide = () => {
        if (dacBietSlide > 0) {
            setDacBietSlide(dacBietSlide - 1)
        }
    }
    const [dataDacBiet, setDataDacBiet] = useState([])
    useEffect(() => {
        const laySachDacBiet = async () => {
            const res = await axios.get(`${apiUrl}api/sachs?sapxep=moi`)
            setDataDacBiet(res.data.data)
        }
        laySachDacBiet()
    }, [])


    return (
        <div className="DacBiet">
            <div className="DacBiet__title">
                <h3>Sách Đặc Biệt - Bản Giới Hạn</h3>
                <p>Một trong những yếu tố làm nên sự đặc biệt của các phiên bản này là chúng thường được làm với số lượng ít. Bởi vậy, chúng còn được gọi là sách phiên bản giới hạn</p>
            </div>
            <div className="DacBiet__items">
                {dataDacBiet ? (

                    dataDacBiet.map((item, index) => {
                        return (
                            <div className={(Math.abs(index - dacBietSlide) < 3 && index >= dacBietSlide) ? "DacBiet__item active" : "DacBiet__item"} key={index}>
                                <Link to={`/chitiet/${item._id}`}>
                                    <div className="DacBiet__item__img">
                                        <img src={`${apiUrl}images/sachs/${item.imgUrl}`} alt="" />
                                    </div>
                                </Link>
                                <div className="DacBiet__item__thongtin">
                                    <Link to={`/chitiet/${item._id}`} style={{
                                        textDecoration: 'none',
                                    }}>
                                        <h4>{item.tenSach}</h4>
                                    </Link>
                                    <Link to={`/chitiet/${item._id}`} style={{
                                        textDecoration: 'none',
                                    }}>
                                        <div className="DacBiet__item__thongtin__tags">
                                            <h1>{item.theLoai[0] ? item.theLoai[0] : null}</h1>
                                            {/* <h1>{item.theLoai[1] ? item.theLoai[1] : null}</h1> */}
                                            {/* <h1>{item.theLoai[2] ? item.theLoai[2] : null}</h1> */}
                                        </div>
                                    </Link>
                                    <div className="DacBiet__item__thongtin__desc">
                                        <p>{item.mieuTa}</p>
                                    </div>
                                    <div className="DacBiet__item__thongtin__tacgia">
                                        <h4>{item.tacGia}</h4>
                                    </div>
                                    <div className="DacBiet__item__thongtin__duoi">
                                        <Link to={`/chitiet/${item._id}`} style={{
                                            textDecoration: 'none',
                                        }}>
                                            <div className="DacBiet__item__thongtin__duoi__nut">
                                                <ShoppingCartOutlined className='DacBiet__item__thongtin__duoi__nut--icon' />
                                                <h1>Xem thêm</h1>
                                            </div>
                                        </Link>
                                        <div className="DacBiet__item__thongtin__duoi__gia">
                                            <h1>{item.gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : null
                }
            </div>
            <div className="DacBiet__nut">
                <ArrowBackOutlined className='DacBiet__nut__icon' onClick={nutLuiDacBetSlide} />
                <ArrowForwardOutlined className='DacBiet__nut__icon' onClick={nutTienDacBietSlide} />
            </div>
        </div>
    )
}

export default DacBiet