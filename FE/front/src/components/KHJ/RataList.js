import Rate from "./Rate";
import ratedata from "../../dummyData/ratedata";

function RateList() {
    return (
        <ul>
            {ratedata.map((el) => <Rate ratedata={el} />)}
        </ul>
    );
}

export default RateList;
