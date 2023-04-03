import styles from './Pagenation.module.css'

function Pagenation({pageCounts, setPageCount, totalPage}) {

    const pageCount = Number(pageCounts)

    function getPageNumber(){
        if(pageCount === 1 || pageCount === 2){
            return (
                <>
                    <button onClick={(e) => {pageClick(e)}} data-page={1}>1</button>
                    <button onClick={(e) => {pageClick(e)}} data-page={2}>2</button>
                    <button onClick={(e) => {pageClick(e)}} data-page={3}>3</button>
                    <button onClick={(e) => {pageClick(e)}} data-page={4}>4</button>
                    <button onClick={(e) => {pageClick(e)}} data-page={5}>5</button>
                </>
            )
        }
        
        if(pageCount<totalPage-1){
            return(
                <>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount-2}>{pageCount-2}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount-1}>{pageCount-1}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount}>{pageCount}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount+1}>{pageCount+1}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount+2}>{pageCount+2}</button>
            </>
            )
        }

        if(pageCount===totalPage){
            return(
                <>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount-4}>{pageCount-4}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount-3}>{pageCount-3}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount-2}>{pageCount-2}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount+1}>{pageCount-1}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount}>{pageCount}</button>
            </>
            )
        }

        if(pageCount===totalPage-1){
            return(
                <>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount-3}>{pageCount-3}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount-2}>{pageCount-2}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount-1}>{pageCount-1}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount}>{pageCount}</button>
                <button onClick={(e) => {pageClick(e)}} data-page={pageCount+1}>{pageCount+1}</button>
            </>
            )
        }
    }



    console.log("pageCount", pageCount)

    function pageClick(e){
        if(pageCount<totalPage){
            setPageCount(e.target.dataset.page)
        }
    }

    return (
        <div className={styles.pagenation_nav}>
            {getPageNumber()}
            <span>...</span>
            <button onClick={(e)=>{pageClick(e)}} data-page={totalPage}>{totalPage}</button>
        </div>
    );
}

export default Pagenation;
