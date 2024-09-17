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
          <div class="white-box-reating-review">
            <LoaderPage v-if="isLoading" />

            <h5 class="text-h5 mb-1">{{ $t("common.RatingReview") }}</h5>
            <p class="text-body-2 mt-0 gray">
              {{
                $t(
                  "common.Thebestplacetotellcustomersaboutyourexperincefortheproduct_text1"
                )
              }}
            </p>

            <div class="rating-upload-box">
              <v-img
                :src="
                  require('../../../assets/images/structure/upload-pink-icon.svg')
                "
                width="36"
                height="36"
                class="mx-auto"
              />
              <h5 class="text-h5 mb-1">{{ $t("common.UploadImageVideo") }}</h5>
              <p class="text-body-3">
                {{
                  $t("common.UploadimagevideohereinJPG_PNG_WEBM_MP4_MOVformat")
                }}
              </p>
              <input
                type="file"
                v-on:change="uploadFile"
                accept="image/png, image/jpeg,video/mp4,video/x-m4v,video/*"
              />
            </div>

            <div
              class="upload-rating-img"
              v-for="(item, index) in media.images"
              :key="index"
            >
              <v-img
                :src="`${constImg}${item}`"
                class="upload-img"
                @click="openMedia = true"
              />
              <v-img
                :src="
                  require('../../../assets/images/structure/crose-red-icon.svg')
                "
                @click="removeItem(index, 'images')"
                class="crose-img"
              />
            </div>
            <div
              class="upload-rating-img"
              v-for="(item, index) in media.videos"
              :key="index"
            >
              <v-img
                :src="
                  require('../../../assets/images/structure/crose-red-icon.svg')
                "
                @click="removeItem(index, 'videos')"
                class="crose-img"
              />
              <video class="upload-img">
                <source :src="`${constImg}${item}`" type="video/mp4" />
              </video>
              <v-img
                :src="require('../../../assets/images/structure/play-icon.png')"
                class="play-icon"
                @click="openMedia = true"
              />
            </div>

            <v-row no-gutters class="mb-4 mt-7">
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text mt-2"
                  >{{ $t("common.Rating") }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-rating v-model="rating" class="blue-rating"> </v-rating>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text mt-2"
                  >{{ $t("common.Review") }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <small class="text-blue-grey-lighten-3 text-right d-block"
                  >{{ review && review.length }}/100</small
                >
                <v-textarea
                  variant="solo"
                  placeholder="Write here"
                  rows="3"
                  class="mb-3"
                  v-model="review"
                  :rules="[rules.required, rules.longCharLimit]"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
          <div class="text-right">
            <v-btn
              size="large"
              color="success"
              type="button"
              class="ml-auto mt-7"
              width="150"
              :disabled="
                !(rating && review && review.length < 100) || isReviewCreated
              "
              @click="submitReviewHandler"
            >
              {{ $t("common.Submit") }}
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <!-- <AmbassadorsRightRevenue /> -->

          <div class="show-product-right">
            <v-img
              :src="
                require('../../../assets/images/structure/crose-red-icon.svg')
              "
              class="crose-img"
              @click="
                () => {
                  this.$router.go(-1);
                }
              "
            />
            <v-img
              :src="`${constImg}${productDetail.featuredImage}`"
              class="review-toy-img"
            />
            <h5 class="text-h5">
              {{ productDetail.title }}
            </h5>
            <h6 class="text-h6 pink">
              {{ $t("common.USD") }} {{ productDetail.discountedPrice }}
            </h6>
          </div>
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
        <v-carousel-item v-for="(item, index) in media.images" :key="index">
          <v-img :src="`${constImg}${item}`" class="lightbox-media-img" />
        </v-carousel-item>
        <v-carousel-item v-for="(item, index) in media.videos" :key="index">
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
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import LoaderPage from "../../../components/Loader/Loader.vue";
AWS.config.update({
  accessKeyId: "AKIA3LMUAPGY5KXVVUVN",
  secretAccessKey: "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",
});
export default {
  name: "RatingReview",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    LoaderPage,
  },
  data() {
    return {
      openMedia: false,
      productDetail: "",
      constImg: constant.CLOUDFRONT_DESTINATION,
      isLoading: false,
      isReviewCreated: false,
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
      colors: ["green"],
      rating: "",
      review: "",
      media: {
        images: [],
        videos: [],
      },
      rules: {
        required: (value) => !!value || "Required.",
        longCharLimit: (v) => v?.trim().length < 100 || "Max limit for input",
      },
    };
  },
  mounted() {
    this.getProductById(this.$route.params.productId);
  },

  methods: {
    removeItem(index, type) {
      if (type && type === "images") {
        this.media.images.splice(index, 1);
      } else {
        this.media.videos.splice(index, 1);
      }
    },
    async uploadFile(e) {
      const file = e.target.files[0];
      const name = "_productreview";
      console.log(file, name);
      this.isLoading = true;
      const uuid = uuidv4();
      let file_limit = 5242880;
      if (file.size <= file_limit) {
        let filetype = file.type.split("/")[1];
        let preName = file.name.split(".")[0];
        let fileName = `${preName}${name}${Math.floor(
          Math.random() * 100000 + 1
        )}.${filetype}`;
        let myBucket;
        let params;
        if (filetype == "jpeg" || filetype == "png" || filetype == "jpg") {
          myBucket = new AWS.S3({
            params: { Bucket: constant.S3_BUCKET_IMAGE },
            region: constant.REGION,
          });
          params = {
            // ACL: 'public-read',
            Body: file,
            Bucket: constant.S3_BUCKET_IMAGE,
            Key: `images/${fileName}`,
            ContentType: file.type,
          };
        } else {
          myBucket = new AWS.S3({
            params: { Bucket: constant.S3_BUCKET_VIDEO },
            region: constant.REGION,
          });
          params = {
            // ACL: 'public-read',
            Body: file,
            Bucket: constant.S3_BUCKET_VIDEO,
            Key: `${uuid}/AppleHLS1/${fileName}`,
            Metadata: {
              secretkey: `${uuid}`,
            },
            ContentType: file.type,
          };
        }

        myBucket
          .putObject(params)
          .on("httpUploadProgress", (evt) => {
            console.log(evt);
            return true;
          })
          .send(async (err) => {
            if (err) console.log(err);
            this.isLoading = false;
            if (filetype == "jpeg" || filetype == "png" || filetype == "jpg") {
              this.media.images.push(`images/${fileName}`);
            } else {
              this.media.videos.push(`${uuid}/AppleHLS1/${fileName}`);
            }
          });
      } else {
        this.showAlert = true;
        this.isLoading = false;

        this.alertType = "error";
        this.alertMessage = `Image should not be greater than ${
          name == "_userprofile" ? "2 MB" : "5 MB"
        }`;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    },
    async getProductById(id) {
      try {
        this.isLoading = true;
        const response = await services.ToyReview.GET_TOY_BY_ID(id);
        this.productDetail = response.data;
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async submitReviewHandler() {
      this.isReviewCreated = true;
      try {
        const data = {
          rating: this.rating,
          review: this.review,
          productId: this.$route.params.productId,
          media: this.media,
        };
        this.isLoading = true;
        const response = await services.ToyReview.CREATE_TOY_REVIEW(data);
        if (response.data) {
          this.toyList = response.data;
          this.isReviewCreated = false;
          this.$router.push("/toy-review");
        }
      } catch (err) {
        this.isReviewCreated = false;
        console.log(err);
      }
    },
  },
};
</script>