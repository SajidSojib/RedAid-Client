import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Overview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch donations
  const { data: donations = [], isLoading: loadingDonations } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/funds");
      return res.data;
    },
  });

  // Fetch users
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data.users;
    },
  });

  if (loadingDonations || loadingUsers) return <p>Loading...</p>;

  // Aggregate donations by donor name
  const donationData = donations.reduce((acc, donation) => {
    const name = donation.name || "Anonymous";
    const amount = Number(donation.amount) || 0;

    if (!acc[name]) acc[name] = { name, amount };
    else acc[name].amount += amount;

    return acc;
  }, {});

  const donationChartData = Object.values(donationData);

  // Prepare donationRequest data for PieChart
  const requestChartData = users
    .filter((u) => u.role === "donor")
    .map((user) => ({
      name: user.name,
      requests: Number(user.donationRequest || 0),
    }));

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#8dd1e1",
    "#a4de6c",
  ];

  return (
    <div className="p-6 m-6 bg-base-100 rounded-lg space-y-12">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Donation Overview
      </h1>

      {/* Bar chart: Donations */}
      <div className="bg-accent rounded-2xl shadow p-4">
        <h2 className="text-lg text-primary font-semibold mb-4">
          Total Donations per Donor
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={donationChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            />
            <Bar dataKey="amount" fill="#4F46E5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart: Donation Requests */}
      <div className="bg-accent rounded-2xl shadow p-4">
        <h2 className="text-lg text-primary font-semibold mb-4">
          Donation Requests per Donor
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={requestChartData}
              dataKey="requests"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#82ca9d"
              label
            >
              {requestChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart: Donations */}
      {/* Pie chart: Donations */}
      <div className="bg-accent rounded-2xl shadow p-4">
        <h2 className="text-lg text-primary font-semibold mb-4">Donations per Donor</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={users
                .filter((user) => user.donations && Number(user.donations) > 0)
                .map((user) => ({
                  name: user.name,
                  amount: Number(user.donations),
                }))}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {users
                .filter((user) => user.donations && Number(user.donations) > 0)
                .map((entry, index) => (
                  <Cell
                    key={`cell-donation-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
