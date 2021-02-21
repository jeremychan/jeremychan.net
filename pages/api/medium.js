const axios = require("axios"); 
const xml2js = require("xml2js"); 

export default async (req, res) => {
    const response = await axios
        .get('https://medium.com/feed/@jeremy-chan')
        .then(async (res) => {
            return await xml2js.parseStringPromise(res.data, (_err, result) => result);
        });
    res.send({
        ...response,
    })
}