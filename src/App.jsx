import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Login } from "./components/login/Login";
import { Show } from './components/task/Show'
import { SignUp } from "./components/login/SignUp";
import { Create } from "./components/task/Create";
import { Edit } from "./components/task/Edit";
import { Profile } from "./components/profile/Profile";
import { UpdateUser } from "./components/profile/UpdateUser";
import { NavBar } from "./components/navBar/NavBar";
import { UpdatePassword } from "./components/profile/UpdatePassword";
import { useEffect } from "react";
import { fetchValidateToken } from "./lib/slice/authSlice";
import { ForgotPass } from "./components/login/ForgotPass";




function App() {
  
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchValidateToken());
    }
    fetchData();
  }, [])

  return (
        <BrowserRouter>
         {user &&
          <NavBar />
         }
          <Routes>
            <Route path="/" element={ <Login /> }></Route>
            <Route path="/taskMaster" element={ <Show /> }></Route>
            <Route path="/crearUsuario" element={ <SignUp /> }></Route>  
            <Route path="/crear" element={ <Create /> }></Route>
            <Route path="/edit/:id" element={ <Edit /> }></Route>
            <Route path="/perfil" element={ <Profile /> } ></Route>
            <Route path="/actualizarDatos" element={ <UpdateUser /> } ></Route>
            <Route path="/actualizarContrasenia" element={ <UpdatePassword /> }></Route>
            <Route path="/recuperarContrasenia" element={ <ForgotPass/> }></Route>
          </Routes>
        </BrowserRouter>
  )
}

export default App
