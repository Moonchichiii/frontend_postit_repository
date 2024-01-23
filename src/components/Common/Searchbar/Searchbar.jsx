import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../Searchbar/Searchbar.module.css'

function Searchbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div>
             <div className="searchbar-container">
            <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-success" type="submit">Search</Button>
            </Form>
            </div>
        </div>
    );
}

export default Searchbar;

