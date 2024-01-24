import axios from "axios";
import { useState } from "react";

const URL = `${import.meta.env.VITE_URL_SERVER}state`;

export const SelectState = ({ onStateChange }) => {

  const [state, setState] = useState([]);

  const consultState = async(event) => {
        const res = await axios.get(`${URL}/consultarEstado`);
        setState(res.data.state);

        const value = event.target.value;
        onStateChange(value);
  };


  return (
    <div>
      <label className="form-label mt-2">Estado</label>
      <select name="state" className="form-control" onClick={consultState}>
      <option value="">Seleccione...</option>
        {state.map((element) => (
          <option key={element.id} value={element.id} >
            {element.description}
          </option>
        ))}
      </select>
    </div>
  );
};
