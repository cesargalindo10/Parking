const PayTableRow = ({ pay, setProductToEdit, setShowModal, disablePay }) => {
  const handleEdit = () => {
    setProductToEdit(pay);
    setShowModal(true);
  };

  const handleDisable = () => {
      disablePay(pay.id);
  };
  return (
    <tr>
      <td>{pay.nombre}</td>
      <td>{pay.costo}</td>
      <td>
        {pay.estado ? <button style={{cursor: 'auto'}} className="btn-main btn-main__green">Habilitado</button>
         :
          <button style={{cursor: 'auto'}} className="btn-main btn-main__red">Inabilitado</button>}
      </td>
      <td style={{ textAlign: "center" }}>
        <button className="btn-main btn-main__red" onClick={handleEdit}>
          Editar
        </button>{" "}
        <button className="btn-main btn-main__purple" onClick={handleDisable}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default PayTableRow;
