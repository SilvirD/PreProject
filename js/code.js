async function getTravelAPI() {
  let travel_response = await fetch("https://sheetdb.io/api/v1/i1r1dwj8uplth");
  console.log(travel_response);

  let travel_data = await travel_response.json();
  console.log(travel_data);

  let review_response = await fetch("https://sheetdb.io/api/v1/ovhvrqmyrsh2r");
  console.log(review_response);

  let review_data = await review_response.json();
  console.log(review_data);

  let title = document.getElementById("postTitle");
  let introduction = document.getElementById("intro");
  let geo = document.getElementById("geo-location");
  let content = document.getElementById("content");
  let food = document.getElementById("food");
  let comment = document.getElementById("comment");
  let locationImage = document.getElementsByClassName("location-img");

  //Query params in URL
  let params = new URL(document.location).searchParams;
  let ID = getID(params);

  //Show element data from API
  for (let i = 0; i < travel_data.length; i++) {

    // let image = travel_data[i]["location-gallery"].split("\n");
    // locationImage[i].src = image[i];

    //get post content
    for (let j = 0; j < review_data.length; j++) {
      if (travel_data[i].postID === ID) {
        title.innerHTML = travel_data[i]["post-title"];

        travel_data[i]["geo-location"] = replaceLineBreak(
          travel_data[i]["geo-location"]
        );

        introduction.innerHTML = travel_data[i]["introduction"];
        geo.innerHTML = travel_data[i]["geo-location"];
        content.innerHTML = travel_data[i]["content"];
        food.innerHTML = travel_data[i]["foods"];

        //get review of post
        if (review_data[j].postID === ID) {
          comment.innerHTML += `<li>${review_data[j].userComment}</li>`;
        }
      }
    }
  }


}

getTravelAPI();

function getID(params) {
  let ID = params.get("postID");
  return ID;
}

function replaceLineBreak(x) {
  return x.replace("\n", "<br>");
}
