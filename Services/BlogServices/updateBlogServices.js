const Blog = require("../../models/blog.model");
const BlogCategory = require("../../models/blogCategory.model");
const Staff = require("../../models/staff.model");

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

module.exports = {
    updateBlog,
};
