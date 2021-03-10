import { useEffect } from "react";

const Search = ({ tracker }) => {
  useEffect(() => {
    tracker.pageview(window.location);
  }, [tracker]);

  return <div>Searchpage</div>;
};

export default Search;
