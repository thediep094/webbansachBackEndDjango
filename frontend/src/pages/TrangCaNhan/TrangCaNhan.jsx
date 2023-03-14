import './TrangCaNhan.scss'
import ThanhMenu from '../../components/ThanhMenu/ThanhMenu'
import Footer from '../../components/Footer/Footer'
import TrangCaNhanChiTiet from '../../components/TrangCaNhanChiTiet/TrangCaNhanChiTiet'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiUrl } from '../../giaTriMacDinh'
const TrangCaNhan = () => {
    const user = useSelector(state => state.user)
    const [lichSuMua, setLichSuMua] = useState([])
    useEffect(() => {
        if (user.user) {
            const lichSu = async () => {
                const res = await axios.get(`${apiUrl}api/lichsus`, {
                    headers: {
                        token: `Bearer ${user.user.accessToken}`
                    }
                })
                res.data.data.sach.forEach(async item => {
                    const res1 = await axios.get(`${apiUrl}api/sachs/${item.sachId}`)
                    res1.data.data.soLuong = item.soLuong
                    const date = item.date.split('T')[0].split('-')
                    res1.data.data.ngayMua = `${date[2]}/${date[1]}/${date[0]}`
                    setLichSuMua(lichSuMua => [...lichSuMua, res1.data.data])
                }
                )
            }
            lichSu()
        }
    }, [user])
    return (
        <div className="TrangCaNhan">
            <ThanhMenu />
            <TrangCaNhanChiTiet lichSuMua={lichSuMua} />
            <Footer />
        </div>
    )
}

export default TrangCaNhan