<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="Name" type="text" class="form-control" v-model="userLocal.Name" />
            <ErrorMessage name="Name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Email">Email</label>
            <Field name="Email" type="email" class="form-control" v-model="userLocal.Email" />
            <ErrorMessage name="Email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Address">Địa Chỉ</label>
            <Field name="Address" type="text" class="form-control" v-model="userLocal.Address" />
            <ErrorMessage name="Address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="SĐT">SĐT</label>
            <Field name="PhoneNo" type="tel" class="form-control" v-model="userLocal.PhoneNo" />
            <ErrorMessage name="PhoneNo" class="error-feedback" />
        </div>
        <!-- <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="userLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div> -->
        <div class="form-group">
            <button class="btn btn-success">Lưu</button>
            <a class="ml-1 btn btn-primary" href="/employee">Quay lại</a>
            <button v-if="userLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteUser">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:user", "delete:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            Name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            Email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            Address: yup
                .string()
                .max(100, "Mô tả có nhiều nhất 100 ký tự."),
            PhoneNo: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            userLocal: this.user,
            userFormSchema,
        };
    },
    methods: {
        submitUser() {
            this.$emit("submit:user", this.userLocal);
        },
        deleteUser() {
            this.$emit("delete:user", this.userLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
