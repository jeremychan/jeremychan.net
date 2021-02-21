const axios = require("axios"); 

export default async (req, res) => {
    const response = await axios
        .get('https://medium.com/feed/@jeremy-chan')
        .then(({ data }) => {
            return data
        })
    res.send({
        text: response,
    })
}