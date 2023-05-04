<template>
    <div class="col-10 m-auto row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-12">
            <h1 class="font-weight-bold text-center">
                Danh Sách Nhân Viên
            </h1>
            <UserList v-if="filteredUsersCount > 0" :users="filteredUsers" />
            <p v-else>Không có thành viên nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddUser">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <!-- <button class="btn btn-sm btn-danger" @click="removeAllUsers">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button> -->
            </div>
        </div>
    </div>
</template>
<script>
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/UserList.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        InputSearch,
        UserList,
    },
    data() {
        return {
            users: [],
            // activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // searchText() {
        //     this.activeIndex = -1;
        // },
    },
    computed: {
        userStrings() {
            return this.users.map((user) => {
                const { Name, Email, Address, PhoneNo, Username, Password, adminFlag } = user;
                return [Name, Email, Address, PhoneNo, Username, Password, adminFlag].join("");
            });
        },
        filteredUsers() {
            if (!this.searchText) return this.users;
            return this.users.filter((_user, index) =>
                this.userStrings[index].includes(this.searchText)
            );
        },
        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.findEmployee();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveUsers();
            // this.activeIndex = -1;
        },

        async removeAllUsers() {
            if (confirm("Bạn muốn xóa tất cả nhân viên?")) {
                try {
                    await UserService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddUser() {
            this.$router.push({ name: "user.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>