import React from "react";
import api from "../../api/api";
import Swal from "sweetalert2";

export default function PaystackButton({ amount = 0, currency = "GHS", email = "", fullName = "", disabled = false }) {
  const payWithPaystack = () => {
    const koboAmount = Math.max(0, Math.round(Number(amount || 0) * 100));
    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, // your pk_test_xxx
      email: email || "customer@email.com",
      amount: koboAmount,
      currency: currency, // Ghana Cedi
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: fullName || "" }
        ]
      },
      ref: "ref_" + Date.now(), // unique reference
      callback: function (response) {
        // ✅ Send reference to Laravel backend for verification
        api
          .get(`/paystack/verify/${response.reference}`)
          .then((res) => {
            console.log("Verification result:", res.data);
            if (res.data.status === "success") {
              Swal.fire("Payment Successful", "Thank you for your payment!, your reference ID is " + response.reference, "success");
            } else {
              Swal.fire("Payment Verification Failed", "Please contact support with your reference: " + response.reference, "error");
            }
          })
          .catch((err) => {
            console.error("Verification error:", err);
            Swal.fire("Verification Error", "Could not verify payment.", "error");
          });
      },
      onClose: function () {
        Swal.fire("Payment Window Closed", "You closed the payment window.", "info");
      },
    });

    handler.openIframe();
  };

  return (
    <>
    
    <div className="d-flex justify-content-center align-items-center my-4">
    <button onClick={payWithPaystack} className="btn btn-success w-100">
      Pay GH₵{Number(amount || 0).toFixed(2)}
    </button>


    </div>
    </>
  );
}
