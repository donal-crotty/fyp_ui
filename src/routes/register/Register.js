
import React, { PropTypes, Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { auth } from 'firebase';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import history from '../../core/history';
import Background from '../login/loginBackground.jpg';
// import { auth } from '../../firebase';

const sectionStyle = {
  width: '100%',
  height: '900px',
  backgroundImage: `url(${Background})`,
};

const title = 'Register';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
// the key value is used as dynamic key to allocate the actual value in the local state object.
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Register extends Component {
  constructor(props, context) {
    super(props);
    this.state = { ...INITIAL_STATE };
    context.setTitle(title);
  }
  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    auth().createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // success: set state of fields to INITIAL_STATE (clear fields)
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        // failure: show error in form
        this.setState(byPropKey('error', error));
      });
    // prevent browser reload
    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    // validate fields for same passwords, empty fields etc.
    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';
    return (
      <section style={sectionStyle}>
        <div className="col-md-4 col-md-offset-4">
          <div className="text-center">
            <h1 className="login-brand-text">Tidal Wave Prediction Online Tool</h1>
          </div>
          <Panel header={<h3>Please Register</h3>} className="registration-panel">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={username}
                  onChange={event => this.setState(byPropKey('username', event.target.value))}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="text"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={passwordTwo}
                  onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group">
                <Button
                  type="button"
                  disabled={isInvalid}
                  bsSize="sm"
                  bsStyle="success"
                  type="submit"
                >
                  Sign Up
                </Button>
              </div>
              { error && <p>{error.message}</p> }
            </form>
          </Panel>
        </div>
      </section>
    );
  }
 }

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
