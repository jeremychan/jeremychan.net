import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMediumM } from '@fortawesome/free-brands-svg-icons'

const axios = require("axios");

const Blog = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get('/api/medium')
            .then(res => res.data)
            .then(res => {
                setPosts(res);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h3>
                Latest Blog Posts
            </h3>

            {isLoading && <p>Loading recent blog posts from Medium...</p>}
            {posts.slice(0, 10).map((p, index) => (
                <a href={p.link} target="_blank">
                    <div key={index} className="card">
                        <div>{p.title}</div>
                        <div className="text-right">
                            {new Date(p.pubDate).toLocaleDateString()}
                        </div>
                    </div>
                </a>
            ))}

            <a href="https://medium.com/@jeremy-chan" target="_blank">
                Read all on Medium
            </a>
        </div>
    )
};

export default Blog
