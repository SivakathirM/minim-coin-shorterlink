const backendDomin = process.env.REACT_APP_BACKEND_URL

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  userCheck: {
    url: `${backendDomin}/api/userCheck`,
    method: "post",
  },
  otp: {
    url: `${backendDomin}/api/userOtp`,
    method: "post",
  },
  otpCheck: {
    url: `${backendDomin}/api/otpCheck`,
    method: "post",
  },
  requestPasswordReset: {
    url: `${backendDomin}/api/requestPasswordReset`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomin}/api/resetPassword`,
    method: "post",
  },
  SignIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  uploadShorterLink: {
    url: `${backendDomin}/api/uploadShorterLink`,
    method: "post",
  },
  getShorterLink: {
    url: `${backendDomin}/api/getLink`,
    method: "post",
  },
  editLink: {
    url: `${backendDomin}/api/editLink`,
    method: "post",
  },
  deleteLink: {
    url: `${backendDomin}/api/deleteLink`,
    method: "post",
  },
  coinTransper: {
    url: `${backendDomin}/api/coinTransper`,
    method: "post",
  },
  walletTransper: {
    url: `${backendDomin}/api/walletTransper`,
    method: "post",
  },
  pagination: {
    url: `${backendDomin}/api/pagination`,
    method: "get",
  },
  totalPage: {
    url: `${backendDomin}/api/totalPage`,
    method: "get",
  },
  allLinks: {
    url: `${backendDomin}/api/allLinks`,
    method: "get",
  },
  withdraw: {
    url: `${backendDomin}/api/withdraw`,
    method: "post",
  },
  history: {
    url: `${backendDomin}/api/history`,
    method: "get",
  },
  payment: {
    url: `${backendDomin}/api/payment`,
    method: "post",
  },
  verify: {
    url: `${backendDomin}/api/verify`,
    method: "post",
  },
  subcription: {
    url: `${backendDomin}/api/subcription`,
    method: "post",
  },
  paymentData: {
    url: `${backendDomin}/api/paymentData`,
    method: "post",
  },
};

export default SummaryApi;
