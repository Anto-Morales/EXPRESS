import { Router } from "express";
import { 
    createPost, 
    getPosts,
    updatePost,     
    deletePost 
} from "../controllers/post.controllers.js";

const router = Router();

router.post("/create", createPost);
router.get("/get", getPosts);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;