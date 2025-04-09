import React, { useState } from "react";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchResults = (data) => {
    setResults(data);
    setLoading(false); // stop loading once results are received
  };

  const handleSearchStart = () => {
    setLoading(true);  // start loading when search is triggered
  };

  const exportToCSV = () => {
    if (!results.length) return;

    const headers = [
      "Title",
      "URL",
      "Description",
      "Adaptive Support",
      "Remote Testing",
      "Duration",
      "Test Type",
    ];

    const rows = results.map((item) => [
      item.title || "",
      item.url || "",
      item.description || "",
      item.adaptive_support === "Yes" ? "Yes" : "No",
      item.remote_support === "No" ? "Yes" : "No",
      item.duration || "",
      (item.test_type || []).join(", "),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "assessment_results.csv");
    link.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">🧠 SHL Assessment Finder </h1>

      <SearchBar onSearchComplete={handleSearchResults} onSearchStart={handleSearchStart}/>

      {loading && (
        <div className="flex justify-center items-center mt-20">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <p className="text-blue-700 text-sm font-medium animate-pulse">
              Loading assessments...
            </p>
          </div>
        </div>
      )}


      {!loading && results.length > 0 && (
        <div className="mt-10 overflow-x-auto rounded-lg shadow">
          <div className="flex justify-end mb-4">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Export to CSV
            </button>
          </div>

          <table className="min-w-full bg-white text-sm text-left border border-gray-300 border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider text-xs sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 border border-gray-300">Title</th>
                <th className="px-4 py-3 border border-gray-300">URL</th>
                <th className="px-4 py-3 border border-gray-300">Description</th>
                <th className="px-4 py-3 border border-gray-300">Adaptive Support</th>
                <th className="px-4 py-3 border border-gray-300">Remote Testing</th>
                <th className="px-4 py-3 border border-gray-300">Duration</th>
                <th className="px-4 py-3 border border-gray-300">Test Type</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-4 py-3 border border-gray-300 font-medium text-gray-800">
                    {item.title || "—"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 text-blue-600 underline">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Visit
                    </a>
                  </td>
                  <td className="px-4 py-3 border border-gray-300 text-gray-600">
                    {item.description}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 text-center">
                    {item.adaptive_support === "Yes" ? "✅" : "❌"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 text-center">
                    {item.remote_support === "No" ? "✅" : "❌"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 text-gray-700">
                    {item.duration || "Not Available"}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 text-gray-700">
                    {Array.isArray(item.test_type) && item.test_type.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {item.test_type.map((type, idx) => {
                          const colorMap = {
                            "Knowledge & Skills": "bg-green-100 text-green-800",
                            "Development & 360": "bg-blue-100 text-blue-800",
                            "Competencies": "bg-purple-100 text-purple-800",
                            "Personality & Behavior": "bg-yellow-100 text-yellow-800",
                            "Biodata & Situational Judgement": "bg-pink-100 text-pink-800",
                            "Ability & Aptitude": "bg-orange-100 text-orange-800",
                            "Assessment Exercises": "bg-teal-100 text-teal-800",
                            "Simulations": "bg-red-100 text-red-800",
                          };

                          const colorClass = colorMap[type];

                          // Skip unknown types
                          if (!colorClass) return null;

                          return (
                            <span
                              key={idx}
                              className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded ${colorClass}`}
                            >
                              {type}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      "Not Available"
                    )}
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
