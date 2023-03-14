import './TheLoai.scss'
import ThanhMenu from '../../components/ThanhMenu/ThanhMenu'
import { TheLoaiSach } from '../../components/TheLoaiSach/TheLoaiSach'
import Footer from '../../components/Footer/Footer'
const TheLoai = () => {
    return (
        <div className="TheLoai">
            <ThanhMenu />
            <TheLoaiSach />
            <Footer />
        </div>
    )
}

export default TheLoai