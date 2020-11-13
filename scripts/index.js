//slide nav bar
$("#l-list").hide();
$("#ham").click(function () {
  $("#l-list").slideToggle();
});

//intialise darkmode value
let darkMode = localStorage.getItem("dMode") || true;

//theme elements changing functions
const invertImage = (element, attr, url1, url2) => {
  darkMode ? $(element).attr(attr, url1) : $(element).attr(attr, url2);
};
const themeInvert = () => {
  darkMode
    ? $("body").attr("data-theme", "light")
    : $("body").attr("data-theme", "dark");
};
const slide = () => {
  darkMode
    ? $(".d-mode-cir").animate({ marginLeft: "27px" })
    : $(".d-mode-cir").animate({ marginLeft: "0" });
};
const changeText = () => {
  darkMode ? $("#cd-th").text("Dark Mode") : $("#cd-th").text("Light Mode");
};

toggleTheme = (btn) => {
  $(btn).click(() => {
    themeInvert();
    slide();
    changeText();
    $("#l-list").slideUp();
    invertImage(
      ".hb-2020",
      "src",
      "./assets/img/hfBlue.svg",
      "./assets/img/hb_logo.svg"
    );
    invertImage(
      ".tt-img",
      "src",
      "./assets/img/ttBlue.svg",
      "./assets/img/tt.svg"
    );
    invertImage(
      ".min-logo",
      "src",
      "./assets/img/hBlue.svg",
      "./assets/img/h.svg"
    );
    invertImage(
      "#ham",
      "src",
      "./assets/img/hamBlack.svg",
      "./assets/img/ham.svg"
    );
    invertImage("#ms", "class", "fa fa-moon", "fa fa-sun");
    darkMode = !darkMode;
    localStorage.setItem("dMode", darkMode);
  });
};

//theme toggler
toggleTheme(".d-mode");
toggleTheme("#cd-th");

//check theme value and assign theme accordingly
if (localStorage.getItem("dMode") == "false") {
  document.querySelector(".d-mode").click();
}
