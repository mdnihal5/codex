import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    if (req.body.category || !req.body.link || !req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please provide all required fields"));
    }
    const newPost = new Post({
        ...req.body,
        userId: req.user.id,
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};

export const getposts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
};

export const deletepost = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this post"));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted");
    } catch (error) {
        next(error);
    }
};
