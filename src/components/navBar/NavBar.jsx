import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../../lib/slice/authSlice";
import { useEffect } from "react";

export const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
      dispatch(fetchLogout());
      navigate('/')  
  }



  return (
    <header className="navBar-container">
      <nav className="navBar-container-child">
        <div className="navBar-title">
          <h1>Task Master</h1>
          <figure className="logo-image">
            <img src={logo} className="logo-img" />
          </figure>
        </div>
        <div className="anchor-container">
          <Link to={"/taskMaster"} className="btn-navbar">
            Inicio
          </Link>
          <Link to={"/perfil"} className="btn-navbar">
            Perfil
          </Link>
          <button className="btn btn-navbar" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
};
