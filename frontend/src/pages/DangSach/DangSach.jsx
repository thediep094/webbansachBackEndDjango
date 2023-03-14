import './DangSach.scss'
import ThanhMenu from '../../components/ThanhMenu/ThanhMenu'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import { apiUrl } from '../../giaTriMacDinh'
import { useSelector } from 'react-redux'
import axios from 'axios'
const DangSach = () => {

    const [img, setImg] = useState(null)
    const user = useSelector(state => state.user)
    useEffect(() => {
        if (!user.user.data.isAdmin) {
            alert('Bạn không có quyền truy cập trang này')
            window.location.href = '/'
        }
    })
    const [sachMoi, setSachMoi] = useState({
        tenSach: '',
        tacGia: '',
        namXuatBan: '',
        gia: '',
        luotMua: 0,
        mieuTa: '',
        theLoai: ''
    })


    const doiThongTin = (e) => {
        if (e.target.name !== 'File') {
            setSachMoi({
                ...sachMoi,
                [e.target.name]: e.target.value
            })
        }
        else {
            setImg(e.target.files[0])
        }
    }

    const dangSach = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('tenSach', sachMoi.tenSach)
        formData.append('tacGia', sachMoi.tacGia)
        formData.append('namXuatBan', sachMoi.namXuatBan)
        formData.append('gia', sachMoi.gia)
        formData.append('luotMua', sachMoi.luotMua)
        formData.append('mieuTa', sachMoi.mieuTa)
        formData.append('theLoai', sachMoi.theLoai)
        formData.append('imgUrl', img)
        try {
            const res = await axios.post(`${apiUrl}api/sachs/dangmoi`, formData, {
                headers: {
                    token: `Bearer ${user.user.accessToken}`
                }
            })
            alert('Đăng sách thành công')
        }
        catch (err) {
            alert(err.response.data.message)
        }
    }
    return (
        <div className="DangSach">
            <ThanhMenu />
            <div className="DangSach__container">
                <h1>Đăng sách mới dành cho Admin</h1>
                <div className="DangSach__container__form">
                    <form onSubmit={dangSach}>
                        <div className="DangSach__container__form__phannho">
                            <h2>Chọn ảnh:</h2>
                            <input type="file" style={{
                                border: 'none',
                                height: '100%',
                            }} name="File" onChange={doiThongTin} />
                        </div>
                        <div className="DangSach__container__form__phannho">
                            <h2>Tên sách:</h2>
                            <input type="text" name='tenSach' onChange={doiThongTin} />
                        </div>
                        <div className="DangSach__container__form__phannho">
                            <h2>Tác giả:</h2>
                            <input type="text" name='tacGia' onChange={doiThongTin} />
                        </div>
                        <div className="DangSach__container__form__phannho">
                            <h2>Giá:</h2>
                            <input type="text" name='gia' onChange={doiThongTin} />
                        </div>
                        <div className="DangSach__container__form__phannho">
                            <h2>Năm xuất bản:</h2>
                            <input type="text" name='namXuatBan' onChange={doiThongTin} />
                        </div>
                        <div className="DangSach__container__form__phannho">
                            <h2>Miêu tả:</h2>
                            <input type="text" name='mieuTa' onChange={doiThongTin} />
                        </div>
                        <div className="DangSach__container__form__phannho">
                            <h2>Thể loại:</h2>
                            <input type="text" name='theLoai' onChange={doiThongTin} />
                        </div>
                        <button className="DangSach__container__form__button">Đăng Sách</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default DangSach