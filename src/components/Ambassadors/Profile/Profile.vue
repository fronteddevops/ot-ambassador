<template>
  <div class="bg-gray">
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="7" xl="7">
          <LoaderPage v-if="isLoading" />

          <v-alert
            class="profile-alert alert-top-center"
            type="warning"
            v-if="!isProfileCompleted"
          >
            <v-img
              :src="
                require('../../../assets/images/structure/alert-warning.svg')
              "
              width="20"
              height="20"
            />
            {{
              $t(
                "alert.Yourprofileisntvisibleuntillyouprovideyourbasicpaymentsubscriptiondetails"
              )
            }}
          </v-alert>
          <div class="white-box-radius">
            <h5 class="text-h5">{{ $t("common.BasicInfo") }}</h5>
            <p class="text-body-2 mb-6">
              {{
                $t(
                  "common.Thisisthefirstthingpotentialcustomerwillseewhentheylandonyourpagesomakesureyoupaintacompellingpictureofhowtheycanjoinyouonthisjourney"
                )
              }}
            </p>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text mt-1 mb-1"
                  >{{ $t("common.ProfileImage")
                  }}<span class="pink">*</span></label
                >
                <p class="text-body-2 pr-3">
                  {{
                    $t(
                      "Werecommenda1024pxby1024pximageUploadimagehereinJPGPNGformat"
                    )
                  }}
                </p>
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <div class="max-width300">
                  <div v-if="selectedFile">
                    <VueCropper
                      v-show="selectedFile"
                      ref="cropper"
                      :src="selectedFile"
                      :aspectRatio="1"
                      :initialAspectRatio="1"
                      :viewMode="1"
                      :dragMode="'none'"
                      :scalable="false"
                      :cropBoxMovable="true"
                      :cropBoxResizable="false"
                      alt="Source Image"
                    ></VueCropper>
                    <v-btn
                      size="small"
                      color="success"
                      type="button"
                      class="ml-auto my-2 d-block"
                      width="150"
                      v-if="selectedFile"
                      @click="onImageUpload"
                    >
                      Upload Image
                    </v-btn>
                  </div>
                  <div class="upload-box upload-profile-image" v-else>
                    <v-img
                      v-if="profileImage"
                      :src="`${constImg}${profileImage}`"
                      class=""
                    />
                    <v-img
                      v-else
                      :src="
                        require('../../../assets/images/structure/Profile-dummy.svg')
                      "
                      width="36"
                      height="36"
                      class=""
                    />
                    <!-- <v-img :src="require('../../../assets/images/product/p-image1.png')" class="upload-img" />
                                        <v-img :src="require('../../../assets/images/structure/crose-red-icon.svg')" class="crose-img" /> -->
                    <div class="hover-upload">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/camera-white.svg')
                        "
                        class="camara-icon"
                      />
                      <span v-if="!profileImage">{{
                        $t("common.AddPhoto")
                      }}</span>
                      <span v-if="profileImage">Change Photo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      v-on:change="onFileSelect"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text mt-1 mb-1"
                  >{{ $t("common.CoverImage")
                  }}<span class="pink">*</span></label
                >
                <p class="text-body-2 pr-3">
                  {{
                    $t(
                      "Werecommendanimageatleast820pxwideand312pxtallUploadimagehereinJPGPNGformat"
                    )
                  }}
                </p>
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <div class="max-width300">
                  <div v-if="selectedCoverFile">
                    <VueCropper
                      v-show="selectedCoverFile"
                      ref="cropper"
                      :src="selectedCoverFile"
                      :aspectRatio="16 / 9"
                      :initialAspectRatio="16 / 9"
                      alt="Source Image"
                      :dragMode="'none'"
                      :scalable="false"
                      :cropBoxMovable="true"
                      :cropBoxResizable="false"
                      :viewMode="1"
                    ></VueCropper>
                    <v-btn
                      size="small"
                      color="success"
                      type="button"
                      class="ml-auto my-2 d-block"
                      width="150"
                      v-if="selectedCoverFile"
                      @click="onCoverImageUpload"
                    >
                      Upload Image
                    </v-btn>
                  </div>
                  <div v-else class="upload-box upload-cover-image">
                    <!-- <v-img :src="require('../../../assets/images/structure/galley-img.svg')" width="36" height="36" class="" /> -->
                    <v-img
                      v-if="coverImage"
                      :src="`${constImg}${coverImage}`"
                      class="upload-img"
                    />
                    <v-img
                      v-else
                      :src="
                        require('../../../assets/images/structure/galley-img.svg')
                      "
                      width="36"
                      height="36"
                    />
                    <!-- <v-img
                      :src="
                        require('../../../assets/images/structure/crose-red-icon.svg')
                      "
                      class="crose-img"
                    /> -->
                    <div class="hover-upload">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/camera-white.svg')
                        "
                        class="camara-icon"
                      />
                      <span v-if="!coverImage">{{
                        $t("common.AddPhoto")
                      }}</span>
                      <span v-if="coverImage">Change Photo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      v-on:change="onCoverFileSelect"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text"
                  >{{ $t("onboarding.FirstName")
                  }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="Enter Name"
                  v-model="firstName"
                  :rules="[rules.required, rules.charLimit]"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text">{{
                  $t("onboarding.LastName")
                }}</label>
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="Enter Name"
                  v-model="lastName"
                  :rules="[rules.required, rules.charLimit]"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text"
                  >{{ $t("onboarding.DesiredName")
                  }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="Enter desired name"
                  v-model="desiredName"
                  :rules="[rules.required, rules.charLimit]"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text"
                  >{{ $t("onboarding.email")
                  }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="Enter here"
                  v-model="email"
                  disabled
                  :rules="[rules.required, rules.validEmail]"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text">{{
                  $t("onboarding.MobileNumber")
                }}</label>
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <div class="custome-phone-box height40">
                  <vue-tel-input
                    v-on:country-changed="
                      (e) => {
                        this.countryCode = e.dialCode;
                      }
                    "
                    v-if="countryCodeIso"
                    v-on:input="onSelect"
                    :inputOptions="{
                      showDialCode: false,
                      autocomplete: 'off',
                    }"
                    :dropdownOptions="{
                      showDialCodeInSelection: true,
                      showDialCodeInList: true,
                      showSearchBox: true,
                      showFlags: true,
                    }"
                    class="custom-input-telphone"
                    :autoFormat="false"
                    :defaultCountry="countryCodeIso"
                    :autoDefaultCountry="false"
                    :input="phoneNumber"
                    :value="phoneNumber"
                    v-model="phoneNumber"
                  ></vue-tel-input>
                  <vue-tel-input
                    v-else
                    v-on:country-changed="
                      (e) => {
                        this.countryCode = e.dialCode;
                      }
                    "
                    v-on:input="onSelect"
                    :inputOptions="{
                      showDialCode: false,
                      autocomplete: 'off',
                    }"
                    :dropdownOptions="{
                      showDialCodeInSelection: true,
                      showDialCodeInList: true,
                      showSearchBox: true,
                      showFlags: true,
                    }"
                    class="custom-input-telphone"
                    :autoFormat="false"
                    :defaultCountry="countryCodeIso"
                    :autoDefaultCountry="false"
                    :input="phoneNumber"
                    :value="phoneNumber"
                    v-model="phoneNumber"
                  ></vue-tel-input>
                  <!-- <v-autocomplete
                    v-model="countryCode"
                    :items="itemsContry"
                    item-title="state"
                    variant="plain"
                  ></v-autocomplete>
                  <v-text-field
                    class="custome-phone-input"
                    variant="solo"
                    type="number"
                    v-model="phoneNumber"
                  /> -->
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text"
                  >{{ $t("onboarding.Age") }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="0"
                  type="number"
                  suffix="yrs"
                  v-model="age"
                  :rules="[rules.required]"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text"
                  >{{ $t("onboarding.Gender")
                  }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-select
                  class="height40"
                  :items="itemsGender"
                  variant="solo"
                  placeholder="Select"
                  v-model="gender"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text"
                  >{{ $t("onboarding.Orientation")
                  }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-select
                  class="height40"
                  :items="itemsOrientation"
                  variant="solo"
                  placeholder="Select"
                  v-model="orientation"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text"
                  >{{ $t("onboarding.Kink") }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <v-select
                  class="height40"
                  :items="itemsKink"
                  variant="solo"
                  placeholder="Select"
                  v-model="kink"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text mt-1 mb-1"
                  >{{ $t("common.IntroVideo")
                  }}<span class="pink">*</span></label
                >
                <p class="text-body-2 pr-4">
                  {{
                    $t(
                      "Werecommendavideoatleast914pxwideand608pxtallUploadvideohereinMP4WebPformat"
                    )
                  }}
                </p>
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <div class="max-width300">
                  <div class="upload-box upload-video-image">
                    <video controls loop v-if="introVideo">
                      <source
                        :src="`${constImg}${introVideo}`"
                        type="video/mp4"
                      />
                    </video>

                    <v-img
                      v-else
                      :src="
                        require('../../../assets/images/structure/galley-img.svg')
                      "
                      width="36"
                      height="36"
                      class=""
                    />

                    <v-img
                      v-if="introVideo"
                      @click="introVideo = ''"
                      :src="
                        require('../../../assets/images/structure/crose-red-icon.svg')
                      "
                      class="crose-img"
                    />
                    <div class="hover-upload" v-else>
                      <v-img
                        :src="
                          require('../../../assets/images/structure/camera-white.svg')
                        "
                        class="camara-icon"
                      />
                      <span>{{ $t("common.AddVideo") }}</span>
                    </div>
                    <input
                      v-if="!introVideo"
                      type="file"
                      v-on:change="
                        (e) => {
                          uploadVideoFile(e, '_userintrovideo');
                        }
                      "
                      accept="video/mp4,video/x-m4v,video/*"
                    />
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>

          <div class="white-box-radius">
            <h5 class="text-h5">{{ $t("common.AboutYou") }}</h5>
            <p class="text-body-2 mb-6">
              {{
                $t(
                  "common.Thisisthefirstthingpotentialcustomerwillseewhentheylandonyourpagesomakesureyoupaintacompellingpictureofhowtheycanjoinyouonthisjourney"
                )
              }}
            </p>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                <label class="label-text mt-0"
                  >{{ $t("onboarding.Bio") }}<span class="pink">*</span></label
                >
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                <small class="text-blue-grey-lighten-3 text-right d-block"
                  >{{ bio && bio.length }}/300</small
                >

                <v-textarea
                  variant="solo"
                  placeholder="Bio"
                  rows="3"
                  class="mb-3"
                  v-model="bio"
                  :rules="[rules.required, rules.longCharLimit]"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>

          <div class="white-box-radius">
            <h5 class="text-h5">{{ $t("common.SocialMedia") }}</h5>
            <p class="text-body-2 mb-6">
              {{
                $t(
                  "common.GiveyourcustomersconfidencesecurelyverifyyouraccountsanddisplaylinksonyourpageWellneverpostonyourbehalf"
                )
              }}
            </p>
            <div class="social-rows">
              <div class="social-left">
                <v-img
                  :src="
                    require('../../../assets/images/social/twitter-icon.svg')
                  "
                  class="social-icon"
                />
                <p class="text-body-2">Twitter</p>
              </div>
              <div class="social-right">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="Enter Twitter Link"
                  v-model="twitterLink"
                />
              </div>
            </div>
            <div class="social-rows">
              <div class="social-left">
                <v-img
                  :src="
                    require('../../../assets/images/social/tiktok-icon.svg')
                  "
                  class="social-icon"
                />
                <p class="text-body-2">Tik Tok</p>
              </div>
              <div class="social-right">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="Enter Tik Tok Link"
                  v-model="tiktokLink"
                />
              </div>
            </div>
            <div class="social-rows">
              <div class="social-left">
                <v-img
                  :src="
                    require('../../../assets/images/social/instagram-icon.svg')
                  "
                  class="social-icon"
                />
                <p class="text-body-2">Instagram</p>
              </div>
              <div class="social-right">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="Enter Instagram Link"
                  v-model="instagramLink"
                />
              </div>
            </div>
            <div class="social-rows">
              <div class="social-left">
                <v-img
                  :src="
                    require('../../../assets/images/social/snapchat-icon.svg')
                  "
                  class="social-icon"
                />
                <p class="text-body-2">Snapchat</p>
              </div>
              <div class="social-right">
                <v-text-field
                  class="height40"
                  variant="solo"
                  placeholder="Enter Snapchat Link"
                  v-model="snapchatLink"
                />
              </div>
            </div>
          </div>

          <div class="text-right">
            <v-btn
              size="large"
              color="success"
              type="button"
              class="ml-auto mt-2"
              width="150"
              @click="updateUserDetails"
              :disabled="!this.isValid"
            >
              {{ $t("common.Next") }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <AmbassadorsRight />
        </v-col>
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
import AmbassadorsRight from "../AmbassadorsRight/AmbassadorsRight.vue";
import services from "../../../services";
import "vue3-carousel/dist/carousel.css";
import AWS from "aws-sdk";
import { VueTelInput } from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import constant from "../../../../constant";
import countries from "../../../assets/all-countries";
import LoaderPage from "../../../components/Loader/Loader.vue";
import { v4 as uuidv4 } from "uuid";

AWS.config.update({
  accessKeyId: "AKIA3LMUAPGY5KXVVUVN",
  secretAccessKey: "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",
});
export default {
  name: "ProfilePage",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    AmbassadorsRight,
    VueTelInput,
    LoaderPage,
    VueCropper,
  },

  data() {
    return {
      countryCode: "",
      countryCodeIso: "",
      itemsContry: ["+616", "+91", "+86", "+1"],
      itemsGender: ["Men", "Women", "Other"],
      itemsOrientation: ["Straight", "Bi-sexual", "Transexual", "Pansexual"],
      itemsKink: ["Sub", "Dom", "Fluid"],
      model: true,
      isLoading: false,
      profileImage: "",
      coverImage: "",
      coverImageURL: "",
      firstName: "",
      lastName: "",
      desiredName: "",
      age: "",
      gender: "",
      orientation: "",
      introVideo: "",
      selectedFile: "",
      selectedCoverFile: "",
      kink: "",
      bio: "",
      email: "",
      phoneNumber: "",
      alertMessage: "",
      showAlert: false,
      alertType: "",
      profileImageURL: "",
      introVideoURL: "",
      isValid: false,
      firstNameValid: false,
      lastNameValid: false,
      mobValid: false,
      instaValid: false,
      snapValid: false,
      tikvalid: false,
      twitvalid: false,
      bioValid: false,
      isUpdated: false,
      userDetail: "",
      snapchatLink: "",
      instagramLink: "",
      tiktokLink: "",
      twitterLink: "",
      isProfileCompleted: false,
      constImg: constant.CLOUDFRONT_DESTINATION,
      rules: {
        required: (value) => !!value || "Required.",
        validMob: (v) =>
          JSON.stringify(v).length >= 10 ||
          v == "" ||
          "Enter valid mobile number",
        charLimit: (v) => v?.trim().length < 201 || "Max limit for input",
        longCharLimit: (v) => v?.trim().length < 301 || "Max limit for input",
        validEmail: (email) =>
          // eslint-disable-next-line
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          ) || "Please enter a valid email",
      },
    };
  },
  mounted() {
    this.getUserDetails();

    if (
      this.userDetail &&
      this.userDetail.isProfileCompleted &&
      this.userDetail.isSubscriptionPlanAdded &&
      this.userDetail.isPaymentDetailCompleted
    ) {
      this.isProfileCompleted = true;
    } else {
      this.isProfileCompleted = false;
    }
  },
  watch: {
    firstName(val) {
      if (val != "" && val.trim().length < 201) {
        this.firstNameValid = true;
      } else {
        this.firstNameValid = false;
      }
      this.checkIsValid();
    },
    lastName(val) {
      if (val != "" && val.trim().length < 201) {
        this.lastNameValid = true;
      } else {
        this.lastNameValid = false;
      }
      this.checkIsValid();
    },
    phoneNumber(val) {
      if (JSON.stringify(val).length >= 10 || val == "") {
        this.mobValid = true;
      } else {
        this.mobValid = false;
      }
      this.checkIsValid();
    },
    twitterLink(val) {
      if (val != "") {
        this.twitvalid = true;
      } else {
        this.twitvalid = false;
      }
      this.checkIsValid();
    },
    instagramLink(val) {
      if (val != "") {
        this.instaValid = true;
      } else {
        this.instaValid = false;
      }
      this.checkIsValid();
    },
    tiktokLink(val) {
      if (val != "") {
        this.tikvalid = true;
      } else {
        this.tikvalid = false;
      }
      this.checkIsValid();
    },
    snapchatLink(val) {
      if (val != "") {
        this.snapValid = true;
      } else {
        this.snapValid = false;
      }
      this.checkIsValid();
    },

    age() {
      this.checkIsValid();
    },
    gender() {
      this.checkIsValid();
    },
    kink() {
      this.checkIsValid();
    },
    orientation() {
      this.checkIsValid();
    },
    bio(val) {
      if (val != "" && val?.trim().length < 301) {
        this.bioValid = true;
      } else {
        this.bioValid = false;
      }
      this.checkIsValid();
    },
    email() {
      this.checkIsValid();
    },
  },
  methods: {
    onImageUpload() {
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob, "this.$refs.cropper.getCroppedCanvas()");
        this.uploadFile(blob, "_userprofile");
      });
      this.selectedFile = null;
      this.$refs.cropper.replace(this.selectedFile);
    },
    onFileSelect(e) {
      const file = e.target.files[0];
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedFile = event.target.result;
          this.$refs.cropper.replace(this.selectedFile);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    onCoverImageUpload() {
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob, "this.$refs.cropper.getCroppedCanvas()");
        this.uploadFile(blob, "_usercover");
      });
      this.selectedCoverFile = null;
      this.$refs.cropper.replace(this.selectedCoverFile);
    },
    onCoverFileSelect(e) {
      const file = e.target.files[0];
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.selectedCoverFile = event.target.result;
          this.$refs.cropper.replace(this.selectedCoverFile);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    getCountryISO(code) {
      countries.map((item) => {
        if (item.code == code) {
          console.log(code, item, "countryCode");
          this.countryCodeIso = item.iso;
        }
      });
    },
    onSelect(number) {
      console.log(number, typeof number);
      if (typeof number == "string") {
        console.log(number, "findone");
        this.phoneNumber = number;
      }
      // console.log(this.mobile, '344234234')
    },

    async uploadVideoFile(e, name) {
      console.log(e, name, "ename");
      this.isLoading = true;
      const uuid = uuidv4();
      // let userId = await JSON.parse(localStorage.getItem("user_Details")).id;
      let file = e.target.files[0];
      let filetype = e.target.files[0].type.split("/")[1];
      let fileName = `${this.firstName}${name}${Math.floor(
        Math.random() * 100000 + 1
      )}.${filetype}`;
      const myBucket = new AWS.S3({
        params: { Bucket: constant.S3_BUCKET_VIDEO },
        region: constant.REGION,
      });
      const params = {
        // ACL: 'public-read',
        Body: file,
        Bucket: constant.S3_BUCKET_VIDEO,
        Key: `${uuid}/AppleHLS1/${fileName}`,
        ContentType: file.type,
        Metadata: { secretkey: `${uuid}` },
      };
      // 'x-amz-meta-userId': userId,
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          console.log(evt);
          return true;
        })
        .send((err) => {
          if (err) console.log(err);
          this.introVideo = `${uuid}/AppleHLS1/${fileName}`;
          this.isLoading = false;
        });
    },
    async uploadFile(e, name) {
      this.isLoading = true;
      console.log(e, name, "ename");
      let file = e;
      let file_limit = name == "_userprofile" ? 2097152 : 5242880;
      if (file.size <= file_limit) {
        let filetype = e.type.split("/")[1];
        let fileName = `${this.firstName}${name}${Math.floor(
          Math.random() * 100000 + 1
        )}.${filetype}`;
        const myBucket = new AWS.S3({
          params: { Bucket: constant.S3_BUCKET_IMAGE },
          region: constant.REGION,
        });
        const params = {
          // ACL: 'public-read',
          Body: file,
          Bucket: constant.S3_BUCKET_IMAGE,
          Key: `images/${fileName}`,
          ContentType: file.type,
        };

        myBucket
          .putObject(params)
          .on("httpUploadProgress", (evt) => {
            console.log(evt);
            return true;
          })
          .send(async (err) => {
            if (err) console.log(err);
            this.isLoading = false;

            if (name == "_userprofile") {
              this.profileImage = `images/${fileName}`;
            } else if (name == "_userintrovideo") {
              this.introVideo = `images/${fileName}`;
            } else {
              this.coverImage = `images/${fileName}`;
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
    async getUserDetails() {
      try {
        let userId = localStorage.getItem("user_Details")
          ? JSON.parse(localStorage.getItem("user_Details")).id
          : null;
        this.isLoading = true;

        const response = await services.UserDetail.GEt_USER_DETAIL(userId);
        this.userDetail = response.data.UserDetail;
        if (response) {
          this.firstName = response.data.UserDetail.name;
          this.lastName = response.data.UserDetail.lastName;
          this.desiredName = response.data.UserDetail.desiredName;
          this.profileImage = response.data.UserDetail.profileImage;
          this.introVideo = response.data.UserDetail.introVideo;
          this.coverImage = response.data.UserDetail.coverImage;
          this.email = response.data.UserDetail.email;
          this.countryCode = response.data.UserDetail.countryCode;
          this.getCountryISO(response.data.UserDetail.countryCode);
          this.phoneNumber = response.data.UserDetail.phoneNumber;
          this.age = response.data.UserDetail.age;
          this.gender = response.data.UserDetail.gender;
          this.orientation = response.data.UserDetail.orientation;
          this.kink = response.data.UserDetail.kink;
          this.bio = response.data.UserDetail.bio;
          this.tiktokLink = response.data.UserDetail.tiktokLink;
          this.twitterLink = response.data.UserDetail.twitterLink;
          this.instagramLink = response.data.UserDetail.instagramLink;
          this.snapchatLink = response.data.UserDetail.snapchatLink;
          this.isProfileCompleted = response.data.isProfileCompleted;
          this.isLoading = false;
          localStorage.setItem("user_Details", JSON.stringify(response.data));
        }
      } catch (err) {
        this.showAlert = true;
        this.alertType = "error";
        this.isLoading = false;

        this.alertMessage = err.response.data.message;
        setTimeout(() => {
          this.showAlert = false;
          this.$router.push("/");
        }, 2500);
      }
    },
    async updateUserDetails() {
      this.isLoading = true;

      let userId = JSON.parse(localStorage.getItem("user_Details")).id;
      let data = {};
      // data.profileImage = this.profileImage
      // data.coverImage = this.coverImage
      if (
        this.profileImage &&
        this.profileImage != this.userDetail.profileImage
      ) {
        data.profileImage = this.profileImage;
      }
      if (this.coverImage && this.coverImage != this.userDetail.coverImage) {
        data.coverImage = this.coverImage;
      }
      if (this.introVideo && this.introVideo != this.userDetail.introVideo) {
        data.introVideo = this.introVideo;
      }
      // if (this.firstName && this.firstName != this.userDetail.name) {
      data.name = this.firstName;
      // }
      if (this.lastName && this.lastName != this.userDetail.lastName) {
        data.lastName = this.lastName;
      }
      if (this.desiredName && this.desiredName != this.userDetail.desiredName) {
        data.desiredName = this.desiredName;
      }
      // if (this.email ) {
      //   data.email = this.email;
      // }
      if (this.countryCode && this.countryCode != this.userDetail.countryCode) {
        data.countryCode = this.countryCode;
      }
      if (this.phoneNumber && this.phoneNumber != this.userDetail.phoneNumber) {
        data.phoneNumber = this.phoneNumber;
      }
      if (
        this.instagramLink &&
        this.instagramLink != this.userDetail.instagramLink
      ) {
        data.instagramLink = this.instagramLink;
      }
      if (this.twitterLink && this.twitterLink != this.userDetail.twitterLink) {
        data.twitterLink = this.twitterLink;
      }
      if (this.tiktokLink && this.tiktokLink != this.userDetail.tiktokLink) {
        data.tiktokLink = this.tiktokLink;
      }
      if (
        this.snapchatLink &&
        this.snapchatLink != this.userDetail.snapchatLink
      ) {
        data.snapchatLink = this.snapchatLink;
      }
      if (this.age && this.age != this.userDetail.age) {
        data.age = this.age;
      }
      if (this.gender && this.gender != this.userDetail.gender) {
        data.gender = this.gender;
      }
      if (this.orientation && this.orientation != this.userDetail.orientation) {
        data.orientation = this.orientation;
      }
      if (this.kink && this.kink != this.userDetail.kink) {
        data.kink = this.kink;
      }
      if (this.bio && this.bio != this.userDetail.bio) {
        data.bio = this.bio;
      }
      data.isProfileCompleted = true;
      try {
        const response = await services.UserDetail.UPDATE_USER_DETAIL(
          userId,
          data
        );
        if (response) {
          this.showAlert = true;
          this.alertType = "success";
          this.alertMessage = "Details saved successfully";
          this.getUserDetails();
          this.isLoading = false;

          setTimeout(() => {
            this.showAlert = false;
            this.$router.push("/profile-preview");
          }, 1000);
        }
      } catch (err) {
        this.showAlert = true;
        this.alertType = "error";
        this.isLoading = false;

        this.alertMessage = err.response.data.message;
        setTimeout(() => {
          this.showAlert = false;
        }, 2500);
      }
    },
    checkIsValid() {
      if (
        this.firstNameValid &&
        this.lastNameValid &&
        this.mobValid &&
        this.tikvalid &&
        this.snapValid &&
        this.twitvalid &&
        this.instaValid &&
        this.email &&
        this.desiredName &&
        this.age &&
        this.gender &&
        this.orientation &&
        this.kink &&
        this.bioValid &&
        this.profileImage &&
        this.coverImage &&
        this.introVideo
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      if (
        this.firstName != this.userDetail.name ||
        this.lastName != this.userDetail.lastName ||
        this.desiredName != this.userDetail.desiredName ||
        this.phoneNumber != this.userDetail.phoneNumber ||
        this.twitterLink != this.userDetail.twitterLink ||
        this.snapchatLink != this.userDetail.snapchatLink ||
        this.tiktokLink != this.userDetail.tiktokLink ||
        this.instagramLink != this.userDetail.instagramLink ||
        this.countryCode != this.userDetail.countryCode ||
        this.age != this.userDetail.age ||
        this.gender != this.userDetail.gender ||
        this.orientation != this.userDetail.orientation ||
        this.kink != this.userDetail.kink ||
        this.bio != this.userDetail.bio ||
        this.profileImage != this.userDetail.profileImage ||
        this.coverImage != this.userDetail.coverImage ||
        this.introVideo != this.userDetail.introVideo
      ) {
        this.isUpdated = true;
      } else {
        this.isUpdated = false;
      }
    },
  },
};
</script>