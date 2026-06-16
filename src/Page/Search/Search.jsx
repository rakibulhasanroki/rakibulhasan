import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import OrderDetails from "../OrderDetails/OrderDetails";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [found, setFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const savedOrderId = localStorage.getItem("orderId");

    setSearched(true);

    if (searchTerm.trim() === savedOrderId) {
      setFound(true);
    } else {
      setFound(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
      <h1 className="w-[600px] mx-auto">Search here</h1>
      <div className="h-[52px] relative col-span-4 w-[600px] mx-auto">
        <input
          type="text"
          name="search"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
        />
        <IoMdSearch
          onClick={handleSearch}
          className="text-2xl text-black absolute right-2 top-2"
        />
      </div>
      {searched && !found && (
        <p className="mt-5 text-red-500">Order not found</p>
      )}

      {found && (
        <div className="w-full mt-10">
          <OrderDetails />
        </div>
      )}
    </div>
  );
};

export default Search;
