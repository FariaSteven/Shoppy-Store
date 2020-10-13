import React, {Component, useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import './styles.css';

import Input from '../../components/Form/Input';
import api from '../../services/api';

function App() {
  const formRef = useRef(null);
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    error: ""
  });

  async function handleSubmit (data, { reset }) {
    try {
      const { username, email, password } = state;
        // e.preventDefault()
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
        password: Yup.string().min(10, 'No mínimo 10 caracteres').required('A senha é obrigatória'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem coincidir').required('A confirmação de senha é obrigatória')
        
    })
    
    await schema.validate(data, {
      abortEarly: false,
    
    })

    await api.post("/register", { username, email, password });
    

    console.log(data);

    formRef.current.setErrors({})

    reset();
  }catch (err) {
    if (err instanceof Yup.ValidationError){
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;

        
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

    return (
      <div className="App">
        <h1>Falta pouco para <br></br> economizar muito!</h1>

        <Form ref={formRef}  onSubmit={handleSubmit}>
          <Input 
            name="name" 
            className="input" 
            placeholder="Nome de usuário"
            // value={this.state.username}
            onChange={e => setState({ ...state, username: e.target.value })}
            />
          <Input 
            type="email" 
            name="email" 
            className="input" 
            placeholder="E-mail"
            onChange={e => setState({ ...state, email: e.target.value })}
            />
          <Input 
            type="password" 
            name="password" 
            className="input" 
            placeholder="Senha"
            onChange={e => setState({ ...state, password: e.target.value })}
            />
          <Input 
            type="password" 
            name="passwordConfirmation" 
            className="input" 
            placeholder="Confirme a senha"
            onChange={e => setState({ ...state, password: e.target.value })}
            />
          
          <div className="button-signUp" >
            {/* <Link to="" className="button-signUp"> */}
              <button id="button-signUp" type="submit" >Cadastrar</button>
            {/* </Link> */}

              <br></br>
            <Link to="/login" className="button-login">
              <button type="submit">Já tem conta? Entre aqui</button>
            </Link>
          </div>
        </Form>
      </div>
    );
}
export default withRouter(App);