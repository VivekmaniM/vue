<script>
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    export default {
      name: "CustomerList",
      data: () => ({
        router: useRouter(),
        items: [
            {
                text: 'Dashboard',
                disabled: false,
                href: 'dashboard',
            },
            {
                text: 'Customer List',
                disabled: true,
                href: 'breadcrumbs_link_1',
            }
        ],
        headers: [
          {
            text: 'Customer Name',
            align: 'start',
            filterable: false,
            value: 'CustomerName',
          },
          { text: 'Customer Type', value: 'CustomerType' },
          { text: 'Industry', value: 'Industry' },
          { text: 'Status', value: 'IsDeleted' }
        ],
        customerList: [],



        direction: 'top',
        fab: false,
        fling: false,
        hover: false,
        tabs: null,
        top: false,
        right: true,
        bottom: true,
        left: false,
        transition: 'slide-y-reverse-transition',
      }),
      watch: {
        top (val) {
            this.bottom = !val
        },
        right (val) {
            this.left = !val
        },
        bottom (val) {
            this.top = !val
        },
        left (val) {
            this.right = !val
        },
        },
      methods: {
        async GetCustomerList(listType) {
            try{
                let payloadData = {"pageNumber":1,"pageSize":50,"sort":"ASC","columnName":"CustomerName","keyword":""};
                const headers = {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token")
                    }
                };
                const response = await axios.post("https://qwiktimeapidev.azurewebsites.net/api/Customer/ListCustomer?isDeleted=" + listType, payloadData, headers);
                console.log(response.data);

                this.customerList = response.data.Response;
            }
            catch(e) {
                console.log(e);
            }
        },
      },
      mounted() {
        this.GetCustomerList("2");
      }
    }
</script>

<template>
    <div>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
    </div>

    <v-col lg="12">
        <v-alert text type="info">
            Development in progress
        </v-alert>
    </v-col>
</template>

<style scoped>
    .card{
        height: 550px;
    }

    .card:hover{
        overflow: overlay;
    }

    table{
        width: 100%;
    }

    table th{
        text-align: left;
        background-color: #673ab7;
        color: #fff;
        padding: 5px 5px 5px 10px;
    }

    table td{
        text-align: left;
        padding: 5px 5px 5px 10px;
    }

    tr:nth-child(even) {
        background: #f5efff !important;
    }

    tr:hover{
        background-color: #F4F6F6;
    }

    .bg-success{
        background-color: green;
        padding: 5px;
        font-size: 13px;
        color: #fff;
        border-radius: 3px;
    }

    .bg-danger{
        background-color: rgb(193, 5, 5);
        padding: 5px;
        font-size: 13px;
        color: #fff;
        border-radius: 3px;
    }

    .circle-btn{
        border-radius: 30px;
        background: #673ab7;
        padding: 15px;
        color: #fff;
        bottom: 45px;
        right: 25px;
        position: absolute;
        float: right;
    }

    .p-15{
        padding: 15px;
    }
</style>