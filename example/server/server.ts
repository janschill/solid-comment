import express from "express";
import path from "path";

const port = 3001;
const app = express();

app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "ejs")
app.use(express.static(path.resolve("./") + "/dist"));

app.get("/", (req, res) => {
  res.render('index', { appName: "Solid Comment" })
});

app.listen(port, () => console.log(`Listening on port ${port}: http://localhost:${port}`))
