import { Router } from "express";
import multer from "multer";
import path from "path"
import Blog from "../models/blog.js"
import Comment from "../models/comment.js"
const router = Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

router.get("/add-new", (req, res) => {
    return res.render("addblog", {
        user: req.user
    })
})
router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body
    console.log(req.user._id)
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({ blogId: req.params.id }).sort({"createdAt": -1}).populate("createdBy")
    return res.render("blog", {
        user: req.user,
        blog,
        comments
    })
})

export default router