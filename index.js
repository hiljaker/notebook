const express = require('express');
const app = express()
const port = 2003
const cors = require('cors');
const bearer = require('express-bearer-token');
const { auth_routes, content_routes } = require('./src/routers');

app.use(express.json())
app.use(cors({
    exposedHeaders: ["access-token"]
}))
app.use(bearer())

app.use("/auth", auth_routes)
app.use("/content", content_routes)

app.listen(port, () => {
    console.log("server berjalan di port 2003");
})