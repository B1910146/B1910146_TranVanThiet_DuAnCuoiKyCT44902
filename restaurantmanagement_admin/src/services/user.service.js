import createApiClient from "./api.service";
class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    // async logIn(data) {
    //     return (await this.api.post("/login", data)).data;
    // }
    // async logInForAdmin(data) {
    //     return (await this.api.post("/admin/login", data)).data;
    // }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async logOut() {
        return (await this.api.get("/logout")).data;
    }
    async getInfo() {
        return (await this.api.get(`/user`)).data;
    }
    async updateInfo(data) {
        return (await this.api.post(`/user`, data)).data;
    }

    async deleteEmployee(id) {
        return (await this.api.delete(`/employee/${id}`)).data;
    }

    async findEmployee() {
        return (await this.api.get("/employee")).data;
    }

    async add(data) {
        return (await this.api.post("/employee", data)).data;
    }
}
export default new UserService();