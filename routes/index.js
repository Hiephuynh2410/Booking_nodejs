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
router.use("/blog", require("../assets/container/Blog/Blog"));
router.use("/branch", require("../assets/container/Branch/branch"));
router.use(
    "/services-type",
    require("../assets/container/ServicesType/servicesType")
);
router.use("/services", require("../assets/container/Services/services"));
router.use("/combo", require("../assets/container/Combo/combo"));
router.use("/schedule", require("../assets/container/Schedule/schedule"));
router.use(
    "/scheduleDetail",
    require("../assets/container/ScheuduleDetail/scheduleDetail")
);
router.use("/client", require("../assets/container/Client/client"));
router.use("/booking", require("../assets/container/Booking/Booking"));
router.use("/cart", require("../assets/container/Cart/cart"));

module.exports = router;
