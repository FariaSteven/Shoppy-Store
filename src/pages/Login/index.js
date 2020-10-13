import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import './styles.css';

import Input from '../../components/Form/Input';
import { Link } from 'react-router-dom';

function App() {
  const formRef = useRef(null);

  async function handleSubmit (data, { reset }) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string().min(10, 'No mínimo 10 caracteres')
        .required('A senha é obrigatória')
    })

    await schema.validate(data, {
      abortEarly: false,

    })

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

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input type="email" name="email" className="input" placeholder="E-mail"/>
        <Input type="password" name="password" className="input" placeholder="Senha"/>
        <div className="button-signUp">
          {/* <Link to="" > */}
            <button type="submit">Entrar</button>
          {/* </Link> */}
              <br></br>
          <Link to="/signUp" className="button-login">    
            <button type="submit">Ainda não tem conta? <br></br> Crie uma aqui</button>
          </Link>  
        </div>
      </Form>
    </div>
  );
}
export default App;