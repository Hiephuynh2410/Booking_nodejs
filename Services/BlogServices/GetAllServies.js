const Blog = require("../../models/blog.model");
const BlogCategory = require("../../models/blogCategory.model");
const Staff = require("../../models/staff.model");

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

module.exports = { GetAllBlog };
