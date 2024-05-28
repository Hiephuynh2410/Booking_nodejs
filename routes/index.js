const express = require("express");
const router = express.Router();

//client
router.use("/client", require("../assets/container/Client/getAll"));
router.use("/client", require("../assets/container/Client/registerClient"));
router.use("/client", require("../assets/container/Client/login"));
router.use("/client", require("../assets/container/Client/changePassword"));
router.use("/client", require("../assets/container/Client/deleteClient"));
router.use("/client", require("../assets/container/Client/restoreClient"));

//staff
router.use("/staff", require("../assets/container/Staff/getAllStaff"));
router.use("/staff", require("../assets/container/Staff/createStaff"));
router.use("/staff", require("../assets/container/Staff/loginStaff"));
router.use("/staff", require("../assets/container/Staff/deleteStaff"));
router.use("/staff", require("../assets/container/Staff/restoreStaff"));
router.use("/staff", require("../assets/container/Staff/forgotPasswordStaff"));
router.use("/staff", require("../assets/container/Staff/changePassword"));

//services Type
router.use(
    "/services-type",
    require("../assets/container/ServicesType/getAllServicestype")
);
router.use(
    "/services-type",
    require("../assets/container/ServicesType/createServicesType")
);
router.use(
    "/services-type",
    require("../assets/container/ServicesType/updateServicestype")
);
router.use(
    "/services-type",
    require("../assets/container/ServicesType/deleteServicesType")
);
router.use(
    "/services-type",
    require("../assets/container/ServicesType/restoreServicesType")
);

//cart
router.use("/cart", require("../assets/container/Cart/getAll"));
router.use("/cart", require("../assets/container/Cart/AddToCart"));
router.use("/cart", require("../assets/container/Cart/DeleteItemCart"));

//combo
router.use("/combo", require("../assets/container/Combo/getAll"));
router.use("/combo", require("../assets/container/Combo/createCombo"));
router.use("/combo", require("../assets/container/Combo/updateCombo"));
router.use("/combo", require("../assets/container/Combo/deleteCombo"));
router.use("/combo", require("../assets/container/Combo/restoreCombo"));

//booking
router.use("/booking", require("../assets/container/Booking/getAll"));
router.use("/booking", require("../assets/container/Booking/createBooking"));
router.use("/booking", require("../assets/container/Booking/deleteBooking"));
router.use("/booking", require("../assets/container/Booking/restoreBooking"));

//branch
router.use("/branch", require("../assets/container/Branch/getAll"));
router.use("/branch", require("../assets/container/Branch/createBranch"));
router.use("/branch", require("../assets/container/Branch/updateBranch"));
router.use("/branch", require("../assets/container/Branch/deleteBranch"));
router.use("/branch", require("../assets/container/Branch/restoreBranch"));

// Services
router.use("/services", require("../assets/container/Services/getAllServices"));
router.use("/services", require("../assets/container/Services/createServices"));
router.use("/services", require("../assets/container/Services/updateServices"));
router.use("/services", require("../assets/container/Services/deleteServices"));
router.use(
    "/services",
    require("../assets/container/Services/restoreServices")
);

//blog
router.use("/blog", require("../assets/container/Blog/getAllBlog"));
router.use("/blog", require("../assets/container/Blog/createBlog"));
router.use("/blog", require("../assets/container/Blog/updateBlog"));
router.use("/blog", require("../assets/container/Blog/deleteBlog"));
router.use("/blog", require("../assets/container/Blog/restoreBlog"));

//blog cate
router.use(
    "/blogCategogry",
    require("../assets/container/BlogCategory/getAll")
);
router.use(
    "/blogCategogry",
    require("../assets/container/BlogCategory/createBlogCate")
);
router.use(
    "/blogCategogry",
    require("../assets/container/BlogCategory/updateBlogCate")
);
router.use(
    "/blogCategogry",
    require("../assets/container/BlogCategory/deleteBlogCate")
);
router.use(
    "/blogCategogry",
    require("../assets/container/BlogCategory/restoreBlogCate")
);

//product
router.use("/product", require("../assets/container/Product/getAll"));
router.use("/product", require("../assets/container/Product/createProduct"));
router.use("/product", require("../assets/container/Product/updateProduct"));
router.use("/product", require("../assets/container/Product/deleteProduct"));
router.use("/product", require("../assets/container/Product/restoreProduct"));
router.use("/product", require("../assets/container/Product/FilterByCate"));
router.use("/product", require("../assets/container/Product/filterByProvider"));
router.use("/product", require("../assets/container/Product/searchProduct"));

//product Type
router.use("/product_type", require("../assets/container/ProductType/getAll"));
router.use("/product_type", require("../assets/container/ProductType/create"));
router.use("/product_type", require("../assets/container/ProductType/update"));
router.use("/product_type", require("../assets/container/ProductType/delete"));
router.use("/product_type", require("../assets/container/ProductType/resotre"));

//provider
router.use("/provider", require("../assets/container/Provider/getAll"));
router.use("/provider", require("../assets/container/Provider/create"));
router.use("/provider", require("../assets/container/Provider/update"));
router.use("/provider", require("../assets/container/Provider/delete"));
router.use("/provider", require("../assets/container/Provider/restore"));

//schedule
router.use("/schedule", require("../assets/container/Schedule/getAll"));
router.use("/schedule", require("../assets/container/Schedule/create"));
router.use("/schedule", require("../assets/container/Schedule/delete"));
router.use("/schedule", require("../assets/container/Schedule/restore"));

//scheduledetail
router.use(
    "/scheduleDetail",
    require("../assets/container/ScheuduleDetail/getAll")
);
router.use(
    "/scheduleDetail",
    require("../assets/container/ScheuduleDetail/create")
);
router.use(
    "/scheduleDetail",
    require("../assets/container/ScheuduleDetail/update")
);
router.use(
    "/scheduleDetail",
    require("../assets/container/ScheuduleDetail/delete")
);

router.use(
    "/scheduleDetail",
    require("../assets/container/ScheuduleDetail/restore")
);
module.exports = router;
