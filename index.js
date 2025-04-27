const https = require("https")
const express = require("express")
const server = express()
const fs = require("fs")
const port = 3000

server.get("/", function (req, res) {
    res.send(`
        <a href="/hello">Hello</a>
    `)
})

server.get("/hello", function (req, res) {
    res.send("Hello, Wolke!")
})

https.createServer({
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert")
}, server).listen(port, () => {
    console.log("Listening ...")
})
