import React, { PropTypes } from 'react';
import { PageHeader } from 'react-bootstrap';

const title = 'About';

function displayBlank(props, context) {
  context.setTitle(title);
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader>About</PageHeader>
          <p>Tidal Wave Prediction Online Tool &copy; 2017,2018, All rights reserved.</p>
          <p><b>Beta version 1.0</b></p>
          <p>Designed and coded by Donal Crotty, Software Design 4,
           Athlone Institute of Technology</p>
          <p>Data provided by <b>Oceanographic Services, Marine Institute</b></p>
        </div>
      </div>
    </div>
  );
}


displayBlank.contextTypes = { setTitle: PropTypes.func.isRequired };
export default displayBlank;
