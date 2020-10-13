import React from 'react';
import {Link} from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/images/Untitled-2.svg';
import pageHomeImage from '../../assets/images/page-home-image.png';
import login from '../../assets/images/login.svg';

function Landing() {
  return (
    <div id="page-home">
      <div id="page-home-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Home logo"/>
          <h2>Onde seu dinheiro vale mais</h2>
        </div>

        <img 
          src={pageHomeImage} 
          alt="Equipe conversando" 
          className="page-home"
        />

        <div className="buttons-container">
          <Link to="/signup" className="sign-up">
            Cadastrar
          </Link>

          <Link to="/login" className="login">
            <img src={login} alt="Logar"/>
          </Link>  
        </div>
      </div>  
    </div>
  )
}

export default Landing;