import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/provider/AuthProvider";
import useAxiosPublic from "../Hooks/AxiousPublic";

const Recommand = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [favourite, setFavourite] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchRecommendation = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosPublic.get(`/api/recommend/${encodeURIComponent(user.email)}`);
        setFavourite(res.data.favourite || "");
        setSuggestions(res.data.suggestions || "");
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.error || "Failed to fetch recommendation");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [user?.email, axiosPublic]);

  if (loading) return <div className="text-center py-4">Loading recommendations...</div>;
  if (error) return <div className="text-red-600 text-center py-4">{error}</div>;
  if (!favourite) return <div className="text-center py-4">No recommendations available yet.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Food Recommendation</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Favorite Food:</span> {favourite}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Suggested Dishes:</span> <br />
        {suggestions.split("\n").map((item, idx) => (
          <span key={idx} className="block ml-4">
            • {item.replace(/^\d+\.\s*/, "")}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Recommand;
