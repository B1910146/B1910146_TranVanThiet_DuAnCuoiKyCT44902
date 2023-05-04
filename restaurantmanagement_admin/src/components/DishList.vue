<script>
import DishService from "@/services/dish.service";
export default {
    props: {
        dishes: { type: Array, default: [] },
        // activeIndex: { type: Number, default: -1 },
    },
    // emits: ["update:activeIndex"],
    methods: {
        goToEditDish(DId) {
            this.$router.push({ name: "dish.update", params: { id: DId } });
        },

        async removeDish(DId) {
            if (confirm("Bạn muốn xóa món ăn này?")) {
                try {
                    await DishService.delete(DId);
                    window.location.reload();
                    // this.$router.push({ name: "dishmanagement" });
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
                <th scope="col">Ảnh</th>
                <th scope="col">Tên</th>
                <th scope="col">Loại</th>
                <th scope="col">Mô Tả</th>
                <th scope="col">Giá</th>
                <th scope="col">Quản Lý</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(dish, index) in dishes" :key="dish._id" >
                <td><img src="" alt=""></td>
                <td>{{ dish.dishName }}</td>
                <td>{{ dish.dishType }}</td>
                <td>{{ dish.dishDescription }}</td>
                <td>${{ dish.dishPrice }}</td>
                <td>
                    <!-- <button type="button" class="btn btn-warning m-1" @click="goToEditDish(dish._id)">
                        Sửa
                    </button> -->
                        <router-link :to="{
                            name: 'dish.update',
                            params: { id: dish._id },
                        }">
                        <button type="button" class="btn btn-warning m-1">
                        Sửa
                    </button>
                    </router-link>
                        <button type="button" class="btn btn-danger m-1" @click="removeDish(dish._id)">
                            Xóa
                        </button>
                    </td>
                </tr>
        </tbody>
    </table>
</template>