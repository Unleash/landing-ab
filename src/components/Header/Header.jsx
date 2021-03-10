import React from "react";

import styles from "./Header.module.css";

import { ReactComponent as LogoSVG } from "../../img/route.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <LogoSVG className={styles.logo} />
          <h1>Travel Norway</h1>
        </div>

        <div className={styles.menu}>
          <ul>
            <li>Sign in</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
