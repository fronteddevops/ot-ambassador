<template>
  <div>
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
    <v-toolbar class="ambassador-header">
      <span class="hidden-max-767">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
          <v-icon>mdi-backburger</v-icon>
        </v-toolbar-side-icon>
        <v-navigation-drawer v-model="sidebar">
          <AmbassadorsLeft />
        </v-navigation-drawer>
      </span>
      <router-link to="/overview">
        <v-img
          :src="require('../../../assets/images/logo/logo.svg')"
          class="logo-size"
        />
      </router-link>

      <v-toolbar-items class="ml-auto">
        <!-- add 'disabled' class to fadeIt -->
        <v-btn class="chat-btn" to="/chat">
          <v-img
            :src="
              require('../../../assets/images/structure/chat-white-outline-icon.svg')
            "
            class="chat-icon"
          />
          {{ $t("common.Chat") }}
        </v-btn>
        <v-list-item-avatar id="menu-activator">
          <v-img
            v-if="profileImage"
            :src="`${constImg}${profileImage}`"
            class="avatar-img"
          />
          <v-img
            v-else
            :src="require('../../../assets/images/structure/Profile-dummy.svg')"
            class="avatar-img"
          />
        </v-list-item-avatar>
        <v-menu activator="#menu-activator">
          <v-list>
            <v-list-item to="/overview">
              <v-list-item-title
                ><v-img
                  :src="
                    require('../../../assets/images/structure/overview-icon.svg')
                  "
                  class="icon24"
                />
                {{ $t("common.Overview") }}</v-list-item-title
              >
            </v-list-item>
            <v-list-item to="/profile">
              <v-list-item-title
                ><v-img
                  :src="
                    require('../../../assets/images/structure/profile-icon.svg')
                  "
                  class="icon24"
                />
                My Profile</v-list-item-title
              >
            </v-list-item>
            <v-list-item class="pointer" @click="dialogChangePassword = true">
              <v-list-item-title>
                <v-img
                  :src="
                    require('../../../assets/images/structure/change-password-icon.svg')
                  "
                  class="icon24"
                />
                {{ $t("onboarding.ChangePassword") }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="pointer" @click="logoutHandler">
                <v-img
                  :src="
                    require('../../../assets/images/structure/logout-icon.svg')
                  "
                  class="icon24"
                />
                {{ $t("onboarding.Logout") }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog v-model="dialogChangePassword" max-width="410">
      <v-card>
        <v-card-text class="custome-modal">
          <v-icon block @click="dialogChangePassword = false">mdi-close</v-icon>
          <h5 class="text-h4 mb-1">{{ $t("onboarding.ChangePassword") }}</h5>
          <p class="text-body-2 mb-9 gray">
            {{ $t("onboarding.Setyournewpasswordwithenteryouroldpassword") }}
          </p>

          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <v-text-field
                variant="solo"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                required
                v-model="oldPassword"
                @click:append="show1 = !show1"
              >
                <template #label>
                  {{ $t("onboarding.OldPassword") }} <span class="pink">*</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <v-text-field
                variant="solo"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                required
                v-model="newPassword"
                @click:append="show2 = !show2"
              >
                <template #label>
                  {{ $t("onboarding.NewPassword") }}<span class="pink">*</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <v-text-field
                variant="solo"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                required
                v-model="confirmPassword"
                @click:append="show3 = !show3"
              >
                <template #label>
                  {{ $t("onboarding.ConfirmPassword")
                  }}<span class="pink">*</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-btn
            @click="changePasswordHandler"
            :disabled="
              confirmPassword != newPassword ||
              !confirmPassword ||
              !newPassword ||
              !oldPassword
            "
            class="mt-5"
            color="success"
            size="large"
            block
          >
            {{ $t("onboarding.Save") }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <Loader /> -->
  </div>
</template>

<script>
import AmbassadorsLeft from "../../Ambassadors/AmbassadorsLeft/AmbassadorsLeft.vue";
import services from "../../../services/index";
import constant from "../../../../constant";
// import Loader from "../../Loader/Loader.vue";
export default {
  name: "AmbassadorHeader",

  components: {
    AmbassadorsLeft,
    // Loader
  },

  data() {
    return {
      sidebar: false,
      dialogChangePassword: false,
      show1: false,
      show2: false,
      show3: false,
      profileImageURL: "",
      profileImage: "",
      alertMessage: "",
      alertType: "",
      showAlert: false,
      password: "Password",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      constImg: constant.CLOUDFRONT_DESTINATION,

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },

  mounted() {
    this.getUserDetails();
  },
  methods: {
    async getUserDetails() {
      try {
        const userDetails = JSON.parse(localStorage.getItem("user_Details"));
        let userId = userDetails.id;
        const response = await services.UserDetail.GEt_USER_DETAIL(userId);
        if (response) {
          this.profileImage = response.data.UserDetail.profileImage;
          localStorage.setItem(
            "user_Details",
            JSON.stringify({
              ...userDetails,
              profileImage: response.data.UserDetail.profileImage,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    },
    async changePasswordHandler() {
      try {
        let data = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        };
        const response = await services.Auth.CHANGE_PASSWORD(data);
        console.log(response);
        if (response) {
          this.dialogChangePassword = false;
          this.alertType = "success";
          this.showAlert = true;
          this.alertMessage = response.data.message;
          setTimeout(() => {
            this.showAlert = false;
            this.logoutHandler();
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        this.alertType = "error";
        this.showAlert = true;
        this.alertMessage = error.response.data.message;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
    },
    logoutHandler() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style>
.v-list-item-title {
  font-size: 14px !important;
  color: #1e1142;
  font-family: "SATOSHI-REGULAR" !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
}
.v-list-item-title .icon24 {
  width: 24px;
  max-width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
