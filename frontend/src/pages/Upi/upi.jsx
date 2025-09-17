import React, { useState } from "react";

export default function UpiPay() {
    const [pa, setPa] = useState("merchant@upi");
    const [pn, setPn] = useState("FinPlay Merchant");
    const [amount, setAmount] = useState("199");
    const [note, setNote] = useState("FinPlay Quick Pay");

    const upiLink = `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(
        pn
    )}&am=${amount}&tn=${encodeURIComponent(note)}&cu=INR`;

    return (
        <div className="finplay-container" style={{ padding: "2rem" }}>
            <div className="treasure-log">
                <h3>Quick UPI Pay</h3>

                {/* VPA */}
                <div className="form-group">
                    <label>Payee VPA (pa)</label>
                    <input value={pa} onChange={(e) => setPa(e.target.value)} />
                </div>

                {/* Name */}
                <div className="form-group">
                    <label>Payee Name (pn)</label>
                    <input value={pn} onChange={(e) => setPn(e.target.value)} />
                </div>

                {/* Amount */}
                <div className="form-group">
                    <label>Amount (INR)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                {/* Note */}
                <div className="form-group">
                    <label>Note (tn)</label>
                    <input value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                {/* Preview */}
                <div
                    style={{
                        border: "1px dashed var(--border-color)",
                        borderRadius: "10px",
                        padding: "1rem",
                        marginTop: "1rem",
                    }}
                >
                    <p style={{ marginBottom: "0.5rem" }}>Preview</p>
                    <code>{upiLink}</code>
                    <div style={{ textAlign: "right", fontWeight: "bold", marginTop: "0.5rem" }}>
                        ₹{amount}
                    </div>
                </div>

                {/* Pay Button */}
                <a href={upiLink}>
                    <button className="btn-primary" style={{ marginTop: "1.5rem", width: "100%" }}>
                        Pay via UPI
                    </button>
                </a>

                <p style={{ fontSize: "0.85rem", marginTop: "0.75rem", color: "var(--text-secondary)" }}>
                    Uses the standard UPI intent deep link (open-source friendly). For status verification,
                    add a PSP/webhook later.
                </p>
            </div>
        </div>
    );
}
