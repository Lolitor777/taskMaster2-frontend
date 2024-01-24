import Swal from "sweetalert2";
import { validateEmail } from "../../helpers/validationsForm";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = `${import.meta.env.VITE_URL_SERVER}auth`;

export const ForgotPass = () => {


  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const { form, errors, handleBlur, handleChange } = useForm(
    initialValues,
    validateEmail
  );

  validateEmail(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length < 1) {
      const res = await axios.post(`${URL}/recuperarContrasenia`, {
        email: form.email,
      });

    if (res.data.ok != false) {
        console.log(res);
        Swal.fire({
        icon: "success",
        title: "Correcto!",
        text: "Se ha enviado el enlace de recuperación a tu correo",
        iconColor: "#e3761d",
        confirmButtonText: "Vale",
        confirmButtonColor: "#47A8BD",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);

    }
    else {
        console.log(res);
        return Swal.fire({
        icon: "error",
        title: "Ups...",
        text: res.data.msg,
        iconColor: "#e3761d",
        confirmButtonText: "Vale",
        confirmButtonColor: "#47A8BD",
      });
    }

    
    } else {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Por favor ingrese un correo válido",
        iconColor: "#e3761d",
        confirmButtonText: "Vale",
        confirmButtonColor: "#47A8BD",
      });
    }
  };

  return (
    <div className="input-container">
      <div className="title-form-forgot">
        <h3>Recupera tu contraseña</h3>
        <box-icon name="reset" animation="flashing" color="#47A8BD"></box-icon>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        {errors.email && <p className="input-error">{errors.email}</p>}
        <div className="form-group mb-2">
          <button type="submit" className="btn btn-create-forgot">
            Recuperar
          </button>
        </div>
      </form>
    </div>
  );
};
