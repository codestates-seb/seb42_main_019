import Header2 from "../../components/common/Header2";
import Nav from '../../components/common/Nav';
import RateList from "../../components/KHJ/RataList";
import ratedata from "../../dummyData/ratedata";

function MyRate() {
    return (
        <>
            <Header2>내게 남긴 후기</Header2>
            <main>
                <RateList ratedata={ratedata}/>
            </main>
            <Nav />
        </>
    );
}

export default MyRate;
