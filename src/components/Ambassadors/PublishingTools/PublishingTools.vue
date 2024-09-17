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
          <v-expansion-panels>
            <v-expansion-panel v-for="item in faq" :key="item">
              <v-expansion-panel-title>{{
                item.data.title
              }}</v-expansion-panel-title>
              <v-expansion-panel-text>
                <p class="text-body-2">
                  {{ item.data.description }}
                </p>
                <div v-if="item.data.media" class="images-box image-row">
                  <div
                    class="media-box"
                    v-for="(image, index) in item.data.media.images"
                    :key="index"
                  >
                    <v-img  :src="`${constImg}${image}`" class="media-img84"
@click="
                        openMedia = true;
                        media.images = item.data.media.images;
                      " 
                    />
           
                  </div>
                  <div
                    class="media-box"
                    v-for="(video, index) in item.data.media.videos"
                    :key="index"
                  >
                    <video class="media-img84" @click="openMedia = true">
                      <source :src="`${constImg}${video}`" type="video/mp4" />
                    </video>
                    <v-img
                      :src="
                        require('../../../assets/images/structure/play-icon.png')
                      "
                      class="play-icon"

                      @click="
                        openMedia = true;
                        media.videos =  item.data.media.videos;"
                    />
                     
                  </div>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
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
        <v-carousel-item v-for="(item, index) in media.images" :key="index">
          <v-img :src="`${constImg}${item}`" class="lightbox-media-img" />
        </v-carousel-item>
        <!-- <v-carousel-item v-for="(item, index) in media.videos" :key="index">
          <video controls autoplay loop class="lightbox-media-img">
            <source :src="`${constImg}${item}`" type="video/mp4" />
          </video>
        </v-carousel-item> -->
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
import Loader from "../../Loader/Loader.vue";

var moment = require("moment");

export default {
  name: "ProfilePage",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    Loader,
  },

  data() {
    return {
      moment: moment,
      publishingTool: [],
      isLoading: false,
      faq: "",
      constImg: constant.CLOUDFRONT_DESTINATION,
      openMedia: false,
      media: {
        images: [],
        videos: [],
      },
    };
  },

  mounted() {
    this.getPublishingTool();
  },
  methods: {
    async getPublishingTool() {
      this.isLoading = true;
      try {
        this.isLoading = true;
        console.log("under get publication")
        const response = await services.Publishing.GET_PUBLISHING_TOOLS();
        console.log(response)
        this.faq = response.data;
        this.isLoading = false;
        console.log(this.faq);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>