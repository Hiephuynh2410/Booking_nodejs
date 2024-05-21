const Blog = require("../models/blog.model");
const BlogCategory = require("../models/blogCategory.model");
const Staff = require("../models/staff.model");

async function GetAllBlog(res) {
    try {
        const blog = await Blog.findAll({
            where: {
                IsDeleted: true,
            },
            include: [
                {
                    model: BlogCategory,
                    attributes: ["Blog_category_id", "Title", "Description"],
                },
                {
                    model: Staff,
                    attributes: [
                        "staff_id",
                        "Name",
                        "Phone",
                        "Avatar",
                        "Email",
                    ],
                },
            ],
        });
        return blog;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "getall failed: " + error.message });
    }
}

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

async function updateBlog(id, updateData) {
    try {
        const blog = await Blog.findByPk(id);
        if (!blog) {
            throw new Error("Blog not found");
        }

        await blog.update(updateData, {
            where: {
                Blog_post_id: id,
            },
        });

        return { success: true, message: "Blog updated successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update blog: " + error.message);
    }
}

async function deleteBlog(id, res) {
    try {
        const blog = await Blog.findByPk(id);

        if (!blog) {
            throw new Error("blog not found");
        }

        blog.IsDeleted = false;

        await blog.save();

        return { success: true, message: "blog deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

async function restoreblog(id, res) {
    try {
        const blog = await Blog.findByPk(id);

        if (!blog) {
            throw new Error("blog not found");
        }

        blog.IsDeleted = true;

        await blog.save();

        return { success: true, message: "blog restore successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

module.exports = {
    GetAllBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    restoreblog,
};
