import React from 'react';
import App from '../components/App';
// Child routes
import callback from './callback';
import dashboard from './dashboard';
import landing from './landing';
import upload from './dashboardPages/upload';
import prediction from './dashboardPages/prediction';
import about from './dashboardPages/about';
import chartHistory from './dashboardPages/chartHistory';
import error from './error';

import Header from '../components/Header';

export default [

  {
    path: '/landing',
    children: [
      landing,
    ],
    async action({ next, render, context }) {
      const component = await next();
      if (component === undefined) return component;
      return render(
        <App context={context}>{component}</App>
      );
    },
  },
  {
    path: '/callback',
    children: [
      callback,
    ],
    async action({ next, render, context }) {
      const component = await next();
      if (component === undefined) return component;
      return render(
        <App context={context}>{component}</App>
      );
    },
  },
  {
    path: '/',

  // keep in mind, routes are evaluated in order
    children: [
      dashboard,
      upload,
      prediction,
      about,
      chartHistory,
      // place new routes before...
      error,
    ],

    async action({ next, render, context }) {
      // console.log('inside dashboard');
      const component = await next();
      // console.log('inside dasdboard component', component);
      if (component === undefined) return component;
      return render(
        <div>
          <Header />
          <div id="page-wrapper" className="page-wrapper">
            <App context={context}>{component}</App>
          </div>
        </div>
      );
    },
  },
  {
    path: '/error',
    children: [
      error,
    ],
    async action({ next, render, context }) {
      // console.log('inside error');
      const component = await next();
      // console.log('inside error with component', component);
      if (component === undefined) return component;
      return render(
        <App context={context}>{component}</App>
      );
    },
  },
];
