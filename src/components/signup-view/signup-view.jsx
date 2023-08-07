import React from "react"
import { useState } from "react"
import { Form, Button, Card } from "react-bootstrap"

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };

    fetch("https://nicks-movie-app-8dea9f746e67.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <>
        <div className="d-grid justify-content-center">
            <Card className="mt-3 text-center login-card" >
                <Form className="p-5 " onSubmit={handleSubmit}>
                    <h2 style={{ color: "#530f0f" }}>Welcome to Movie<span className="text-black"></span>Box</h2>
                    <h4>Create new account</h4>
                    <Form.Group controlId="signupUsername">
                        <Form.Label className="visually-hidden">username</Form.Label>
                        <Form.Control className={"bg-light mt-5"}
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="5"
                            size="lg"
                        />

                    </Form.Group>
                    <Form.Group controlId="signupPassword">
                        <Form.Label className="visually-hidden">password</Form.Label>
                        <Form.Control className={"bg-light mt-2"}
                            type="password"
                            size="lg"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />

                    </Form.Group>
                    <Form.Group controlId="signupEmail mt-2">
                        <Form.Label className="visually-hidden">email</Form.Label>
                        <Form.Control className={"bg-light mt-2"}
                            type="email"
                            size="lg"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="birth">
                        <Form.Label className="visually-hidden">birth</Form.Label>
                        <Form.Control className={"bg-light mt-2"}
                            type="date"
                            size="lg"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className="mt-3" variant="success" type="submit" size="lg">Register</Button>
                </Form >
            </Card>
        </div >
    </>
)
};