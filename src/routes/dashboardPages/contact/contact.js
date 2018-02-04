import React, { PropTypes, Component } from 'react';
// import browserHistory from 'react-router';
// import { Panel, Input, Button } from 'react-bootstrap';
// import Button from 'react-bootstrap/lib/Button';
import { Button, Breadcrumb } from 'react-bootstrap';

const title = 'Contact';

class Contact extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      subject: '',
      email: '',
      query: '',
      error: {
        message: '',
      },
    };
    context.setTitle(title);
  }

  getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  //   return null;
  }

  // handleChange(e) {
  //   this.setState({ value: e.target.value });
  // }

  render() {
    return (
      <section >
        <div className="col-md-4 col-md-offset-4" >
          <div>
            <h1 className="login-brand-text">Contact Us</h1>
          </div>
          <Breadcrumb>Contact the Support Desk for help or to report a bug.</Breadcrumb>
          <form role="form">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Query Subject"
                name="title"
                onChange={event => this.setState({ subject: event.target.value })}
              />
              <br />
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                name="email"
                onChange={event => this.setState({ email: event.target.value })}
              />
              <br />
              <input
                className="form-control"
                placeholder="Query"
                type="textarea"
                name="query"
                onChange={event => this.setState({ query: event.target.value })}
              />
              <br />
              <Button
                type="button"
                bsSize="large"
                bsStyle="success"
                onClick={() => this.submitHandler()}
              >
              Submit</Button>
            </div>
          </form>
          <div>{this.state.error.message}</div>
        </div>
      </section>
    );
  }
 }

Contact.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Contact;
