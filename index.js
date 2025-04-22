const express = require("express")
const server = express()
const port = 3000

server.get("/hello", function (req, res) {
    res.send("Hello, Wolke!")
})

server.listen(port, function () {
    console.log("Express listening on " + port)
})
