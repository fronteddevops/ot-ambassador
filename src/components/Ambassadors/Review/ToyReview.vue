<template>
  <div class="bg-gray">
    <Loader v-if="isLoading" />
    <AmbassadorHeader />

    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="7" xl="7">
          <div class="add-revie-box" v-if="this.toyList.length">
            <v-img
              :src="
                require('../../../assets/images/structure/add-review-icon.svg')
              "
              contain
              width="36"
              height="36"
            />
            <div class="relative">
              <h5 class="text-h5">{{ $t("common.AddToyReview") }}</h5>
              <p class="text-body-3">
                {{
                  $t(
                    "common.Youcankeepitcustomeronlyorpublictoencouragepeopletojoinorleteveryoneseeit"
                  )
                }}
              </p>
            </div>
            <v-btn color="success" type="button" to="/add-review">{{
              $t("common.AddReview")
            }}</v-btn>
          </div>
          <v-row v-if="this.toyList.length" :key="reloadKey">
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="4"
              xl="4"
              v-for="item in toyList"
              :key="item.Product.id+reloadKey"
            >
              <router-link
                :to="`/review-detail/${item.Product.id}`"
                class="reveiw-box"
              >
                <v-img
                  :src="`${constImg}${item.Product.featuredImage}`"
                  class="review-toy-img"
                />
                <h5 class="text-h5">
                  {{ item.Product.title }}
                </h5>
              </router-link>
            </v-col>
          </v-row>

          <EmptyPage v-else />
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <!-- <AmbassadorsRightRevenue /> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
// import AmbassadorsRightRevenue from "../AmbassadorsRightRevenue/AmbassadorsRightRevenue.vue";
import EmptyPage from "./EmptyPage.vue";
import services from "../../../services/index";
import constant from "../../../../constant";
import Loader from "../../Loader/Loader.vue";

export default {
  name: "ToyReview",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    EmptyPage,
    Loader,
  },

  data() {
    return {
      toyList: "",
      isLoading: false,
      constImg: constant.CLOUDFRONT_DESTINATION,
      reloadKey:Math.random()
    };
  },
  mounted() {
    this.getToyReviews();
    this.reloadKey=Math.random()
  },
  methods: {
    async getToyReviews() {
      this.isLoading = true;
      try {
        this.isLoading = true;
        const response = await services.ToyReview.GET_MY_TOY_REVIEWS();
        this.reloadKey=Math.random();
        this.toyList = response.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>