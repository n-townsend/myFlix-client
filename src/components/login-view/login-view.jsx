import React from "react";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap"

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    fetch("https://nicks-movie-app-8dea9f746e67.herokuapp.com/login?", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <>
        <div className="d-grid justify-content-center">

            <Card className="mt-3 text-center login-card" >
                <Form className="p-5" onSubmit={handleSubmit}>
                    <h2 style={{ color: "#530f0f" }}>Login to Movie<span className="text-black"></span>Box</h2>
                    <Form.Group controlId="loginUsername">
                        <Form.Label className="visually-hidden">username</Form.Label>
                        <Form.Control className={"bg-light mt-5"}
                            type="text"
                            size="lg"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="5" />
                    </Form.Group>
                    <Form.Group controlId="loginPassword">
                        <Form.Label className="visually-hidden">password</Form.Label>
                        <Form.Control className={"bg-light  mt-3"}
                            type="password"
                            size="lg"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="5" />
                    </Form.Group>
                    <Button className="mt-3" variant="success" size="lg" type="submit">Login</Button>
                </Form>
            </Card>

            <h4 className="mt-5 text-white" >Don't have an account?</h4>
            <Button variant="secondary" href="/register">Register</Button>
        </div >
    </>
)
}