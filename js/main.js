$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 40) {
      $(".navbar").addClass("fixed-top");
      $(".navbar .navbar-brand img").attr("src", "images/logo-theme.svg");
      $(".navbar .navbar-toggler img").attr(
        "src",
        "images/icons/menu-theme.png"
      );
    } else {
      $(".navbar").removeClass("fixed-top");
      $(".navbar .navbar-brand img").attr("src", "images/logo.png");
      $(".navbar .navbar-toggler img").attr("src", "images/icons/menu.svg");
    }
  });
});

$(document).ready(function() {
  setTimeout(function() {
    var iframe = document.getElementById("frame");
    var iframeWindow = iframe.contentWindow.document;
    var text = $(iframeWindow)
      .find(".powered-by-text")
      .text();
    console.log(text);

    //PRINTS "INNER MOST"
  }, 1000);
});
