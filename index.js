import express from "express"
import path from "path"
import userRoute from "./routes/user.js"
import blogRoute from "./routes/blog.js"
import commentRoute from "./routes/comment.js"
import db from "./lib/db.js"
import cookieParser from "cookie-parser"
import checkForAuthCookie from "./middlewares/auth.js"
import Blog from "./models/blog.js"
const app = express()
const port = 8000

db()
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", path.resolve("views"))
app.use(cookieParser())
app.use(checkForAuthCookie("token"))
app.use(express.static(path.resolve("./public")))
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({createdAt: -1})
  return res.render("home", {
    user: req.user,
    blogs: allBlogs
  })
})
app.use("/user", userRoute)
app.use("/blog", blogRoute)
app.use("/blog", commentRoute)

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`)
})