import createApiClient from "./api.service";
class DishService {
    constructor(baseUrl = "/api/dishes") {
        this.api = createApiClient(baseUrl);
    }
    async findAll() {
        return (await this.api.get("/dish")).data;
    }
    async create(data) {
        return (await this.api.post("/dish", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async findOne(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.post(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new DishService();