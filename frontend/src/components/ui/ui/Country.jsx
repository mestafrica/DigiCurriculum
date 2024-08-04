import { useState, useEffect, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";

function CountryDropdown({ selectedCountry, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch countries from the REST Countries API
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        const countryList = data.map(country => country.name.common).sort();
        setCountries(countryList);
      } catch (error) {
        setError('Failed to load countries');
        console.error(error); // Log error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelect = (country) => {
    onSelect(country);
    setIsOpen(false);
    setFilter(""); // Reset the filter
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <div className="py-2 px-4 text-gray-500">Loading...</div>;
  if (error) return <div className="py-2 px-4 text-red-500">{error}</div>;

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Country"
        value={selectedCountry}
        onClick={() => setIsOpen(!isOpen)}
        onChange={(e) => setFilter(e.target.value)}
        className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom pr-8"
      />
      <IoChevronDown className="absolute right-3 top-3 text-gray-700 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="absolute z-10 bg-white border rounded-lg shadow-lg w-full mt-1 max-h-48 overflow-y-auto">
          {filteredCountries.length === 0 ? (
            <div className="py-2 px-4 text-gray-500">No countries found</div>
          ) : (
            filteredCountries.map((country, index) => (
              <div
                key={index}
                className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(country)}
              >
                {country}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CountryDropdown;
