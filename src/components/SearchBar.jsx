import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Search } from "lucide-react";

const SearchBar = ({ onSearchStart, onSearchComplete }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setError(null);
    setLoading(true);
    if (onSearchStart) onSearchStart();
    // ${import.meta.env.BACKEND_URI}
    try {
      const uri=`${import.meta.env.VITE_BACKEND_URI}/recommend`;
      console.log(uri)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await res.json();
      if (onSearchComplete) {
        onSearchComplete(data.recommended_assessments);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
        />
        <Button onClick={handleSearch} disabled={loading}>
          <Search size={16} className="mr-1" />
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
