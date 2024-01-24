import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { SelectState } from './select/SelectState'
import { SelectPriorities } from './select/SelectPriorities'
import { useForm } from '../../hooks/useForm'
import { useSelector } from 'react-redux'

const URL = `${import.meta.env.VITE_URL_SERVER}task`;

export const Edit = () => {

    const [description, setDescription] = useState('');
    const [due_date, setDue_date] = useState('');
    const [priority, setPriority] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate();
    const { id } = useParams()
    const user = useSelector(state => state.auth.user);

    if (!user) {
      navigate('/')
    }
    

    const id_priority = priority;
    const id_state = state;

    const handlePriorityChange = ( value ) => {
      setPriority(value);
    }

    const handleStateChange = ( value ) => {
      setState( value )
    }

    const update = async(e) => {
      e.preventDefault()
      await axios.put(`${URL}/actualizarTarea/${id}`, {
        description, 
        due_date, 
        id_priority, 
        id_state
      })
      navigate('/taskMaster')
    }

    useEffect( () => {
      getTaskById()
    }, []);

    const getTaskById = async() => {
      const res = await axios.get(`${URL}/consultarTareaPorId/${id}`)
      setDescription(res.data.task[0].description);
      setDue_date(res.data.task[0].due_date);
      setPriority(res.data.task[0].id_priority);
      setState(res.data.task[0].id_state);
    }


    return (
      <div className='input-container'>
        <h3>Editar tarea</h3>
        <form onSubmit={ update }>
            <div className='mb-3'>
              <label className='form-label'>Descripción</label>
              <textarea 
                type='text'
                name='description'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Fecha de vencimiento</label>
              <input 
                value={due_date}
                onChange={(e) => setDue_date(e.target.value)}
                type='date'
                className='form-control'
              />
            </div>
            <div>
              <SelectPriorities onPriorityChange={ handlePriorityChange }/>
              <SelectState onStateChange={ handleStateChange }/>   
            </div>
            
            <button 
            type='submit' 
            className='btn btn-create'>Editar</button>
              
            
        </form>
      </div>
    )
}
