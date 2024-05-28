const Blog = require("../../models/blog.model");
const BlogCategory = require("../../models/blogCategory.model");
const Staff = require("../../models/staff.model");

async function restoreblog(id, res) {
    try {
        const blog = await Blog.findByPk(id);

        if (!blog) {
            throw new Error("blog not found");
        }

        blog.IsDeleted = true;

        await blog.save();

        return { success: true, message: "blog restored successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "restore failed: " + error.message });
    }
}

module.exports = {
    restoreblog,
};
