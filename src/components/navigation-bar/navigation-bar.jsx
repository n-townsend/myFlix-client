import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onSearch(query);
  }, [query]);

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: '#6d201c', textColor: 'text-light' }}
      variant="dark"
      className="mb-4"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          style={{ color: '#fff', fontSize: '25px' }}
          as={Link}
          to="/"
          onClick={() => setQuery('')}
        >
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" onClick={() => setQuery('')}>
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form className="d-flex">
              <Form.Control
                style={{ backgroundColor: 'white' }}
                type="search"
                placeholder="Search"
                className="md-2"
                aria-label="Search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};