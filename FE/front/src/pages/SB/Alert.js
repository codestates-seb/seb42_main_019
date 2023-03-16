import style from './Alert.module.css'
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav'
import MapAlert from '../../components/JSB/Alert/MapAlert';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';


const Alert = ()=>{
    const cx = classNames.bind(style);

    return(
        <>
        <Header2>알림</Header2>
        <div className={cx('alertBox')}>
        <Link to={'/mypage/messagebox'}><MapAlert /></Link>
        </div>
        <Nav />
        </>
    )
}

export default Alert;