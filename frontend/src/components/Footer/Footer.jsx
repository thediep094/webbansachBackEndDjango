import './Footer.scss'
import { Email, Facebook, Group, HistoryEdu, Instagram, LocationOn, MenuBook, Phone, StoreMallDirectory, Twitter, YouTube } from '@mui/icons-material'
const Footer = () => {
    return (
        <div className="Footer">
            <div className="Footer__tren">
                <div className="Footer__tren__item">
                    <Group className='Footer__tren__item__icon' />
                    <h1>125,663</h1>
                    <p>Số lượng người dùng</p>
                </div>
                <div className="Footer__tren__item">
                    <MenuBook className='Footer__tren__item__icon' />
                    <h1>50,672+</h1>
                    <p>Số lượng sách</p>
                </div>
                <div className="Footer__tren__item">
                    <StoreMallDirectory className='Footer__tren__item__icon' />
                    <h1>1,562</h1>
                    <p>Số cửa hàng</p>
                </div>
                <div className="Footer__tren__item">
                    <HistoryEdu className='Footer__tren__item__icon' />
                    <h1>457</h1>
                    <p>Số tác giả</p>
                </div>
            </div>
            <div className="Footer__giua">
                <img src={"http://localhost:3000/typeemailbackground.png"} alt="" />
                <h1>Đăng ký email ở đây để có thể nhận được thông báo về nhiều cuốn sách hay nhất.</h1>
                <div className="Footer__giua__email">
                    <input type="text" placeholder="Nhập email của bạn" />
                    <div className="Footer__giua__email__nut">Đăng ký</div>
                </div>
            </div>
            <div className="Footer__duoi">
                <div className="Footer__duoi__trai">
                    <div className="ThanhMenu__trai--logo">
                        <img src={'http://localhost:3000/Logo.png'} alt="" />
                        <div className="ThanhMenu__trai--ten">
                            <h2>Bookoe</h2>
                            <p>Book Store 5 Chú Hề</p>
                        </div>
                    </div>
                    <div className="Footer__duoi__trai__thongtin">
                        <p>Bookoe là trang web mua bán sách online của Công ty công nghệ và chất lượng cao 5 chú hề. Với Hề Captain là chủ tịch của công ty. Công ty đã có 21 năm kinh nghiệm trong việc điều hành và mua bán Bitcoin.</p>
                    </div>
                    <h1>Follow Us</h1>
                    <div className="Footer__duoi__trai__mangxahoi">
                        <Facebook className='facebook' />
                        <YouTube className='youtube' />
                        <Twitter className='twiter' />
                        <Instagram className='instagram' />
                    </div>
                </div>
                <div className="Footer__duoi__giua">
                    <div className="Footer__duoi__theloai">
                        <h1>Thể loại sách</h1>
                        <div className="Footer__duoi__theloai__item">
                            <h1>Action</h1>
                            <h1>Advanture</h1>
                            <h1>Comedy</h1>
                            <h1>Crime</h1>
                            <h1>Drama</h1>
                            <h1>Fantasy</h1>
                            <h1>Horor</h1>
                            <h1>Law</h1>
                            <h1>TV Series</h1>
                            <h1>Romance</h1>
                        </div>
                    </div>
                </div>
                <div className="Footer__duoi__phai">
                    <h2>Cửa hàng của chúng tôi</h2>
                    <img src={"http://localhost:3000/cuahang.jpg"} alt="" />
                    <div className="Footer__duoi__diachi">
                        <LocationOn />
                        <h1>Học viện Công nghệ Bưu chính viễn thông</h1>
                    </div>
                    <div className="Footer__duoi__sdt">
                        <Phone />
                        <h1>+84 123456789</h1>
                    </div>
                    <div className="Footer__duoi__email">
                        <Email />
                        <h1>bookoe5chuhe@gmail.com</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer