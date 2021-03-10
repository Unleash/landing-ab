import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import { ReactComponent as LogoSVG } from "../../img/route.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to='/' className={styles.logoContainer}>
          <LogoSVG className={styles.logo} />
          <h1>Travel Norway</h1>
        </Link>

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
