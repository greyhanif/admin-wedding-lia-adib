import React, { useEffect, useState } from "react";
import "./label-small.css";
import { useRecoilValue } from "recoil";
import { contactsState } from "../../store";
import QRCode from "react-qr-code";
import corner from "../../components/print/corner.png";

import ReactBarcode from "react-jsbarcode";

import moment from "moment";
import "moment/locale/id";

// const PassMediaPrint = () => {
class LableSmallMediaPrint extends React.Component {
  //   const contacts = useRecoilValue(contactsState);

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  render() {
    console.log(this.props.data.length);
    return (
      <div>
        <style>@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Roboto:wght@300;500;700&display=swap');</style>{" "}
        <body class="body-label-sm">
          <div id="grid">
            {this.props.data.length === 0 ? (
              <p className="code">Memutakhirkan data . . . </p>
            ) : (
              this.props.data.map((c) => (
                <div key={c.id} class="container-label-sm card-label-sm label-wrap-sm">
                  <div className="label-wrapper-name-sm">
                    {/* <p className="label-title-sm ">Kepada:</p> */}
                    <p className="label-name-sm">
                      {/* {c.title === "null" ? "" : c.title} */}
                      {c.name}
                    </p>
                  </div>
                  <div className="label-wrapper-address-sm">
                    {/* <p className="label-title-sm margin-list-label-sm">Alamat / Organisasi / Instansi:</p> */}
                    <p className="label-desc-sm">{c.city ? c.city : c.organization}</p>
                    {/* <p className="label-desc-sm">{c.organization}</p> */}
                    {/* <p className="label-desc-sm">{!c.organization ? c.city : c.organization + " " + c.city}</p> */}
                    {/* <p className="label-desc-sm">
                      Kabid Pembangunan Jalan
                      <br />
                      Balai Besar Jalan Nasional
                      <br />
                      Sulawesi Selatan
                    </p> */}
                  </div>
                  <div class="barcode-label-sm">
                    {c.tickets.length !== 0 && (
                      <ReactBarcode
                        value={c.tickets.length === 0 ? "[TIKET BELUM DIBUAT]" : c.tickets[0].ticketCode}
                        options={{ format: "code128", height: 10, width: 1, margin: 0, displayValue: false, lineColor: "#222222" }}
                        renderer="svg"
                      />
                    )}
                  </div>
                  <div class="code-on-label-sm">
                    <span>| TC: {c.tickets.length === 0 ? "[TIKET BELUM DIBUAT]" : c.tickets[0].ticketCode}</span>
                    <span> | CID: {c.id} |</span> <span> IAT: {moment().format("YYYY-MM-DD HH:MM:SS")} |</span>
                    <span> AUTO GENERATE LABEL - WEDDING INVITATION SYSTEM</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </body>
      </div>
    );
  }
}
export default LableSmallMediaPrint;
