import React, { PropTypes } from 'react';
import { PageHeader } from 'react-bootstrap';

const title = 'Upload Data';

function displayUpload(props, context) {
  context.setTitle(title);
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader>Upload Data</PageHeader>
        </div>
      </div>
      <div>
        <form>
          <h1>File Upload</h1>
          <input type="file" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}


displayUpload.contextTypes = { setTitle: PropTypes.func.isRequired };
export default displayUpload;
