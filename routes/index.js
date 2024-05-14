const express = require("express");
const router = express.Router();

router.use("/staff", require("../assets/container/Staff/staff"));
router.use(
  "/product_type",
  require("../assets/container/ProductType/product_type")
);
router.use("/provider", require("../assets/container/Provider/provider"));
router.use("/product", require("../assets/container/Product/product"));
router.use(
  "/blogCategogry",
  require("../assets/container/BlogCategory/blogCategory")
);

module.exports = router;
