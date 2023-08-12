import express from 'express'
import { AddUrlTOList } from './database/database.js';
import { SiteChecker } from './siteChecker.js';
SiteChecker();
const app = express()
const port = 3000
app.use(express.json());

app.post('/addurl', async (req, res) => {
    console.log(req.body);
    const { url, email } = req.body;
    AddUrlTOList(email, url)
    res.send({ status: true });
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})