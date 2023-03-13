import React from "react";
import styles from "../common/Body.module.css";

const Main = ({ children }) => {
	return <div className={styles.Contents}>{children}</div>;
};

export default Main;
