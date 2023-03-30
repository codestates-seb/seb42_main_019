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
    const [pageNum, setPageNum] = useState(1)
    const getRate = async () => {
        try{
            const url = `/user/${userId}/comment?pageNumber=${pageNum}&size=20&sort=comment_id,desc`
            const response = await api({
                method:'get',
                url
            })
            setRatedata(response.data.data);
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getRate();
    }, [])

    function isData() {
        if(ratedata.length === 0) return true;
        return false;
    }

    return (
        <>
            <Header2>이 유저에게 남긴 후기</Header2>
            <main>
                {isData() ?
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
