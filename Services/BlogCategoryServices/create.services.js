const BlogCategory = require("../../models/blogCategory.model");
async function CreateBlogCate(data, res) {
    try {
        const { Title, Description } = data;
        if (!Title || !Description) {
            throw new Error("Title and desc is required");
        }
        const newBlogCate = await BlogCategory.create({
            Title,
            Description,
            IsDeleted: true,
        });
        return res
            .status(201)
            .json({ message: "create successful", BlogCate: newBlogCate });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "get all failed: " + error.message });
    }
}

module.exports = {
    CreateBlogCate,
};
