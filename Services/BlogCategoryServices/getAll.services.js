const BlogCategory = require("../../models/blogCategory.model");

async function GetAllBlogCate() {
    try {
        const blogCategogry = await BlogCategory.findAll({
            where: {
                IsDeleted: true,
            },
            attributes: { exclude: ["IsDeleted"] },
        });
        return blogCategogry;
    } catch (error) {
        throw new Error("get all failed: " + error.message);
    }
}

module.exports = {
    GetAllBlogCate,
};
