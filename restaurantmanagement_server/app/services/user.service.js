const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    async extractData(payload) {
        const hashedPassword = await bcrypt.hash(payload.Password, 10);
        // console.log(hashedPassword);
        const user = {
            Name: payload.Name,
            Email: payload.Email,
            Address: payload.Address,
            PhoneNo: payload.PhoneNo,
            Username: payload.Username,
            Password: hashedPassword,
            adminFlag: payload.adminFlag
        };

        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );

        return user;
    }

    async extractEmployeeData(payload) {
        // const hashedPassword = await bcrypt.hash(payload.Password, 10);
        // console.log(hashedPassword);
        const user = {
            Name: payload.Name,
            Email: payload.Email,
            Address: payload.Address,
            PhoneNo: payload.PhoneNo,
            Username: "",
            Password: "",
            adminFlag: 0
        };

        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );

        return user;
    }

    async create(payload) {
        const user = await this.extractData(payload);
        const result = await this.User.insertOne(user);
        return result;
    }

    async add(payload) {
        const user = await this.extractEmployeeData(payload);
        const result = await this.User.insertOne(user);
        return result;
    }

    async findEmployee() {
        const cursor = await this.User.find({adminFlag: 0});
        return await cursor.toArray();
    }

    async findUsername(Username) {
        return await this.User.findOne({ Username: Username, adminFlag: 0 });
    }

    async findAdmin(Username) {
        return await this.User.findOne({ Username: Username, adminFlag: 0 });
    }

    async findById(userId) {
        const filter = {
            _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null
        };
        return await this.User.findOne(filter);
    }

    async update(userId, payload) {
        const filter = {
            _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null
        };
        const update = await this.extractData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(userId) {
        const filter = {
            _id: ObjectId.isValid(userId) ? new ObjectId(userId) : null
        };

        const result = await this.User.findOneAndDelete(filter);
        return result.value;
    }
}

module.exports = UserService;