const express = require("express");
const router = express.Router();
const MyAuthorize = require("../../../JwtToken/MyAuthorized");

const {
    GetAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct,
    filterProductByCategory,
    filterProductByProdvider,
    searchProduct,
} = require("../../../Services/Product.services");

router.use(MyAuthorize);
//get all product
router.get("/", async (req, res) => {
    try {
        const products = await GetAllProduct(req, res);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// //create
router.post("/create", async (req, res) => {
    try {
        const newProduct = await createProduct(req.body, res);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// // Update
router.put("/update/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const updatedProduct = await updateProduct(productId, updateData);
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// //delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteProduct(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// //restore
router.patch("/restore/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await restoreProduct(id);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/filterByCategory/:productTypeId", async (req, res) => {
    try {
        const { productTypeId } = req.params;
        const products = await filterProductByCategory(productTypeId, res);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/filterByProvider/:providerId", async (req, res) => {
    try {
        const { providerId } = req.params;
        const provider = await filterProductByProdvider(providerId, res);
        res.json(provider);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        const products = await searchProduct(query);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
