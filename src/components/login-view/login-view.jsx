import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
    };

    fetch("https://nicks-movie-app-8dea9f746e67.herokuapp.com/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('Login failed');
        }
      })
      .catch((e) => {
        alert('Somethig went wrong');
      });
  };

  return (
    <Card className="mt-2 mb-3">
      <Card.Body>
        <Card.Title>Log in</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
              className="bg-light"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-light"
            />
          </Form.Group>
          <Button
            style={{
              backgroundColor: '#e50914',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
            }}
            className="mt-3"
            variant="primary"
            type="submit"
          >
            Log in
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
