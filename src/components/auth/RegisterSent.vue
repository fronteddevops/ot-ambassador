<template>
  <div class="register-page text-type">
    <div class="left-side">
       <v-alert class="profile-alert alert-top-center" :type="alertType" v-if="showAlert">
       <v-img :src="require(`../../assets/images/structure/alert-${alertType}.svg`)" width="20" height="20" />
             {{ alertMessage }}
      </v-alert>
      <div class="text-center left-text">
        <v-img
          class="icon96 mb-6"
          :src="require('../../assets/images/structure/message.gif')"
        />
        <div v-if="isFromLogin"> 
           <h3 class="text-h3 italic mb-2">
              {{ $t("onboarding.Wevesentyoualink") }}
            </h3>
            <p class="text-body-2 gray">
              Kindly verify your email with the link sent on your email
            </p>
            </div>
            <div v-else>
            <h3 class="text-h3 italic mb-2">
              {{ $t("onboarding.Wevesentyoualink") }}
            </h3>
            <p class="text-body-2 gray">
              {{ $t("onboarding.Hitthelinkintheemailwevesentto") }}
              <span>{{ email }}</span>
              {{ $t("onboarding.toverifyyouremailaddress") }}
            </p>
        </div>
        <v-btn
          @click="resendEmailHandler"
          v-if="!isEmailSent"
          text
          color="success mt-12"
          type="button"
          size="x-large"
        >
          {{ $t("onboarding.ResendEmail") }}
        </v-btn>
        <router-link class="mt-12" to="/">
          <v-btn
            v-if="isEmailSent"
            text
            color="success mt-12"
            type="button"
            size="x-large"
          >
            Back to Login
          </v-btn>
        </router-link>
      </div>
    </div>
    <div class="right-side">
      <v-img
        class="left-side-img"
        cover
        :src="require('../../assets/images/structure/register-lady-img6.png')"
      />
    </div>
  </div>
</template>

<script>
import services from "../../services/index";
export default {
  name: "RegisterSent",
  data() {
    return {
      email: "",
      isEmailSent: false,
      isFromLogin: false,
       alertMessage: "",
      showAlert: false,
      alertType: "",
    };
  },
  mounted() {
    this.email = localStorage.getItem("email");
    console.log(this.$route.query.isLogin)
    if(this.$route.query.isLogin) {
      this.isFromLogin = this.$route.query.isLogin
    }
  },
  methods: {
    async resendEmailHandler() {
      try {
        const emailresponse = await services.Auth.SEND_EMAIL(
        localStorage.getItem("access_token")
      );
      if (emailresponse) {
        localStorage.clear()
        this.isEmailSent = true;
         this.alertType = "success";
              this.showAlert = true;
              this.alertMessage =
                "Link has been sent please check";
      }
        
      } catch (error) {
        console.log(error)
         this.alertType = "error";
        this.showAlert = true;
        this.alertMessage = error.response.data.message;
        setTimeout(() => {
          this.showAlert = false;
          this.$router.push('/')
        }, 1500);
      }
      
    },
  },
};
</script>