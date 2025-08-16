import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import FundingForm from "./FundingForm";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Funding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["funds", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/funds?page=${page}&limit=${limit}`);
      console.log(res.data);
      return res.data;
    },
  });

  const funds = data || [];
  const total = data?.length;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-8">
      <div className="w-full mx-auto px-4 mt-20">
        <h1 className="max-w-lg mb-3 font-sans text-3xl font-bold leading-none tracking-tight text-primary lg:text-4xl md:mx-auto text-center">
          Support Our Mission
        </h1>
        <p className="text-base text-center max-w-xl lg:max-w-2xl mx-auto text-base-content/70 md:text-lg">
          Your donation helps us run blood drives, awareness campaigns, and save
          lives.
        </p>

        <div className="text-center my-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            Give Fund
          </button>
        </div>

        {isModalOpen && (
          <dialog id="fund_modal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Enter Funding Amount</h3>
              <Elements stripe={stripePromise}>
                <FundingForm closeModal={() => setIsModalOpen(false)} />
              </Elements>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setIsModalOpen(false)}>close</button>
            </form>
          </dialog>
        )}

        {/* Table */}
        <div className="overflow-x-auto mt-10">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Amount (USD)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && funds.length > 0 ? (
                funds.map((fund, index) => (
                  <tr key={fund._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{fund.name}</td>
                    <td>{fund.email}</td>
                    <td>${fund.amount}</td>
                    <td>{new Date(fund.date).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No funds found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setPage(idx + 1)}
              className={`btn btn-sm ${
                page === idx + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Funding;
