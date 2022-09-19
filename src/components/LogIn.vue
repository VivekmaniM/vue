<script>
  import axios from 'axios';
  import { validationMixin } from 'vuelidate'
  //import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    name: "LogIn",
    mixins: [validationMixin],
    
    data: () => ({
      isLoading: false,
      selection: 1,
      show: false,
      loginEmail: "",
      loginPassword: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length > 5) || 'Password must be greater than 5 characters',
      ],
      rules: {
        required: value => !!value || 'Required.',
        //min: v => v.length >= 8 || 'Min 8 characters',
        //emailMatch: () => (`The email and password you entered don't match`),
      },

      //notification
      snackbar: false,
      notifText: 'Lorem ipsum dolor sit amet',
      vertical: true,
    }),
    methods: {
      reserve () {
        this.loading = true;
        setTimeout(() => (this.loading = false), 2000)
      },
      async Login(email, password){
        try{
            this.isLoading = true;
            const response = await axios.post("https://qwiktimeapidev.azurewebsites.net/api/Auth/token", {"EmailId": email,"Password": password});
            console.log(response.data);
           
            if(response.data.Response.Result != null) {
                localStorage.setItem("token", response.data.Response.Token);
                localStorage.setItem("FirstName", response.data.Response.FirstName);
                localStorage.setItem("LastName", response.data.Response.LastName);
                localStorage.setItem("EmpId", response.data.Response.EmpId);
                window.location = window.location.origin + "/dashboard";
            }
            else {
                this.notifText = response.data.Response.TokenMessage;
                this.snackbar = true;
            }

            this.isLoading = false;
        }
        catch(e) {
            console.log(e);
        }
    },
    }
  }
</script>

<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
          <v-col
            lg="12"
            sm="12"
            md="12"
            class="logo"
          >
            <v-img src="../assets/qwiktime.png"/>
        </v-col>
        <v-card-title>Log In</v-card-title>
        <v-card-text>
          <div>Telliant Timesheet Application</div>
        </v-card-text>
        <v-col
          lg="12"
          sm="12"
          md="12"
        >
          <v-text-field
            class="bg-white"
            label="Email Address"
            outlined
            :rules="emailRules"
            v-model="loginEmail"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            class="bg-white"
            v-model="loginPassword"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="Password is case sensitive"
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
        <v-col>
          <div class="text-center" v-if="isLoading">
            <v-progress-circular 
              indeterminate
              color="#673ab7"
            ></v-progress-circular>
          </div>
          <v-btn v-else
            type="submit"
            block
            text
            class="login-btn"
            @click="Login(loginEmail, loginPassword)"
          >
            Log In
          </v-btn>
        </v-col>
  </v-card>

  <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
    >
    {{ notifText }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="indigo"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>

  <!-- <div class="wrapper">
    <div class="wave"></div>
  </div> -->
</template>

<style>
  .bg-white{
    background: #fff !important;
  }

  .logo{
    background-color: #673ab7;
  }

  .logo img{
    width: 170px;
    text-align: center;
  }

  .login-btn{
    background-color: #673ab7 !important;
    color: #fff !important;
  }

  /* .v-main{
    background: linear-gradient(to bottom, rgb(208 226 255) 0%, #341370 100%) 0% 0% / 100% 1422px;
  } */

  /* .wrapper {
    width: 100%;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
    overflow: hidden;
  }

  .wave {
    width: 100%;
    height: 1025px;
    position: absolute;
    top: -25%;
    left: 50%;
    margin-left: -500px;
    margin-top: -500px;
    border-radius: 35%;
    background: rgba(255, 255, 255, .75);
    animation: wave 15s infinite linear;
  }

  @keyframes wave {
    from { transform: rotate(0deg);}
    from { transform: rotate(180deg);}
  } */
</style>