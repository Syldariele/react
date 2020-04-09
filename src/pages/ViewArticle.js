import React, { useState, useEffect } from 'react';

import { formatDate} from "../utils/date";
import { toast } from "react-toastify";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const ViewArticle = ({ match }) => {
    const { id } = match.params;
    console.log(id);

    const [ article, setArticle ] = useState({});
    const [ comments, setComments] = useState([]);

    useEffect(() => {
         fetch('http://localhost:3001/api/article?id='+ id)
             .then((result) => {
                 return result.json();
             })
             .then(({ status, article }) => {
                 if (status === "OK") {
                     setArticle(article);
                 } else {
                     toast.error("Oups... Une erreur est survenue !");
                 }
             })
             .catch((error) => {
                 toast.error("Oups... Une erreur est survenue !");
                 console.log(error);
             })
    }, [ id ]);

    useEffect(() => {
        fetch('http://localhost:3001/api/comments?id=' + id)
            .then((result) => {
                return result.json();
            })
            .then(({ status, comments}) => {
                if (status === "OK") {
                    setComments(comments);
                } else {
                    toast.error("Oups... Une erreur est survenue !");
                }
            })
            .catch((error) => {
                toast.error("Oups... Une erreur est survenue !");
                console.log(error);
            })
    }, [ id ]);

    const renderedComments = comments.map((comment) => {
        const { id, content, created_at, authorFirstname, authorLastname } = comment;
        return (
            <Card key={id}>
                <Card.Body>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        crée le&nbsp;
                        { formatDate(created_at)}&nbsp;
                        par {authorFirstname}&nbsp;{authorLastname.substring(0, 1)}.
                    </small>
                </Card.Footer>
            </Card>
        );
    });

    return(
        <Container>
            <h1>{article.title}</h1>
            <p>
                {article.content}
            </p>
            <p>
                posté le {formatDate(new Date())}<br/>
                par {article.authorFirstname} {article.authorLastname}
            </p>
            <div>
                 {renderedComments}
            </div>
        </Container>
    );
};

export default ViewArticle;