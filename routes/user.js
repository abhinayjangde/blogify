import { Router } from "express";
import User from "../models/user.js";
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin")
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await User.matchPasswordAndGenerateToken(email, password)
        console.log("Generated token", token)
        res.cookie("token", token).redirect("/")
    } catch (e) {
        return res.render("signin", { error: "Invalid email or password" })
    }
})
router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body
    await User.create({ fullName, email, password })
    return res.redirect("/")
})
router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})
export default router