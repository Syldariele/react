import React, { useState, useEffect} from 'react';

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
    return (
        <div>
            <h1>Page d'accueil</h1>
            <h2>Derniers articles</h2>
        </div>
    );
};

export default Home;