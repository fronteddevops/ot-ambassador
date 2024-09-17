<template>
  <div class="bg-gray">
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="7" xl="7">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <div class="add-revie-search-box">
            <div class="relative">
              <h5 class="text-h5">{{ $t("common.ProductInfo") }}</h5>
              <p class="text-body-3 mb-6">
                <!-- Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever. -->
              </p>
              <div class="review-search">
                <v-text-field
                  density="compact"
                  variant="solo"
                  label="Search product by name, category"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                  v-model="search"
                  single-line
                  hide-details
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="search-listing-parent">
            <div
              class="search-listing"
              v-for="item in toyList"
              :key="item.id"
              :v-if="toyList"
            >
              <div class="product-box">
                <v-img
                  :src="`${constImg}${item.featuredImage}`"
                  class="toy-img"
                />
              </div>
              <div class="relative">
                <h5 class="text-h5">{{ item.title }}</h5>
                <p class="text-body-3 gray">{{ item.Category.name }}</p>
              </div>
              <router-link
                v-if="
                  !item.ToyReviews.find(({ userId }) => userId === this.userId)
                "
                :to="`/rating-review/${item.id}`"
                class="text-body-2 ml-auto"
                >{{ $t("common.Select") }}</router-link
              >
            </div>
            <!-- <div class="empty-box text-center" v-else>
              <v-img
                :src="
                  require('../../../assets/images/structure/no-product.svg')
                "
                width="72"
                height="72"
              />
              <h6 class="text-h5 mt-2 mb-1">No Product Found</h6>
              <p class="text-body-2 gray">
                Lorem Ipsum is simply dummy text of the printing <br />and
                typesetting industry.
              </p>
            </div> -->
          </div>
          <!-- <v-pagination v-model="page" :length="5"></v-pagination> -->
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
import services from "../../../services/index";
import constant from "../../../../constant";
export default {
  name: "AddReview",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
  },
  data() {
    return {
      toyList: "",
      search: "",
      constImg: constant.CLOUDFRONT_DESTINATION,
      userId: JSON.parse(localStorage.getItem("user_Details")).id,
      items: [
        {
          title: "Toy Review",
          disabled: false,
          href: "/toy-review",
        },
        {
          title: "Add Review",
          disabled: true,
          href: "/add-review",
        },
      ],
      page: 1,
    };
  },
  mounted() {
    this.getProducts();
  },
  watch: {
    search(val) {
      this.getProducts(val);
    },
  },
  methods: {
    async getProducts(search) {
      try {
        this.isLoading = true;
        const response = await services.ToyReview.GET_TOYS(search);
        this.toyList = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>