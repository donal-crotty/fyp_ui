import React, { PropTypes } from 'react';
import { PageHeader } from 'react-bootstrap';

const title = 'Predictions';

function displayPrediction(props, context) {
  context.setTitle(title);
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader>Chart Prediction Data</PageHeader>
        </div>
      </div>
    </div>
  );
}


displayPrediction.contextTypes = { setTitle: PropTypes.func.isRequired };
export default displayPrediction;
