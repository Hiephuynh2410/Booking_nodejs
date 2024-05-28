const BlogCategory = require("../../models/blogCategory.model");
async function deleteBlogCate(id, res) {
    try {
        const blogcate = await BlogCategory.findByPk(id);

        if (!blogcate) {
            throw new Error("blogcate not found");
        }

        blogcate.IsDeleted = false;

        await blogcate.save();

        return { success: true, message: "blogcate deleted successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "delete failed: " + error.message });
    }
}

module.exports = {
    deleteBlogCate,
};
