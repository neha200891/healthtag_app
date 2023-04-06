const Notification = require("../model/notifications");

const axios = require("axios").default;

// AAAAuehCRgI:APA91bGGTpCLB1rkqJ9zgNqYildPyS6xpdlpZszJBKwCQmsVKALYWcAEL3se0yd4d5volePueEWphaTzp9c_iOvboSg-E0z9MmVrzJCLKcxJ74zxpksOK85jADb-JZtYxbpsYsmRyxpA

exports.dataNotFound = (model, message, statusCode) => {
  if (!model) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }
};

exports.getPagingData = (data, page, limit) => {
  const { count: count, rows: rows } = data;

  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / parseInt(limit));
  return { count, rows, totalPages, currentPage };
};

exports.sendNotification = async (deviceType, message, token, userId) => {
  var notification;
  var notificationBody;
  if (deviceType == "Android") {
    notification = {
      title: "Health Tag",
      sound: "default",
      icon: "",
      ...message,
    };
    notificationBody = {
      data: notification,
      to: token,
    };
  } else {
    notification = {
      title: "Health Tag",
      sound: "default",
      icon: "",
    };
    const body = {
      content_available: true,
      priority: "high",
      ...message,
    };
    notificationBody = {
      data: notification,
      to: token,
      notification: body,
    };
  }
  axios
    .post("https://fcm.googleapis.com/fcm/send", notificationBody, {
      headers: {
        Authorization:
          "key=" +
          "AAAAxp-av_g:APA91bHyYK-9EQdLhKKECWDQXb8cmf9YMdz6mMmEva9iabi7MT7lA7B5Bf_xY2pQDdeA3kAZC51jxvLWXvwbUwItkVnCpRhcs22iI3nCPwjEfr1yKD_nHsieHmSLa5-g4VIurLnjmNgm",
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      // console.log(result);
      console.log("success notified");
    })
    .catch((err) => {
      console.log("err");
    });

  await Notification.create({ notification: JSON.stringify(message), userId: userId });

  return true;
};
