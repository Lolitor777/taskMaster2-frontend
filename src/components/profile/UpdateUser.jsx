import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const URL = `${import.meta.env.VITE_URL_SERVER}auth`;

export const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  

  if (!user) {
    navigate('/')
  }


  const update = async (e) => {
    e.preventDefault();
      const res = await axios.put(`${URL}/actualizarUsuario`, {
      id: user.id,
      name,
      email
    });

    navigate("/perfil");
  };


  useEffect( () => {
    getUser()
  }, [user.id]);


  const getUser = async() => {
    const res = await axios.get(`${URL}/consultarUsuarioPorId/${user?.id}`)
    setName(res.data.user.name)
    setEmail(res.data.user.email)
  }

  

  return (
    <div className="input-container">
      <h3>Cambiar datos de usuario</h3>
      <form onSubmit={update}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <textarea
            value={ name }
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            value={ email }
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-create">
          Editar
        </button>
      </form>
    </div>
  );
};
