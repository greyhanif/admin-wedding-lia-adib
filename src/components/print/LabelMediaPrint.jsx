import React, { useEffect, useState } from "react";
import "./label.css";
import { useRecoilValue } from "recoil";
import { contactsState } from "../../store";
import QRCode from "react-qr-code";
import corner from "../../components/print/corner.png";
import ReactBarcode from "react-jsbarcode";
import moment from "moment";
import "moment/locale/id";

// const PassMediaPrint = () => {
class LabelMediaPrint extends React.Component {
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
        <body className="body-label-shipping">
          {/* <header>
            <code className="code ml-2 mt-2">---------------- AUTO GENERATE LABEL - WEDDING INVITATION SYSTEM 2021 ----------------</code>
            <code className="code ml-2 mt-2">PAPER SIZE : 210MM X 297MM (A4)</code>
          </header> */}
          <div id="grid">
            {this.props.data.length === 0 ? (
              <p className="code">Memutakhirkan data . . . </p>
            ) : (
              this.props.data.map((c) => (
                <div key={c.id} className="container-label card-label line-label">
                  {/* <img className="corner-left-top-element" src={corner} alt="" /> */}
                  <div className="corner-left-top-element-label-shipping">
                    <p className="label-desc-shipping-title">UNDANGAN PERNIKAHAN</p>
                    <p className="label-desc-shipping-title">!!! JANGAN DILIPAT !!!</p>
                  </div>
                  <div className="right-label">
                    <p className="bold bride-label">Lia & Adib</p>
                    <p className="wedding-label">wedding</p>
                    {/* <p className="ml-3 wedding-label">https://liaadib-weddingday.id</p> */}
                  </div>

                  <hr />
                  <div className="label-wrapper-address-sm">
                    <p className="label-title-sm ">Kepada:</p>
                    <p className="label-desc-shipping">
                      {/* {c.title}  */}

                      {c.name}
                    </p>
                    <p className="label-title-sm ">Phone:</p>
                    <p className="label-desc-shipping">{c.phone ? c.phone : "-"}</p>
                  </div>
                  <div className="label-wrapper-address-sm">
                    <p className="label-title-sm margin-list-label-sm">Alamat:</p>
                    <p className="label-desc-shipping">{c.address ? c.address : c.organization}</p>
                  </div>
                  <div className="label-wrapper-address-sm">
                    <p className="label-title-sm margin-list-label-sm">Kota / Kabupaten:</p>
                    <p className="label-desc-shipping">{c.city ? c.city : c.organization}</p>
                  </div>
                  <hr />
                  <div className="label-wrapper-address-sm">
                    <p className="label-title-sm margin-list-label-sm">Ticket Code:</p>
                    <div className="barcode-label-shipping">
                      {c.tickets.length !== 0 && (
                        <ReactBarcode value={c.tickets.length === 0 ? "[TIKET BELUM DIBUAT]" : c.tickets[0].ticketCode} options={{ format: "code128", height: 20, width: 1.5, margin: 1, fontSize: 10 }} renderer="svg" />
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="label-wrapper-address-sm">
                    <p className="label-title-sm ">Pengirim:</p>
                    <p className="label-desc-shipping">
                      Bapak Usman Muchtarom /<br /> Ibu Tutik Rohmaningsih
                    </p>
                    {/* <p className="label-desc-shipping">Bapak Arifin / Ibu Sri Winarni</p> */}

                    <p className="label-title-sm ">Alamat:</p>
                    <p className="label-desc-shipping">JL. Tengger Raya Selatan No. 8 Gajahmungkur Semarang</p>
                    {/* <p className="label-desc-shipping">-</p>
                    <p className="label-desc-shipping">-</p>
                    <p className="label-desc-shipping">-</p> */}
                  </div>
                  <hr />
                  <div class="code-on-label-shipping">
                    <span>| TC: {c.tickets.length === 0 ? "[TIKET BELUM DIBUAT]" : c.tickets[0].ticketCode}</span>
                    <span> | CID: {c.id} |</span> <span> IAT: {moment().format("YYYY-MM-DD HH:MM:SS")} |</span>
                    <span> AUTO GENERATE LABEL - WEDDING INVITATION SYSTEM</span>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* <footer>
            <code className="code ml-2 mt-2">---------------- AUTO GENERATE LABEL - WEDDING INVITATION SYSTEM 2021 ----------------</code>
          </footer> */}
        </body>
      </div>
    );
  }
}
export default LabelMediaPrint;
