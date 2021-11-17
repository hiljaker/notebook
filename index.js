const express = require('express');
const app = express()
const port = 2003

app.listen(port, () => {
    console.log("server berjalan di port 2003");
})