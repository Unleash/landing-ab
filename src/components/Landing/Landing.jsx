/** @format */

import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Landing.module.css';

const Landing = ({ text, cta, tracker, imageUrl, variant, unleash }) => {
  const history = useHistory();

  const onClick = () => {
    unleash.sendCustomEvent('landing.ab');
    tracker.event({
      category: 'CTA',
      action: 'Navigated to explore page',
      label: variant,
    });
    history.push('/search');
  };

  const style = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    height: 'calc(100vh)',
    backgroundPosition: '50% 80%',
  };

  return (
    <div style={style}>
      <div className={styles.container}>
        <div className={styles.cta}>
          <h2>{text}</h2>
          <button onClick={onClick} className={styles.ctaBtn}>
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
