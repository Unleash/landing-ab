import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";

import tentImage from "./img/pexels-josh-hild-2422265.jpg";
import northernLights from "./img/northernlights.jpg";
import mountains from "./img/mountains.jpg";

function App({ unleash }) {
  const [toggle, setToggle] = useState({});

  useEffect(() => {
    unleash.on("update", () => getToggle());
  }, []);

  const getToggle = () => {
    const enabled = unleash.getVariant("travel.landing").enabled;
    const name = unleash.getVariant("travel.landing").name;
    console.log("UPDATING TOGGLE");
    console.log("NAME", name);
    console.log("ENABLED", enabled);

    setToggle({ enabled, name });
  };

  let landing;
  if (toggle.name === "tent") {
    landing = (
      <Landing
        text='Explore fantastic nature all over Norway today.'
        cta='Find your experience'
        variant='variantA'
        imageUrl={tentImage}
      />
    );
  } else if (toggle.name === "northern-lights") {
    landing = (
      <Landing
        text='Norway is amazing. Find your experience today!'
        cta='Find adventure'
        variant='variantB'
        imageUrl={northernLights}
      />
    );
  } else {
    landing = (
      <Landing
        text='Amazing nature.'
        cta='Explore'
        variant='default'
        imageUrl={mountains}
      />
    );
  }

  return (
    <div className='App'>
      <Header />
      {landing}
    </div>
  );
}

export default App;
