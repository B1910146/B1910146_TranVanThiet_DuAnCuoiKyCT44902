<template>
    <Form @submit="submitDish" :validation-schema="dishFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="dishName" type="text" class="form-control" v-model="dishLocal.dishName" />
            <ErrorMessage name="dishName" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dishType">Loại</label>
            <Field name="dishType" type="text" class="form-control" v-model="dishLocal.dishType" />
            <ErrorMessage name="dishType" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dishDescription">Mô tả (ngắn)</label>
            <Field name="dishDescription" type="text" class="form-control" v-model="dishLocal.dishDescription" />
            <ErrorMessage name="dishDescription" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dishPrice">Giá</label>
            <Field name="dishPrice" type="number" class="form-control" v-model="dishLocal.dishPrice" />
            <ErrorMessage name="dishPrice" class="error-feedback" />
        </div>
        <!-- <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="dishLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div> -->
        <div class="form-group">
            <button class="btn btn-success">Lưu</button>
            <a class="ml-1 btn btn-primary" href="/dish">Quay lại</a>
            <button v-if="dishLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteDish">
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
    emits: ["submit:dish", "delete:dish"],
    props: {
        dish: { type: Object, required: true }
    },
    data() {
        const dishFormSchema = yup.object().shape({
            dishName: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            dishType: yup
                .string()
                .required("Loại phải có giá trị.")
                .min(2, "Loại phải ít nhất 2 ký tự.")
                .max(50, "Loại có nhiều nhất 50 ký tự."),
            dishDescription: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .min(20, "Mô tả phải ít nhất 20 ký tự.")
                .max(100, "Mô tả có nhiều nhất 100 ký tự."),
            dishPrice: yup
                .string()
                .required("Giá phải có giá trị."),
        });
        return {
            dishLocal: this.dish,
            dishFormSchema,
        };
    },
    methods: {
        submitDish() {
            this.$emit("submit:dish", this.dishLocal);
        },
        deleteDish() {
            this.$emit("delete:dish", this.dishLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
