
import RolTableRow from "./RolTableRow";
import { Table } from "react-bootstrap";
export default function UserTable({ 
  roles,
  deleteRol,
 
}) {
  return (
    <Table>
      <thead className="head-table">
        <tr>
          <th style={{borderTopLeftRadius: '10px'}}>Nombre Rol</th>
          <th>tipo</th>
          <th style={{textAlign: 'center', borderTopRightRadius: '10px'}}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {roles? (
          Object.entries(roles).map(([clave, ro]) =>(
            <RolTableRow
              key={clave}
              rol={ro}
              deleteRol={deleteRol}
              />
          ))
        ) : (
          <tr>
            <td colSpan={5}>No existen resultados!</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
