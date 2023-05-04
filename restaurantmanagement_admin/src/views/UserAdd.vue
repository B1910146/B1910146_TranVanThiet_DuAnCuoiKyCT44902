<template>
    <div class="page">
        <h4>Thêm Nhân Viên Mới</h4>
        <UserForm :user={} @submit:user="addUser" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        UserForm,
    },
    data() {
        return {
            user: null,
            message: "",
        };
    },
    methods: {
        async addUser(data) {
            try {
                await UserService.add(data);
                this.message = "Đã thêm nhân viên mới.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>