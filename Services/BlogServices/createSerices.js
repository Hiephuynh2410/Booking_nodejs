const Blog = require("../../models/blog.model");
const BlogCategory = require("../../models/blogCategory.model");
const Staff = require("../../models/staff.model");

async function createBlog(data, res) {
    try {
        const { Title, Body, Thumbnail, Blog_category_id, Staff_id } = data;

        if (!Title || !Body || !Blog_category_id || !Staff_id) {
            throw new Error("Missing required fields");
        }

        const newBlog = await Blog.create({
            Title,
            Body,
            Thumbnail,
            Blog_category_id,
            Staff_id,
            Date_time: new Date(),
            IsDeleted: true,
        });

        return {
            success: true,
            message: "Blog created successfully",
            blog: newBlog,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Failed to create blog: " + err.message,
        };
    }
}
module.exports = {
    createBlog,
};
