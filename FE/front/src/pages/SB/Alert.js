import style from './Alert.module.css'
import Header2 from "../../components/common/Header2";
import AlertList from '../../components/JSB/Alert/AlertList'
import AlertListMS from '../../components/JSB/Alert/AlertListMS'
import Nav from '../../components/common/Nav'


const Alert = ()=>{
    return(
        <>
        <Header2>알림</Header2>
        <div className={style.alertBox}>
        <AlertList />
        <AlertList />
        <AlertListMS />
        <AlertListMS />
        </div>
        <Nav />
        </>
    )
}

export default Alert;