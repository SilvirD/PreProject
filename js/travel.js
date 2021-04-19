let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

let locationPlace = document.getElementById("location-place");

let cityName = document.getElementById("cityName");

async function getTravelAPI() {
  let travel_response = await fetch("https://sheetdb.io/api/v1/6cbntm54spahz");
  // console.log(travel_response);

  let travel_data = await travel_response.json();
  // console.log(travel_data);

  return travel_data;
}

async function locationCity() {
  let travel_data = await getTravelAPI();

  let params = new URL(document.location).searchParams;
  let city = getCity(params);

  cityName.innerHTML = city;

  for (let i = 0; i < travel_data.length; i++) {
    if (travel_data[i].city === city) {
      locationPlace.insertAdjacentHTML(
        "beforeend",
        `<div class="location-content col-lg-4">
          <div class="card">
            <img
              src=${travel_data[i]["location-gallery"]}
              class="img-location"
              alt="location-img"
            />
            <div class="card-body">
              <h5 class="card-title">${travel_data[i]["tourist-attraction"]}</h5>
              <p class="card-intro">
                ${travel_data[i]["introduction"]}
              </p>
              <p>by Duc Tran</p>
              <a href="detail.html?postID=${travel_data[i].postID}" class="btn btn-primary">
                Detail
              </a>
              <div class="location-name"></div>
            </div>
          </div>
        </div>`
      );
    }
  }
}

async function locationSearch() {
  let travel_data = await getTravelAPI();

  let resultFound = 0;

  let filter = searchInput.value.toLowerCase();

  if (searchInput.validity.valid === true) {
    locationPlace.innerHTML = "";
    for (let i = 0; i < travel_data.length; i++) {
      if (travel_data[i]["tourist-attraction"].toLowerCase().includes(filter)) {
        resultFound++;
        if (resultFound) {
          locationPlace.insertAdjacentHTML(
            "beforeend",
            `<div class="location-content col-lg-4">
                  <div class="card">
                    <img
                      src=${travel_data[i]["location-gallery"]}
                      class="img-location"
                      alt="location-img"
                    />
                    <div class="card-body">
                      <h5 class="card-title">${travel_data[i]["tourist-attraction"]}</h5>
                      <p class="card-intro">
                        ${travel_data[i]["introduction"]}
                      </p>
                      <p>by Duc Tran</p>
                      <a href="detail.html?postID=${travel_data[i].postID}" class="btn btn-primary">
                        Detail
                      </a>
                      <div class="location-name"></div>
                    </div>
                  </div>
                </div>`
          );
        }
      }
    }
    //Show result found
    document.getElementById(
      "resultFound"
    ).innerHTML = `<b>${resultFound}</b> result found`;
  } else {
    alert("You must fill the search field");
    searchInput.focus();
  }
}

searchBtn.addEventListener("click", () => {
  locationSearch();
});

function getCity(params) {
  let city = params.get("city");
  return city;
}

locationCity();
