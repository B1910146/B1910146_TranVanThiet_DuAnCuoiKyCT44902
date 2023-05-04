<script>
import UserService from "@/services/user.service";
export default {
    props: {
        users: { type: Array, default: [] },
        // activeIndex: { type: Number, default: -1 },
    },
    // emits: ["update:activeIndex"],
    methods: {
        goToEditUser(userId) {
            this.$router.push({ name: "user.update", params: { id: userId } });
        },

        async removeUser(userId) {
            if (confirm("Bạn muốn xóa nhân viên này?")) {
                try {
                    await UserService.deleteEmployee(userId);
                    window.location.reload();
                    // this.$router.push({ name: "usermanagement" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    }
};
</script>
<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Địa Chỉ</th>
                <th scope="col">SĐT</th>
                <th scope="col">Quản Lý</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="user._id">
                <td>{{ user.Name }}</td>
                <td>{{ user.Email }}</td>
                <td>{{ user.Address }}</td>
                <td>{{ user.PhoneNo }}</td>
                <td>
                    <!-- <router-link :to="{
                        name: 'user.update',
                        params: { id: user._id },
                    }">
                        <button type="button" class="btn btn-warning m-1">
                            Sửa
                        </button>
                    </router-link> -->
                    <button type="button" class="btn btn-danger m-1" @click="removeUser(user._id)">
                        Xóa
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>