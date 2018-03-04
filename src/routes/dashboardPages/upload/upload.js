import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import FontIcon from 'material-ui/FontIcon';
import { blue500 } from 'material-ui/styles/colors';
import { PageHeader, Panel } from 'react-bootstrap';

const request = require('superagent');

const apiBaseUrl = 'http://localhost:5000/api/tidalprediction/';
const style = {
  margin: 15,
};
const title = 'Upload';
class Upload extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      filesPreview: [],
      filesToBeSent: [],
      printcount: 10,
    };
    context.setTitle(title);
  }

  onDrop(acceptedFiles) {
    console.log('Accepted files: ', acceptedFiles[0].name);
    const filesToBeSent = this.state.filesToBeSent;
    if (filesToBeSent.length < this.state.printcount) {
      filesToBeSent.push(acceptedFiles);
      const filesPreview = [];
      Object.keys(filesToBeSent).forEach((key, i) => {
        filesPreview.push(<div>
          {filesToBeSent[i][0].name}
          <MuiThemeProvider>
            <a href=""><FontIcon
              className="material-icons customstyle"
              color={blue500}
              styles={{ top: 10 }}
            >clear</FontIcon></a>
          </MuiThemeProvider>
        </div>
          );
      });
      this.setState({ filesToBeSent, filesPreview });
    } else {
      alert('You have reached the limit of upload files at a time');
    }
  }

  handleClick(event) {
    console.log('handleClick: ', event);
    const self = this;
    console.log('self: ', self);
    if (this.state.filesToBeSent.length > 0) {
      const filesArray = this.state.filesToBeSent;
      const req = request.post(`${apiBaseUrl}fileupload`);
      Object.keys(filesArray).forEach((key, i) => {
        console.log('files', filesArray[i][0]);
        req.attach(filesArray[i][0].name, filesArray[i][0]);
        req.end((err, res) => {
          if (err) {
            console.log('error ocurred');
          }
          console.log('res', res);
          alert('File upload completed');
        });
      });
    } else {
      alert('Please upload some files first');
    }
  }

  render() {
    // Debug Components
    // console.log('Panel', Panel);
    // console.log('MuiThemeProvider', MuiThemeProvider);
    // console.log('PageHeader', PageHeader);
    // console.log('Dropzone', Dropzone);
    // console.log('RaisedButton', RaisedButton);
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Upload Data</PageHeader>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-8 col-sm-4">
            <Panel
              header={<span>
                <i className="fa fa-upload fa-fw" /> Drag
                      and drop your file here, or use the file browser:
                    </span>}
            >
              <div className="App col-lg-6 col-md-4 col-sm-2">
                <Dropzone onDrop={(files) => this.onDrop(files)}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
              </div>
              <div className="col-lg-6 col-md-4 col-sm-2">
                 Files to be printed are:
                  {this.state.filesPreview}
              </div>
              <MuiThemeProvider>
                <RaisedButton
                  label="Upload Files" style={style}
                  onClick={(event) => this.handleClick(event)}
                />
              </MuiThemeProvider>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

Upload.contextTypes = { setTitle: PropTypes.func.isRequired };
export default Upload;
