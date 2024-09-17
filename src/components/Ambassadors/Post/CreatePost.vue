<template>
  <v-dialog v-model="dialogCreatePost" max-width="900">
    <v-card class="create-profile">
      <LoaderPage v-if="isLoading" />
      <div class="create-post-header">
        <h4 class="text-h4">{{ $t("common.CreateaPost") }}</h4>
        <v-img
          @click="dialogCreatePost = false"
          :src="
            require('../../../assets/images/structure/close-modal-post.svg')
          "
          class="modal-close-icon"
        />
      </div>
      <div class="create-post-body">
        <div class="create-post-left">
          <div class="upload-post-empty" v-if="media.length <= 0">
            <v-img
              :src="
                require('../../../assets/images/structure/upload-post-img.svg')
              "
              class="upload-post-icon"
            />
            <h5 class="text-h5 default">Drag Image and Video here</h5>
            <p class="text-body-3 gray">
              Upload image/ video here in JPG/ PNG/ WEBM/ MP4/ MOV format.
            </p>
            <input
              type="file"
              v-on:change="uploadFile"
              accept="image/png, image/jpeg,video/mp4,video/x-m4v,video/*"
            />
          </div>
          <div class="post-slider" v-else>
            <Carousel
              id="gallery"
              :settings="settingsGallery"
              :wrap-around="true"
              v-model="currentSlide"
            >
              <Slide v-for="(item, index) in media" :key="index">
                <div class="carousel__item">
                  <img
                    :src="`${constImg}${item}`"
                    v-if="
                      item.includes('.png') ||
                      item.includes('.jpg') ||
                      item.includes('.jpeg')
                    "
                  />
                  <video controls loop v-else>
                    <source :src="`${constImg}${item}`" type="video/mp4" />
                  </video>
                </div>
              </Slide>
              <template #addons>
                <div class="uplod-bottom-row">
                  <div class="upload-img-box-plus">
                    <v-img
                      :src="
                        require('../../../assets/images/structure/plus-white-icon.svg')
                      "
                      alt="plus image"
                      class="plus-white-icon"
                    />
                    <input type="file" v-on:change="uploadFile" />
                  </div>
                </div>
              </template>
            </Carousel>

            <Carousel
              id="thumbnails"
              :settings="settingsThumbnails"
              :breakpoints="breakpoints"
              :wrap-around="false"
              v-model="currentSlide"
              ref="carousel"
            >
              <Slide v-for="(item, index) in media" :key="index">
                <div class="carousel__item" @click="slideTo(item - 1)">
                  <img
                    class="thumb-img"
                    :src="`${constImg}${item}`"
                    v-if="
                      item.includes('.png') ||
                      item.includes('.jpg') ||
                      item.includes('.jpeg')
                    "
                  />
                  <video controls v-else class="thumb-img">
                    <source :src="`${constImg}${item}`" type="video/mp4" />
                  </video>
                  <v-img
                    :src="
                      require('../../../assets/images/structure/crose-red-icon.svg')
                    "
                    @click="
                      () => {
                        this.media.splice(index, 1);
                      }
                    "
                    class="crose-icon"
                    alt="delete icon"
                  />
                </div>
              </Slide>

              <template #addons>
                <Navigation />
              </template>
            </Carousel>
          </div>
        </div>
        <div class="create-post-right">
          <div class="relative">
            <div class="post-heading">
              <v-img
                v-if="profileImg"
                :src="`${constImg}${profileImg}`"
                width="30"
                class="avtar-img"
              />
              <h6 class="text-h6">{{ profileName }}</h6>
            </div>
            <div class="post-area">
              <v-textarea
                placeholder="Write a caption..."
                variant="outline"
                v-model="caption"
                hide-details="auto"
                auto-grow
                rows="2"
              ></v-textarea>
            </div>
          </div>

          <v-expansion-panels class="border-t-b" v-model="panel">
            <v-expansion-panel>
              <v-expansion-panel-title class="post-setting"
                >Post Settings</v-expansion-panel-title
              >
              <v-expansion-panel-text>
                <v-radio-group class="pt-1" v-model="postType">
                  <v-radio value="public" color="#2563EA">
                    <template v-slot:label>
                      <h6 class="text-h6">Public</h6>
                      <p class="text-body-4">
                        <!-- Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry -->
                      </p>
                    </template>
                  </v-radio>
                  <v-radio value="private" color="#2563EA">
                    <template v-slot:label>
                      <h6 class="text-h6">Private</h6>
                      <p class="text-body-4">
                        <!-- Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry -->
                      </p>
                    </template>
                  </v-radio>
                  <v-radio value="paid" color="#2563EA">
                    <template v-slot:label>
                      <h6 class="text-h6">Paid</h6>
                      <p class="text-body-4">
                        <!-- Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry -->
                      </p>
                      <v-text-field
                        class="height40"
                        variant="solo"
                        single-line
                        hide-details="auto"
                        placeholder="0"
                        type="number"
                        v-model="paidAmount"
                        prefix="USD"
                        :rules="[rules.numOnly]"
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                      />
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <div class="last-btn" height="100%">
            <v-btn
              @click="addPostHandler"
              :disabled="!(caption || media.length) || isPostCreated"
              color="success"
              size="large"
              type="button"
              width="150"
              >Post</v-btn
            >
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import AWS from "aws-sdk";
import constant from "../../../../constant";
import LoaderPage from "../../../components/Loader/Loader.vue";
import { v4 as uuidv4 } from "uuid";
import services from "../../../services";

AWS.config.update({
  accessKeyId: "AKIA3LMUAPGY5KXVVUVN",
  secretAccessKey: "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",
});
export default {
  name: "CreatePost",
  props: {
    toggleCreatePost: Boolean,
  },
  components: {
    Carousel,
    Slide,
    LoaderPage,
    Navigation,
  },
  data() {
    return {
      currentSlide: 0,
      panel: [1, 0],
      isDetailsAdded: true,
      dialogCreatePost: this.toggleCreatePost,
      isLoading: false,
      isPostCreated: false,
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
  watch: {
    dialogCreatePost() {
      this.$emit("openDialog", this.dialogCreatePost);
    },
  },
  methods: {
    async addPostHandler() {
      this.isPostCreated = true;
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
        this.isPostCreated = false;
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