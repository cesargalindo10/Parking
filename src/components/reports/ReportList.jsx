import { reportst } from "./Reports";

export const ReportList = ({ setReportList }) => {
  return (
    <div className="parking-header-report">
      <button
        className=""
        onClick={() => setReportList(reportst.TOTAL)}
      >
        Reservas total
      </button>{" "}
      <button
        className=""
        onClick={() => setReportList(reportst.DETALLE)}
      >
        Reserva detalle
      </button>
    </div>
  );
};
