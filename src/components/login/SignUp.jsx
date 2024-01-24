import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { validationsFormSignUp } from "../../helpers/validationsForm";
import Swal from 'sweetalert2'

const URL = `${import.meta.env.VITE_URL_SERVER}auth`;


export const SignUp = () => {

  const initialForm =  {
    name: "",
    email: "",
    password: ""
  };

  const {
    form,
    errors,
    handleChange,
    handleBlur
  } = useForm(initialForm, validationsFormSignUp)

  validationsFormSignUp(form)

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( Object.keys(errors).length < 1 ) {
        const res = await axios.post(`${URL}/crearUsuario`, {
        name: form.name,
        email: form.email,
        password: form.password
      });

      if (res.data.ok === false) {
        return Swal.fire({
        icon: "error",
        title: "Ups...",  
        text: res.data.msg,
        iconColor: '#e3761d',
        confirmButtonText: 'Vale',
        confirmButtonColor: '#47A8BD'
        });
      }
      else {
        Swal.fire({
        icon: "success",
        title: "Usuario creado",  
        iconColor: '#e3761d',
        confirmButtonText: 'Vale',
        confirmButtonColor: '#47A8BD'
      });

      setTimeout(() => {
        navigate("/")
      }, 2000);
      } 
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Ups...",  
        text: "Por favor rellene los campos correctamente",
        iconColor: '#e3761d',
        confirmButtonText: 'Vale',
        confirmButtonColor: '#47A8BD'
      });
    }
    
  };

  return (
    <div className="input-container">
      
      <div className="title-form">
        <h3>Registro</h3>
        <box-icon
          name="user"
          type="solid"
          animation="tada"
          color="#47A8BD"
        ></box-icon>
      </div>
      <form className="register-container" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <input 
          type="text"
          name="name" 
          placeholder="Nombre"
          onBlur={handleBlur} 
          onChange={handleChange}
          value={form.name}
          className="form-control" 
          />
          {
            errors.name && <p className="input-error">{ errors.name }</p>
          }
        </div>
        <div className="form-group mb-2">
          <input 
          type="text"
          name="email" 
          placeholder="Correo" 
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.email}
          className="form-control" 
          />
        </div>
          {
            errors.email && <p className="input-error">{ errors.email }</p>
          }
        <div className="form-group mb-2">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.password}
            className="form-control"
          />
        </div>
        {
          errors.password && <p className="input-error">{ errors.password }</p>
        }
        <div className="form-group mb-2">
          <button
          type="submit"
          className="btn btn-create"
          onClick={(e) => handleSubmit(e)}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
