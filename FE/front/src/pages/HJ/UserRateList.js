import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import RateList from '../../components/KHJ/RataList'

function UserRate() {
    const params = useParams()
    const userId = params.userid
    const [ratedata, setRatedata] = useState([])
    const getRate = async () => {
        try{
            const url = `/user/${userId}/comment?page={pageNum}&size={sizeNum}&sort=comment_id,desc`
            const response = await api({
                method:'get',
                url
            })
            console.log(response);
            setRatedata(response.data);
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getRate();
    }, [])

    return (
        <>
            <Header2>이 유저에게 남긴 후기</Header2>
            <main>
                {ratedata.length === 0 ?
                    <p style={{textAlign:'center', lineHeight:'200px'}}>후기가 없습니다.</p>
                    :
                    <RateList ratedata={ratedata}/>
                }
            </main>
            <Nav />
        </>
    );
}

export default UserRate;
