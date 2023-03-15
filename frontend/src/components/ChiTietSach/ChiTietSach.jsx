import './ChiTietSach.scss'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { chiTiet } from '../../data/chiTiet'
import { useEffect, useState } from 'react'
import { Comment, Facebook, FavoriteBorder, Instagram, ShoppingCartOutlined, Star, ThumbUp, Twitter, YouTube } from '@mui/icons-material'
import { apiUrl } from '../../giaTriMacDinh'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {add, updateProductQuantity} from '../../redux/cartSlice.js'
function doiSangPhanNghin(x) {
    if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}
// import { useSelector } from 'react-redux'
const ChiTietSach = ({ id }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    const [soLuong, setSoLuong] = useState(0)
    const tangSoLuong = () => {
        setSoLuong(soLuong + 1)
    }
    const giamSoLuong = () => {
        if (soLuong > 0) {
            setSoLuong(soLuong - 1)
        }
    }
    const [nutShowComment, setNutShowComment] = useState(true)
    const [soCommentShow, setSoCommentShow] = useState(4)
    const showMoreComment = () => {
        if (soCommentShow < chiTiet.comment.length) {
            setSoCommentShow(soCommentShow + 4)
            if (soCommentShow + 4 >= chiTiet.comment.length) {
                setNutShowComment(false)
            }
        }
    }

    const [duLieuSach, setDuLieuSach] = useState({})

    useEffect(() => {
        const chiTietSach = async () => {
            const res = await axios.get(`http://localhost:8000/books/${id}/`)
            setDuLieuSach(res.data)
        }
        chiTietSach()

    }, [id])

    const themSachGioHang = async () => {
        if(!user.user){
            alert("Ban can dang nhap")
        } else {
            dispatch(add({item: duLieuSach, quantity: soLuong}))
        }
    }
    return (
        <div className="ChiTietSach">
            <div className="ChiTietSach__tren">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/" className='ChiTietSach__tren__link'>
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to="/theloai"
                        className='ChiTietSach__tren__link'
                    >
                        Thể loại
                    </Link>
                    <Typography color="text.primary">name</Typography>
                </Breadcrumbs>
            </div>
            <div className="ChiTietSach__duoi">
                {
                    duLieuSach ? (
                        <div className="ChiTietSach__duoi__thongtin">
                            <div className="ChiTietSach__duoi__thongtin__anh">
                                <img src={duLieuSach.image ? `http://localhost:8000${duLieuSach.image}` : null} alt="anh" />
                            </div>
                            <div className="ChiTietSach__duoi__thongtin__phai">
                                <div className="ChiTietSach__duoi__thongtin__phai__title">
                                    <div className="ChiTietSach__duoi__thongtin__phai__title__trai">
                                        <div className="ChiTietSach__duoi__thongtin__phai__title__trai__tren">
                                            <h1>{duLieuSach.name}</h1>
                                            <div className="ChiTietSach__duoi__thongtin__phai__title__trai__tren">
                                                <div className="ChiTietSach__duoi__thongtin__phai__title__trai__tren__mang__facebook">
                                                    <Facebook className='ChiTietSach__duoi__thongtin__phai__title__trai__tren__facebook' />
                                                    <p>Facebook</p>
                                                </div>
                                                <div className="ChiTietSach__duoi__thongtin__phai__title__trai__tren__mang__twitter">
                                                    <Twitter className='ChiTietSach__duoi__thongtin__phai__title__trai__tren__twitter' />
                                                    <p>Twitter</p>
                                                </div>
                                                <div className="ChiTietSach__duoi__thongtin__phai__title__trai__tren__mang__instagram">
                                                    <Instagram className='ChiTietSach__duoi__thongtin__phai__title__trai__tren__instagram' />
                                                    <p>Instagram</p>
                                                </div>
                                                <div className="ChiTietSach__duoi__thongtin__phai__title__trai__tren__mang__youtube">
                                                    <YouTube className='ChiTietSach__duoi__thongtin__phai__title__trai__tren__youtube' />
                                                    <p>Youtube</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi">
                                            <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi__sao">
                                                {
                                                    [1, 2, 3, 4, 5].map((item1, index) => {
                                                        return (
                                                            <Star className={item1 <= 5 ? "ChiTietSach__duoi__thongtin__phai__title__trai__duoi__sao__chuan active" : "ChiTietSach__duoi__thongtin__phai__title__trai__duoi__sao__chuan"} key={index} />
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi__sao__so">
                                                5.0
                                            </div>
                                            <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi__comment">
                                                <Comment className='ChiTietSach__duoi__thongtin__phai__title__trai__duoi__comment__icon' />
                                                <p>235 bình luận</p>
                                            </div>
                                            <div className="ChiTietSach__duoi__thongtin__phai__title__trai__duoi__like">
                                                <ThumbUp className='ChiTietSach__duoi__thongtin__phai__title__trai__duoi__like__icon' />
                                                <p>{999} thích</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="ChiTietSach__duoi__thongtin__phai__mota">
                                    <p>{duLieuSach.description}</p>
                                </div>
                                <div className="ChiTietSach__duoi__thongtin__phai__them">
                                    <div className="ChiTietSach__duoi__thongtin__phai__them__tacgia">
                                        <h1>Tác giả</h1>
                                        <p>{duLieuSach.author}</p>
                                    </div>
                                    <div className="ChiTietSach__duoi__thongtin__phai__them__nam">
                                        <h1>Năm</h1>
                                        <p>{duLieuSach.publishYear}</p>
                                    </div>
                                </div>
                                <div className="ChiTietSach__duoi__thongtin__phai__themvaogio">
                                    <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__gia">
                                        <h1>{doiSangPhanNghin(duLieuSach.price)} VNĐ</h1>
                                    </div>
                                    <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__them">
                                        <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__them__soluong">
                                            <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__them__soluong__tru" onClick={giamSoLuong}>
                                                -
                                            </div>
                                            <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__them__soluong__so">
                                                {soLuong}
                                            </div>
                                            <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__them__soluong__cong" onClick={tangSoLuong}>
                                                +
                                            </div>
                                        </div>
                                        <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__them__mua" onClick={() => {
                                            themSachGioHang()
                                        }}>
                                            <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__them__mua__nut">
                                                <ShoppingCartOutlined className='ChiTietSach__duoi__thongtin__phai__themvaogio__them__mua__nut__icon' />
                                                <p>Thêm vào giỏ</p>
                                            </div>
                                        </div>
                                        <div className="ChiTietSach__duoi__thongtin__phai__themvaogio__them__mua__like">
                                            <FavoriteBorder className='ChiTietSach__duoi__thongtin__phai__themvaogio__them__mua__like__icon' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
                <div className="ChiTietSach__duoi__comment">
                    <div className="ChiTietSach__duoi__comment__title">
                        <h1>Bình luận</h1>
                    </div>
                    <div className="ChiTietSach__duoi__comment__noidung">
                        {
                            chiTiet.comment.map((item, index) => {
                                return (
                                    index < soCommentShow ?
                                        <div className="ChiTietSach__duoi__comment__noidung__item" key={index}>
                                            <div className="ChiTietSach__duoi__comment__noidung__item__trai">
                                                <div className="ChiTietSach__duoi__comment__noidung__item__trai__avatar">
                                                    <img src="data:image/jpeg;base64,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" alt="" />
                                                    <div className="ChiTietSach__duoi__comment__noidung__item__trai__avatar__name">
                                                        <h2>{item.name}</h2>
                                                        <p>{item.date}</p>
                                                    </div>
                                                </div>
                                                <div className="ChiTietSach__duoi__comment__noidung__item__trai__comment">
                                                    <p>{item.content}</p>
                                                </div>
                                            </div>
                                            <div className="ChiTietSach__duoi__comment__noidung__item__phai">
                                                <div className="ChiTietSach__duoi__comment__noidung__item__phai__sosao">
                                                    <h2>{item.star}.0</h2>
                                                </div>
                                                <div className="ChiTietSach__duoi__comment__noidung__item__phai__danhgia">
                                                    {
                                                        [1, 2, 3, 4, 5].map((item1, index) => {
                                                            return (
                                                                <Star className={item1 <= item.star ? "ChiTietSach__duoi__comment__noidung__item__phai__danhgia__sao active" : "ChiTietSach__duoi__comment__noidung__item__phai__danhgia__sao"} key={index} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div> :
                                        null
                                )
                            })
                        }
                    </div>
                    {nutShowComment ?
                        <div className="ChiTietSach__duoi__comment__showMoreComment" onClick={showMoreComment}>
                            <h3>Xem thêm bình luận</h3>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ChiTietSach