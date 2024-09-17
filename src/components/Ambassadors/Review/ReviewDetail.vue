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

          <div class="top-detail-box">
            <div class="left-box">
              <v-img
                :src="`${constImg}${productDetail.featuredImage}`"
                class="review-toy-img"
              />
            </div>
            <div class="right-box">
              <h5 class="text-h5">
                {{ productDetail.title }}
              </h5>
              <h6 class="text-h6">
                {{ $t("common.USD") }} {{ productDetail.discountedPrice }}
              </h6>
            </div>
          </div>

          <div class="white-box-reating-review">
            <h5 class="text-h5">{{ $t("common.RatingReview") }}</h5>
            <v-rating v-model="reviewDetail.rating" readonly></v-rating>
            <p class="text-body-2">
              {{ reviewDetail.review }}
            </p>

            <div v-if="reviewDetail.media" class="images-box">
              <div
                class="media-box"
                v-for="(item, index) in reviewDetail.media.images"
                :key="index"
              >
                <v-img
                  :src="`${constImg}${item}`"
                  class="media-img84"
                  @click="openMedia = true"
                />
              </div>
              <div
                class="media-box"
                v-for="(item, index) in reviewDetail.media.videos"
                :key="index"
              >
                <video class="media-img84" @click="openMedia = true">
                  <source :src="`${constImg}${item}`" type="video/mp4" />
                </video>
                <v-img
                  :src="
                    require('../../../assets/images/structure/play-icon.png')
                  "
                  class="play-icon"
                  @click="openMedia = true"
                />
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <!-- <AmbassadorsRightRevenue /> -->
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="openMedia" class="media-light-box">
      <v-img
        @click="openMedia = false"
        :src="require('../../../assets/images/structure/close-modal.svg')"
        class="modal-close-icon"
      />
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item, index) in reviewDetail.media.images"
          :key="index"
        >
          <v-img :src="`${constImg}${item}`" class="lightbox-media-img" />
        </v-carousel-item>
        <v-carousel-item
          v-for="(item, index) in reviewDetail.media.videos"
          :key="index"
        >
          <video controls autoplay loop class="lightbox-media-img">
            <source :src="`${constImg}${item}`" type="video/mp4" />
          </video>
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
// import AmbassadorsRightRevenue from "../AmbassadorsRightRevenue/AmbassadorsRightRevenue.vue";
import services from "../../../services/index";
import constant from "../../../../constant";

export default {
  name: "ToyReview",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
  },
  data() {
    return {
      items: [
        {
          title: "Toy Review",
          disabled: false,
          href: "/toy-review",
        },
        {
          title: "Review Detail",
          disabled: true,
        },
      ],
      reviewDetail: "",
      productDetail: "",
      constImg: constant.CLOUDFRONT_DESTINATION,
      openMedia: false,
    };
  },
  mounted() {
    this.getReviewDetail(this.$route.params.id);
  },
  methods: {
    async getReviewDetail(productId) {
      try {
        this.isLoading = true;
        const response = await services.ToyReview.GET_TOY_REVIEW_DETAIL(
          productId
        );
        this.productDetail = response.data.Product;
        this.reviewDetail = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>