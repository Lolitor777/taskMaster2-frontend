import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SelectPriorities } from './select/SelectPriorities'
import { SelectState } from './select/SelectState'
import { useForm } from '../../hooks/useForm'
import { validateFormTask } from '../../helpers/validationsForm'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const URL = `${import.meta.env.VITE_URL_SERVER}task`;

export const Create = () => {

    const initialValues = {
      description: "",
      due_date: ""
    }

    const [priority, setPriority] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate();
    const { 
      form,
      errors,  
      handleBlur,
      handleChange} = useForm(initialValues, validateFormTask);
    
      const user = useSelector(state => state.auth.user);

    if (!user) {
      navigate('/')
    }

    validateFormTask(form)
    
  	
    const id_priority = priority;
    const id_state = state;

    const handlePriorityChange = ( value ) => {
      setPriority(value);
    }

    const handleStateChange = ( value ) => {
      setState( value )
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      
      if (Object.keys(errors).length < 1) {
          await axios.post(`${URL}/guardarTarea`, {
          description: form.description, 
          due_date: form.due_date, 
          id_priority, 
          id_state,
          id_user: user.id
        })
      navigate('/taskMaster');
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
    }


  return (
    <div className='input-container'>
      <h3>Crear tarea</h3>
      <form onSubmit={ handleSubmit }>
          <div className='mb-3'>
            <label className='form-label' htmlFor='description'>Descripción</label>
            <textarea 
              type='text'
              name='description'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.description}
              id='description'
              className='form-control'
              style={{ height:100, maxHeight:150, minHeight:100 }}
            />
          </div>
          {
            errors.description && <p className='input-error'>{ errors.description }</p>
          }
          <div className='mb-3'>
            <label className='form-label' htmlFor='due_date'>Fecha de vencimiento</label>
            <input 
              type='date'
              name='due_date'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.due_date}
              id='due_date'
              className='form-control'
            />
          </div>
          {
            errors.due_date && <p className='input-error'>{ errors.due_date }</p>
          }
          <div>
            <SelectPriorities onPriorityChange={ handlePriorityChange }/>
            <SelectState onStateChange={ handleStateChange }/>   
          </div>
          
          <button 
          type='submit' 
          className='btn btn-create'
          onClick={(e) => handleSubmit(e)}>Crear</button>
            
          
      </form>
    </div>
  )
}
