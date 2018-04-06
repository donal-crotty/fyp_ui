 import React, { Component } from 'react';
 import loading from './loading.svg';
 import { setIdToken, setAccessToken } from '../../utils/AuthService';

 const style = {
   position: 'fixed',
   top: '50%',
   left: '50%',
   marginTop: '-50px',
   marginLeft: '-100px',
 };
 class Callback extends Component {
   componentDidMount() {
     setAccessToken();
     setIdToken();
     window.location.href = '/';
   }

   render() {
     return (
       <div>
         <img style={style} src={loading} alt="loading" />
       </div>
     );
   }
}

 export default Callback;
