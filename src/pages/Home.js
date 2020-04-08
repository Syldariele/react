import React, { useState, useEffect} from 'react';

import { formatDate } from '../utils/date';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';


const Home = () => {
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        fetch( 'http://localhost:3001/api/articles')
            .then((result) => {
                return result.json();
            })
            .then(({ status, articles }) => {
                if (status === "OK") {
                    setArticles(articles);
                } else {
                    console.log("error : ", status);
                }
            })
            .catch((error) => {
                console.log("error : ", error);
            });
    }, []);

    const renderedArticles = articles.map((article) => {
        const { id, title, content, created_at, authorFirstname, authorLastname } = article;
        return (
            <Card key={id}>
                <Card.Header>
                    <Card.Title as="h5">
                        {title}
                    </Card.Title>
                </Card.Header>
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

    return (
        <Container>
            <h1>Page d'accueil</h1>
            <h2>Derniers articles</h2>
            <CardDeck>
            {renderedArticles}
            </CardDeck>
        </Container>
    );
};

export default Home;