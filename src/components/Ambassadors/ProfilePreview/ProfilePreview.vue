<template>
  <div class="bg-gray">
    <AmbassadorHeader />
    <div class="profile-top-box pt-0">
      <LoaderPage v-if="isLoading" />
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12" xl="12">
            <div class="max-width1050">
              <div class="profile-benner-box">
                <v-img
                  v-if="profileDetail?.UserDetail?.coverImage"
                  :src="`${constImg}${profileDetail?.UserDetail?.coverImage}`"
                  cover
                  class="profile-benner-img"
                />
                <v-img
                  v-else
                  :src="
                    require('../../../assets/images/structure/galley-img.png')
                  "
                  cover
                  class="profile-benner-img"
                />
              </div>
              <div class="profile-bottom-row">
                <v-img
                  v-if="profileDetail?.UserDetail?.profileImage"
                  :src="`${constImg}${profileDetail?.UserDetail?.profileImage}`"
                  cover
                  class="profile-round"
                />
                <v-img
                  v-else
                  :src="
                    require('../../../assets/images/structure/Profile-dummy.png')
                  "
                  cover
                  class="profile-round"
                />
                <div class="reltive">
                  <h4 class="text-h4">
                    {{ profileDetail?.UserDetail?.name }}
                    {{ profileDetail?.UserDetail?.lastName }}
                  </h4>
                  <span class="text-body-2"
                    >@{{ profileDetail?.UserDetail?.desiredName }}</span
                  >
                </div>
                <v-btn
                  variant="outlined"
                  to="/profile"
                  size="small"
                  color="#FF179C"
                  class="ml-auto"
                  >{{ $t("common.Edit") }}</v-btn
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <div class="max-width1050">
            <div class="profile-white-box">
              <v-row justify="space-between">
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <h5 class="text-h5 mb-3">{{ $t("common.BasicInfo") }}</h5>
                  <div class="info-flex-row">
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/email-pink-icon.svg')
                        "
                        width="32"
                        height="32"
                      />
                      <p class="text-body-2">{{ $t("common.Email") }}</p>
                    </div>
                    <p class="text-body-2 medium">{{ profileDetail?.email }}</p>
                  </div>
                  <div class="info-flex-row">
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/sex-pink-icon.svg')
                        "
                        width="32"
                        height="32"
                      />
                      <p class="text-body-2">{{ $t("common.Sex") }}</p>
                    </div>
                    <p class="text-body-2 medium">
                      {{ profileDetail?.UserDetail?.gender }}
                    </p>
                  </div>
                  <div class="info-flex-row">
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/age-pink-icon.svg')
                        "
                        width="32"
                        height="32"
                      />
                      <p class="text-body-2">{{ $t("common.Age") }}</p>
                    </div>
                    <p class="text-body-2 medium">
                      {{ profileDetail?.UserDetail?.age }}
                      {{ $t("common.yrs") }}
                    </p>
                  </div>
                  <div class="info-flex-row">
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/orientation-pink-icon.svg')
                        "
                        width="32"
                        height="32"
                      />
                      <p class="text-body-2">{{ $t("common.Orientation") }}</p>
                    </div>
                    <p class="text-body-2 medium">
                      {{ profileDetail?.UserDetail?.orientation }}
                    </p>
                  </div>
                  <div class="info-flex-row">
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/kink-pink-icon.svg')
                        "
                        width="32"
                        height="32"
                      />
                      <p class="text-body-2">{{ $t("common.Kink") }}</p>
                    </div>
                    <p class="text-body-2 medium">
                      {{ profileDetail?.UserDetail?.kink }}
                    </p>
                  </div>
                  <div class="info-flex-row">
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/phone-pink-icon.svg')
                        "
                        width="32"
                        height="32"
                      />
                      <p class="text-body-2">{{ $t("common.Phone") }}</p>
                    </div>
                    <p class="text-body-2 medium">
                      {{ profileDetail?.UserDetail?.phoneNumber }}
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="pl-sm-12">
                  <h5 class="text-h5 mb-3">{{ $t("common.SocialInfo") }}</h5>
                  <div
                    class="info-flex-row"
                    v-if="profileDetail?.UserDetail?.twitterLink"
                  >
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/social/twitter-icon.svg')
                        "
                        width="32"
                        height="32"
                      />
                      <p class="text-body-2 medium">
                        @{{ profileDetail?.UserDetail?.twitterLink }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="info-flex-row"
                    v-if="profileDetail?.UserDetail?.tiktokLink"
                  >
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/social/tiktok-icon.svg')
                        "
                        width="28"
                        height="28"
                      />
                      <p class="text-body-2 medium">
                        @{{ profileDetail?.UserDetail?.tiktokLink }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="info-flex-row"
                    v-if="profileDetail?.UserDetail?.instagramLink"
                  >
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/social/instagram-icon.svg')
                        "
                        width="28"
                        height="28"
                      />
                      <p class="text-body-2 medium">
                        @{{ profileDetail?.UserDetail?.instagramLink }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="info-flex-row"
                    v-if="profileDetail?.UserDetail?.snapchatLink"
                  >
                    <div class="relative">
                      <v-img
                        :src="
                          require('../../../assets/images/social/snapchat-icon.svg')
                        "
                        width="28"
                        height="28"
                      />
                      <p class="text-body-2 medium">
                        @{{ profileDetail?.UserDetail?.snapchatLink }}
                      </p>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>

            <div class="profile-white-box">
              <v-row justify="space-between">
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <h5 class="text-h5 mb-3">{{ $t("common.IntroVideo") }}</h5>
                  <div
                    class="preview-img-video"
                    v-if="profileDetail?.UserDetail?.introVideo"
                    @click="openMedia = true"
                  >
                    <video
                    
                      class="media-img"
                    >
                      <source :src="`${constImg}${profileDetail?.UserDetail?.introVideo}`" type="video/mp4" />
                    </video>
                    <v-img
                      :src="
                        require('../../../assets/images/structure/play-icon.png')
                      "
                      class="play-icon"
                    />
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6" class="pl-sm-12">
                  <h5 class="text-h5 mb-3">{{ $t("common.Bio") }}</h5>
                  <p class="text-body-2 medium mb-3">
                    {{ profileDetail?.UserDetail?.bio }}
                  </p>
                </v-col>
              </v-row>
            </div>
            <div class="text-right">
              <v-btn
                size="large"
                color="success"
                to="/payment"
                type="button"
                class="ml-auto mt-2"
                width="150"
              >
                {{ $t("common.Continue") }}
              </v-btn>
            </div>
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
        <v-carousel-item>
          <video
            controls
            autoplay
            loop
            
            class="lightbox-media-img"
          >
            <source :src="`${constImg}${profileDetail?.UserDetail?.introVideo}`" type="video/mp4" />
          </video>
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import services from "../../../services/index";
import LoaderPage from "../../../components/Loader/Loader.vue";
import constant from "../../../../constant"

export default {
  name: "ProfilePage",

  components: {
    AmbassadorHeader,
    LoaderPage,
  },

  data() {
    return {
      openMedia: false,
      isLoading: false,
      profileDetail: {},
      profileImage: "",
      profileImageURL: "",
      introVideo: "",
      introVideoURL: "",
      coverImage: "",
      coverImageURL: "",
      constImg: constant.CLOUDFRONT_DESTINATION,

    };
  },
  mounted() {
    this.getUserDetails();
  },
  methods: {

    async getUserDetails() {
      try {
        let userId = JSON.parse(localStorage.getItem("user_Details")).id;

        const response = await services.UserDetail.GEt_USER_DETAIL(userId);
        if (response) {
          this.profileDetail = response.data;
          this.profileImage = response.data.UserDetail.profileImage;
          this.introVideo = response.data.UserDetail.introVideo;
          this.coverImage = response.data.UserDetail.coverImage;
        }
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