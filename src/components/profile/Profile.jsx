import { useSelector } from 'react-redux';
import imageProfile from '../../assets/image-profile.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export const Profile = () => {
  
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    navigate('/')
  }


  

  return (
    <div>
        <div className="profile-container">
            <h2>Bienvenido a tu perfil</h2>
            <div className="profile-info-container">
                <h3 className="profile-info-title">Nombre: <span className='data-user'>{user?.name}</span> </h3>
                <h3 className="profile-info-title">Correo electrónico:<span className='data-user'>{user?.email}</span></h3>
                <div className='container-button-profile'>
                  <Link to={'/actualizarDatos'} className='btn btn-data-user'>Editar datos</Link>
                  <Link to={'/actualizarContrasenia'} className="btn btn-data-user">Cambiar contraseña</Link>
                </div>    
            </div>
            <img src={imageProfile} className='image-profile'/>
        </div>
    </div>
  )
}