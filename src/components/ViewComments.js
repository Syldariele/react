import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Card from "react-bootstrap/Card";
import {formatDate} from "../utils/date";
import {ListGroup} from "react-bootstrap";
import CreateComment from "../components/CreateComment";


const ViewComments = ({ article_id }) => {
    const [ comments, setComments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/comments?article_id=' + article_id)
            .then((result) => {
                return result.json();
            })
            .then(({ status, comments}) => {
                if (status === "OK") {
                    setComments(comments.reverse());
                } else {
                    toast.error("Oups... Une erreur est survenue !");
                }
            })
            .catch((error) => {
                toast.error("Oups... Une erreur est survenue !");
                console.log(error);
            })
    }, [article_id]);

    const handleCreate = (comment) => {
      const newComments = [ ...comments ];
      newComments.push(comment);
      setComments(newComments);
    };

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
                        par {authorFirstname}&nbsp;{authorLastname}
                    </small>
                </Card.Footer>
            </Card>
        );
    });

    return(
            <ListGroup>
                {renderedComments}
                <ListGroup.Item>
                    <CreateComment article_id={article_id}
                                   onCreate={handleCreate}
                    />
                </ListGroup.Item>
            </ListGroup>
    );
};

export default ViewComments;