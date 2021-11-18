/** @format */

import React, { useEffect, useState, useCallback } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter, Route } from 'react-router-dom';
import { UnleashClient, PlausibleProvider } from 'unleash-proxy-client';
import Plausible from 'plausible-tracker'

import './App.css';

import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Search from './components/Search/Search';

import tentImage from './img/pexels-josh-hild-2422265.jpg';
import northernLights from './img/northernlights.jpg';
import mountains from './img/mountains.jpg';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING);

const callback = (event) => {
  ReactGA.event({
    category: 'Viewed page',
    action: 'Viewed the landing page',
    label: event.featureName,
    variant: event.variant,
  });
};

const plausible = Plausible({
  domain: 'getunleash.io',
  trackLocalhost: true
})

const plausibleProvider = new PlausibleProvider(plausible);

const unleash = new UnleashClient({
  url: process.env.REACT_APP_PROXY_URL,
  clientKey: process.env.REACT_APP_CLIENT_KEY,
  refreshInterval: 2,
  appName: 'landing-example',
  environment: 'production',
  callbacks: [plausibleProvider.sendEvent],
});

let userId = localStorage.getItem('userId');

if (!userId) {
  userId = Math.round(Math.random() * 100000000);
  localStorage.setItem('userId', userId);
}

unleash.updateContext({ userId });
unleash.start();

function App() {
  const [toggle, setToggle] = useState({
    enabled: true,
    name: 'default',
    ready: false,
  });

  const getToggle = useCallback(() => {
    const enabled = unleash.getVariant('travel.landing').enabled;
    const name = unleash.getVariant('travel.landing').name;

    setToggle({ enabled, name, ready: true });
  }, []);

  useEffect(() => {
    unleash.on('update', () => getToggle());
  }, [getToggle, userId]);

  // useEffect(() => {
  //   if (toggle.ready) {
  //     ReactGA.event({
  //       category: 'Viewed page',
  //       action: 'Viewed the landing page',
  //       label: toggle.name,
  //     });
  //   }
  // }, [toggle.ready, toggle.name]);

  // useEffect(() => {
  //   ReactGA.set({
  //     dimension1: `travel.landing - ${toggle.variant}`,
  //   });
  //   ReactGA.pageview(window.location);
  // }, [toggle.variant, toggle.toggleName]);

  if (!toggle.ready) return null;

  let landing;
  if (toggle.name === 'tent') {
    landing = (
      <Landing
        text='Explore fantastic nature all over Norway today.'
        cta='Find your experience'
        variant={toggle.name}
        imageUrl={tentImage}
        tracker={ReactGA}
        unleash={unleash}
      />
    );
  } else if (toggle.name === 'northern-lights') {
    landing = (
      <Landing
        text='Norway is amazing. Find your experience today!'
        cta='Find adventure'
        variant={toggle.name}
        imageUrl={northernLights}
        tracker={ReactGA}
        unleash={unleash}
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
        unleash={unleash}
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
              {landing}{' '}
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
