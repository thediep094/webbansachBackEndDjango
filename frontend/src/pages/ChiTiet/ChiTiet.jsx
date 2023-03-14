import './ChiTiet.scss'
import ThanhMenu from '../../components/ThanhMenu/ThanhMenu'
import Footer from '../../components/Footer/Footer'
import ChiTietSach from '../../components/ChiTietSach/ChiTietSach'
import { useLocation } from 'react-router-dom'
const ChiTiet = () => {
    const location = useLocation()
    return (
        <div className="ChiTiet">
            <ThanhMenu />
            <ChiTietSach id={location.pathname.split('/')[2]} />
            <Footer />
        </div>
    )
}

export default ChiTiet