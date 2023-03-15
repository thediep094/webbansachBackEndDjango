import { ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./TrangCaNhanChiTiet.scss";
// import { lichSu } from '../../data/lichSu'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl } from "../../giaTriMacDinh";
function doiSangPhanNghin(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const TrangCaNhanChiTiet = () => {
  const user = useSelector((state) => state.user);
  const [lichSuMua, setLichSuMua] = useState([]);
  const [nutShowLichSu, setNutShowLichSu] = useState(true);
  const [soLichSuShow, setSoLichSuShow] = useState(4);
  const [thongTin, setThongTin] = useState({
    hoVaTen: user.user.fullname,
    email: user.user.email,
    sdt: user.user.sdt,
    diaChi: user.user.location,
  });

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8000/order/${user.user.id}`
      );
      setLichSuMua(res.data);
    };
    fetchData();
  }, []);

  const showMoreLichSu = () => {
    if (soLichSuShow < lichSuMua.length) {
      setSoLichSuShow(soLichSuShow + 4);
      if (soLichSuShow + 4 >= lichSuMua.length) {
        setNutShowLichSu(false);
      }
    }
  };

  const doiThongTin = (e) => {
    setThongTin({
      ...thongTin,
      [e.target.name]: e.target.value,
    });
  };

  const capNhatThongTin = async () => {
    const res = await axios.put(
      `${apiUrl}api/users/${user.user.data._id}`,
      {
        hoVaTen: thongTin.hoVaTen,
        email: thongTin.email,
        sdt: thongTin.sdt,
        diaChi: thongTin.diaChi,
      },
      {
        headers: {
          token: `Bearer ${user.user.accessToken}`,
        },
      }
    );
    if (res.data.success) {
      alert("Cập nhật thông tin thành công, vui lòng đăng nhập lại!!");
    }
  };

  const capNhatAnhDaiDien = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    try {
      const res = await axios.put(
        `${apiUrl}api/users/${user.user.data._id}`,
        formData,
        {
          headers: {
            token: `Bearer ${user.user.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        alert("Cập nhật ảnh đại diện thành công, vui lòng đăng nhập lại!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chonAnh = (e) => {
    setAvatar(e.target.files[0]);
  };
  const dangXuat = () => {
    window.location.href = "/";
  };

  return (
    <div className="TrangCaNhanChiTiet">
      <div className="TrangCaNhanChiTiet__trai">
        <div className="TrangCaNhanChiTiet__trai__tren">
          <div className="TrangCaNhanChiTiet__trai__tren__anh">
            <img
              src={
                "data:image/jpeg;base64,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"
              }
              alt=""
            />
          </div>
        </div>
        <div className="TrangCaNhanChiTiet__trai__duoi">
          {/* <form onSubmit={capNhatAnhDaiDien}>
                        <div className="TrangCaNhanChiTiet__trai__duoi__item" >
                            <h1>Cập nhật ảnh đại diện:</h1>
                            <input type="file"
                                id='avatar'
                                accept=".jpg, .jpeg, .png"
                                onChange={chonAnh}
                                style={{ border: 'none' }}
                            />
                            <input type="submit" value={"Cập nhật"} style={{
                                cursor: 'pointer'
                            }} />
                        </div>
                    </form> */}
          <div className="TrangCaNhanChiTiet__trai__duoi__item">
            <h1>Họ và tên:</h1>
            <input
              type="text"
              value={thongTin.hoVaTen}
              name="hoVaTen"
              onChange={doiThongTin}
            />
          </div>
          <div className="TrangCaNhanChiTiet__trai__duoi__item">
            <h1>Email:</h1>
            <input
              type="text"
              value={thongTin.email}
              name="email"
              onChange={doiThongTin}
            />
          </div>
          <div className="TrangCaNhanChiTiet__trai__duoi__item">
            <h1>Số điện thoại:</h1>
            <input
              type="text"
              value={thongTin.sdt}
              name="sdt"
              onChange={doiThongTin}
            />
          </div>
          <div className="TrangCaNhanChiTiet__trai__duoi__item">
            <h1>Địa chỉ:</h1>
            <input
              type="text"
              value={thongTin.diaChi}
              name="diaChi"
              onChange={doiThongTin}
            />
          </div>
        </div>
        <div className="TrangCaNhanChiTiet__button">
          {/* <button id='TrangCaNhanChiTiet__button' onClick={() => [
                        capNhatThongTin()
                    ]}>Cập nhật</button> */}
          <button
            id="TrangCaNhanChiTiet__button"
            onClick={() => {
              dangXuat();
            }}
          >
            Đăng Xuất
          </button>
        </div>
      </div>
      <div className="TrangCaNhanChiTiet__phai">
        <div className="TrangCaNhanChiTiet__phai__danhsach">
          <div className="TrangCaNhanChiTiet__phai__danhsach__title">
            <h1>Lịch Sử Mua Hàng</h1>
          </div>
          <div className="TrangCaNhanChiTiet__phai__danhsach__items">
            {lichSuMua.map((item) => {
                const dateString = item.created_at;
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear().toString();
                const formattedDateString = `${day}/${month}/${year}`;
                return item.items.map((product,index) => {
                      return (
                      <div
                          className="TrangCaNhanChiTiet__phai__danhsach__item"
                          key={index}
                      >
                          <Link
                          to={`/chitiet/${product.id}`}
                          className="TrangCaNhanChiTiet__phai__danhsach__item__link"
                          >
                          <div className="TrangCaNhanChiTiet__phai__danhsach__item__hinhanh">
                              <img
                              src={`http://localhost:8000${product.book.image}`}
                              alt=""
                              />
                          </div>
                          </Link>
                          <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin">
                          <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__tren">
                              <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__title">
                              <Link
                                  to={`/chitiet`}
                                  className="TrangCaNhanChiTiet__phai__danhsach__item__link"
                              >
                                  <h1>{product.book.name}</h1>
                              </Link>
                              </div>
                              <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__phai">
                              <p>Ngày mua: {formattedDateString}</p>
                              </div>
                          </div>
                          <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__desc">
                              <p>{product.book.description}</p>
                          </div>
                          <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__gia">
                              <p>
                              {doiSangPhanNghin(Number(product.book.price))} VNĐ
                              </p>
                              <h1>Số lượng mua: {product.quantity}</h1>
                          </div>
                          <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__duoi">
                              <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__duoi__trai">
                              <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__duoi__trai__tacgia">
                                  <h1>Tác giả</h1>
                                  <p>{product.book.author}</p>
                              </div>
                              <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__duoi__trai__nam">
                                  <h1>Năm</h1>
                                  <p>{product.book.publishYear}</p>
                              </div>
                              </div>
                              <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__duoi__phai">
                              <div className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__duoi__phai__nut">
                                  <ShoppingCartOutlined className="TrangCaNhanChiTiet__phai__danhsach__item__thongtin__duoi__phai__nut__icon" />
                                  <p>
                                  Tổng số tiền:{" "}
                                  {doiSangPhanNghin(
                                      product.book.price * product.quantity
                                  )}
                                  </p>
                              </div>
                              </div>
                          </div>
                          </div>
                      </div>
                      )
                });
            })}
          </div>
          {/* {nutShowLichSu ? (
            <div
              className="TrangCaNhanChiTiet__phai__danhsach__showMoreComment"
              onClick={showMoreLichSu}
            >
              <h3>Xem thêm lịch sử</h3>
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default TrangCaNhanChiTiet;
