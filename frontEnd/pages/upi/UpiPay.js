import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; 

export default function UpiPay() {
    const [pa, setPa] = useState("merchant@upi");
    const [pn, setPn] = useState("FinPlay Merchant");
    const [amount, setAmount] = useState("1");
    const [note, setNote] = useState("FinPlay Quick Pay");

    const upiLink = `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(
        pn
    )}${amount ? `&am=${encodeURIComponent(amount)}` : ""}&tn=${encodeURIComponent(
        note
    )}&cu=INR`;

    // simple mobile check
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    return (
        <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto", backgroundColor:"#1e3c72",marginTop:"5rem",marginBottom:"5rem",borderRadius:"20px"}}>
            <h3>Quick UPI Pay</h3>

            {/* Inputs */}
            <div className="form-group">
                <label>Payee UPI ID</label>
                <input
                    value={pa}
                    onChange={(e) => setPa(e.target.value)}
                    placeholder="example@upi"
                />
            </div>

            <div className="form-group">
                <label>Payee Name</label>
                <input
                    value={pn}
                    onChange={(e) => setPn(e.target.value)}
                    placeholder="Receiver Name"
                />
            </div>

            <div className="form-group">
                <label>Amount (INR)</label>
                <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="199"
                />
            </div>

            <div className="form-group">
                <label>Note</label>
                <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Payment Note"
                />
            </div>

        

            {/* Pay button (mobile only) */}
            {isMobile && (
                <a href={upiLink}>
                    <button
                        className="btn-primary"
                        style={{ marginTop: "1.5rem", width: "100%" }}
                    >
                        Pay via UPI
                    </button>
                </a>
            )}

            {/* QR Code for desktop */}
            {!isMobile && (
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                    <p>Scan this QR with any UPI app:</p>
                    <QRCodeCanvas value={upiLink} size={200} />
                </div>
            )}
        </div>
    );
}
