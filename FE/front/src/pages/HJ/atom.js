import { atom } from 'recoil'

const bookSearchList = atom({
    key: 'bookSearchLis',
    default : []
});

export default bookSearchList;