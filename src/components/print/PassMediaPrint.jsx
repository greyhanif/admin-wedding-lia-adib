import React, { useEffect, useState } from "react";
import "./passCard.css";
import { useRecoilValue } from "recoil";
import { contactsState } from "../../store";
import QRCode from "react-qr-code";

import moment from "moment";
import "moment/locale/id";

// const PassMediaPrint = () => {
class PassMediaPrint extends React.Component {
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
        <body class="body-pass">
          {/* <header>
            <code class="code ml-2 mt-2">---------------- AUTO GENERATE PASS CARD - WEDDING INVITATION SYSTEM 2021 ----------------</code>
            <code class="code ml-2 mt-2">PAPER SIZE : 210MM X 297MM (A4)</code>
          </header> */}
          <div id="grid">
            {this.props.data.length === 0 ? (
              <p className="code">Memutakhirkan data . . . </p>
            ) : (
              this.props.data.map((c) => (
                <div key={c.id} class="container-pass card-pass line-pass">
                  <div class="pass-card">
                    <div class="">PASS CARD</div>
                  </div>

                  <div class="">
                    <p class="title-card-pass bold-pass bride-pass">Lia & Adib</p>
                    <p class="wedding-pass">wedding</p>
                  </div>

                  <div class="padding-view">
                    <div className="wrapper-qr-pass">
                      <QRCode className="qr-pass" level="L" size="110" bgColor="#ffffff" fgColor="#000000" value={c.tickets.length === 0 ? "[TIKET BELUM DIBUAT]" : c.tickets[0].ticketCode} />
                      <div class="ml-3 code-ticket-pass">{c.tickets.length === 0 ? "[TIKET BELUM DIBUAT]" : c.tickets[0].ticketCode}</div>
                    </div>
                    <div class="ml-3 name-pass bold">
                      {/* {c.title === "null" ? "" : c.title} */}
                      {c.name}
                      {/* Ir. Ukit Waskito Indrajaya, MT., MM */}
                    </div>
                    <div class="ml-3 city-pass">{c.city ? c.city : c.organization}</div>
                    {/* <div class="ml-3 darurat">{c.organization}</div> */}
                    {/* <div class="ml-3 city-pass">{!c.organization ? c.city : c.organization + " " + c.city}</div> */}

                    {/* <p className="ml-3 darurat">di Surabaya</p> */}
                    {/* <p className="ml-3 darurat">PT. Pemalang Batang Toll Road</p> */}
                    <div class="code-on-ticket-pass">
                      <span>| TC: {c.tickets.length === 0 ? "[TIKET BELUM DIBUAT]" : c.tickets[0].ticketCode}</span>
                      <span> | CID: {c.id} |</span> <span> IAT: {moment().format("YYYY-MM-DD HH:MM:SS")} |</span>
                      <span> AUTO GENERATE LABEL - WEDDING INVITATION SYSTEM</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* <footer>
            <code class="code ml-2 mt-2">---------------- AUTO GENERATE PASS CARD - WEDDING INVITATION SYSTEM 2021 ----------------</code>
          </footer> */}
        </body>
      </div>
    );
  }
}
export default PassMediaPrint;
