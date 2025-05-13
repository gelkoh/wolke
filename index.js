import { create } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
import https from "https"
import fs from "fs"
import express from "express"
import users from "./data/users.json" with { type: "json" }
import files from "./data/files.json" with { type: "json" }
import logs from "./data/logs.json" with { type: "json" }

const port = 3000
const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hbs = create({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.join(__dirname, "./views/layouts")
})

app.engine(".hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.static("./public"))

app.get("/", function (req, res) {
    const userFiles = files["user1"]
    res.render("index", { files: userFiles })
})

app.get("/storage", function (req, res) {
    const totalStorageAmount = users[0].storage_amount

    const storageInformation = {}

    const fileTypes = {}

    files.user1.forEach(file => {
        if (!fileTypes[file.type]) {
            fileTypes[file.type] = {
                totalAmount: 0,
                totalSize: 0,
                totalPercentage: 0
            }
        }

        fileTypes[file.type].totalAmount++
        fileTypes[file.type].totalSize += file.size
    })

    Object.keys(fileTypes).forEach(type => {
        fileTypes[type].totalPercentage = (
            (fileTypes[type].totalSize / totalStorageAmount) * 100
        ).toFixed(2); // z. B. "17.3"
    })

    let usedStorageAmount = 0

    files.user1.forEach(file => {
        usedStorageAmount += file.size
    })

    storageInformation["totalStorageAmount"] = totalStorageAmount
    storageInformation["usedStorageAmount"] = usedStorageAmount
    storageInformation["storageAnalysis"] = fileTypes
    storageInformation["totalUsedStoragePercentage"] = (usedStorageAmount / totalStorageAmount * 100).toFixed(2) + " %"
    
    res.render("storage", { storageInformation })
})

// Route to render the logs page
app.get('/log', (req, res) => {
    res.render('log', { logs });
})

// Route to render the profile page
app.get('/profile', (req, res) => {
    const user1 = users[0]
    res.render('profile', user1);
})

app.get("/hello", function (req, res) {
    res.send("Hello, Wolke!")
})

https.createServer({
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.cert")
}, app).listen(port, () => {
    console.log("Listening ...")
})