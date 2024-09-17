<template>
  <div class="bg-gray">
    <AmbassadorHeader />
    <v-container class="">
      <v-row>
        <v-col cols="12" sm="3" md="3" lg="2" xl="2">
          <AmbassadorsLeft />
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="7" xl="7">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
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
          <v-alert
            class="profile-alert profile-alert"
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
          <div v-if="isPaymentDetailCompleted">
            <div class="white-box-radius">
              <h5 class="text-h5">Stripe Info</h5>
              <p class="text-body-2 mb-6">
                {{
                  $t(
                    "common.Youcanedityourpaymentsettingsincludinghowyoudliketogetpaidandyourtaxinformation"
                  )
                }}
              </p>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text"> Email</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    v-model="this.paymentDetail.email"
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text"> Country</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    v-model="this.paymentDetail.country"
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text"> Default Currency</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    v-model="this.paymentDetail.default_currency"
                    disabled
                  />
                </v-col>
              </v-row>
            </div>

            <div
              class="white-box-radius"
              v-if="this.paymentDetail.external_accounts.total_count > 0"
            >
              <h5 class="text-h5">Connected Account Info</h5>
              <p class="text-body-2 mb-6">
                {{
                  $t(
                    "common.Youcanedityourpaymentsettingsincludinghowyoudliketogetpaidandyourtaxinformation"
                  )
                }}
              </p>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text"> Account holder name</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    v-model="
                      this.paymentDetail.external_accounts.data[0]
                        .account_holder_name
                    "
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text">Bank Name</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    v-model="
                      this.paymentDetail.external_accounts.data[0].bank_name
                    "
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text height40"> Country</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    v-model="
                      this.paymentDetail.external_accounts.data[0].country
                    "
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text"> Currency</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    v-model="
                      this.paymentDetail.external_accounts.data[0].currency
                    "
                    disabled
                  />
                </v-col>
              </v-row>
            </div>

            <!-- <div class="white-box-radius">
              <h5 class="text-h5">{{ $t("common.AddressInfo") }}</h5>
              <p class="text-body-2 mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever.
              </p>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text">{{ $t("onboarding.City") }}</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    placeholder="Enter city"
                    v-model="city"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text">{{
                    $t("onboarding.AddressLine1")
                  }}</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    placeholder="Enter address"
                    v-model="address1"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text">{{
                    $t("onboarding.AddressLine2")
                  }}</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    placeholder="Enter address"
                    v-model="address2"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text">{{
                    $t("onboarding.PostalCode")
                  }}</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    placeholder="Enter postal code"
                    v-model="postalCode"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text">{{ $t("onboarding.State") }}</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    placeholder="Enter state"
                    v-model="state"
                  />
                </v-col>
              </v-row>
            </div>

            <div class="white-box-radius pb-7">
              <h5 class="text-h5">{{ $t("common.Document") }}</h5>
              <p class="text-body-2 mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever.
              </p>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text mt-1 mb-1"
                    >{{ $t("common.Document")
                    }}<span class="pink">*</span></label
                  >
                  <p class="text-body-2 pr-3">
                    {{
                      $t("common.Youcanuploadmax2documentinJpgPngDocPdfformat")
                    }}
                  </p>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <div class="max-width300">
                    <div class="upload-box upload-cover-image mb-2">
                      <v-img
                        :src="
                          require('../../../assets/images/structure/document-icon.svg')
                        "
                        width="36"
                        height="36"
                        class=""
                      />
                      <div class="hover-upload">
                        <v-img
                          :src="
                            require('../../../assets/images/structure/camera-white.svg')
                          "
                          class="camara-icon"
                        />
                        <span>{{ $t("common.AddDocument") }}</span>
                      </div>
                      <input type="file" />
                    </div>
                    <div class="upload-document-box">
                      <v-img
                        :src="
                          require('../../../assets/images/product/document2.png')
                        "
                        class="upload-img"
                      />
                      <v-img
                        :src="
                          require('../../../assets/images/structure/crose-red-icon.svg')
                        "
                        class="crose-img"
                      />
                    </div>
                    <div class="upload-document-box">
                      <v-img
                        :src="
                          require('../../../assets/images/product/document1.png')
                        "
                        class="upload-img"
                      />
                      <v-img
                        :src="
                          require('../../../assets/images/structure/crose-red-icon.svg')
                        "
                        class="crose-img"
                      />
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div> -->
            <div class="text-right">
              <router-link class="edit-right" to="/payment">
                <v-btn
                  size="large"
                  color="success"
                  type="button"
                  class="ml-auto mt-2"
                  width="150"
                >
                  Edit
                </v-btn>
              </router-link>
            </div>
          </div>
          <div v-else>
            <div class="empty-box mb-5" v-if="!isShowForm">
              <v-img
                :src="
                  require('../../../assets/images/structure/empty-payment.png')
                "
                class="empty-img"
              />
              <h4 class="text-h4">{{ $t("common.SetUpPaymentDetails") }}</h4>
              <p class="text-body-2 gray text-center">
                {{
                  $t(
                    "common.GiveyourcustomersexclusiveaccesstobenefitsforamonthlyfeeFrombonuscontenttoacustomeronlycommunityyoucanchoosewhatyouwantyourmembershiptooffer"
                  )
                }}
              </p>
              <v-btn
                color="success"
                type="button"
                @click="isShowForm = true"
                class="mt-5"
                >{{ $t("common.SetUpPaymentDetails") }}</v-btn
              >
            </div>
            <div v-else>
              <div class="white-box-radius">
                <h5 class="text-h5">Connect with Stripe</h5>
                <p class="text-body-2 mb-6">
                  <!-- Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever. -->
                </p>
                <v-row no-gutters>
                  <v-col cols="12" class="text-center">
                    <v-btn
                      size="large"
                      color="success"
                      type="button"
                      class="m-auto my-5 text-center"
                      width="150"
                      @click="connectStripeHandler"
                    >
                      Connect
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <AmbassadorsRight />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
import AmbassadorsRight from "../AmbassadorsRight/AmbassadorsRight.vue";
// import EmptyPage from "./EmptyPage.vue";
import services from "../../../services";

export default {
  name: "PaymentPage",

  components: {
    AmbassadorHeader,
    AmbassadorsLeft,
    AmbassadorsRight,
  },

  data() {
    return {
      itemsContry: ["+616", "+91", "+86", "+1", "+61"],
      itemsGender: ["Men", "Women", "Other"],
      itemsOrientation: ["Straight", "Bi-sexual", "Transexual", "Pansexual"],
      model: true,
      dob: "",
      accountNumber: "",
      isShowForm: false,
      swiftCode: "",
      ibanNumber: "",
      companyNumber: "",
      gender: "",
      socialSecurityNumber: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      city: "",
      address1: "",
      address2: "",
      postalCode: "",
      state: "",
      doc1: "",
      doc2: "",
      isValid: false,
      paymentDetail: "",
      isPaymentDetailCompleted: false,
      showAlert: false,
      isProfileCompleted: false,
      alertType: "",
      alertMessage: "",
      rules: {
        required: (value) => !!value || "Required.",
        validMob: (v) =>
          JSON.stringify(v).length >= 10 ||
          v == "" ||
          "Enter valid mobile number",
        numOnly: (v) =>
          v.match(/[a-z]/g) || v.match(/[A-Z]/g) || "Numbers allowed only",
        validEmail: (email) =>
          // eslint-disable-next-line
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          ) || "Please enter a valid email",
      },

      items: [
        {
          title: "Payouts",
          disabled: false,
          href: "payouts",
        },
        {
          title: "Payment Details",
          disabled: true,
          href: "payment",
        },
      ],
    };
  },
  mounted() {
    this.getUserPaymentDetails();
    this.getUserDetails();
    let userDetail = JSON.parse(localStorage.getItem("user_Details"));
    if (
      userDetail.isProfileCompleted &&
      userDetail.isSubscriptionPlanAdded &&
      userDetail.isPaymentDetailCompleted
    ) {
      this.isProfileCompleted = true;
    } else {
      this.isProfileCompleted = false;
    }
  },
  watch: {
    accountNumber() {
      this.checkIsValid();
    },
    swiftCode() {
      this.checkIsValid();
    },
    ibanNumber() {
      this.checkIsValid();
    },
    companyNumber() {
      this.checkIsValid();
    },
    dob() {
      this.checkIsValid();
    },
    gender() {
      this.checkIsValid();
    },
    socialSecurityNumber() {
      this.checkIsValid();
    },
    email() {
      this.checkIsValid();
    },
    phoneNumber() {
      this.checkIsValid();
    },
  },
  methods: {
    async getUserDetails() {
      try {
        let userId = localStorage.getItem("user_Details")
          ? JSON.parse(localStorage.getItem("user_Details")).id
          : null;
        this.isLoading = true;
        const response = await services.UserDetail.GEt_USER_DETAIL(userId);
        if (response) {
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
    async connectStripeHandler() {
      try {
        const response = await services.UserPaymentDetail.CONNECT();
        console.log(response);
        window.open(response.data, "_blank").focus();
      } catch (err) {
        this.showAlert = true;
        this.alertType = "error";
        this.isLoading = false;

        this.alertMessage = err.response.data.message;
        setTimeout(() => {
          this.showAlert = false;
          // this.$router.push("/");
        }, 2500);
      }
    },
    async getUserPaymentDetails() {
      try {
        const response =
          await services.UserPaymentDetail.GEt_USER_PAYMENT_DETAIL();
        if (response.data) {
          this.paymentDetail = response.data;
          console.log(response.data);
          this.isPaymentDetailCompleted = true;
        }
      } catch (err) {
        this.showAlert = true;
        this.alertType = "error";
        this.alertMessage = err.response.data.message;
        setTimeout(() => {
          this.showAlert = false;
          // this.$router.push("/");
        }, 2500);
      }
    },
    async updatePaymentDetails() {
      let userId = JSON.parse(localStorage.getItem("user_Details")).id;
      let data = {};
      if (
        this.accountNumber &&
        this.accountNumber != this.paymentDetail.accountNumber
      ) {
        data.accountNumber = this.accountNumber;
      }
      if (this.swiftCode && this.swiftCode != this.paymentDetail.swiftCode) {
        data.swiftCode = this.swiftCode;
      }
      if (this.ibanNumber && this.ibanNumber != this.paymentDetail.ibanNumber) {
        data.ibanNumber = this.ibanNumber;
      }
      if (
        this.companyNumber &&
        this.companyNumber != this.paymentDetail.companyNumber
      ) {
        data.companyNumber = this.companyNumber;
      }
      if (this.dob && this.dob != this.paymentDetail.dob) {
        data.dob = this.dob;
      }
      if (this.dob && this.gender != this.paymentDetail.gender) {
        data.gender = this.gender;
      }
      if (
        this.socialSecurityNumber &&
        this.socialSecurityNumber != this.paymentDetail.socialSecurityNumber
      ) {
        data.socialSecurityNumber = this.socialSecurityNumber;
      }
      if (this.email && this.email != this.paymentDetail.email) {
        data.email = this.email;
      }
      if (
        this.countryCode &&
        this.countryCode != this.paymentDetail.countryCode
      ) {
        data.countryCode = this.countryCode;
      }
      if (
        this.phoneNumber &&
        this.phoneNumber != this.paymentDetail.phoneNumber
      ) {
        data.phoneNumber = this.phoneNumber;
      }
      if (this.city && this.city != this.paymentDetail.city) {
        data.city = this.city;
      }
      if (this.address1 && this.address1 != this.paymentDetail.address1) {
        data.address1 = this.address1;
      }
      if (this.address2 && this.address2 != this.paymentDetail.address2) {
        data.address2 = this.address2;
      }
      if (this.postalCode && this.postalCode != this.paymentDetail.postalCode) {
        data.postalCode = this.postalCode;
      }
      if (this.state && this.state != this.paymentDetail.state) {
        data.state = this.state;
      }
      data.isPaymentDetailCompleted = true;
      try {
        const response =
          await services.UserPaymentDetail.UPDATE_USER_PAYMENT_DETAIL(
            userId,
            data
          );
        if (response) {
          this.showAlert = true;
          this.alertType = "success";
          this.alertMessage = "Details saved successfully";
          setTimeout(() => {
            this.showAlert = false;
            this.getUserPaymentDetails();
            this.$router.push("/payouts");
          }, 2500);
        }
      } catch (err) {
        this.alertType = "error";
        this.alertMessage = err.response.data.message;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          // this.$router.push("/");
        }, 2500);
      }
    },

    checkIsValid() {
      if (
        this.accountNumber &&
        this.swiftCode &&
        this.ibanNumber &&
        this.companyNumber &&
        this.dob &&
        this.gender &&
        this.socialSecurityNumber &&
        this.email
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
  },
};
</script>