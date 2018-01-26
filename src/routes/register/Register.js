
import React, { PropTypes, Component } from 'react';
// import { Panel, Input, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import { firebaseApp } from '../../components/firebase';
// import history from '../../core/history';
import Background from '../login/loginBackground.jpg';

const sectionStyle = {
  width: '100%',
  height: '900px',
  backgroundImage: `url(${Background})`,
};

const title = 'Register';

class Register extends Component {
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

  submitHandler() {
    // e.preventDefault();
    // history.push('/');
    console.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log('error', error);
      this.setState({ error });
    });
  }
  render() {
    return (
      <section style={sectionStyle}>
        <div className="col-md-4 col-md-offset-4">
          <div className="text-center">
            <h1 className="login-brand-text">Tidal Wave Prediction Online Tool</h1>
          </div>
          <Panel header={<h3>Please Register</h3>} className="registration-panel">
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
                Register</Button>
              </div>
            </form>
            <div>{this.state.error.message}</div>
          </Panel>
        </div>
      </section>
    );
  }
 }

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
