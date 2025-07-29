import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaTint,
  FaGlobeAsia,
  FaMapMarkerAlt,
  FaLandmark,
  FaClock,
} from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Search = () => {
  const axiosPublic = useAxiosPublic();
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [msg, setMsg] = useState("");

  const { register, handleSubmit, watch } = useForm();

  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  useEffect(() => {
    const loadLocations = async () => {
      const [divisionData, districtData, upazilaData] = await Promise.all([
        fetch("/division.json").then((res) => res.json()),
        fetch("/district.json").then((res) => res.json()),
        fetch("/upazila.json").then((res) => res.json()),
      ]);
      setDivisions(divisionData);
      setDistricts(districtData);
      setUpazilas(upazilaData);
    };
    loadLocations();
  }, []);

  const filteredDistricts = districts.filter(
    (d) => d.division_id === selectedDivision
  );
  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrict
  );

  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["searchDonors", searchParams],
    queryFn: async () => {
      if (!searchParams) return [];

      const res = await axiosPublic.get(
        `/donors?bloodGroup=${searchParams.bloodGroup}&district=${searchParams.district}&upazila=${searchParams.upazila}&division=${searchParams.division}`
      );
      if (res.data.length === 0) {
        setMsg("No Donor Found");
      }
      return res.data;
    },
    enabled: !!searchParams,
  });

  const onSubmit = (data) => {
    const divisionName =
      data.division && divisions.find((d) => d.id === data.division).name;
    const districtName =
      data.district && districts.find((d) => d.id === data.district)?.name;

    data = {
      ...data,
      division: divisionName,
      district: districtName,
    };
    setSearchParams(data);
  };

  return (
    <div className="pt-20">
      <Helmet>
        <title>Search Donor | RedAid</title>
      </Helmet>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Search Donor</h2>
          <p className="text-sm text-gray-500">
            Find eligible donors based on location and blood group
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {/* Division */}
          <select {...register("division")} className="select select-bordered">
            <option value="">Select Division</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            {...register("district")}
            className="select select-bordered"
            disabled={!selectedDivision}
          >
            <option value="">Select District</option>
            {filteredDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            {...register("upazila")}
            className="select select-bordered"
            disabled={!selectedDistrict}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>

          {/* Blood Group */}
          <select
            {...register("bloodGroup")}
            className="select select-bordered"
          >
            <option value="">Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="btn btn-primary col-span-1 md:col-span-4 w-full"
          >
            Search
          </button>
        </form>

        {/* Donor Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {!isLoading && donors?.length > 0 ? (
            donors?.map((user) => (
              <div
                key={user._id}
                className="flex flex-col w-full max-w-sm p-6 mx-auto divide-y rounded-xl bg-base-100 shadow-md"
              >
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="object-cover w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-primary">{user.name}</h4>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <FaTint className="text-red-500 w-4 h-4" />
                    <span className="font-medium">Blood Group:</span>{" "}
                    {user.bloodGroup}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaGlobeAsia className="text-indigo-500 w-4 h-4" />
                    <span className="font-medium">Division:</span>{" "}
                    {user.division}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500 w-4 h-4" />
                    <span className="font-medium">District:</span>{" "}
                    {user.district}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaLandmark className="text-green-600 w-4 h-4" />
                    <span className="font-medium">Upazila:</span> {user.upazila}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-yellow-500 w-4 h-4" />
                    <span className="font-medium">Last Donated:</span>{" "}
                    {user.lastDonated || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-red-500">{msg}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
