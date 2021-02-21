import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faMedium from '@fortawesome/fontawesome-free-brands/faMedium'

const axios = require("axios");

const Blog = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log("fetching" + process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL + '/api/medium');
        axios
            .get(process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL + '/api/medium')
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
                Blog Posts
            </h3>

            {isLoading && <p>Loading recent blog posts from Medium...</p>}
            {posts.slice(0, 10).map((p, index) => (
                <a href={p.link} target="_blank">
                    <div key={index} className="card">
                        <div>{p.title}</div>
                        <div class="text-right">
                            {new Date(p.pubDate).toLocaleDateString()}
                        </div>
                    </div>
                </a>
            ))}

            <ul className="icons">
                <li><a href="https://medium.com/@jeremy-chan" target="_blank">
                    <FontAwesomeIcon icon={faMedium} />
                </a></li>
            </ul>
        </div>
    )
};

export default Blog
