<template>
    <nav class="navbar navbar-expand-sm bg-primary navbar-dark col-auto">
        <a href="/dish" class="navbar-brand" style="font-size: 30px; font-weight: bold;">Serpent Restaurant</a>
        <ul class="navbar-nav text-light">
            <li class="nav-item">
                <router-link :to="{ name: 'dishmanagement' }" class="nav-link" style="color: white !important;">
                    MÓN ĂN
                    <i class="fa fa-cutlery"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'employeemanagement' }" class="nav-link" style="color: white !important;">
                    NHÂN VIÊN
                    <i class="fa fa-user"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'order' }" class="nav-link" style="color: white !important;">
                    ĐẶT TIỆC
                    <i class="fa fa-calendar"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'billmanagement' }" class="nav-link" style="color: white !important;">
                    ĐƠN HÀNG
                    <i class="fa fa-sticky-note"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'userinformation' }" class="nav-link" style="color: white !important;">
                    THÔNG TIN
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </ul>
      </nav>
</template>