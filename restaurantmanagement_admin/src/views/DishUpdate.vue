<template>
    <div v-if="dish" class="page">
        <h4>Thay Đổi Thông Tin Món Ăn</h4>
        <DishForm :dish="dish" @submit:dish="updateDish" @delete:dish="deleteDish" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            dish: null,
            message: "",
        };
    },
    methods: {
        async getDish(id) {
            try {
                this.dish = await DishService.findOne(id);
                console.log(this.dish);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateDish(data) {
            try {
                await DishService.update(this.dish._id, data);
                this.message = "Món ăn được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteDish() {
            if (confirm("Bạn muốn xóa món ăn này?")) {
                try {
                    await DishService.delete(this.dish._id);
                    this.$router.push({ name: "dishmanagement" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getDish(this.id);
        this.message = "";
    },
};
</script>