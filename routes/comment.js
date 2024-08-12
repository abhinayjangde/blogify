import { Router } from "express";
import Comment from "../models/comment.js"
const router = Router()


router.post("/comment/:blogId", async (req, res) => {
   
    await Comment.create({
        content: req.body.content,
        createdBy: req.user._id,
        blogId: req.params.blogId
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})


export default router