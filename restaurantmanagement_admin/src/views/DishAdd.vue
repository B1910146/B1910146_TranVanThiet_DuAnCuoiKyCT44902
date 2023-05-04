<template>
    <div class="page">
        <h4>Thêm Món Ăn Mới</h4>
        <DishForm :dish={} @submit:dish="addDish" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import DishForm from "@/components/DishForm.vue";
import DishService from "@/services/dish.service";
export default {
    components: {
        DishForm,
    },
    data() {
        return {
            dish: null,
            message: "",
        };
    },
    methods: {
        async addDish(data) {
            try {
                await DishService.create(data);
                this.message = "Đã thêm món ăn mới.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>