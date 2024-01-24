import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { validationsFormLogin } from "../../helpers/validationsForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../lib/slice/authSlice";


export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  
  
  if (user) {
    navigate('/taskMaster')
  }

  const initialValues = {
    email: "",
    password: ""
  }


  const {
    form,
    errors,
    handleBlur,
    handleChange
  } = useForm(initialValues, validationsFormLogin)

  validationsFormLogin(form);

  const login = async(e) => {
    e.preventDefault()
    const res = await dispatch(fetchLogin(form))
    navigate('/taskMaster')
  }


  return (
    <div className="input-container">
    
    <div className="title-form">
      <h3>Ingreso</h3>
      <box-icon name='user' type='solid' animation='tada' color='#47A8BD'></box-icon>
    </div>     
      <form onSubmit={login}>
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
          type='submit' 
          className='btn btn-create'
          >Login</button>
        </div>
      </form>
      
      <div className="button-form">
        <Link to={'/crearUsuario'} className="btn-form" >Crear usuario</Link>
        <Link to={'/recuperarContrasenia'} className="btn-form">Olvidé mi contraseña</Link>
      </div> 
    </div>
  );
};
