<script>
    export default {
      name: "DashBoard",
      metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "Dashboard | QwikTime"
      },
      data: () => ({
        //side bar
        drawer: false,
        group: null,
        selectedItem: 0,

        images: [
          {
            src: 'https://telliant.com/wp-content/uploads/2021/06/telliant-systems-og.jpg',
          },
          {
            src: 'https://media.glassdoor.com/l/61/3f/74/20/celebrating-festival-of-colors.jpg',
          },
          {
            src: 'https://media.glassdoor.com/l/41/b2/48/78/development-delivery-office.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }),
      methods: {
        GoToCustomerList(){
            this.$router.push("/customerlist");
        }
      }
    }
  </script>
  
  <template>
    <v-row>
        <v-col lg="3" md="3" sm="6" xs="12">
            <v-card>
                <v-card-title>
                    Daily
                </v-card-title>
                <v-card-text>
                    This card will always be 16:9 (unless you put more stuff in it)
                </v-card-text>
            </v-card>
        </v-col>

        <v-col lg="3" md="3" sm="6" xs="12">
            <v-card>
                <v-card-title>
                    Weekly
                </v-card-title>
                <v-card-text>
                    This card will always be 16:9 (unless you put more stuff in it)
                </v-card-text>
            </v-card>
        </v-col>

        <v-col lg="3" md="3" sm="6" xs="12">
            <v-card>
                <v-card-title>
                    Monthly
                </v-card-title>
                <v-card-text>
                    This card will always be 16:9 (unless you put more stuff in it)
                </v-card-text>
            </v-card>
        </v-col>

        <v-col lg="3" md="3" sm="6" xs="12">
            <v-card>
                <v-card-title>
                    Yearly
                </v-card-title>
                <v-card-text>
                    This card will always be 16:9 (unless you put more stuff in it)
                </v-card-text>
            </v-card>
        </v-col>

        <v-col lg="12" md="12" sm="12" xs="12">
            <v-card class="img-card">
                <v-carousel hide-delimiters>
                    <v-carousel-item
                        v-for="(item,i) in images"
                        :key="i"
                        :src="item.src"
                    ></v-carousel-item>
                </v-carousel>
            </v-card>
        </v-col>
    </v-row>
  </template>
  
  <style>
    .app-title{
      width: 100px;
    }

    .list-item-content {
      padding: 10px 0px 20px 0px !important;
    }

    .list-item-group{
      margin-top: 30px !important;
    }
  
    .list-item{
      cursor: pointer;
    }

    .list-text{
      display: inline-flex;
      margin-left: 20px;
    }

    .img-card{
        background: #f5f5ff;
    }
  </style>