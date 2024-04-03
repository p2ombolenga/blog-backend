import Joi from "joi";

const createPostSchema = Joi.object({
    title: Joi.string(),
    slug: Joi.string(),
    content: Joi.string()
});

const updatePostSchema = Joi.object({
    title: Joi.string().optional(),
    slug: Joi.string().optional(),
    content: Joi.string().optional(),
}).or('title', 'slug', 'content');

export const validateCreatePost = (postData) => {
    return createPostSchema.validate(postData);
};

export const validateUpdatePost = (postData) =>{
    return updatePostSchema.validate(postData);
};

