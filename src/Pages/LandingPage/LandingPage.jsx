import React, { useState } from 'react';
import Searchbar from '../../components/Common/Searchbar/Searchbar';
import PostList from '../../components/Common/Posts/PostList/PostList';
import Postcard from '../../components/Common/Posts/Cards/Cards';
import Navigation from '../../components/Common/NavBar/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="landing-page">
      <Navigation />
      <Container>
        <h1 className="text-center">Recipe Search</h1>
        <Searchbar onSearch={setSearchTerm} />
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <PostList searchTerm={searchTerm} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={5} md={4}>
            <Postcard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
