import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signin = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
        case "email":
            setEmail(value);
            break;
        case "password":
            setPassword(value);
            break;
            // no default
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Signin.email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="adress@mail.tld"
                    />
                </Form.Group>
                <Form.Group controlId="Signin.password">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>
            <Button variant="outline-success" type="submit">Connexion</Button>
            </Form>
        </Container>
    );
};

export default Signin;