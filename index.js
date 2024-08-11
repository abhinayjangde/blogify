import express from "express"
import path from "path"
import userRoute from "./routes/user.js"
import db from "./lib/db.js"
const app = express()
const port = 8000

db()
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.resolve("views"))

app.get("/", (req, res) => {
  res.render("home")
})
app.use("/user", userRoute)

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`)
})