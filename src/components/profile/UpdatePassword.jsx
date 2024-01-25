import React from 'react'
import { useForm } from '../../hooks/useForm';
import { validatePassword } from '../../helpers/validationsForm';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import changePassword from '../../assets/changePassword.svg'
import { useSelector } from 'react-redux';

const URL = `${import.meta.env.VITE_URL_SERVER}auth/actualizarContrasenia`;

const initialValues = {
    password: ""
}

export const UpdatePassword = () => {

    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    if (!user) {
      navigate('/')
    }

    const {
        form,
        errors,
        handleChange,
        handleBlur
    } = useForm(initialValues, validatePassword)

    validatePassword( form )

    const updatePassword = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length < 1) {
            
        await axios.put(`${URL}`, {
          id: user?.id,
          password: form.password
        });

        Swal.fire({
            icon: "success",
            title: "Contraseña actualizada",  
            iconColor: '#e3761d',
            confirmButtonText: 'Vale',
            confirmButtonColor: '#47A8BD'
          });

        setTimeout(() => {
            navigate("/perfil");   
        }, 1000)
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
    <div className='container-changePass'>

        <figure className='changePass-image'>
            <img src={ changePassword } className='changePass-img' />
        </figure>

        <form onSubmit={updatePassword} className='form-changePass'>
            <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
                type="password"
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={ form.password }
                className="form-control"
            />
            </div>
            {
                errors.password && <p className="input-error">{ errors.password }</p>
            }

            <button type='submit' className='btn btn-data-user'>Confirmar</button>
        </form>
    </div>
  )
}
