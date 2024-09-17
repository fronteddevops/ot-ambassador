import { createWebHistory, createRouter } from "vue-router";

// Ambassador pages
import AmbassadorLogin from "./components/auth/AmbassadorLogin.vue";
import AmbassadorRegister from "./components/auth/AmbassadorRegister.vue";
import RegisterSent from "./components/auth/RegisterSent.vue";
import EmailVerified from "./components/auth/EmailVerified.vue";
import SetPassword from "./components/auth/SetPassword.vue";
import ForgotPassword from "./components/auth/ForgotPassword.vue";
import UpdatePassword from "./components/auth/UpdatePassword.vue";

// Ambassador pages
import Chat from "./components/Ambassadors/Chat/Chat.vue";
import Overview from "./components/Ambassadors/Overview/Overview.vue";
import Profile from "./components/Ambassadors/Profile/Profile.vue";
import ProfilePreview from "./components/Ambassadors/ProfilePreview/ProfilePreview.vue";
import Payment from "./components/Ambassadors/Payment/Payment.vue";
import Payouts from "./components/Ambassadors/Payouts/Payouts.vue";
import Subscription from "./components/Ambassadors/Subscription/Subscription.vue";
import Subscriber from "./components/Ambassadors/Subscriber/Subscriber.vue";
import Insights from "./components/Ambassadors/Insights/Insights.vue";
import PublishingTools from "./components/Ambassadors/PublishingTools/PublishingTools.vue";
import Media from "./components/Ambassadors/Media/Media.vue";
import ToyReview from "./components/Ambassadors/Review/ToyReview.vue";
import ReviewDetail from "./components/Ambassadors/Review/ReviewDetail.vue";
import AddReview from "./components/Ambassadors/Review/AddReview.vue";
import RatingReview from "./components/Ambassadors/Review/RatingReview.vue";
import ErrorPage from "./components/ErrorPage/ErrorPage.vue";

const routes = [
  {
    name: "AmbassadorLogin",
    path: "/",
    component: AmbassadorLogin,
  },
  {
    name: "AmbassadorRegister",
    path: "/register",
    component: AmbassadorRegister,
  },
  {
    name: "RegisterSent",
    path: "/register-sent",
    component: RegisterSent,
  },
  {
    name: "EmailVerified",
    path: "/verify-email",
    component: EmailVerified,
  },
  {
    name: "SetPassword",
    path: "/reset-password",
    component: SetPassword,
  },
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    name: "UpdatePassword",
    path: "/update-password",
    component: UpdatePassword,
  },
  //  Ambassador  pages
  {
    name: "ChatPage",
    path: "/chat",
    component: Chat,
  },
  {
    name: "OverviewPage",
    path: "/overview",
    component: Overview,
  },
  {
    name: "ProfilePage",
    path: "/profile",
    component: Profile,
  },
  {
    name: "ProfilePreview",
    path: "/profile-preview",
    component: ProfilePreview,
  },
  {
    name: "PayoutsPage",
    path: "/payouts",
    component: Payouts,
  },
  {
    name: "PaymentPage",
    path: "/payment",
    component: Payment,
  },
  {
    name: "SubscriptionPage",
    path: "/subscription",
    component: Subscription,
  },
  {
    name: "SubscriberPage",
    path: "/subscriber",
    component: Subscriber,
  },
  {
    name: "InsightsPage",
    path: "/insights",
    component: Insights,
  },
  {
    name: "PublishingToolsPage",
    path: "/publishing-tools",
    component: PublishingTools,
  },
  {
    name: "MediaPage",
    path: "/media",
    component: Media,
  },
  {
    name: "ToyReview",
    path: "/toy-review",
    component: ToyReview,
  },
  {
    name: "ReviewDetail",
    path: "/review-detail/:id",
    component: ReviewDetail,
  },
  {
    name: "AddReview",
    path: "/add-review",
    component: AddReview,
  },
  {
    name: "RatingReview",
    path: "/rating-review/:productId",
    component: RatingReview,
  },
  {
    name: "ErrorPage",
    path: "/error-page",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  if (
    to.path !== "/" &&
    to.path !== "/forgot-password" &&
    to.path !== "/register" &&
    to.path !== "/verify-email" &&
    to.path !== "/register-sent" &&
    to.path !== "/reset-password"
  ) {
    const loggedIn = localStorage.getItem("access_token");
    if (!loggedIn) {
      localStorage.clear();
      next("/");
    } else if (!to.matched.length) {
      next("/");
    } else {
      next();
    }
  }
  next();
});
