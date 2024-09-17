<template>
  <div v-if="postlist.length > 0">
    <v-alert
      class="profile-alert alert-top-center"
      :type="alertType"
      v-if="showAlert"
    >
      <v-img
        :src="
          require(`../../../assets/images/structure/alert-${alertType}.svg`)
        "
        width="20"
        height="20"
      />
      {{ alertMessage }}
    </v-alert>
    <div class="overview-box" v-for="(item, index) in postlist" :key="index">
      <div class="overview-head">
        <v-img :src="`${constImg}${profileImg}`" width="40" height="40" />
        <div class="relative">
          <h5 class="text-h5">{{ profileName }}</h5>
          <div class="d-flex align-center">
            <span class="date-span">{{ dateTime(item.createdAt) }}</span>
            <span class="dot"></span>
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
        </div>
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-img
              v-bind="props"
              class="menu-icon"
              :src="require('../../../assets/images/structure/more_horiz.svg')"
              width="24"
              height="24"
            />
          </template>
          <v-list class="delete-menu">
            <v-list-item>
              <v-list-item-title
                class="d-flex default"
                @click="
                  deleteMedia = true;
                  deletedId = item.id;
                "
              >
                <v-img
                  v-bind="props"
                  :src="
                    require('../../../assets/images/structure/delete-black-icon.svg')
                  "
                  width="20"
                  height="20"
                  class="mr-1"
                />{{ $t("common.Delete") }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="overview-content">
        <p :class="`text-body-1 ${item.isExpanded ? '' : 'elipsis-para'}`">
          {{ item.description }}
        </p>
        <span
          v-if="
            item.description &&
            item.description.length &&
            item.description.length > 110
          "
        >
          <span
            v-if="item.isExpanded"
            @click="item.isExpanded = false"
            class="text-expand-toggle"
            >Read Less
          </span>
          <span
            v-else
            @click="item.isExpanded = true"
            class="text-expand-toggle"
            >Read More</span
          >
        </span>
        <v-carousel
          hide-delimiters
          show-arrows="hover"
          v-if="item.media && item.media.data.length > 0"
        >
          <v-carousel-item
            v-for="(mediaItem, mediaIndex) in item.media.data"
            :key="mediaIndex"
          >
            <v-img
              v-if="
                mediaItem.includes('.png') ||
                mediaItem.includes('.jpg') ||
                mediaItem.includes('.jpeg')
              "
              class="overview-video-img"
              cover
              :src="`${constImg}${mediaItem}`"
            />
            <video v-else class="overview-video-img" cover controls loop>
              <source :src="`${constImg}${mediaItem}`" type="video/mp4" />
            </video>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
    <v-dialog v-model="deleteMedia" maxWidth="295">
      <v-card class="delete-modal">
        <h4 class="text-h4 mb-2">{{ $t("common.DeletePost") }}</h4>
        <p class="text-body-2 gray mb-5">
          {{ $t("common.Areyousureyouwanttodeletethispost") }}
        </p>
        <v-card-actions class="justify-end mb-1">
          <v-btn class="gray" @click="deleteMedia = false">{{
            $t("common.Cancel")
          }}</v-btn>
          <v-btn class="blue" @click="deletePostHandler()">{{
            $t("common.Delete")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import constant from "../../../../constant";
import moment from "moment";
import services from "../../../services";

// import services from "../../../services"
export default {
  name: "OverviewBox",
  props: {
    postlist: Array,
  },
  data() {
    return {
      expand: true,
      deleteMedia: false,
      profileName: "",
      caption: "",
      profileImg: "",
      constImg: constant.CLOUDFRONT_DESTINATION,
      alertMessage: "",
      showAlert: false,
      alertType: "",
      deletedId: 0,
    };
  },
  watch: {
    postlist() {
      this.postlist.map((item) => {
        item.isExpanded = false;
      });
    },
  },
  mounted() {
    console.log(this.postlist, "sdfsdf");
    let userDetails = localStorage.getItem("user_Details")
      ? JSON.parse(localStorage.getItem("user_Details"))
      : null;
    if (userDetails) {
      this.profileName =
        localStorage.getItem("user_Details") && userDetails
          ? `${userDetails.name} ${userDetails.lastName}`
          : null;
      this.profileImg =
        localStorage.getItem("user_Details") && userDetails.UserDetail
          ? userDetails.UserDetail.profileImage
          : null;
    }
  },
  methods: {
    dateTime(value) {
      return moment(value).format("DD MMM YYYY");
    },
    async deletePostHandler() {
      try {
        const response = await services.Post.DELETE_POST(this.deletedId);
        console.log(response);
        this.showAlert = true;
        this.deleteMedia = false;
        this.alertType = "error";
        this.alertMessage = `Post deleted successfully!`;
        this.deletedId = 0;
        setTimeout(() => {
          this.showAlert = false;
          location.reload();
        }, 3000);
      } catch (error) {
        console.log(error);
        this.showAlert = true;
        this.deleteMedia = false;
        this.alertType = "error";
        this.alertMessage = error.response.data.message;
        this.deletedId = 0;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    },
  },
};
</script>