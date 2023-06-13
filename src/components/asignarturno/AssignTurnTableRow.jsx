import { useState } from "react";
import { Form } from "react-bootstrap";
export default function AssignTurnTableRow({ usuario, turnos, assignTurn }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAssignTurn = () => {
    assignTurn(usuario.user.id,selectedValue);
   
  };

  return (
    <tr>
      <td>{usuario.user.nombre}</td>
      <td>{usuario.user.rol}</td>
      <td>{usuario.turn_nombre}</td>
      <td className="col-3">
        <Form.Select onChange={handleSelectChange}>
          <option>{usuario.turn_nombre?usuario.turn_nombre:'selecciona un turno'}</option>
          {turnos.map((res) => (
            <option value={res.id} key={res.id}>{res.nombre}</option>
          ))}
        </Form.Select>
      </td>
      <td className="col-2" style={{ textAlign: "center" }}>
        <button className="btn-main btn-main__purple" onClick={() => handleAssignTurn()}>
          Asignar
        </button>
      </td>
    </tr>
  );
}
