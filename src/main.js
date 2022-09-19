import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import { createRouter, createWebHistory } from 'vue-router';

//Components
import LogIn from './components/LogIn.vue';
import HomePage from './components/Home.vue';
import DashBoard from './components/DashBoard.vue'
import CustomerList from './components/CustomerList.vue';
import AddCustomer from './components/AddCustomer.vue';
import EmployeeList from './components/EmployeeList.vue';


loadFonts();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/login", component: LogIn },
        { path: "/", component: HomePage, 
            children: [
                { path: "/dashboard", component: DashBoard }, 
                { path: "/customerlist", component: CustomerList },
                { path: "/addcustomer", component: AddCustomer },
                { path: "/employeelist", component: EmployeeList }
            ] 
        },
        { path: "/home", component: HomePage },
        //{ path: "/customerlist", component: CustomerList }
    ]
});

createApp(App).use(vuetify).use(router).mount('#app');
