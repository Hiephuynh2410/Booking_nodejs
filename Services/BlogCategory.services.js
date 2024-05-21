const BlogCategory = require("../models/blogCategory.model");

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
    GetAllBlogCate,
    CreateBlogCate,
    updateBlogCate,
    deleteBlogCate,
    restoreBlogCate,
};
