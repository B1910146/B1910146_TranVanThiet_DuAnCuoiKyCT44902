const { ObjectId } = require("mongodb");

class DishService {
    constructor(client) {
        this.Dish = client.db().collection("dishes");
    }

    extractData(payload) {
        const dish = {
            dishName: payload.dishName,
            dishType: payload.dishType,
            dishDescription: payload.dishDescription,
            dishPrice: payload.dishPrice,
            dishImage: payload.dishImage,
        };

        Object.keys(dish).forEach(
            (key) => dish[key] === undefined && delete dish[key]
        );

        return dish;
    }

    async create(payload) {
        const dish = this.extractData(payload);
        // console.log(dish);
        const result = await this.Dish.insertOne(dish);
        return result;
    }

    async find(filter) {
        const cursor = await this.Dish.find(filter);
        return await cursor.toArray();
    }

    async findByName(Name) {
        return await this.Dish.find({ dishName: { $regex: new RegExp(Name), $option: "i" } });
    }

    async findByType(Type) {
        return await this.Dish.find({ dishType: { $regex: new RegExp(Type), $option: "i" } });
    }

    async findById(DId) {
        const filter = {
            _id: ObjectId.isValid(DId) ? new ObjectId(DId) : null
        };
        return await this.Dish.findOne(filter);
    }

    async update(DId, payload) {
        const filter = {
            _id: ObjectId.isValid(DId) ? new ObjectId(DId) : null
        };

        const update = this.extractData(payload);
        const result = await this.Dish.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(DId) {
        const filter = {
            _id: ObjectId.isValid(DId) ? new ObjectId(DId) : null
        };

        const result = await this.Dish.findOneAndDelete(filter);
        return result.value;
    }

    async deleteAll() {
        const result = await this.Dish.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DishService;