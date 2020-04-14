import React, { useState, useEffect } from 'react';

import { formatDate} from "../utils/date";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import ViewComments from "../components/ViewComments";

const ViewArticle = ({ match }) => {
    const { id } = match.params;
    console.log(id);

    const [ article, setArticle ] = useState({});

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

    return(
        <Container>
            <h1>{article.title}</h1>
            <p>
                {article.content}
            </p>
            <p>
                posté le {formatDate(article.created_at)}<br/>
                par {article.authorFirstname} {article.authorLastname}
            </p>
           <ViewComments article_id={id}/>
        </Container>
    );
};

export default ViewArticle;