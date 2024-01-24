import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const URL = `${import.meta.env.VITE_URL_SERVER}task`;

export const Show = () => {

  const [task, setTask] = useState([]);

  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate(); 

  if (!user) {
    navigate('/')
  }


  const alert = ( msg ) => {
    Swal.fire({
      title: msg,
      icon: "success",
      iconColor: '#47A8BD',
      confirmButtonText: 'Genial!',
      confirmButtonColor: '#47A8BD'
    });
  }
  
   useEffect(() => {
     getTask()
  }, [user?.id])
    
  

    const getTask = async() => {
        const res = await axios.get(`${URL}/consultarTarea/${user?.id}`);
        setTask(res.data.task);
      }

  
  const pendingTask = async() => {
    const res = await axios.get(`${URL}/tareaPendiente/${user.id}`);
    
    if (res.data.task.length > 0) {
      setTask(res.data.task)
    }
    else {
      alert(res.data.msg)
    }
  }

  const taskInProgress = async() => {
    const res = await axios.get(`${URL}/tareaEnProgreso/${user.id}`);
    
    if (res.data.task.length > 0) {
      setTask(res.data.task)
    }
    else {
      alert(res.data.msg)
    }
  }

  const completeTask = async() => {
    const res = await axios.get(`${URL}/tareaCompletada/${user.id}`);
    
    if (res.data.task.length > 0) {
      setTask(res.data.task)
    }
    else {
      alert(res.data.msg)
    }
  }

  const deleteTask = async(id) => {
    await axios.delete(`${URL}/eliminarTarea/${id}`);
    getTask();
  }

  return (
    <div className='list-container'>
    <div className='filter-container'>
      <button className='btn btn-filter-1' onClick={ getTask }>Mostrar todas</button>
      <button className='btn btn-filter-2' onClick={ pendingTask }>Tareas pendientes</button>
      <button className='btn btn-filter-1' onClick={ taskInProgress }>Tareas en progreso</button>
      <button className='btn btn-filter-2' onClick={ completeTask }>Tareas completadas</button>
    </div>
        <div className='row'>
            <div className="col">
              <table className='table table-container'>
                <thead className='table-primary title-table'>
                  <tr>
                    <th className='text-center'>Descripción</th>
                    <th className='text-center'>Fecha de vencimiento</th>
                    <th className='text-center'>Prioridad</th>
                    <th className='text-center'>Estado</th>
                    <th className='text-center'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  { task.map( (element) => (
                     <tr key={ element.id } className='content-table'>
                        <td className='text-center '>{ element.description }</td>
                        <td className='text-center'>{ element.due_date }</td>
                        <td className='text-center'>{ element.tb_priority.description }</td>
                        <td className='text-center'>{ element.tb_state.description }</td>
                        <td className='text-center'>
                          <Link to={`/edit/${element.id}`} className='btn btn-edit'><box-icon name='edit-alt' type='solid' color='#fff' ></box-icon></Link>
                          <button onClick={ () => deleteTask(element.id) } className='btn btn-delete'><box-icon name='trash' type='solid' color='#101010' ></box-icon></button>
                        </td>
                     </tr> 
                  )) }
                </tbody>       
              </table>
            </div>
        </div>
        <Link to={'/crear'} className='btn btn-create'>Crear</Link>
    </div>
  )
}
