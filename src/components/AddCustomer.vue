<script>
    import axios from 'axios';

    export default {
      name: "AddCustomer",
      data: () => ({
        items: [
            {
                text: 'Dashboard',
                disabled: false,
                href: 'dashboard',
            },
            {
                text: 'Customer List',
                disabled: false,
                href: 'customerlist',
            },
            {
                text: 'Add Customer',
                disabled: true,
                href: 'breadcrumbs_link_1',
            }
        ],
        industryList: [],
        customerTypeList: [],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
      }),
      methods: {
        async GetIndustryList() {
            try{
                const headers = {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token")
                    }
                };
                const response = await axios.get("https://qwiktimeapidev.azurewebsites.net/api/TenantTagMaster/GetAllTenantTags?tagName=IndustryId", headers);
                console.log(response.data);
                this.industryList = response.data.Response;
            }
            catch(e) {
                console.log(e);
            }
        },
        async GetCustomerTypeList() {
            try{
                const headers = {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token")
                    }
                };
                const response = await axios.get("https://qwiktimeapidev.azurewebsites.net/api/TenantTagMaster/GetAllTenantTags?tagName=CustomerTypeId", headers);
                console.log(response.data);
                this.customerTypeList = response.data.Response;
            }
            catch(e) {
                console.log(e);
            }
        },
      },
      async mounted(){
        this.GetIndustryList();
        this.GetCustomerTypeList();
      }
    }
</script>

<template>
    <div>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
    </div>

    <v-col lg="12">
        <v-card>
            <v-card-title>Add Customer</v-card-title>
            <v-row>
                <v-col lg="4" md="4" sm="12" xs="12">
                    <v-card>
                        <v-card-subtitle>Customer Details</v-card-subtitle>
                        <v-col>
                            <v-text-field
                                label="Customer Name"
                                outlined
                                required
                                :rules="emailRules"
                                v-model="loginEmail"
                            ></v-text-field> 
                            <v-select
                                :items="industryList"
                                item-text='ChildTagName'
                                item-value='ChildTagId'
                                label="Industry"
                                outlined
                            ></v-select>
                            <v-select
                                :items="customerTypeList"
                                item-text='ChildTagName'
                                item-value='ChildTagId'
                                label="Customer Type"
                                outlined
                            ></v-select> 
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="Start Date"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    @input="menu2 = false"
                                ></v-date-picker>
                            </v-menu>
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="Closure Date"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    @input="menu2 = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col> 
                    </v-card>
                </v-col>
                <v-col lg="4" md="4" sm="12" xs="12">
                    <v-card>
                        <v-card-subtitle>Primay Contact</v-card-subtitle>
                        <v-col>
                            <v-text-field
                                label="Name"
                                outlined
                                :rules="emailRules"
                                v-model="loginEmail"
                            ></v-text-field> 
                            <v-text-field
                                label="Phone Number"
                                outlined
                                :rules="emailRules"
                                v-model="loginEmail"
                                hint="Enter number only"
                            ></v-text-field> 
                            <v-text-field
                                label="Email Address"
                                outlined
                                :rules="emailRules"
                                v-model="loginEmail"
                            ></v-text-field>
                        </v-col>
                    </v-card>
                </v-col>
                <v-col lg="4" md="4" sm="12" xs="12">
                    <v-card>
                        <v-card-subtitle>Secondary Contact</v-card-subtitle>
                        <v-col>
                            <v-text-field
                                class="bg-white"
                                label="Name"
                                outlined
                                :rules="emailRules"
                                v-model="loginEmail"
                            ></v-text-field> 
                            <v-text-field
                                label="Phone Number"
                                outlined
                                :rules="emailRules"
                                v-model="loginEmail"
                                hint="Enter number only"
                            ></v-text-field> 
                            <v-text-field
                                label="Email Address"
                                outlined
                                :rules="emailRules"
                                v-model="loginEmail"
                            ></v-text-field> 
                        </v-col>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
</template>

<style scoped>
    .bg-white{
        background: #fff !important;
    }

    .circle-btn{
        border-radius: 30px;
        background: #673ab7;
        padding: 15px;
        color: #fff;
        bottom: 30px;
        right: 25px;
        position: absolute;
        float: right;
    }
</style>