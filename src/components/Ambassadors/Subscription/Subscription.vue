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
          <v-alert
            class="profile-alert"
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

          <div class="empty-box mb-5" v-if="!isShowForm">
            <v-img
              :src="
                require('../../../assets/images/structure/empty-subscription.png')
              "
              class="empty-img"
            />
            <h4 class="text-h4">{{ $t("common.Choosewhattooffer") }}</h4>
            <p class="text-body-2 gray text-center">
              {{
                $t(
                  "common.GiveyourcustomersexclusiveaccesstobenefitsforamonthlyfeeFrombonuscontenttoacustomeronlycommunityyoucanchoosewhatyouwantyourmembershiptooffer"
                )
              }}
            </p>

            <v-btn
              color="success"
              @click="isShowForm = true"
              type="button"
              class="mt-5"
              >{{ $t("common.SetUpBenefits") }}</v-btn
            >
          </div>
          <div v-else>
            <div class="how-it-box">
              <h5 class="text-h5">{{ $t("common.HowitWorks") }}</h5>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                  <v-img
                    :src="
                      require('../../../assets/images/structure/edit-icon.svg')
                    "
                    width="32"
                    height="32"
                    class=""
                  />
                  <h6 class="text-body-2">{{ $t("common.CreatePlan") }}</h6>
                  <p class="text-body-4">
                    <!-- Lorem Ipsum is simply dummy text of printing & typesetting. -->
                  </p>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                  <v-img
                    :src="
                      require('../../../assets/images/structure/waiting-icon.svg')
                    "
                    width="32"
                    height="32"
                    class=""
                  />
                  <h6 class="text-body-2">
                    {{ $t("common.WaitingforApproval") }}
                  </h6>
                  <p class="text-body-4">
                    <!-- Lorem Ipsum is simply dummy text of printing & typesetting. -->
                  </p>
                </v-col>
                <v-col cols="12" sm="4" md="4" lg="4" xl="4">
                  <v-img
                    :src="
                      require('../../../assets/images/structure/start-icon.svg')
                    "
                    width="32"
                    height="32"
                    class=""
                  />
                  <h6 class="text-body-2">{{ $t("common.GetStarted") }}</h6>
                  <p class="text-body-4">
                    <!-- Lorem Ipsum is simply dummy text of printing & typesetting. -->
                  </p>
                </v-col>
              </v-row>
            </div>

            <div class="white-box-radius">
              <h5 class="text-h5">{{ $t("common.SubscriptionInfo") }}</h5>
              <p class="text-body-2 mb-4">
                {{
                  $t(
                    "common.GiveyourcustomersexclusiveaccesstobenefitsforamonthlyfeeFrombonuscontenttoacustomeronlycommunityyoucanchoosewhatyouwantyourmembershiptooffer"
                  )
                }}
              </p>
              <v-alert class="profile-alert" type="warning" v-if="!isApproved">
                <v-img
                  :src="
                    require('../../../assets/images/structure/alert-warning.svg')
                  "
                  width="20"
                  height="20"
                />
                {{
                  $t("alert.Waitingforadminapprovaluntillyoucantpostanything")
                }}
              </v-alert>
              <v-alert class="profile-alert" type="info" v-if="!isFormDisabled">
                <v-img
                  :src="
                    require('../../../assets/images/structure/alert-info.svg')
                  "
                  width="20"
                  height="20"
                />
                {{
                  $t(
                    "alert.EnterbelowsubscriptionamountThiscanbesetonlyonceandcannotbeeditedfurther"
                  )
                }}
              </v-alert>

              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text font-weight-regular"
                    >{{ $t("onboarding.SubscriptionName")
                    }}<span class="pink">*</span></label
                  >
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    variant="solo"
                    placeholder="Enter subscription name"
                    class="height40"
                    v-model="subscriptionName"
                    :disabled="isFormDisabled"
                    :rules="[rules.required, rules.charLimit]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text font-weight-regular mt-0 mb-1"
                    >{{ $t("common.PlatformAmount") }}
                    <small>({{ $t("common.permonth") }})</small
                    ><span class="pink">*</span></label
                  >
                  <p class="text-body-2 gray">
                    {{ $t("common.Totalamountyourcustomerwillseeonyourpage") }}
                  </p>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40 mb-3"
                    variant="solo"
                    placeholder="0"
                    type="number"
                    v-model="platformAmount"
                    :disabled="isFormDisabled"
                    v-on:input="limitDecimals"
                    :rules="[rules.required, rules.amountLimit]"
                    prefix="USD"
                    hint="*Enter amount between USD 10 to USD 100 per month."
                    persistent-hint
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text font-weight-regular">{{
                    $t("common.ObeyTinaServiceFee")
                  }}</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40"
                    variant="solo"
                    placeholder="0"
                    type="number"
                    model-value="-8.00"
                    v-model="serviceFee"
                    prefix="USD"
                    disabled
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text mt-0 mb-1">{{
                    $t("common.YoullEarn")
                  }}</label>
                  <p class="text-body-2 gray mb-5">
                    {{
                      $t(
                        "common.Theestimatedamountyouwillreceiveafterservicefee"
                      )
                    }}
                  </p>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <v-text-field
                    class="height40 bold readonly"
                    variant="solo"
                    placeholder="0"
                    type="number"
                    v-model="youllReceive"
                    prefix="USD"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="4" md="4" lg="5" xl="5">
                  <label class="label-text mt-0">{{
                    $t("common.Description")
                  }}</label>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7" xl="7">
                  <small class="text-blue-grey-lighten-3 text-right d-block"
                    >{{ description && description.length }}/1000</small
                  >
                  <v-textarea
                    variant="solo"
                    placeholder="Write here"
                    rows="3"
                    class="mb-3 no-drop"
                    v-model="description"
                    :disabled="isFormDisabled"
                    :rules="[rules.required, rules.longCharLimit]"
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>

            <div class="text-right" v-if="!isFormDisabled">
              <v-btn
                size="large"
                color="success"
                type="button"
                class="ml-auto mt-2"
                width="150"
                @click="updateSubscriptionDetails"
                :disabled="!this.isValid"
              >
                {{ $t("common.Next") }}
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <!-- <AmbassadorsRightRevenue /> -->
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogProfileComplete" max-width="410">
      <v-card>
        <v-card-text class="custome-modal confetti-modal">
          <ConfettiExplosion
            :particleCount="200"
            :shouldDestroyAfterDone="true"
          />
          <v-img
            :src="require('../../../assets/images/structure/success-icon.svg')"
            class="circle72"
          />
          <h5 class="text-h4 mt-7 mb-2">{{ $t("common.ThankYou!") }}</h5>
          <p class="text-body-2 mb-0 gray">
            {{ $t("common.Yourprofileissettedupandwaitforadminapprvoal") }}
          </p>
          <v-btn
            class="mt-7 w-100"
            color="success"
            size="large"
            @click="
              () => {
                this.dialogProfileComplete = false;
                this.reloadWindow();
              }
            "
          >
            {{ $t("onboarding.Continue") }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ConfettiExplosion from "vue-confetti-explosion";
import AmbassadorHeader from "../../Layout/AmbassadorHeader/AmbassadorHeader.vue";
import AmbassadorsLeft from "../AmbassadorsLeft/AmbassadorsLeft.vue";
// import AmbassadorsRightRevenue from "../AmbassadorsRightRevenue/AmbassadorsRightRevenue.vue";
// import EmptyPage from "./EmptyPage.vue";
import services from "../../../services/index";
import Loader from "../../Loader/Loader.vue";
export default {
  name: "SubscriptionPage",

  components: {
    ConfettiExplosion,
    AmbassadorHeader,
    AmbassadorsLeft,
    Loader,
  },

  data() {
    return {
      dialogProfileComplete: false,
      select: { state: "+61" },
      itemsContry: ["+616", "+91", "+86", "+1"],
      itemsGender: ["Men", "Women", "Other"],
      itemsOrientation: ["Straight", "Bi-sexual", "Transexual", "Pansexual"],
      model: true,
      subscriptionName: "",
      platformAmount: "",
      serviceFee: "",
      youllReceive: "",
      description: "",
      subcriptionDetail: "",
      subscriptionNameValid: false,
      platformAmountValid: false,
      serviceFeeValid: false,
      youllReceiveValid: false,
      descriptionValid: false,
      isValid: false,
      isUpdated: false,
      isProfileCompleted: false,
      isShowForm: false,
      isApproved: true,
      isFormDisabled: false,
      isLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        amountLimit: (val) => (val >= 10 && val <= 100) || "Enter valid amount",
        charLimit: (v) => v?.trim().length < 30 || "Max limit for input",
        longCharLimit: (v) => v?.trim().length < 1001 || "Max limit for input",
      },
    };
  },

  mounted() {
    this.getSubscriptionDetails();
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
    subscriptionName(val) {
      if (val) {
        this.subscriptionNameValid = true;
      } else {
        this.subscriptionNameValid = false;
      }
      this.checkIsValid();
    },
    platformAmount(val) {
      if (val >= 10 && val <= 100) {
        this.platformAmountValid = true;
      } else {
        this.platformAmountValid = false;
      }
      this.serviceFee = ((val * 10) / 100).toFixed(2);
      this.youllReceive = (val - (val * 10) / 100).toFixed(2);
      this.checkIsValid();
    },

    description(val) {
      if (val && val.trim().length < 1001) {
        this.descriptionValid = true;
      } else {
        this.descriptionValid = false;
      }
      this.checkIsValid();
    },
  },

  methods: {
    reloadWindow() {
      location.reload();
    },
    async getUserDetails() {
      this.isLoading = true;
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
    async getSubscriptionDetails() {
      try {
        // let userId = JSON.parse(localStorage.getItem("subcription_Details")).id;
        this.isLoading = true;

        const response =
          await services.SubscriptionDetail.GEt_SUBSCRIPTION_DETAIL();

        if (response.data.length > 0) {
          this.subcriptionDetail = response.data[0];
          this.subscriptionName = response.data[0].subscriptionName;
          this.description = response.data[0].description;

          if (response.data[0].subscriptionName) {
            this.isShowForm = true;
            this.isFormDisabled = true;
          }
          this.isApproved = response.data[0].isApproved;

          this.platformAmount = response.data[0].platformAmount;
        }
      } catch (err) {
        console.log(err);
        // this.showAlert = true;
        // this.alertType = "error";
        // this.isLoading = false;

        // this.alertMessage = err.response.data.message;
        // setTimeout(() => {
        //   this.showAlert = false;
        //   this.$router.push("/");
        // }, 2500);
      }
    },
    async updateSubscriptionDetails() {
      this.isLoading = true;

      // let userId = JSON.parse(localStorage.getItem("subcription_Details")).id;
      const data = {};

      if (
        this.subscriptionName &&
        this.subscriptionName != this.subcriptionDetail?.subscriptionName
      ) {
        data.subscriptionName = this.subscriptionName;
      }

      if (
        this.platformAmount &&
        this.platformAmount != this.subcriptionDetail.platformAmount
      ) {
        data.platformAmount = this.platformAmount;
        data.earnAmount =
          this.platformAmount - (this.platformAmount * 10) / 100;
        data.obeyTinaServiceFee = (this.platformAmount * 10) / 100;
        data.currency = "USD";
      }

      if (
        this.description &&
        this.description != this.subcriptionDetail.description
      ) {
        data.description = this.description;
      }

      data.isSubscriptionPlanAdded = true;

      try {
        const response =
          await services.SubscriptionDetail.UPDATE_SUBSCRIPTION_DETAIL(data);
        if (response) {
          this.showAlert = true;
          this.alertType = "success";
          this.alertMessage = "Details saved successfully";
          this.getSubscriptionDetails();
          this.isLoading = false;
          this.dialogProfileComplete = true;
          this.getUserDetails();
          setTimeout(() => {
            this.showAlert = false;
            // this.$router.push("/profile-preview");
          }, 1000);
        }
      } catch (err) {
        // this.showAlert = true;
        // this.alertType = "error";
        // this.isLoading = false;
        // this.alertMessage = err.response.data.message;
        // setTimeout(() => {
        //   this.showAlert = false;
        // }, 2500);
      }
    },
    checkIsValid() {
      if (
        this.subscriptionNameValid &&
        this.platformAmountValid &&
        this.descriptionValid
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      //   if (
      //     this.subscriptionName != this.SubcriptionDetail.subscriptionName ||
      //     this.platformAmount != this.SubcriptionDetail.platformAmount ||
      //     this.serviceFee != this.SubcriptionDetail.serviceFee ||
      //     this.youllReceive != this.SubcriptionDetail.youllReceive ||
      //     this.description != this.SubcriptionDetail.description
      //   ) {
      //     this.isUpdated = true;
      //   } else {
      //     this.isUpdated = false;
      //   }
    },
    limitDecimals(event) {
      if (
        event.target.value.indexOf(".") != -1 &&
        event.target.value.split(".")[1].length > 2
      ) {
        event.target.value = event.target.value.slice(
          0,
          event.target.value.indexOf(".") + 2
        );
      }
    },
  },
};
</script>