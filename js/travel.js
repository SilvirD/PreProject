let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

let locationPlace = document.getElementById("location-place");

let cityName = document.getElementById("cityName");

async function getTravelAPI() {
  let travel_response = await fetch("data/travel.json");
  console.log(travel_response);

  let travel_data = await travel_response.json();
  console.log(travel_data);

  let review_response = await fetch("data/review.json");
  console.log(review_response);

  let review_data = await review_response.json();
  console.log(review_data);

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
              src="https://www.vietfuntravel.com.vn/image/data/Ha-Noi/hoang-thanh-thang-long/Dia-chi-hoang-thanh-thang-long-ha-noi-nam-o-dau-02.jpg"
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

  return travel_data;
}

getTravelAPI();

function getCity(params) {
  let city = params.get("city");
  return city;
}

async function search() {
  let travel_data = await getTravelAPI();

  let filter = searchInput.value.toLowerCase();

  for (let i = 0; i < travel_data.length; i++) {
    if (travel_data[i]["post-title"].toLowerCase().indexOf(filter) > -1) {
      locationPlace.insertAdjacentHTML(
        "beforeend",
        `<div class="location-content col-lg-4">
          <div class="card">
            <img
              src="https://www.vietfuntravel.com.vn/image/data/Ha-Noi/hoang-thanh-thang-long/Dia-chi-hoang-thanh-thang-long-ha-noi-nam-o-dau-02.jpg"
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

searchBtn.addEventListener("click", search);
