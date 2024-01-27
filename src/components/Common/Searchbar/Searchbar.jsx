import { Form, Button, Alert } from "react-bootstrap";
import { useSearch } from "./SearchContext";

function Searchbar() {
  const { searchTerm, setSearchTerm } = useSearch();
  console.log(searchTerm, setSearchTerm);

  const handleSearch = (e) => {    
    e.preventDefault();
    setSearchTerm(e.target.elements.search.value);
    console.log(searchTerm);
  };
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm); 
  };


  return (
    <div className="searchbar-container">
      <Form className="d-flex" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="btn-primary" type="submit">
          Search
        </Button>
      </Form>
      {/* <Alert variant="danger">{errorMessage}</Alert> */}
    </div>
  );
}

export default Searchbar;