let title = document.getElementById("postTitle");
let introduction = document.getElementById("intro");
let geo = document.getElementById("geo-location");
let content = document.getElementById("content");
let food = document.getElementById("food");
let comment = document.getElementById("comment");
let locationImage = document.getElementsByClassName("location-img");

let commentCount = document.getElementsByClassName("commentCount");
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userComment = document.getElementById("postComment");
let userRating = document.getElementById("rating");
let postButton = document.getElementById("postBtn");

let map = document.getElementById("map");

async function getTravelAPI() {
  const travel_response = await fetch("data/travel.json");
  // let travel_response = await fetch("https://sheetdb.io/api/v1/t2jatjycxleq1");
  console.log(travel_response);

  const travel_data = await travel_response.json();
  console.log(travel_data);

  return travel_data;
}

async function getReviewAPI() {
  const review_response = await fetch(
    "https://sheetdb.io/api/v1/5012tnw87wtey?fbclid=IwAR0ERbbmyjeuDg6AldYQyak2SL5tI3Bz_4ZIMKgUpDuFaEFkxfDhmfwvifI"
  );
  console.log(review_response);

  const review_data = await review_response.json();
  console.log(review_data);

  return review_data;
}

async function loadData() {
  const travelData = await getTravelAPI();
  const reviewData = await getReviewAPI();

  console.log(travelData);
  //Query params in URL
  let params = new URL(document.location).searchParams;
  let ID = getID(params);

  let image;
  let count = 0;

  //Show element data from API
  for (let i = 0; i < travelData.length; i++) {
    //get post content
    for (let j = 0; j < reviewData.length; j++) {
      if (travelData[i].postID === ID) {
        title.innerHTML = travelData[i]["post-title"];

        travelData[i]["geo-location"] = replaceLineBreak(
          travelData[i]["geo-location"]
        );

        introduction.innerHTML = travelData[i]["introduction"];
        geo.innerHTML = travelData[i]["geo-location"];
        content.innerHTML = travelData[i]["content"];
        food.innerHTML = travelData[i]["foods"];

        image = travelData[i]["location-gallery"].split("\n");

        map.src = travelData[i]["map"];

        //get review of post
        if (reviewData[j].postID === ID) {
          count++;
          comment.insertAdjacentHTML(
            "beforeend",
            `<h4>${reviewData[j][`userName`]}</h4>
          <p>
            <i class="bx bx-time-five"></i>&nbsp; ${reviewData[j]["Date"]}
          </p>
          <p>
          ${reviewData[j]["userComment"]}
          </p>`
          );
        }
      }
    }
  }

  for (let i = 0; i < commentCount.length; i++) {
    commentCount[i].innerHTML = count;
  }
  //show Image
  console.log(image);
  for (let index = 0; index < image.length; index++) {
    locationImage[index].src = image[index];
  }
}

async function postUserAPI() {
  const reviewData = await getReviewAPI();

  console.log(reviewData);

  let userID;
  for (let i = 0; i < reviewData.length; i++) {
    userID = reviewData[i].userID;
    userID++;
  }
  console.log(userID);

  let params = new URL(document.location).searchParams;
  let postID = getID(params);

  let review = {
    //Loai request - o day la POST
    method: "POST",
    //Thong tin phu chu request
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //noi dung request
    body: JSON.stringify({
      data: [
        {
          userID: `${userID}`,
          postID: `${postID}`,
          userName: `${userName.value}`,
          userEmail: `${userEmail.value}`,
          userComment: `${userComment.value}`,
          //Rating chua co
          userRating: 5,
          Date: `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`,
        },
      ],
    }),
  };
  const res = await fetch(
    "https://sheetdb.io/api/v1/5012tnw87wtey?fbclid=IwAR0ERbbmyjeuDg6AldYQyak2SL5tI3Bz_4ZIMKgUpDuFaEFkxfDhmfwvifI",
    review
  );
  console.log(await res.json());

  location.reload();
}

document.addEventListener("DOMContentLoaded", loadData);

postButton.addEventListener("click", () => {
  if (
    userName.value.length &&
    userComment.value.length &&
    userEmail.value.length
  ) {
    postUserAPI();
    alert("Thanks for your feedback");
  } else {
    alert("Please fill all the information");
  }
});

function getID(params) {
  let ID = params.get("postID");
  return ID;
}

function replaceLineBreak(x) {
  return x.replace("\n", "<br>");
}

console.dir(userEmail);
