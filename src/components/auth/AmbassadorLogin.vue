<template>
  <div class="register-page">
    <div class="left-side">
      <v-alert class="profile-alert alert-top-center" :type="alertType" v-if="showAlert">
        <v-img :src="require(`../../assets/images/structure/alert-${alertType}.svg`)" width="20" height="20" />
        {{ alertMessage }}
      </v-alert>
      <v-form ref="form">
        <div class="text-center">
          <v-img
            class="logo-icon"
            :src="require('../../assets/images/logo/logo-icon.svg')"
          />
          <h3 class="text-h3 italic mb-6">
            {{ $t("onboarding.signInToYourAccount") }}
          </h3>
        </div>

        <v-row class="pt-3">
          <v-col cols="12" sm="12" md="12" class="py-0">
            <v-text-field
              variant="solo"
              :rules="[rules.required, rules.validEmail]"
              v-model="email"
            >
              <template #label>
                {{ $t("onboarding.email") }} <span class="pink">*</span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <v-text-field
              variant="solo"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="password"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              @keydown.enter="loginUserHandler"
            >
              <template #label>
                {{ $t("onboarding.Password") }} <span class="pink">*</span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0 text-right">
            <router-link to="/forgot-password" class="text-body-2 pointer">{{
              $t("onboarding.ForgotPassword?")
            }}</router-link>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <v-btn
              @click="loginUserHandler"
              text
              color="success"
              type="button"
              size="x-large"
              class="mt-7"
            >
              {{ $t("onboarding.SignIn") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <p class="bottom-fixed-text">
        {{ $t("onboarding.Donthaveanaccount?") }}
        <router-link to="/register" class="blue pointer">
          {{ $t("onboarding.Register") }}
        </router-link>
      </p>
    </div>
    <div class="right-side">
      <v-img
        class="left-side-img"
        cover
        :src="require('../../assets/images/structure/register-lady-img.png')"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import services from "../../services/index";
export default {
  name: "AmbassadorLogin",

  components: {},
  data() {
    return {
      email: "",
      password: "",
      show1: false,
      alertMessage: "",
      showAlert: false,
      alertType: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        numeric: (v) => /\d/.test(v) || "Min 1 numeric digit",
        char: (v) => /\D/g.test(v) || "Min 1 letter",
        validEmail: (email) =>
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          ) || "Please enter a valid email",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async loginUserHandler() {
      try {
        const response = await services.Auth.LOGIN_USER({
          email: this.email.toLowerCase(),
          password: this.password,
        });
        if(response.data) {
          if (
            response.data.tokens.access.token &&
            response.data.user.role === "ambassador"
          ) {
            if (response.data.user.isEmailVerified) {
              if (response.data.user.isApproved) {
                if(response.data.user.isPaymentDetailCompleted && response.data.user.isSubscriptionPlanAdded && response.data.user.isProfileCompleted) {
             this.$router.push("/overview");

              } else {
                this.$router.push('/profile')
              }
                
              } else {
                this.alertType = "error";
                this.showAlert = true;
                this.alertMessage =
                  "your profile is pending for admin approval , kindly wait until its approved";
                setTimeout(() => {
                  this.showAlert = false;
                }, 4000);
              }
            } else {
              localStorage.setItem("access_token", response.data.tokens.access.token);
            localStorage.setItem("email", response.data.user.email);
              this.$router.push("/register-sent?isLogin=true");
            }
          } else if (
            response.data.tokens.access.token &&
            response.data.user.role !== "ambassador"
          ) {
            this.alertType = "error";
            this.showAlert = true;
            this.alertMessage = "You are not an authorized user, please register";
            setTimeout(() => {
              this.showAlert = false;
            }, 1500);
          }
        }
      } catch (err) {
        console.log(err, '=============>')
        this.alertType = "error";
        this.showAlert = true;
        this.alertMessage = 'Incorrect email or password';
        setTimeout(() => {
          this.showAlert = false;
        }, 1500);
      }
    },
  },
};
</script>