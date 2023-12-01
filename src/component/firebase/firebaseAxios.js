import { $axios } from "../../lib/axios";

export const sendNotification = async (registrationTokens, webTokens) => {
  let data = {
    registrationTokens: registrationTokens,
    webTokens: webTokens,
  };
  // console.log("pure data: ", data);
  try {
    const response = await $axios.post("/send-notification", data);
    console.log("Server response:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
