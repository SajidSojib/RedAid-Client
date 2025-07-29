import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const FundingForm = ({ closeModal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount: Number(amount) })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) return Swal.fire("Payment Error", error.message, "error");

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "noemail@example.com",
          },
        },
      });

    if (confirmError)
      return Swal.fire("Payment Failed", confirmError.message, "error");

    if (paymentIntent.status === "succeeded") {
      const fundData = {
        name: user?.displayName,
        email: user?.email,
        amount,
        date: new Date(),
        transactionId: paymentIntent.id,
      };

      await axiosSecure.post("/funds", fundData);
      Swal.fire("Thank You!", "Your fund was successful!", "success");
      queryClient.invalidateQueries(["funds"]);
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        placeholder="Enter amount (USD)"
        className="input input-bordered w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        min={1}
      />
      <CardElement className="p-4 border rounded-md" />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || !clientSecret}
      >
        Pay Now
      </button>
    </form>
  );
};

export default FundingForm;
