import "./GioHangChiTiet.scss";
// import { gioHang } from '../../data/gioHang'
import { Link, redirect, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, Star } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../giaTriMacDinh";
import { useEffect, useState } from "react";
import axios from "axios";
import {removeProduct, removeAllProduct} from '../../redux/cartSlice.js'
function doiSangPhanNghin(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const GioHangChiTiet = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  // const [gioHangSanPham, setGioHangSanPham] = useState([])
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //     if (user.user) {
  //         gioHangData.forEach(async item => {
  //             const res = await axios.get(`${apiUrl}api/sachs/${item.sachId}`)
  //             res.data.data.soLuong = item.soLuong
  //             setGioHangSanPham(gioHangSanPham => [...gioHangSanPham, res.data.data])
  //         }
  //         )
  //     }
  // }, [user])

  const xoaSachGioHang = (id) => {
    dispatch(removeProduct({id}))
  };

  const xacNhanMuaHang = async () => {
    const body = cart.cart.map(({ id, quantity }) => ({ id, quantity }));
    const res = await axios.post(`http://localhost:8000/order/create`, {
      id : user.user.id,
      items: body
    });
    if(res.status === 200){
      dispatch(removeAllProduct())
    }
  };
  return (
    <div className="GioHangChiTiet">
      <div className="GioHangChiTiet__trai">
        <div className="GioHangChiTiet__trai__danhsach">
          <div className="GioHangChiTiet__trai__danhsach__title">
            <h1>Danh Sách Sách</h1>
          </div>
          <div className="GioHangChiTiet__trai__danhsach__items">
            {cart.cart
              ? cart.cart.map((item, index) => {
                  return (
                    <div
                      className="GioHangChiTiet__trai__danhsach__item"
                      key={index}
                    >
                      <Link
                        to={`/chitiet/${item.id}`}
                        className="GioHangChiTiet__trai__danhsach__item__link"
                      >
                        <div className="GioHangChiTiet__trai__danhsach__item__hinhanh">
                          <img
                            src={`http://localhost:8000${item.image}`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="GioHangChiTiet__trai__danhsach__item__thongtin">
                        <div className="GioHangChiTiet__trai__danhsach__item__thongtin__tren">
                          <div className="GioHangChiTiet__trai__danhsach__item__thongtin__title">
                            <Link
                              to={`/chitiet`}
                              className="GioHangChiTiet__trai__danhsach__item__link"
                            >
                              <h1>{item.name}</h1>
                            </Link>
                            {/* <div className="GioHangChiTiet__trai__danhsach__item__theloai">
                                                            <p>{`${item.theLoai[0]}`}</p>
                                                        </div> */}
                          </div>
                          <div className="GioHangChiTiet__trai__danhsach__item__thongtin__phai">
                            <div className="GioHangChiTiet__trai__danhsach__item__danhgia">
                              {[1, 2, 3, 4, 5].map((item1, index) => {
                                return (
                                  <Star
                                    className={
                                      item1 <= 5
                                        ? "GioHangChiTiet__trai__danhsach__item__danhgia__sao active"
                                        : "GioHangChiTiet__trai__danhsach__item__danhgia__sao"
                                    }
                                    key={index}
                                  />
                                );
                              })}
                            </div>
                            <p>{999} lượt mua</p>
                          </div>
                        </div>
                        <div className="GioHangChiTiet__trai__danhsach__item__thongtin__desc">
                          <p>{item.description}</p>
                        </div>
                        <div className="GioHangChiTiet__trai__danhsach__item__thongtin__gia">
                          <p>
                            {doiSangPhanNghin(
                              Number(item.price * item.quantity)
                            )}{" "}
                            VNĐ
                          </p>
                          <h1>Số lượng mua: {item.quantity}</h1>
                        </div>
                        <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi">
                          <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__trai">
                            <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__trai__tacgia">
                              <h1>Tác giả</h1>
                              <p>{item.author}</p>
                            </div>
                            <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__trai__nam">
                              <h1>Năm</h1>
                              <p>{item.publishYear}</p>
                            </div>
                          </div>
                          <div className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__phai">
                            <div
                              className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__phai__nut"
                              onClick={() => {
                                xoaSachGioHang(item.id)
                              }}
                            >
                              <ShoppingCartOutlined className="GioHangChiTiet__trai__danhsach__item__thongtin__duoi__phai__nut__icon" />
                              <p>Xóa khỏi giỏ</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div className="GioHangChiTiet__phai">
        <h1>Số lượng sách trong giỏ: {cart.cart.reduce((total, item)=> total + item.quantity, 0)}</h1>

        <h2>Tổng số tiền: {doiSangPhanNghin(Number(cart.total))} VNĐ</h2>
        <div
          className="GioHangChiTiet__phai__thanhtoan"
          onClick={() => xacNhanMuaHang()}
        >
          Xác nhận mua hàng
        </div>
      </div>
    </div>
  );
};

export default GioHangChiTiet;
