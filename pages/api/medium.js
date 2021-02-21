const axios = require("axios"); 
const xml2js = require("xml2js"); 

export default async (req, res) => {
    const response = await axios
        .get('https://medium.com/feed/@jeremy-chan')
        .then(async (res) => {
            const json = await xml2js.parseStringPromise(res.data, (_err, result) => result);
            const posts = json['rss']['channel'][0]['item'].map(item => {
                return {
                    title: item['title'][0],
                    pubDate: item['pubDate'][0],
                    content: item['content:encoded'][0],
                    link: item['link'][0]
                }
            })
            return posts
        });
    res.send(response);
}