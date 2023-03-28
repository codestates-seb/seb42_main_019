import { useState } from "react";
import Rate from "./Rate";

function RateList({ ratedata }) {
    const userId = localStorage.getItem('userId')
    const [pageNum, setPagenum] = useState(1);

    const rateGetData = async () => {
        const url = `/user/${userId}/comment?pageNumber=${pageNum}&size=20&sort=comment_id,desc`;
    }

    return (
        <ul>
            {ratedata.map((el) => <Rate ratedata={el} />)}
        </ul>
    );
}

export default RateList;
