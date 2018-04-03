// import auth0 from 'auth0-js';
// import history from '../history';

// export default class Auth {
//   constructor() {
//     this.login = this.login.bind(this);
//     this.logout = this.logout.bind(this);
//     this.handleAuthentication = this.handleAuthentication.bind(this);
//     this.isAuthenticated = this.isAuthenticated.bind(this);
//   }

//   auth0 = new auth0.WebAuth({
//     domain: 'tidalwavepredapp.eu.auth0.com',
//     clientID: 'abQnWKuW5lXywY12zyvqG0iq52ChKeNX',
//     redirectUri: 'http://localhost:3000/callback',
//     audience: 'https://tidalwavepredapp.eu.auth0.com/userinfo',
//     responseType: 'token id_token',
//     scope: 'openid',
//   });

// // looks for the result of authentication in the URL hash.
// // Then, the result is processed with the parseHash method from auth0.js
//   handleAuthentication() {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult);
//         history.replace('/');
//       } else if (err) {
//         history.replace('/');
//         console.log(err);
//       }
//     });
//   }

//   //  sets the user's Access Token, ID Token, and the Access Token's expiry time
//   setSession(authResult) {
//     // Set the time that the Access Token will expire at
//     const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('id_token', authResult.idToken);
//     localStorage.setItem('expires_at', expiresAt);
//     // navigate to the home route
//     history.replace('/');
//   }

//   login() {
//     this.auth0.authorize();
//   }
//   // removes the user's tokens and expiry time from browser storage
//   logout() {
//     // Clear Access Token and ID Token from local storage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('expires_at');
//     // navigate to the home route
//     history.replace('/');
//   }

//   isAuthenticated() {
//     // Check whether the current time is past the
//     // Access Token's expiry time
//     const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//     return new Date().getTime() < expiresAt;
//   }

// }
