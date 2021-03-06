import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CreateArticle = () => {
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ cookies, setCookie ] = useCookies();
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/articles/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                author: cookies.user.id,
            }),
        })
            .then((result) => {
                return result.json();
            })
            .then(({ status, extra }) => {
                if (status === "OK") {
                    setTitle("");
                    setContent("");
                    toast.success("L'article a bien été crée");
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

       // if (event.target.name === "title") {
           // setTitle(event.target.value);
        //} else  if (event.target.name === "content") {
            //setContent(event.target.value);
        //} else {
            //setAuthor(event.target.value);
        //}

        switch(event.target.name) {
        case "title":
            setTitle(event.target.value);
            break;
        case "content":
            setContent(event.target.value);
            break;
            //no default
        }
    };

    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="article.title">
                    <Form.Label>Titre de l'article</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={title}
                    />
                </Form.Group>
                <Form.Group controlId="article.content">
                    <Form.Label>Contenu de l'article</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        onChange={handleChange}
                        value={content}
                    />
                </Form.Group>
                 <Button  variant="primary" type="submit">Valider</Button>
            </Form>
        </Container>
    )
};

export default CreateArticle;