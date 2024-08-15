"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./_component/loader";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuery(value);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setLoader(!loader);
    }
  };

  return (
    <div>
      {!loader ? (
        <div className="flex text-white items-center justify-center h-screen w-screen bg-gray-100 flex-col gap-4">
          <h1 className="text-black text-xl font-semibold">Product Search</h1>
          <div className="flex gap-2 w-full px-4 max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for products..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            />
            <button
              className="bg-purple-800 py-2 px-8 flex rounded-md text-white font-semibold"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
