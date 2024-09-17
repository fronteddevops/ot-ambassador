<template>
  <div class="register-page">
    <div class="left-side for-register">
      <v-alert class="profile-alert alert-top-center" :type="alertType" v-if="showAlert" >
            <v-img :src="require(`../../assets/images/structure/alert-${alertType}.svg`)" width="20" height="20" />
             {{ alertMessage }}
        </v-alert>
       
    
      <v-form ref="form">
        <div class="text-center">
          <v-img
            class="logo-icon"
            :src="require('../../assets/images/logo/logo-icon.svg')"
          />
          <h3 class="text-h3 italic mb-8">
            {{ $t("onboarding.Registeryouraccount") }}
          </h3>
        </div>

        <v-row class="pt-3">
          <v-col cols="6" xs="6" sm="6" md="6" class="py-0">
            <v-text-field
              variant="solo"
              v-model="firstName"
              :rules="[rules.required, rules.charLimit]"
            >
              <template #label>
                {{ $t("onboarding.FirstName") }} <span class="pink">*</span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="6" xs="6" sm="6" md="6" class="py-0">
            <v-text-field
              variant="solo"
              v-model="lastName"
              :rules="[rules.required, rules.charLimit]"
            >
              <template #label>
                {{ $t("onboarding.LastName") }} <span class="pink">*</span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <v-text-field
              variant="solo"
              v-model="email"
              :rules="[rules.required, rules.validEmail]"
            >
              <template #label>
                {{ $t("onboarding.email") }} <span class="pink">*</span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <div class="custome-phone-box">
             
              <vue-tel-input v-on:country-changed="(e) => {this.countryCode = e.dialCode}" v-on:input="onSelect"  :inputOptions="{showDialCode: false, autocomplete: 'off'}" :dropdownOptions="{showDialCodeInSelection : true, showDialCodeInList : true, showSearchBox: true, showFlags: true}" class="custom-input-telphone" v-model="mobile" :autoFormat="false" defaultCountry="au" :autoDefaultCountry="true"></vue-tel-input>
              <small v-if="!mobValid" class="num-error">Enter valid mobile number</small>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <v-text-field
              variant="solo"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                rules.required,
                rules.min,
                rules.numeric,
                rules.char,
                rules.hasLowerCase,
                rules.hasUpperCase,
                rules.noSpace,
                rules.passCharLimit,
              ]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            >
              <template #label>
                {{ $t("onboarding.Password") }} <span class="pink">*</span>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <v-text-field
              variant="solo"
              v-model="confirmPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                rules.required,
                rules.min,
                rules.numeric,
                rules.char,
                rules.noSpace,
                rules.confirmPass,
                rules.hasLowerCase,
                rules.hasUpperCase,
                rules.passCharLimit,
              ]"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
            >
              <template #label>
                {{ $t("onboarding.ConfirmPassword") }}
                <span class="pink">*</span>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="12" class="py-0">
            <v-btn
              text
              color="success"
              type="button"
              @click="registerUserHandler"
              size="x-large"
              :disabled="!this.isValid || !this.mobile"
            >
              {{ $t("onboarding.Register") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <p class="bottom-fixed-text">
        {{ $t("onboarding.Alreadyhaveanaccount?") }}
        <router-link class="blue pointer" to="/">
          {{ $t("onboarding.SignIn") }}
        </router-link>
      </p>
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
/* eslint-disable */
import services from "../../services/index";
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
export default {
  name: "AmbassadorRegister",

  components: {
    VueTelInput,
  },
  data() {
    return {
      select: { state: "+61" },
      items: ["+616", "+91", "+86", "+1"],
      firstName: "",
      lastName: "",
      email: "",
      mobile: '',
      password: "",
      confirmPassword: "",
      countryCode: "",
      show1: false,
      show2: false,
      isValid: false,
      passValid: false,
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      mobValid: true,
      confirmPasswordValid: false,
      showAlert: false,
      alertType: "",
      alertMessage: "",

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        numeric: (v) => /\d/.test(v) || "Min 1 numeric digit",
        char: (v) => /\D/g.test(v) || "Min 1 letter",
        charLimit: (v) => v.trim().length < 50 || "Max limit for input",
        passCharLimit: (v) => v.trim().length < 30 || "Max limit for input",
        validMob: (v) =>
          (JSON.stringify(v).length >= 10 && JSON.stringify(v).length < 15) ||
          "Enter valid mobile number",
        confirmPass: (v) =>
          this.password == this.confirmPassword ||
          "Both password doesn't match",
        noSpace: (v) => !/\s/.test(v) || "Spaces not allowed",
        hasLowerCase: (v) =>
          v.match(/[a-z]/g) || "Password atleast has one lowercase",
        hasUpperCase: (v) =>
          v.match(/[A-Z]/g) || "Password atleast has one uppercase",
        validEmail: (email) =>
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          ) || "Please enter a valid email",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  watch: {
    firstName(val) {
      if (val != "" && val.trim().length < 50) {
        this.firstNameValid = true;
      } else {
        this.firstNameValid = false;
      }
      this.checkIsValid();
    },
    lastName(val) {
      if (val != "" && val.trim().length < 50) {
        this.lastNameValid = true;
      } else {
        this.lastNameValid = false;
      }
      this.checkIsValid();
    },
    mobile(val) {
      console.log(val, 'dfsdf')
      if (JSON.stringify(val).length >= 10 && JSON.stringify(val).length < 15) {
        this.mobValid = true;
      } else {
        this.mobValid = false;
      }
      this.checkIsValid();
    },
    email(val) {
      if (
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val
        )
      ) {
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }
      this.checkIsValid();
    },
    password(val) {
      if (
        /\d/.test(val) &&
        /\D/g.test(val) &&
        val.match(/[a-z]/g) &&
        val.match(/[A-Z]/g) &&
        !/\s/.test(val) &&
        val.trim().length < 20 &&
        val.trim().length >= 8
      ) {
        this.passValid = true;
      } else {
        false;
      }
      this.checkIsValid();
    },
    confirmPassword(val) {
      if (
        /\d/.test(val) &&
        /\D/g.test(val) &&
        val.match(/[a-z]/g) &&
        val.match(/[A-Z]/g) &&
        !/\s/.test(val) &&
        val.trim().length < 20 &&
        val.trim().length >= 8
      ) {
        this.confirmPasswordValid = true;
      } else {
        this.confirmPasswordValid = false;
      }
      this.checkIsValid();
    },
  },
  methods: {
    onSelect(number) {
     
      if(typeof(number) == 'string'){
          console.log(number, 'findone')
          this.mobile = number
        } 
      // console.log(this.mobile, '344234234')
    },
    checkIsValid() {
      if (
        this.firstNameValid &&
        this.lastNameValid &&
        this.emailValid &&
        this.mobValid &&
        this.confirmPasswordValid &&
        this.passValid &&
        this.password == this.confirmPassword
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    async registerUserHandler() {
      if (this.isValid) {
        let data = {
          name: this.firstName,
          lastName: this.lastName,
          email: this.email.toLowerCase(),
          phoneNumber: this.mobile,
          countryCode: this.countryCode,
          password: this.password,
          role: "ambassador",
        };
        try {
          const response = await services.Auth.REGISTER_USER(data);
          if (response.data) {
            // this.showAlert = true;
            // this.alertType = "success";
            // this.alertMessage = "Link has been sent please check";
            // setTimeout(() => {
            //   this.alertType = false;
            // }, 1500);
            localStorage.setItem("email", response.data.user.email);
            const emailresponse = await services.Auth.SEND_EMAIL(
              response.data.tokens.access.token
            );

            if (emailresponse) {
              this.$router.push("/register-sent");
            }
          }
        } catch (err) {
          this.showAlert = true;
          this.alertType = "error";
          this.alertMessage = err.response.data.message;
          setTimeout(() => {
            this.showAlert = false;
          }, 1500);
        }
      }
    },
  },
};
</script>
<style>

</style>