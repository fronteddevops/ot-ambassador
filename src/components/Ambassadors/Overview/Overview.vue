<template>
  <div class="bg-gray">
    <LoaderPage v-if="isLoading" />
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft :key="reloadKey" />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="7" xl="7">
          <div class="empty-box mb-5" v-if="postList.length <= 0">
            <v-img
              :src="
                require('../../../assets/images/structure/empty-overview.png')
              "
              class="empty-img"
            />
            <h4 class="text-h4">{{ $t("common.AddPost") }}</h4>
            <p class="text-body-2 gray text-center">
              <!-- Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever. -->
            </p>
            <v-btn
              color="success"
              type="button"
              class="mt-5"
              @click="dialogCreatePost = true"
              >{{ $t("common.CreatePost") }}</v-btn
            >
          </div>
          <div v-else>
            <div class="overview-search">
              <v-img :src="`${constImg}${profileImg}`" width="40" height="40" />
              <v-text-field
                variant="solo"
                placeholder="What’s on your mind..."
                hide-details
                @click="dialogCreatePost = true"
              ></v-text-field>
            </div>

            <OverviewBox :postlist="postList" :key="reloadKey">
              <p>
                {{ displayedContent }}
              </p>
              <!-- <p class="toggle-color" @click="expandContent" v-if="isCollapsed">
      Show more
    </p>
    <p class="toggle-color" @click="collapseContent(700)" v-else>Show less</p> -->
            </OverviewBox>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <!-- <AmbassadorsRightRevenue /> -->
        </v-col>
      </v-row>
    </v-container>
    <CreatePost
      :toggleCreatePost="dialogCreatePost"
      @openDialog="updateparent"
      v-if="dialogCreatePost"
    />
    <LoaderPage v-if="isLoading" />

    <!-- <v-dialog max-width="900" :key="reloadKey">
      <v-card class="create-profile">
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
              <input type="file" v-on:change="uploadFile" />
            </div>
            <div class="post-slider" v-else>
              <Carousel
                id="gallery"
                :settings="settingsGallery"
                :wrap-around="false"
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
                :wrap-around="true"
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
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </p>
                      </template>
                    </v-radio>
                    <v-radio value="private" color="#2563EA">
                      <template v-slot:label>
                        <h6 class="text-h6">Private</h6>
                        <p class="text-body-4">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
                        </p>
                      </template>
                    </v-radio>
                    <v-radio value="paid" color="#2563EA">
                      <template v-slot:label>
                        <h6 class="text-h6">Paid</h6>
                        <p class="text-body-4">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry
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
                          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                          :rules="[rules.numOnly]"
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
    </v-dialog> -->
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import CreatePost from "../../Ambassadors/Post/CreatePost.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
// import AmbassadorsRightRevenue from "../AmbassadorsRightRevenue/AmbassadorsRightRevenue.vue";
import OverviewBox from "./OverviewBox.vue";
// import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import AWS from "aws-sdk";
import constant from "../../../../constant";
import { v4 as uuidv4 } from "uuid";
import services from "../../../services";
import LoaderPage from "../../../components/Loader/Loader.vue";

AWS.config.update({
  accessKeyId: "AKIA3LMUAPGY5KXVVUVN",
  secretAccessKey: "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",
});
export default {
  name: "OverviewPage",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    CreatePost,
    OverviewBox,
    LoaderPage,
  },
  data() {
    return {
      deleteMedia: false,
      postList: [],
      currentSlide: 0,
      panel: [1, 0],
      isDetailsAdded: true,
      isLoading: false,
      dialogCreatePost: false,
      postType: "public",
      paidAmount: 0,
      profileName: "",
      caption: "",
      profileImg: "",
      media: [],
      isPostCreated: false,
      constImg: constant.CLOUDFRONT_DESTINATION,
      settingsGallery: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      reloadKey: Math.random(),
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
    this.getUserDetails();
    this.getPostHandler();
  },
  methods: {
    updateparent(variable) {
      this.dialogCreatePost = variable;
    },
    async addPostHandler() {
      this.isLoading = true;
      try {
        this.isPostCreated = true;
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
          this.getPostHandler();
          this.caption = "";
          this.media = [];
          this.isPostCreated = false;
          this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
        this.isPostCreated = false;
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
              this.media.push(`images/${fileName}`);
            } else {
              this.media.push(`${uuid}/AppleHLS1/${fileName}`);
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
    slideTo(val) {
      this.currentSlide = val;
    },
    async getPostHandler() {
      try {
        this.isLoading = true;
        const response = await services.Post.GET_POST();
        console.log(response);
        this.postList = response.data;
        if (this.postList.length > 0) {
          this.postList.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getUserDetails() {
      try {
        this.isLoading = true;
        let userId = localStorage.getItem("user_Details")
          ? JSON.parse(localStorage.getItem("user_Details")).id
          : null;
        const response = await services.UserDetail.GEt_USER_DETAIL(userId);
        this.isLoading = false;
        localStorage.setItem("user_Details", JSON.stringify(response.data));
        let userDetails = localStorage.getItem("user_Details")
          ? JSON.parse(localStorage.getItem("user_Details"))
          : null;
        if (userDetails) {
          this.profileName =
            localStorage.getItem("user_Details") && userDetails
              ? `${userDetails?.UserDetail.name} ${userDetails.lastName}`
              : null;
          this.profileImg =
            localStorage.getItem("user_Details") &&
            userDetails?.UserDetail?.profileImage
              ? userDetails?.UserDetail?.profileImage
              : null;
        }
        this.reloadKey = Math.random();
      } catch (err) {
        this.showAlert = true;
        this.alertType = "error";
        this.alertMessage = err.response.data.message;
        setTimeout(() => {
          this.showAlert = false;
          this.$router.push("/");
        }, 2500);
      }
    },
  },
};
</script>