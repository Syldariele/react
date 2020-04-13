import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Card from "react-bootstrap/Card";
import {formatDate} from "../utils/date";
import Container from "react-bootstrap/Container";

const ViewComments = ({ article_id }) => {
    const [ comments, setComments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/comments?id=' + article_id)
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
    }, [article_id]);

    const renderedComments = comments.map((comment) => {
        const { article_id, content, created_at, authorFirstname, authorLastname } = comment;
        return (
            <Card key={article_id}>
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
            <h5>Derniers commentaires</h5>
            <div>
                {renderedComments}
            </div>
        </Container>
    );
};

export default ViewComments;