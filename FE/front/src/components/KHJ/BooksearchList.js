import BSlist from "../JSB/BookShelf/BSlist";

function booksearchList() {
    return (
        <>
            <h2 className="font16 p20">이 책을 다 읽은 사람들</h2>
            <BSlist />
            <BSlist />
            <BSlist />
            <BSlist />
        </>
    );
}

export default booksearchList;