import './GioHang.scss'
import ThanhMenu from '../../components/ThanhMenu/ThanhMenu'
import Footer from '../../components/Footer/Footer'
import GioHangChiTiet from '../../components/GioHangChiTiet/GioHangChiTiet'
import { useLocation } from 'react-router-dom'
const GioHang = () => {
    const location = useLocation()
    const gioHangData = location.state.gioHangSanPham
    return (
        <div className="GioHang">
            <ThanhMenu />
            <GioHangChiTiet gioHangData={gioHangData} />
            <Footer />
        </div>
    )
}

export default GioHang