import React, { useEffect, useState, useCallback } from "react";
import ReactGA from "react-ga";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import Search from "./components/Search/Search";

import tentImage from "./img/pexels-josh-hild-2422265.jpg";
import northernLights from "./img/northernlights.jpg";
import mountains from "./img/mountains.jpg";

function App({ unleash, userId }) {
  const [toggle, setToggle] = useState({ enabled: true, name: "default" });

  const getToggle = useCallback(() => {
    const enabled = unleash.getVariant("travel.landing").enabled;
    const name = unleash.getVariant("travel.landing").name;

    setToggle({ enabled, name });
  }, [unleash]);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING, {
      gaOptions: {
        userId: userId,
      },
    });

    unleash.on("update", () => getToggle());
  }, [unleash, getToggle, userId]);

  useEffect(() => {
    ReactGA.set({ variant: toggle.name });
    ReactGA.pageview(window.location);
  }, [toggle.name]);

  let landing;
  if (toggle.name === "tent") {
    landing = (
      <Landing
        text='Explore fantastic nature all over Norway today.'
        cta='Find your experience'
        variant={toggle.name}
        imageUrl={tentImage}
        tracker={ReactGA}
      />
    );
  } else if (toggle.name === "northern-lights") {
    landing = (
      <Landing
        text='Norway is amazing. Find your experience today!'
        cta='Find adventure'
        variant={toggle.name}
        imageUrl={northernLights}
        tracker={ReactGA}
      />
    );
  } else {
    landing = (
      <Landing
        text='Amazing nature.'
        cta='Explore'
        variant={toggle.name}
        imageUrl={mountains}
        tracker={ReactGA}
      />
    );
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Route
          exact
          path='/'
          render={() => (
            <>
              <Header />
              {landing}{" "}
            </>
          )}
        />
        <Route
          path='/search'
          render={() => <Search tracker={ReactGA} />}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
