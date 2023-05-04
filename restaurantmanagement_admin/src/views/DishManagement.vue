<template>
    <div class="col-10 m-auto row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-12">
            <h1 class="font-weight-bold text-center">
                Danh Sách Món Ăn
            </h1>
            <DishList v-if="filteredDishesCount > 0" :dishes="filteredDishes" />
            <p v-else>Không có món ăn nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddDish">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllDishes">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import InputSearch from "@/components/InputSearch.vue";
import DishList from "@/components/DishList.vue";
import DishService from "@/services/dish.service";
export default {
    components: {
        // DishCard,
        InputSearch,
        DishList,
    },
    data() {
        return {
            dishes: [],
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
        dishStrings() {
            return this.dishes.map((dish) => {
                const { dishName, dishType, dishDescription, dishPrice, dishImage } = dish;
                return [dishName, dishType, dishDescription, dishPrice, dishImage].join("");
            });
        },
        filteredDishes() {
            if (!this.searchText) return this.dishes;
            return this.dishes.filter((_dish, index) =>
                this.dishStrings[index].includes(this.searchText)
            );
        },
        // activeDish() {
        //     if (this.activeIndex < 0) return null;
        //     return this.filteredDishes[this.activeIndex];
        // },
        filteredDishesCount() {
            return this.filteredDishes.length;
        },
    },
    methods: {
        async retrieveDishes() {
            try {
                this.dishes = await DishService.findAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveDishes();
            // this.activeIndex = -1;
        },

        async removeAllDishes() {
            if (confirm("Bạn muốn xóa tất cả món ăn?")) {
                try {
                    await DishService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddDish() {
            this.$router.push({ name: "dish.add" });
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