const BlogCategory = require("../../models/blogCategory.model");
async function updateBlogCate(id, updateData) {
    try {
        const blogCategory = await BlogCategory.findByPk(id);
        if (!blogCategory) {
            throw new Error("Blog category not found");
        }
        const updatedBlogCate = await blogCategory.update(updateData);
        return updatedBlogCate;
    } catch (error) {
        return res
            .status(500)
            .json({ message: "update failed: " + error.message });
    }
}

module.exports = {
    updateBlogCate,
};
