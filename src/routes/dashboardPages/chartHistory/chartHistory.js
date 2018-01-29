import React, { PropTypes } from 'react';
import {
  Panel, PageHeader, ListGroup, ListGroupItem, Breadcrumb } from 'react-bootstrap';

const title = 'Chart History';

function displayChartHistory(props, context) {
  context.setTitle(title);
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader>Prediction Chart History</PageHeader>
          <Breadcrumb>
            View some of your previously visualized Tidal Wave Height Predictions.
          </Breadcrumb>
          <Panel
            header={<span>
              <i className="fa fa-bar-chart fa-fw" />
            </span>}
          >
            <ListGroup>
              <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                <div>
                  <p><strong>Prediction Chart 1</strong></p>
                </div>
                <div>
                  <p><span className="text-muted">
                  Galway Bay, 09-11-16</span> </p>
                </div>
                <span className="pull-right text-muted small"><em>43 minutes ago</em></span>
              </ListGroupItem>
              <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                <div>
                  <p><strong>Prediction Chart 2</strong></p>
                </div>
                <div>
                  <p><span className="text-muted">
                  Kinsale Harbour, 12-11-16</span></p>
                </div>
                <span className="pull-right text-muted small"><em>11:32 AM</em></span>
              </ListGroupItem>
              <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                <div>
                  <p><strong>Prediction Chart 3</strong></p>
                </div>
                <div>
                  <p><span className="text-muted">
                  Kinsale Harbour, 12-11-16</span></p>
                </div>
                <span className="pull-right text-muted small"><em>11:13 AM</em></span>
              </ListGroupItem>
              <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                <div>
                  <p><strong>Prediction Chart 4</strong></p>
                </div>
                <div>
                  <p><span className="text-muted">
                  Killybegs, 01-12-16</span></p>
                </div>
                <span className="pull-right text-muted small"><em>10:57 AM</em></span>
              </ListGroupItem>
              <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                <div>
                  <p><strong>Prediction Chart 5</strong></p>
                </div>
                <div>
                  <p><span className="text-muted">
                  Killybegs, 01-12-16</span></p>
                </div>
                <span className="pull-right text-muted small"><em>10:57 AM</em></span>
              </ListGroupItem>
              <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                <div>
                  <p><strong>Prediction Chart 6</strong></p>
                </div>
                <div>
                  <p><span className="text-muted">
                  Killybegs, 01-12-16</span></p>
                </div>
                <span className="pull-right text-muted small"><em>10:57 AM</em></span>
              </ListGroupItem>
            </ListGroup>
          </Panel>
        </div>
      </div>
    </div>
  );
}


displayChartHistory.contextTypes = { setTitle: PropTypes.func.isRequired };
export default displayChartHistory;
