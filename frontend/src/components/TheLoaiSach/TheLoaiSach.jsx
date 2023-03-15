import { Breadcrumbs, Pagination, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './TheLoaiSach.scss'
import { ArrowForward, ShoppingCartOutlined, Star } from '@mui/icons-material'
import { timKiem } from '../../data/timKiem'
import axios from 'axios'
import { apiUrl } from '../../giaTriMacDinh';
import { useSelector, useDispatch } from 'react-redux';
import {add} from '../../redux/cartSlice.js'
function doiSangPhanNghin(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
export const TheLoaiSach = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    const [sapXepTheoKieu, setSapXepTheoKieu] = useState('')
    const doiSapXep = (event) => {
        setSapXepTheoKieu(event.target.value);
    }

    const [trang, setTrang] = useState({
        trangHienTai: 1,
        soItemMotTrang: 4,
        tongSoItem: 1
    })

    const doiTrang = (e, value) => {
        setTrang({
            ...trang,
            trangHienTai: value
        })
    }
    const location = useLocation()
    const [theLoaiSach, setTheLoaiSach] = useState('All')
    const [namBatDau, setNamBatDau] = useState('')
    const [namKetThuc, setNamKetThuc] = useState('')
    const [giaBatDau, setGiaBatDau] = useState('')
    const [giaKetThuc, setGiaKetThuc] = useState('')
    const doiGiaTri = (e, value) => {
        if (e.target.name === 'namBatDau') {
            setNamBatDau(e.target.value)
        } else if (e.target.name === 'namKetThuc') {
            setNamKetThuc(e.target.value)
        } else if (e.target.name === 'giaBatDau') {
            setGiaBatDau(e.target.value)
        } else if (e.target.name === 'giaKetThuc') {
            setGiaKetThuc(e.target.value)
        } else if (e.target.name === 'theloais') {
            setTheLoaiSach(e.target.value)
        }
    }

    const [data, setData] = useState([]);
    const [dataSapXep, setDataSapXep] = useState([]);
    const getApi = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/books/`);
            setData(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getApi();
    }, [])
    const timKiemButton = () => {
        if (sapXepTheoKieu !== '') {
            const sapXep = data.sort((a, b) => {
                if (sapXepTheoKieu === 'moi') {
                    return b.namXuatBan - a.namXuatBan
                }
                if (sapXepTheoKieu === 'gia') {
                    return a.gia - b.gia
                }
                if (sapXepTheoKieu === 'danhgia') {
                    return b.danhGia - a.danhGia
                }
                if (sapXepTheoKieu === 'luotmua') {
                    return b.luotMua - a.luotMua
                }
            })
            setData(sapXep)
            setTrang({
                ...trang,
                tongSoItem: sapXep.length
            })
        }
        if (namBatDau !== '' && namKetThuc !== '' && giaBatDau === '' && giaKetThuc === '' && theLoaiSach === 'All') {
            const timKiemTheoNam = data.filter(item => Number(item.namXuatBan) >= Number(namBatDau) && Number(item.namXuatBan) <= Number(namKetThuc))
            setDataSapXep(timKiemTheoNam)
            setTrang({
                ...trang,
                tongSoItem: timKiemTheoNam.length
            })

        }
        if (giaBatDau !== '' && giaKetThuc !== '' && theLoaiSach === 'All') {
            if (namBatDau !== '' && namKetThuc !== '') {
                const timKiemTheoNam = data.filter(item => Number(item.namXuatBan) >= Number(namBatDau) && Number(item.namXuatBan) <= Number(namKetThuc))
                const timKiemTheoGia = timKiemTheoNam.filter(item => Number(item.gia) >= Number(giaBatDau) && Number(item.gia) <= Number(giaKetThuc))
                setDataSapXep(timKiemTheoGia)
                setTrang({
                    ...trang,
                    tongSoItem: timKiemTheoGia.length
                })
            }
            else {

                const timKiemTheoGia = data.filter(item => Number(item.gia) >= Number(giaBatDau) && Number(item.gia) <= Number(giaKetThuc))
                setDataSapXep(timKiemTheoGia)
                setTrang({
                    ...trang,
                    tongSoItem: timKiemTheoGia.length
                })
            }
        }

        if (theLoaiSach !== 'All' && namBatDau === '' && namKetThuc === '' && giaBatDau === '' && giaKetThuc === '') {
            const timKiemTheoTheLoai = data.filter(item => item.theLoai.includes(theLoaiSach))
            setDataSapXep(timKiemTheoTheLoai)
            setTrang({
                ...trang,
                tongSoItem: timKiemTheoTheLoai.length
            })
        }

        if (giaBatDau !== '' && giaKetThuc !== '' && theLoaiSach !== 'All') {
            if (namBatDau !== '' && namKetThuc !== '') {
                const timKiemTheoNam = data.filter(item => Number(item.namXuatBan) >= Number(namBatDau) && Number(item.namXuatBan) <= Number(namKetThuc))
                const timKiemTheoGia = timKiemTheoNam.filter(item => Number(item.gia) >= Number(giaBatDau) && Number(item.gia) <= Number(giaKetThuc))
                const timKiemTheoTheLoai = timKiemTheoGia.filter(item => item.theLoai.includes(theLoaiSach))
                setDataSapXep(timKiemTheoTheLoai)
                setTrang({
                    ...trang,
                    tongSoItem: timKiemTheoTheLoai.length
                })
            }
            else {

                const timKiemTheoGia = data.filter(item => Number(item.gia) >= Number(giaBatDau) && Number(item.gia) <= Number(giaKetThuc))
                const timKiemTheoTheLoai = timKiemTheoGia.filter(item => item.theLoai.includes(theLoaiSach))
                setDataSapXep(timKiemTheoTheLoai)
                setTrang({
                    ...trang,
                    tongSoItem: timKiemTheoTheLoai.length
                })
            }
        }
        if (namBatDau !== '' && namKetThuc !== '' && theLoaiSach !== 'All') {
            const timKiemTheoNam = data.filter(item => Number(item.namXuatBan) >= Number(namBatDau) && Number(item.namXuatBan) <= Number(namKetThuc))
            const timKiemTheoTheLoai = timKiemTheoNam.filter(item => item.theLoai.includes(theLoaiSach))
            setDataSapXep(timKiemTheoTheLoai)
            setTrang({
                ...trang,
                tongSoItem: timKiemTheoTheLoai.length
            })
        }


    }

    const resetButton = () => {
        setTheLoaiSach('All')
        setNamBatDau('')
        setNamKetThuc('')
        setGiaBatDau('')
        setGiaKetThuc('')
        setSapXepTheoKieu('')
        getApi()
    }

    const themSachGioHang = async (item) => {
       if(!user.user){
        alert("Ban can dang nhap")
       } else {
        dispatch(add({item, quantity: 1}));
        alert("Them thanh cong")
       }
    }


    return (
        <div className="TheLoaiSach">
            <div className="TheLoaiSach__tren">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/" className='TheLoaiSach__tren__link'>
                        Trang chủ
                    </Link>
                    <Typography color="text.primary">Thể loại</Typography>
                </Breadcrumbs>
            </div>
            <div className="TheLoaiSach__duoi">
                <div className="TheLoaiSach__duoi__luachon">
                    <div className="TheLoaiSach__duoi__luachon__title">
                        Lựa Chọn
                    </div>
                    <div className="TheLoaiSach__duoi__luachon__sapxep">
                        <div className="TheLoaiSach__duoi__luachon__sapxep__title">
                            <h1>Chọn kiểu sắp xếp</h1>
                        </div>
                        <div className="TheLoaiSach__duoi__luachon__sapxep__kieu">
                            <FormControl className='TheLoaiSach__duoi__luachon__sapxep__kieu__form'>
                                <InputLabel id="TheLoaiSach__duoi__luachon__sapxep__kieu__ten">Sắp xếp</InputLabel>
                                <Select
                                    id="TheLoaiSach__duoi__luachon__sapxep__kieu__luachon"
                                    value={sapXepTheoKieu}
                                    onChange={doiSapXep}
                                >
                                    <MenuItem value="moi">Mới Nhất</MenuItem>
                                    <MenuItem value="luotmua">Bán Chạy Nhất</MenuItem>
                                    <MenuItem value="danhgia">Nhiều Bình Luận Nhất</MenuItem>
                                    <MenuItem value="gia">Giá</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="TheLoaiSach__duoi__luachon__nam">
                        <div className="TheLoaiSach__duoi__luachon__nam__title">

                            <h1>Chọn năm</h1>
                        </div>
                        <div className="TheLoaiSach__duoi__luachon__nam__nambatdau">
                            <h1>Năm bắt đầu</h1>
                            <input type="text" placeholder='Năm bắt đầu' name='namBatDau' onChange={doiGiaTri} value={namBatDau} />
                        </div>
                        <div className="TheLoaiSach__duoi__luachon__nam__namketthuc">
                            <h1>Năm kết thúc</h1>
                            <input type="text" placeholder='Năm kết thúc' name='namKetThuc' onChange={doiGiaTri} value={namKetThuc} />
                        </div>
                    </div>
                    <div className="TheLoaiSach__duoi__luachon__theloai">
                        <div className="TheLoaiSach__duoi__luachon__theloai__title">
                            <h1>Chọn thể loại</h1>
                        </div>
                        <div className="TheLoaiSach__duoi__luachon__theloai__luachon">
                            <select name="theloais" id="theloais" onChange={doiGiaTri} value={theLoaiSach}>
                                <option value="All">
                                    Tất cả
                                </option>
                                <option value="Action">
                                    Action
                                </option>
                                <option value="Adventure">
                                    Adventure
                                </option>
                                <option value="Comedy">
                                    Comedy
                                </option>
                                <option value="Crime">
                                    Crime
                                </option>
                                <option value="Drama">
                                    Drama
                                </option>
                                <option value="Fantasy">
                                    Fantasy
                                </option>
                                <option value="Horor">
                                    Horor
                                </option>
                                <option value="Law">
                                    Law
                                </option>
                                <option value="TV Series">
                                    TV Series
                                </option>
                                <option value="Romance">
                                    Romance
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="TheLoaiSach__duoi__luachon__gia">
                        <div className="TheLoaiSach__duoi__luachon__gia__title">

                            <h1>Chọn giá</h1>
                        </div>
                        <div className="TheLoaiSach__duoi__luachon__gia__tu__den">
                            <h1>Từ</h1>
                            <input type="text" placeholder='VNĐ' className='TheLoaiSach__duoi__luachon__gia__tu__den__input' name='giaBatDau' onChange={doiGiaTri} value={giaBatDau} />
                            <ArrowForward className='TheLoaiSach__duoi__luachon__gia__tu__den__icon' />
                            <h1>Đến</h1>
                            <input type="text" placeholder='VNĐ' className='TheLoaiSach__duoi__luachon__gia__tu__den__input' name='giaKetThuc' onChange={doiGiaTri} value={giaKetThuc} />
                        </div>
                    </div>
                    <div className="TheLoaiSach__duoi__luachon__timkiem">
                        <div className="TheLoaiSach__duoi__luachon__timkiem__timkiem" onClick={timKiemButton}>
                            Tìm Kiếm
                        </div>
                        <div className="TheLoaiSach__duoi__luachon__timkiem__reset" onClick={resetButton}>
                            Reset Tìm Kiếm
                        </div>
                    </div>
                </div>
                <div className="TheLoaiSach__duoi__danhsach">
                    <div className="TheLoaiSach__duoi__danhsach__title">
                        <h1>Danh Sách Sách</h1>
                    </div>
                    <div className="TheLoaiSach__duoi__danhsach__items">
                        {
                            data.map((item, index) => {
                                return (
                                    (index >= (trang.trangHienTai - 1) * trang.soItemMotTrang) && (index < trang.trangHienTai * trang.soItemMotTrang) ?
                                        <div className="TheLoaiSach__duoi__danhsach__item" key={index}>
                                            <Link to={`/chitiet/${item.id}`} className="TheLoaiSach__duoi__danhsach__item__link">
                                                <div className="TheLoaiSach__duoi__danhsach__item__hinhanh">
                                                    <img src={`http://localhost:8000${item.image}`} alt="" />
                                                </div>
                                            </Link>
                                            <div className="TheLoaiSach__duoi__danhsach__item__thongtin">
                                                <div className="TheLoaiSach__duoi__danhsach__item__thongtin__tren">
                                                    <div className="TheLoaiSach__duoi__danhsach__item__thongtin__title">
                                                        <Link to={`/chitiet`} className="TheLoaiSach__duoi__danhsach__item__link">
                                                            <h1>{item.name}</h1>
                                                        </Link>
                                                        <div className="TheLoaiSach__duoi__danhsach__item__theloai">
                                                            <p>{`${item.collection}`}</p>
                                                        </div>
                                                    </div>
                                            
                                                </div>
                                                <div className="TheLoaiSach__duoi__danhsach__item__thongtin__desc">
                                                    <p>{item.description}</p>
                                                </div>
                                                <div className="TheLoaiSach__duoi__danhsach__item__thongtin__gia">
                                                    <p>{doiSangPhanNghin(item.price)} VNĐ</p>
                                                </div>
                                                <div className="TheLoaiSach__duoi__danhsach__item__thongtin__duoi">
                                                    <div className="TheLoaiSach__duoi__danhsach__item__thongtin__duoi__trai">
                                                        <div className="TheLoaiSach__duoi__danhsach__item__thongtin__duoi__trai__tacgia">
                                                            <h1>Tác giả</h1>
                                                            <p>{item.author}</p>
                                                        </div>
                                                        <div className="TheLoaiSach__duoi__danhsach__item__thongtin__duoi__trai__nam">
                                                            <h1>Năm</h1>
                                                            <p>{item.publishYear}</p>
                                                        </div>
                                                    </div>
                                                    <div className="TheLoaiSach__duoi__danhsach__item__thongtin__duoi__phai">
                                                        <div className="TheLoaiSach__duoi__danhsach__item__thongtin__duoi__phai__nut" onClick={() => {
                                                            themSachGioHang(item)
                                                        }} >
                                                            <ShoppingCartOutlined className='TheLoaiSach__duoi__danhsach__item__thongtin__duoi__phai__nut__icon' />
                                                            <p>Thêm vào giỏ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                )
                            })
                        }
                    </div>
                    <div className="TheLoaiSach__duoi__danhsach__chuyentrang">
                        <Pagination count={Math.ceil(trang.tongSoItem / trang.soItemMotTrang)} variant="outlined" page={trang.trangHienTai} onChange={doiTrang} color="primary" />
                    </div>
                </div>
            </div>

        </div>
    )
}
