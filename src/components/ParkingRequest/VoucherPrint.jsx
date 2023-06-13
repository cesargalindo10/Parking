import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    flexDirection: "column",
    width: "100%",
    height: '100%'
  },
  section: {
    padding: 5,
    marginLeft: 10,
   /*  flexGrow: 1, */
    fontSize: 12,
  },
  sectionHeader: {
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "auto",
    height: "auto",
    borderStyle: "solid",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
  },
  tableColHeader: {
    width: "50px",
    borderStyle: "solid",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCol: {
    width: "50px",
    textAlign: "center",
  },
  tableColName: {
    textAlign: "left",
    width: "80px",
  },
  tableColPrice: {
    textAlign: "right",
    width: "50px",
  },
  tableCellHeader: {
    marginTop: 5,
    fontSize: 12,
  },
  tableCell: {
    fontSize: 12,
  },
  footer: {
    paddingTop: 0,
    paddingLeft: 10,
    textAlign: "left",
    fontSize: 10,
  },
});
const date = new Date().toLocaleDateString();


const VoucherPrint = ({ requestToReserve, paymentSample, setShowPrinter, setShowRequests}) => {
  const [hour, setHour] = useState(null);
  const {cliente, pagos, plaza, tarifa} = requestToReserve;

  useEffect( () => {
    let hourCurrently = new Date().toLocaleTimeString();
    setHour(hourCurrently);
  },[])
  const handleCancel = () => {
    setShowPrinter(false);
    setShowRequests(true);
  }

  return (
    <div className="bg-pdfviewer">
    <div className="viewer-print">
      <div style={{ height: "calc(100vh - 300px)" }}>
        <PDFViewer style={{ width: "350px", height: "100%" }}>
          <Document>
            <Page size={{width: 227, height: 'auto'}}>
              {/* Header ticker */}
              <View style={styles.sectionHeader}>
                <Text>TICKET PARQUEO</Text>
                <Text>Fecha: {`${date}  ${hour}`} </Text>
                <Text>Cliente: {cliente.nombre_completo}</Text>
              </View>
            
              <View style={styles.sectionHeader}>
                <Text>Plaza: {plaza.numero} </Text>
                {
                  paymentSample.couta &&
                  <Text>Nro coutas pagadas: {paymentSample.nro_cuotas_pagadas}</Text>
                }
              </View>
            
              <View style={styles.sectionHeader}>
                <Text>Cantidad: Bs. {paymentSample.total} </Text>
                <Text>Tipo Pago: {paymentSample.tipo_pago}</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
      <div className="viewer-print_btn" onClick={handleCancel}>
         <button>Salir</button>
      </div>
    </div>
    </div>
  );
};
export default VoucherPrint;