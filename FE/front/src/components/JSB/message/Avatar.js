import style from './Avatar.module.css'

function Avatar() {
    const avatarUrl = "https://i.pravatar.cc/300";
    return <img className={style.profileMessage} src={avatarUrl} alt="Avatar" />;
}

export default Avatar;