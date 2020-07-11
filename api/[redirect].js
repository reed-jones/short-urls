const https = require('https');

const client = (query, variables = {}) => new Promise((resolve, reject) => {
const data = JSON.stringify({ query, variables })
const options = {
    hostname: process.env.SNOWPACK_PUBLIC_HOSTNAME,
    path: process.env.SNOWPACK_PUBLIC_GRAPHQL_PATH,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            resolve(JSON.parse(data))
        });

    }).on("error", (err) => {
        reject(err)
    });
    req.write(data);
    req.end();
})

const query = `
    query MyQuery($short: String!) {
        links(where: {short: {_eq: $short}}) {
            full
        }
    }
`;

module.exports = async (req, res) => {
    let { data } = await client(query, { short: req.query.redirect })
    console.log(JSON.stringify(data))
    res.status(302)
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Location', data.links.length && data.links[0] && data.links[0].full);
    res.send()
}
