import Resume from "../models/resume.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    if (!req.body.email || !req.body.github || !req.body.description || !req.body.linkdin || !req.body.link) {
        return next(errorHandler(400, "Please provide all required fields"));
    }
    const newResume = new Resume({
        ...req.body,
        userId: req.user.id,
    });
    try {
        const savedResume = await newResume.save();
        res.status(201).json(savedResume);
    } catch (error) {
        next(error);
    }
};

export const getresumes = async (req, res, next) => {
    try {
        const resumes = await Resume.find({});
        res.status(200).json({ resumes });
    } catch (error) {
        next(error);
    }
};

export const deleteresume = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this post"));
    }
    try {
        await Resume.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted");
    } catch (error) {
        next(error);
    }
};
