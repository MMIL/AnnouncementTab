//ig API requestconst
const BASE_URL = "https://graph.instagram.com/";
const ACCESS_KEY =
  "IGQVJXREpGNVAyVFRBNmotQ000TUIwdGZAxQk5fMXBSSG1wbThjS2VNOWNQRjBXN1hTV1dYZAFg3Q0g1WlZAjNndiQ1J6RW56bUs3ZAHA3NFZAQTG1IOFpwN21Mb2RXUGtfX09XbEV0STln";
const card = document.querySelector(".card");

//tags colors
const color = [
  "#1D58BB",
  "chartreuse",
  "cornflowerblue",
  "crimson",
  "deeppink",
  "cyan",
  "#16D863",
  "#FF8AE2",
  "#a216ff",
  "#0044ff",
];

(function () {
  axios
    .get(`${BASE_URL}me/media`, {
      params: {
        access_token: ACCESS_KEY,
        fields: "media_type,thumbnail_url,media_url,timestamp,caption",
      },
    })
    .then((response) => {
      //Getting data
      let data = response.data.data;
      data.map((d) => {
        //For video and images
        if (d.media_type === "VIDEO") {
          con = `
                    <video width="300" height="300" controls>
                    <source src=${d.media_url} type="video/mp4">
                  Your browser does not support the video tag.
                  </video>
                    `;
        } else {
          con = `<img src='${d.media_url}' alt="">`;
        }

        //getting hashtags
        let words = d.caption || "";
        let tagslistarr = words.replace(/(\r\n|\n|\r)/gm, " ").split(" ");
        let arr = [];

        tagslistarr.forEach((e) => {
          e[0] == "#" ? arr.push(e) : "";
        });

        let tagList = "";
        for (let i = 0; i < 3; i++) {
          if (arr[i] != undefined) {
            tagList += `<span style="background-color:${
              color[Math.floor(Math.random() * 10)]
            }">
            ${arr[i]}
        </span>
        `;
          }
        }

        //Appending elements
        card.innerHTML += `
            <div class="card-ig">
                <div class="card-ig__img">
                    ${con}
                </div>
                <div class="ig-data">
                    <div class="ig-data__date">
                        ${new Date(d.timestamp).toGMTString().slice(4, 16)}
                    </div>
                    <div class="ig-data__tags">
                        ${tagList}
                    </div>
                    <div class="ig-data__username">
                        jssmmil
                    </div>
                    <div class="ig-data__des">
                        ${d.caption || ""}
                    </div>
                    <div class="ig-data__link">
                        ...read mode
                    </div>
                </div>
            </div>
        `;
      });
    })
    .then(() => {
      $(".ig-data__link").click(function () {
        $(this).prev().css("overflow-y", "scroll");
        $(this).css("display", "none");
      });
    })
    .catch((err) => {
      console.log(err);
      card.innerHTML = `<h1>Sorry content can't be loaded!!</h1>`;
    });
})();
