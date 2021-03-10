import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

import { ReactComponent as LogoSVG } from "../../img/route.svg";

const Logo = ({ color, justifyContent }) => (
  <Link
    to='/'
    className={styles.logoContainer}
    style={{ color, justifyContent }}
  >
    <LogoSVG className={styles.logo} style={{ fill: color }} />
    <h1>Travel Norway</h1>
  </Link>
);

export default Logo;
