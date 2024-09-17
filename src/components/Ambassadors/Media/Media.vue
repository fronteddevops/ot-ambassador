<template>
  <div class="bg-gray">
    <Loader v-if="isLoading" />
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="10" xl="10">
          <!-- <v-tabs v-model="tab" class="media-tab">
                        <v-tab :value="all">All (14)</v-tab>
                        <v-tab :value="photo">Photo (10)</v-tab>
                        <v-tab :value="video">Video (4)</v-tab>
                    </v-tabs>                     -->

          <v-window v-model="tab" v-if="postMedia.length > 0">
            <v-window-item :value="all">
              <div>
                <v-row>
                  <v-col
                    cols="6"
                    sm="4"
                    md="4"
                    lg="3"
                    xl="3"
                    v-for="(item, index) in postMedia"
                    :key="index"
                  >
                    <div class="media-box">
                      <v-img
                        v-if="
                          item.media.includes('.png') ||
                          item.media.includes('.jpg') ||
                          item.media.includes('.jpeg')
                        "
                        :src="`${constImg}${item.media}`"
                        class="media-img"
                      />
                      <video v-else class="media-img">
                        <source
                          :src="`${constImg}${item.media}`"
                          type="video/mp4"
                        />
                      </video>
                      <div class="media-hover-box">
                        <div class="d-flex justify-space-between">
                          <v-img
                            v-if="item.postType == 'public'"
                            :src="
                              require('../../../assets/images/structure/media-public-icon.svg')
                            "
                            width="16"
                            height="16"
                          />
                          <v-img
                            v-if="item.postType == 'private'"
                            :src="
                              require('../../../assets/images/structure/media-group-icon.svg')
                            "
                            width="16"
                            height="16"
                          />
                          <v-img
                            v-if="item.postType == 'paid'"
                            :src="
                              require('../../../assets/images/structure/media-paid-icon.svg')
                            "
                            width="16"
                            height="16"
                          />
                        </div>
                        <div
                          class="light-click-box"
                          @click="openMedia = true"
                        ></div>
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <v-dialog v-model="openMedia" class="media-light-box">
                  <v-img
                    @click="openMedia = false"
                    :src="
                      require('../../../assets/images/structure/close-modal.svg')
                    "
                    class="modal-close-icon"
                  />
                  <v-carousel hide-delimiters>
                    <v-carousel-item
                      v-for="(item, index) in postMedia"
                      :key="index"
                    >
                      <v-img
                        v-if="
                          item.media.includes('.png') ||
                          item.media.includes('.jpg') ||
                          item.media.includes('.jpeg')
                        "
                        :src="`${constImg}${item.media}`"
                        class="lightbox-media-img"
                      />
                      <video
                        controls
                        autoplay
                        loop
                        v-else
                        class="lightbox-media-img"
                      >
                        <source
                          :src="`${constImg}${item.media}`"
                          type="video/mp4"
                        />
                      </video>
                    </v-carousel-item>
                  </v-carousel>
                </v-dialog>
              </div>
            </v-window-item>
            <v-window-item :value="photo">
              <Images />
            </v-window-item>
            <v-window-item :value="video">
              <Video />
            </v-window-item>
          </v-window>
          <EmptyPage v-else />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
import EmptyPage from "./EmptyPage.vue";
// import AllMedia from "./AllMedia.vue";
import Images from "./Images.vue";
import Video from "./Video.vue";
import services from "@/services";
import Loader from "../../Loader/Loader.vue";
import constant from "../../../../constant";
var _ = require("lodash");
export default {
  name: "MediaPage",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    EmptyPage,
    // AllMedia,
    Images,
    Video,
    Loader,
  },

  data() {
    return {
      tab: null,
      openMedia: false,
      isLoading: false,
      postList: [],
      postMedia: [],
      constImg: constant.CLOUDFRONT_DESTINATION,
    };
  },
  mounted() {
    this.getPostHandler();
  },
  methods: {
    async getPostHandler() {
      this.isLoading = true;
      try {
        this.isLoading = true;
        const response = await services.Post.GET_POST();
        console.log(response);
        this.postList = response.data;
        this.isLoading = false;
        if (this.postList.length > 0) {
          this.postList.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          let postMedias = _.map(this.postList, (i) =>
            _.pick(i, "media", "postType")
          );
          let array1 = [];
          console.log(postMedias);
          postMedias.map((item) => {
            array1.push({ media: item.media.data, postType: item.postType });
          });
          console.log(array1);
          array1.map((item) => {
            item.media.map((mediaItem) => {
              this.postMedia.push({
                postType: item.postType,
                media: mediaItem,
              });
            });
          });
          console.log(this.postMedia);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>