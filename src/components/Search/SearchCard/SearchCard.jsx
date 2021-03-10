import styles from "../Search.module.css";

const SearchCard = ({ imageUrl, title, description }) => {
  const style = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    height: "200px",
    width: "100%",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
  };

  return (
    <div className={styles.card}>
      <div style={style} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
};

export default SearchCard;
