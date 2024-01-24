import axios from "axios";
import { useState } from "react";

const URL = `${import.meta.env.VITE_URL_SERVER}priority`;

export const SelectPriorities = ({ onPriorityChange }) => {

  const [priority, setPriority] = useState([]);

  const consultPriority = async(event) => {
        const res = await axios.get(`${URL}/consultarPrioridad`);
        setPriority(res.data.priority);

        const value = event.target.value;
        onPriorityChange(value);
  };

  return (
    <div>
      <label className="form-label">Prioridad</label>
      <select name="priorities" className="form-control"  onClick={consultPriority}>
        <option value="">Seleccione...</option>
        {priority.map((element) => (
          <option key={element.id} value={element.id} >
            {element.description}
          </option>
        ))}
      </select>
    </div>
  );
};
