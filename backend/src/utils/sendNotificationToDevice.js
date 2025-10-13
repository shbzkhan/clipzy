import admin from "firebase-admin";
export const sendNotificationToDevice = async({token, title, body, imageUrl})=>{
    const message = {
        token,
        data: {
          title: title || "New Notification",
          body: body || "Check this update",
          imageUrl: imageUrl || "",
        },
      };
    
      await admin.messaging().send(message)
}