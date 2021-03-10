import React from "react";

import Logo from "../Logo/Logo";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Logo />

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
