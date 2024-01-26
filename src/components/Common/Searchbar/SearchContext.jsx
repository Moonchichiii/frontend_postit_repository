import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {}
  
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
