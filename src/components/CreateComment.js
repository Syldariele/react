import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {toast} from "react-toastify";


const CreateComment = ({ article_id, onCreate }) => {
    const [content, setContent] = useState("");

    const [ cookies, setCookie ] = useCookies();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/comments/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                content,
                author: cookies.user.id,
                article_id,
            }),
        })
            .then((result) => {
                return result.json();
            })
            .then(({ status, extra, result }) => {
                if (status === "OK") {
                    onCreate({
                        id: result.commentId,
                        content,
                        article_id,
                        created_at: new Date(),
                        authorId: cookies.user.id,
                        authorFirstname: cookies.user.firstname,
                        authorLastname: cookies.user.lastname,
                    });
                    setContent("");
                }else {
                    toast.error(
                        <div>
                            Oups... Nous avons eu une erreur ! <br/>
                            {extra}
                        </div>
                    );
                }
            })
            .catch((error) => {
                toast.error("Oups... Nous avons eu une erreur !");
            });
    };


    const handleChange = (event) => {
        switch (event.target.name) {
            case "content":
                setContent(event.target.value);
                break;
            // no default
        }
    };

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
                <Button variant="primary" type="submit">Créer un commentaire</Button>
            </Form>
        </Container>
    );
};

export default CreateComment;