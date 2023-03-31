import styles from './Pagenation.module.css'

function Pagenation() {
    return (
        <div className={styles.pagenation_nav}>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <span>...</span>
            <button>6</button>
        </div>
    );
}

export default Pagenation;