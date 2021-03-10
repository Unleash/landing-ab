import { useEffect } from "react";
import Logo from "../Logo/Logo";

import styles from "./Search.module.css";

import data from "../../data/data";
import SearchCard from "./SearchCard/SearchCard";

const Search = ({ tracker }) => {
  useEffect(() => {
    tracker.pageview(window.location);
  }, [tracker]);

  const renderCards = () => {
    return data.map((activity) => (
      <SearchCard
        key={activity.id}
        imageUrl={activity.url}
        title={activity.name}
        description={activity.description}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Logo color='#fff' justifyContent='center' />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <input className={styles.searchInput} placeholder='Search' />
        </div>
        <div className={styles.cardContainer}>{renderCards()}</div>
      </div>
    </div>
  );
};

export default Search;
