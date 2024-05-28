const BlogCategory = require("../../models/blogCategory.model");
async function restoreBlogCate(id, res) {
    try {
        const blogcate = await BlogCategory.findByPk(id);

        if (!blogcate) {
            throw new Error("blogcate not found");
        }

        blogcate.IsDeleted = true;

        await blogcate.save();

        return { success: true, message: "blogcate restore successfully" };
    } catch (error) {
        return res
            .status(500)
            .json({ message: "restore failed: " + error.message });
    }
}

module.exports = {
    restoreBlogCate,
};
