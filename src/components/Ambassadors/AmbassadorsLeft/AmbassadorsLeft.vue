<template>
  <div class="ambassador-left">
      <router-link
      
      class="left-a"
      to="/overview"
    >
      <v-img
        :src="require('../../../assets/images/structure/overview-icon.svg')"
        class="icon28"
      />
      <p class="text-body-2">{{ $t("common.Overview") }}</p>
    </router-link>
    <router-link 
       
      class="left-a"
      to="/subscriber"
    > 
      <v-img
        :src="require('../../../assets/images/structure/subscribers-icon.svg')"
        class="icon28"
      />
      <p class="text-body-2">{{ $t("common.Subscribers") }}</p>
    </router-link>
    <!-- <h6 class="text-h6">{{ $t("common.Statistics") }}</h6>
    <router-link 
       
      class="left-a"
      to="/insights"
    >
      <v-img
        :src="require('../../../assets/images/structure/insights-icon.svg')"
        class="icon28"
      />
      <p class="text-body-2">{{ $t("common.Insights") }}</p>
    </router-link> -->
    <h6 class="text-h6">{{ $t("common.Account") }}</h6>
    <router-link class="left-a" to="/subscription">
      <v-img
        :src="require('../../../assets/images/structure/subscription-icon.svg')"
        class="icon28"
      />
      <p class="text-body-2">{{ $t("common.Subscription") }}</p>
    </router-link>
    <router-link class="left-a" to="/payouts">
      <v-img
        :src="require('../../../assets/images/structure/payouts-icon.svg')"
        class="icon28"
      />
      <p class="text-body-2">{{ $t("common.Payouts") }}</p>
      <div class="tool-parent">
        <v-img
          :src="require('../../../assets/images/structure/info-red-icon.svg')"
          class="info-icon"
        />
        <div class="tool-content">
          {{ $t("common.Youraccountispendingforstripeapproval") }}
        </div>
      </div>
    </router-link>
    <h6 class="text-h6">{{ $t("common.Media") }}</h6>
    <router-link 
      
      class="left-a"
      to="/media"
    >
      <v-img
        :src="require('../../../assets/images/structure/media-icon.svg')"
        class="icon28"
      />
      <p class="text-body-2">{{ $t("common.Media") }}</p>
    </router-link>
    <router-link 
      
      class="left-a"
      to="/toy-review"
    >
      <v-img
        :src="require('../../../assets/images/structure/toy-review-icon.svg')"
        class="icon28"
      />
      <p class="text-body-2">{{ $t("common.ToyReview") }}</p>
    </router-link>
    <router-link  
      
      class="left-a"
      to="/publishing-tools"
    >
      <v-img
        :src="
          require('../../../assets/images/structure/publishing-tools-icon.svg')
        "
        class="icon28"
      />
      <p class="text-body-2">{{ $t("common.PublishingTools") }}</p>
    </router-link>
    <v-btn
      color="success"
      type="button"
      class="mt-6 new-post-btn"
      @click="dialogCreatePost = true"
    >
      <v-img
        :src="require('../../../assets/images/structure/plus-white.svg')"
        width="24"
        height="24"
      /> &nbsp; &nbsp;
      {{ $t("common.CreatePost") }}
    </v-btn>

    <CreatePost
      :toggleCreatePost="dialogCreatePost"
      @openDialog="updateparent"
      v-if="dialogCreatePost"
    />
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import AWS from "aws-sdk";
import constant from "../../../../constant";
import { v4 as uuidv4 } from "uuid";
import services from "../../../services";
import CreatePost from "../../Ambassadors/Post/CreatePost.vue";

AWS.config.update({
  accessKeyId: "AKIA3LMUAPGY5KXVVUVN",
  secretAccessKey: "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",
});
export default {
  name: "AmbassadorsLeft",
  components: {
    CreatePost,
  },
  data() {
    return {
      currentSlide: 0,
      panel: [1, 0],
      isDetailsAdded: true,
      dialogCreatePost: false,
      isLoading: false,
      postType: "public",
      paidAmount: 0,
      profileName: "",
      caption: "",
      profileImg: "",
      media: [],
      constImg: constant.CLOUDFRONT_DESTINATION,
      settingsGallery: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      settingsThumbnails: {
        itemsToShow: 4.5,
        snapAlign: "start",
      },
      breakpoints: {
        1049: {
          itemsToShow: 4.5,
        },
        960: {
          itemsToShow: 5,
        },
        0: {
          itemsToShow: 3,
        },
      },
      rules: {
        required: (value) => !!value || "Required.",
        numOnly: (v) => Number.isInteger(v) || "Numbers allowed only",
      },
    };
  },
  mounted() {
    let userDetails = localStorage.getItem("user_Details")
      ? JSON.parse(localStorage.getItem("user_Details"))
      : null;
    if (userDetails) {
      this.profileName =
        localStorage.getItem("user_Details") && userDetails
          ? `${userDetails?.UserDetail?.name} ${userDetails?.UserDetail?.lastName}`
          : null;
      this.profileImg =
        localStorage.getItem("user_Details") &&
        userDetails?.UserDetail?.profileImage
          ? userDetails?.UserDetail?.profileImage
          : null;
    }
    if (
      !userDetails.isProfileCompleted ||
      !userDetails.isPaymentDetailCompleted ||
      !userDetails.isSubscriptionPlanAdded
    ) {
      this.isDetailsAdded = false;
    }
  },
  methods: {
    updateparent(variable) {
      this.dialogCreatePost = variable;
    },
    async addPostHandler() {
      try {
        let data = {
          postType: this.postType,
          media: { data: this.media },
          paidAmount: this.paidAmount,
        };
        if (this.caption) {
          data.description = this.caption;
        }
        const response = await services.Post.ADD_POST(data);
        console.log(response);
        if (response) {
          this.dialogCreatePost = false;
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async uploadFile(e) {
      const file = e.target.files[0];
      const name = "_post";
      console.log(file, name);
      this.isLoading = true;
      const uuid = uuidv4();
      let file_limit = 524288000;
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
            if (filetype == "jpeg" || filetype == "png" || filetype == "jpg") {
              this.media.push(`images/${fileName}`);
              this.isLoading = false;
            } else {
              this.media.push(`${uuid}/AppleHLS1/${fileName}`);
              this.isLoading = false;
            }
          });
      } else {
        alert("error");
      }
    },
    slideTo(val) {
      this.currentSlide = val;
    },
  },
};
</script>