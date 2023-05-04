const DishService = require("../services/dish.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
// const multer = require('multer');

exports.create = async (req, res, next) => {
    if(!req.body?.dishName) {
        return next(new ApiError(400, "Dish name invalid."));
    }

    if(!req.body?.dishType) {
        return next(new ApiError(400, "Dish Type invalid."));
    }

    try {
        // const date = new Date().getTime();
        // const imageAltName = date+"_"+file.originalname;
        // const storage = multer.diskStorage({
        //     destination: function(req, file, cb) {
        //         cb(null, '../public/images');
        //     },
        //     filename: function(req, file, cb) {
        //         cb(null, imageAltName);
        //     }
        // });
        // const upload = multer({ storage: storage });
        const dishService = new DishService(MongoDB.client);
        // upload.single("dishImage");
        // req.body.dishImage = imageAltName;
        const doc = await dishService.create(req.body);
        // console.log(doc);
        return res.send(doc);
    } catch (error) {
        return next(new ApiError(500, "Xảy ra lỗi trong quá trình thêm món ăn."));
    }
};

exports.findAll = async (req, res, next) => {
    let docs = [];
    try {
        const dishService = new DishService(MongoDB.client);
        const { dishName } = req.query;
        // const { dishType } = req.query.dishType;
        if (dishName) {
            docs = await dishService.findByName(dishName);
        } else {
            docs = await dishService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Xảy ra lỗi trong quá trình tìm kiếm.")
        );
    }
    return res.send(docs);
};

exports.findOne = async (req, res, next) => {
    try {
        const dishService = new DishService(MongoDB.client);
        const doc = await dishService.findById(req.params.id);
        if (!doc) {
            return next(new ApiError(404, "Không tìm thấy món ăn."));
        }
        return res.send(doc);
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi trong quá trình truy xuất dữ liệu của món có Id = ${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.send({message: "Dữ liệu cập nhật rỗng, không làm gì cả."});
    }
    try {
        const dishService = new DishService(MongoDB.client);
        const doc = await dishService.update(req.params.id, req.body);
        if (!doc) {
            return next(new ApiError(404, "Không tìm thấy món ăn."));
        }
        return res.send({message: "Món ăn đã được cập nhật thành công."});
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi trong quá trình cập nhật món ăn có Id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const dishService = new DishService(MongoDB.client);
        const doc = await dishService.delete(req.params.id);
        if (!doc) {
            return next(new ApiError(404, "Không tìm thấy món ăn."));
        }
        return res.send({message: "Đã xóa món ăn."});
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Lỗi trong quá trình xóa món ăn có Id = ${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const dishService = new DishService(MongoDB.client);
        const deletedCount = await dishService.deleteAll();
        return res.send({
            message: "Đã xóa toàn bộ món ăn."
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                "Lỗi trong quá trình xóa toàn bộ món ăn."
            )
        );
    }
};