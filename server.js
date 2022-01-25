const express = require("express");

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public" + "/index.html")
});

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});