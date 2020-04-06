import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const CreateComment = () => {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [idArticle, setIdArticle] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Content :", content);
        console.log("Author : ", author);
        console.log("Id Article : ", idArticle);
    }

    const handleChange = (event) => {
        console.log("Target Name :", event.target.name);
        console.log("Target Value :", event.target.value);

        switch (event.target.name) {

            case "content":
                setContent(event.target.value);
                break;
            case "author":
                setAuthor(event.target.value);
                break;
            case "idArticle":
                setIdArticle(event.target.value);
                break;
            // no default
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="comment.content">
                    <Form.Label>Contenu du commentaire</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        onChange={handleChange}
                        value={content}
                    />
                </Form.Group>
                <Form.Group controlId="comment.author">
                    <Form.Label>ID de l'auteur</Form.Label>
                    <Form.Control
                        type="number"
                        name="author"
                        onChange={handleChange}
                        value={author}
                     />
                </Form.Group>
                <Form.Group controlId="comment.idArticle">
                    <Form.Label>Id de l'article</Form.Label>
                    <Form.Control
                        type="number"
                        name="idArticle"
                        onChange={handleChange}
                        value={idArticle}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Créer un commentaire</Button>
            </Form>
        </Container>
    );
};

export default CreateComment;