import * as firebase from 'firebase';

export const config = {
  apiKey: 'AIzaSyBKGga_JrNyty7uN8B-df9eQekcMVYXln0',
  authDomain: 'tidal-wave-prediction-app.firebaseapp.com',
  databaseURL: 'https://tidal-wave-prediction-app.firebaseio.com',
  projectId: 'tidal-wave-prediction-app',
  storageBucket: 'tidal-wave-prediction-app.appspot.com',
  messagingSenderId: '300292188726',
};

export const firebaseApp = firebase.initializeApp(config);
