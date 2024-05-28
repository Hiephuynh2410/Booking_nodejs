const Blog = require("../../models/blog.model");
const BlogCategory = require("../../models/blogCategory.model");
const Staff = require("../../models/staff.model");

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
module.exports = {
    deleteBlog,
};
