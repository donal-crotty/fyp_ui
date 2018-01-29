import React, { PropTypes, Component } from 'react';
// import browserHistory from 'react-router';
// import { Panel, Input, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

const title = 'Contact';

class Contact extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: '',
      },
    };
    context.setTitle(title);
  }
  render() {
    return (
      <section >
        <div className="col-md-4 col-md-offset-4" >
          <div className="text-center">
            <h1 className="login-brand-text">Contact Us</h1>
          </div>
          <Panel header={<h3>Please Login</h3>} className="registration-panel">
            <form role="form">
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="email"
                  name="email"
                  onChange={event => this.setState({ email: event.target.value })}
                />
              </div>
              <div>
                <input
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={event => this.setState({ password: event.target.value })}
                />
              </div>
              <div>
                <Button
                  type="button"
                  bsSize="large"
                  bsStyle="success"
                  onClick={() => this.submitHandler()}
                >
                Login</Button>
              </div>
            </form>
            <div>{this.state.error.message}</div>
          </Panel>
        </div>
      </section>
    );
  }
 }

Contact.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Contact;
