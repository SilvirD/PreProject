const cityImage = [
  {
    city: "Hà Nội",
    srcImg:
      "https://fastly.4sqi.net/img/general/600x600/69974357_hteXCEnF7wIXWSMthyjbVZ9LcNeQ7gnLo0Rp9XRzxGs.jpg",
  },
  {
    city: "Lào Cai",
    srcImg:
      "https://cf.bstatic.com/images/hotel/max1280x900/281/281324403.jpg",
  },
  {
    city: "Quảng Ninh",
    srcImg:
      "https://images.foody.vn/res/g15/142567/s760/foody-bao-tang-quang-ninh-194-636568793790869715.jpg",
  },
  {
    city: "Hải Phòng",
    srcImg:
      "https://img.blogdulich.vn/2015/03/hoa-phuong-1.jpg",
  },
  {
    city: "Thừa Thiên Huế",
    srcImg: "https://tse4.mm.bing.net/th?id=OIP.ZCPjeMFlxFj-8RrMUxkHQAHaJQ&pid=Api&P=0&w=300&h=300",
  },
];

let blockContent = document.getElementById("block-content");

for (let i = 0; i < cityImage.length; i++) {
  blockContent.insertAdjacentHTML(
    "beforeend",
    `<div class="location-block">
    <div class="card">
      <a href="travel.html?city=${cityImage[i].city}"
        ><img
          class="card-img-top"
          src="${cityImage[i].srcImg}"
          alt="Card image cap"
      /></a>
    </div>
  </div>
  `
  );
}

blockContent.insertAdjacentHTML(
  "beforeend",
  `<div class="location-block">
  <div class="card">
    <img
      class="card-img-top"
      src=${cityImage[1].srcImg}
      alt="Card image cap"
      
    />
  </div>
</div>`
);
