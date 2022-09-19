<script>
    import { useRouter } from 'vue-router';

    export default {
      name: "HomePage",
      metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "Home | QwikTime"
      },
      data: () => ({
        //router
        router: useRouter(),
        //side bar
        drawer: false,
        group: null,
        selectedItem: 0,
        FirstName: "",
        LastName: "",
        EmpId: ""
      }),
      methods: {
        GetEmpDetails(){
          this.FirstName = localStorage.getItem("FirstName");
          this.LastName = localStorage.getItem("LastName");
          this.EmpId = localStorage.getItem("EmpId");
        },
        Logout() {
          this.router.push("/login");
        }
      },
      mounted() {
        this.GetEmpDetails();
      }
    }
  </script>
  
  <template>
    <!-- App.vue -->

    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img class="app-title" src="../assets/qwiktime.png"/>
      </v-toolbar-title>
      
      <v-btn icon @click="Logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >

      <v-list
        nav
        dense
      >
        
        <div class="list-content">
          <h2>{{FirstName}} {{LastName}}</h2>
          <small>{{EmpId}}</small>
        </div>
        
        <v-list-item-group class="list-item-group"
          v-model="selectedItem"
          color="primary"
        >

          <v-subheader class="sub-header">COMMON</v-subheader>

          <v-list-item class="list-item" @click="router.push('/dashboard')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="list-text">Home</v-list-item-title>
          </v-list-item>

          <v-subheader class="sub-header">MASTERS</v-subheader>
          <v-list-item class="list-item" @click="router.push('/employeelist')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="list-text">Employees</v-list-item-title>
          </v-list-item>
          <v-list-item class="list-item" @click="router.push('/customerlist')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="list-text">Customers</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </template>
  
  <style>
    .app-title{
      width: 100px;
    }

    .list-content{
      background: #e8dcff;
      padding: 15px 15px 15px 15px;
      margin: 7px 0px 20px 0px;
      border-radius: 5px;
    }

    .list-content h2{
      font-size: 17px;
    }

    .list-item-group{
      margin-top: 30px !important;
    }
  
    .list-item{
      cursor: pointer;
    }

    .list-item:hover{
      background-color: #f1f1f1;
    }

    .list-text{
      display: inline-flex;
      margin-left: 20px;
    }

    .sub-header{
      background: #673ab7;
      font-size: 12px;
      color: #fff;
      padding: 2px 5px 2px 5px;
    }
  </style>