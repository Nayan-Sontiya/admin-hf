const serverUrl = "https://hospitalityfinder.in/api/";
// const serverUrl =
//   "https://20d4-2409-4043-4c11-77d0-3174-7c92-3383-c613.in.ngrok.io/api/";
const awsurl = "https://hospitality-web.s3.us-east-2.amazonaws.com/";

let AccessTokenProvider = () => {
  const userDataString = localStorage.getItem("hospitality");
  const userData = JSON.parse(userDataString);
  if (userData !== null) {
    return userData?.userData?.accessToken;
  }
};
AccessTokenProvider();
let RestaurantId = () => {
  const userDataString = localStorage.getItem("hospitality");
  const userData = JSON.parse(userDataString);
  if (userData !== null) {
    return userData.userData.data;
  }
};
let UserTokenExpire = () => {
  const userDataString = localStorage.getItem("hospitality");
  const userData = JSON.parse(userDataString);
  const now = new Date();
  if (now.getTime() > userData.expiry) {
    return true;
  }
  return false;
};
let UserDataProvider = () => {
  const userDataString = localStorage.getItem("hospitality");
  const userData = JSON.parse(userDataString);
  if (userData !== null) {
    return userData.userData.data;
  } else {
    return "userNotLoggedIn";
  }
};
let loginPostRequest = async (endPoint, requestBody) => {
  let result = await fetch(serverUrl + endPoint, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
  });
  let response = await result.json();
  return response;
};
let LoginPutRequest = async (endPoint, requestBody) => {
  let result = await fetch(serverUrl + endPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  let response = await result.json();
  return response;
};
let PatchRequest = async (endPoint, requestBody) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "x-access-token": assessToken,
    },
    body: JSON.stringify(requestBody),
  });
  let response = await result.json();
  return response;
};
let PutRequest = async (endPoint, requestBody) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "x-access-token": assessToken,
    },
    body: JSON.stringify(requestBody),
  });
  let response = await result.json();
  return response;
};
let PutRequestFormControl = async (endPoint, requestBody) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-access-token": assessToken,
    },
    body: requestBody,
  });
  let response = await result.json();
  return response;
};
let PatchRequestFormControl = async (endPoint, requestBody) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-access-token": assessToken,
    },
    body: requestBody,
  });
  let response = await result.json();
  return response;
};

let PostRequestFormControl = async (endPoint, requestBody) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-access-token": assessToken,
    },
    processData: false,
    contentType: false,
    body: requestBody,
  });
  let response = await result.json();
  return response;
};

let PostRequest = async (endPoint, requestBody) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "x-access-token": assessToken,
    },
    body: JSON.stringify(requestBody),
  });
  let response = await result.json();
  return response;
};

let GetRequest = async (endPoint) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": assessToken,
    },
  });
  let response = await result.json();
  return response;
};

let GetRequestWithoutToken = async (endPoint) => {
  let result = await fetch(serverUrl + endPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  let response = await result.json();
  return response;
};

let DeleteRequest = async (endPoint) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-access-token": assessToken,
    },
  });
  let response = await result.json();
  return response;
};
let DeleteRequestWithBody = async (endPoint, requestBody) => {
  let assessToken = AccessTokenProvider();
  let result = await fetch(serverUrl + endPoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "x-access-token": assessToken,
    },
    body: JSON.stringify(requestBody),
  });
  let response = await result.json();
  return response;
};

let timeFormator = (data) => {
  let postedDateString = data;
  let currentDate = new Date();
  let postedDate = new Date(postedDateString);
  const diffTime = Math.abs(currentDate - postedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
  const diffSeconds = Math.ceil(diffTime / 1000 - 1);
  const diffMinuts = Math.ceil(diffTime / (1000 * 60) - 1);
  const diffHour = Math.ceil(diffTime / (1000 * 60 * 60) - 1);
  let week = Math.ceil(diffDays / 7);
  if (diffDays > 6 && week > 0) {
    return week > 0 ? week + " week ago" : week + " weeks ago";
  } else if (diffDays <= 6 && diffDays > 0) {
    return diffDays === 1 ? diffDays + " Day ago" : diffDays + " Days ago";
  } else if (diffDays === 0 && diffHour > 0) {
    return diffHour === 1 ? diffHour + " Hour ago" : diffHour + " Hours ago";
  } else if (diffDays === 0 && diffMinuts <= 60 && diffSeconds > 60) {
    return diffMinuts === 1
      ? diffMinuts + " Minute ago"
      : diffMinuts + " Minutes ago";
  } else if (diffSeconds < 60) {
    return diffSeconds === 1
      ? diffSeconds + " Second ago"
      : diffSeconds + " Seconds ago";
  }
};
function isDigit(val) {
  var digit = val.toString().length;
  return digit;
}
const dateFormator = (date) => {
  let dateObj = new Date(date);
  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  let year = dateObj.getFullYear();
  if (day !== NaN) {
    if (isDigit(month) === 1) {
      month = 0 + "" + month;
    } else {
      month = month;
    }
    if (isDigit(day) === 1) {
      day = 0 + "" + day;
    } else {
      day = day;
    }
    let dateFormated = day + "-" + month + "-" + year;
    return dateFormated;
  }
};

function closeModalProfile(id) {
  let modal = document.getElementById(id);
  modal.classList.add("hide");
  modal.style.display = "none";
}
function displayModal(id) {
  let modal = document.getElementById(id);
  if (modal !== null) {
    modal.classList.add("show");
    modal.style.display = "block";
  }
}

const multipleMediaIdentifier = (media) => {
  if (media !== undefined) {
    let mediaArray = [];
    if (media.includes(",") === true) {
      media.split(",").map((row) => {
        let mediaObj = {
          media: row,
          status: true,
        };
        mediaArray.push(mediaObj);
      });
      return mediaArray;
    } else {
      let mediaObj = {
        media: media,
        status: false,
      };
      mediaArray.push(mediaObj);
      return mediaArray;
    }
  }
};
export {
  PutRequest,
  PutRequestFormControl,
  PostRequest,
  GetRequest,
  GetRequestWithoutToken,
  DeleteRequest,
  serverUrl,
  loginPostRequest,
  PostRequestFormControl,
  PatchRequestFormControl,
  DeleteRequestWithBody,
  RestaurantId,
  PatchRequest,
  LoginPutRequest,
  timeFormator,
  dateFormator,
  closeModalProfile,
  displayModal,
  UserDataProvider,
  UserTokenExpire,
  multipleMediaIdentifier,
  awsurl,
};
