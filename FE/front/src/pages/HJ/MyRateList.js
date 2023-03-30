import { useEffect, useState } from "react";
import api from "../../api/api";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import Rate from "../../components/KHJ/Rate";

function MyRate() {
    const userId = localStorage.getItem('userId')
    const [pageNum, setPagenum] = useState(1);
    const [ratedata, setRatedata] = useState([])
    const getRate = async () => {
        try{
            const url = `/user/${userId}/comment?page=${pageNum}&size=20&sort=comment_id,desc`
            const response = await api({
                method:'get',
                url
            })
            console.log(response);
            console.log(response.data);
            console.log(response.data.data);
            setRatedata(response.data.data);
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getRate();
    }, [])
    const nodata = () => {
        if(ratedata.length === 0 ) return true;
        return false;
    }
    return (
        <>
            <Header2>내게 남긴 후기</Header2>
            <main>
            {nodata() ?
                <p style={{textAlign:'center', lineHeight:'200px'}}>후기가 없습니다.</p>
                :
                <ul>
                    {ratedata.map((el) => (<Rate ratedata={el} />))}
                </ul>
            }
            </main>
            <Nav />
        </>
    );

}

export default MyRate;
