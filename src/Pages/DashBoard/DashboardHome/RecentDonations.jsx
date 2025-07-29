import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const RecentDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: donations = [] } = useQuery({
    queryKey: ['recentDonations', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests?email=${user?.email}&limit=3`);
      return res.data.donations;
    },
    enabled: !!user?.email,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donation/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['recentDonations', user?.email]);
    }
  });

  const deleteRequest = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['recentDonations', user?.email]);
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B91C1C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest.mutate(id);
        Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
      }
    });
  };

  if (!donations.length) return null;

  return (
    <div className="p-4 m-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-neutral">Recent Donations</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="hover">
                <td>{donation.recipientName}</td>
                <td>{donation.district}, {donation.upazila}</td>
                <td>{donation.donationDate}</td>
                <td>{donation.donationTime}</td>
                <td>{donation.bloodGroup}</td>
                <td className={`capitalize font-medium ${
                  donation.status === 'done' ? 'text-success' :
                  donation.status === 'inprogress' ? 'text-info' :
                  donation.status === 'canceled' ? 'text-error' : 'text-warning'}`}>{donation.status}</td>
                <td>
                  {donation.status.toLowerCase() === 'inprogress' && donation.donorName ? (
                    <>
                      <p>{donation.donorName}</p>
                      <p className="text-sm text-neutral-content">{donation.donorEmail}</p>
                    </>
                  ) : '—'}
                </td>
                <td className="space-x-1">
                  {donation.status.toLowerCase() === 'inprogress' && (
                    <>
                      <button className="btn btn-xs btn-success" onClick={() => updateStatus.mutate({ id: donation._id, status: 'done' })}>Done</button>
                      <button className="btn btn-xs btn-error" onClick={() => updateStatus.mutate({ id: donation._id, status: 'canceled' })}>Cancel</button>
                    </>
                  )}
                  <button className="btn btn-xs btn-info" onClick={() => navigate(`/dashboard/donation-details/${donation._id}`)}>View</button>
                  <button className="btn btn-xs btn-warning" onClick={() => navigate(`/dashboard/edit-donation/${donation._id}`)}>Edit</button>
                  <button className="btn btn-xs btn-outline btn-error" onClick={() => handleDelete(donation._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right mt-4">
        <button
          className="btn bg-secondary text-secondary-content hover:bg-yellow-300"
          onClick={() => navigate('/dashboard/my-donation-requests')}
        >
          View My All Requests
        </button>
      </div>
    </div>
  );
};

export default RecentDonations;
