import React, { PropTypes, Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import Panel from 'react-bootstrap/lib/Panel';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { login, logout, isLoggedIn } from '../../utils/AuthService';
import s from './Landing.css';
// import history from '../../core/history';

import Background from '../landing/loginBackground.jpg';

const sectionStyle = {
  width: '100%',
  height: '900px',
  backgroundImage: `url(${Background})`,
};

const title = 'Landing';

class Landing extends Component {
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
    console.log('Email:', email);
    console.log('Password:', password);
  }
  render() {
    return (
      <section style={sectionStyle}>
        <div className="col-md-4 col-md-offset-4" >
          <div className="text-center">
            <h1 className="login-brand-text">Tidal Wave Prediction Online Tool</h1>
          </div>
          <Panel header={<h3>Please Login</h3>} className="registration-panel">
            {
            (isLoggedIn()) ? (
              <div>
                <Breadcrumb>You are already logged in, please logout or return to
                 <a href="" onClick={(e) => { e.preventDefault(); history.push('/contact'); }} >
                 dashboard</a>
                </Breadcrumb>
                <button className="btn btn-danger log" onClick={() => logout()} >Log out </button>
              </div>
            ) :
             (
               <div>
                 <Breadcrumb>Successfully Logged out!</Breadcrumb>
                 <button className="btn btn-info log" onClick={() => login()}>Log In</button>
               </div>)
          }
          </Panel>
        </div>
      </section>
    );
  }
 }

Landing.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Landing);
