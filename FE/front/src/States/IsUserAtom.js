import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "./atom";

const isUserId = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const setIsUserAtom = useSetRecoilState(isUserAtom);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const isUser = localStorage.getItem('userId');
        if(isUser) setIsUserAtom(isUser);
    }, [])

    return setIsUserAtom;
}

export default isUserId;