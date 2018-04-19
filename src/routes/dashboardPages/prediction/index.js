import React from 'react';
import Prediction from './prediction';
import Chart from '../../../components/Chart';

export default {
  path: '/prediction',

  action() {
    return (
      <div>
        <Prediction />
        <Chart />
      </div>

    );
  },

};
