import Rate from "./Rate";

function RateList({ ratedata }) {
    return (
        <ul>
            {ratedata.map((el) => <Rate ratedata={el} />)}
        </ul>
    );
}

export default RateList;
