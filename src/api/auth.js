export default {
  LOGIN: () => "/auth/login",
  REGISTER: () => "/auth/register",
  SEND_EMAIL: () => "/auth/send-verification-email",
  VERIFY_EMAIL: (token) => `/auth/verify-email?token=${token}`,
  FORGOT_PASSWORD: () => "/auth/forgot-password",
  RESET_PASSWORD: (token) => `/auth/reset-password?token=${token}`,
  CHANGE_PASSWORD: () => `/auth/change-password`,
};
