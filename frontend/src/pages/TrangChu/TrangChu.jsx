import './TrangChu.scss'
import ThanhMenu from '../../components/ThanhMenu/ThanhMenu'
import GioiThieu from '../../components/GioiThieu/GioiThieu'
import DacBiet from '../../components/DacBiet/DacBiet'
import NhieuNguoiMua from '../../components/NhieuNguoiMua/NhieuNguoiMua'
import SachMoi from '../../components/SachMoi/SachMoi'
import Footer from '../../components/Footer/Footer'
const TrangChu = () => {
    return (
        <div className="TrangChu">
            <ThanhMenu />
            <GioiThieu />
            {/* <DacBiet />
            <NhieuNguoiMua />
            <SachMoi /> */}
            <Footer />
        </div>
    )
}

export default TrangChu