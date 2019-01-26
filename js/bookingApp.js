var isBookinPageLoaded = false;
var filePath = location.protocol;
var url = location.href;

var bookafyPopup = function(
  k,
  isReschedule,
  isbookAppointmentResource,
  e,
  newPath
) {
  //console.log("filePath: "+filePath);
  if (filePath == "https:") {
    subdomainPath = "https://" + newPath;
    //subdomainPath = "https://"+newPath+":3000";
  } else {
    subdomainPath = "http://" + newPath;
    //subdomainPath = "http://"+newPath+":3000";
  }
  client_worker_token = "";
  token_type = "";
  if (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
  var windowWidth = jQuery(window).width();
  if (windowWidth < 600) {
    //console.log("path: "+subdomainPath+'/schedule?type=iframe')
    if (customBookingPageUrl) {
      window.open(customBookingPageUrl, "_blank");
    } else if (k && typeof service_slug != "undefined" && service_slug) {
      window.open(
        subdomainPath + "/schedule?type=iframe&service_id=" + k,
        "_blank"
      );
    } else if (k && typeof category_slug != "undefined" && category_slug) {
      window.open(
        subdomainPath + "/schedule?type=iframe&category_id=" + k,
        "_blank"
      );
    } else if (k && typeof class_slug != "undefined" && class_slug) {
      window.open(
        subdomainPath + "/schedule?type=iframe&class_id=" + k,
        "_blank"
      );
    } else if (k && typeof panel_slug != "undefined" && panel_slug) {
      window.open(
        subdomainPath + "/schedule?type=iframe&panel_id=" + k,
        "_blank"
      );
    } else if (k) {
      window.open(subdomainPath + "/schedule/" + k + "?type=iframe", "_blank");
    } else {
      window.open(subdomainPath + "/schedule?type=iframe", "_blank");
    }
    return;
  }

  var templ = {};
  templ.overlay = '<div id="bookafy-overlay"></div>';
  templ.popup =
    '<div id="bookafy-fancy-box" style= "height: auto;left: 50%;position: absolute;top: 0;width: 545px;z-index: 999999;">' +
    '<div id="bookafy-fancy-box-close-icon"></div>' +
    '<div id="bookafy-fancy-box-content">' +
    "</div>" +
    "</div>";
  init = function(ck) {
    if (!isBookinPageLoaded) {
      isBookinPageLoaded = true;
      this.renderTempl();
    } else {
      this.loadIframe();
      this.positionPopup();
      this.showPopup();
    }
    jQuery("#bookafy-fancy-box-iframe").on("load", function() {
      jQuery(".se-pre-con").fadeOut("slow");
    });
  };
  renderTempl = function() {
    jQuery("body")
      .append(templ.overlay)
      .append(templ.popup);
    this.positionPopup();
    this.loadIframe();
    this.bindEvents();
  };
  loadIframe = function() {
    if (isReschedule) {
      if (isbookAppointmentResource == "true") {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            subdomainPath +
            "rescheduleAppointment.do?cancellationKey=" +
            k +
            '&isStaffBookingPage=true"></iframe>'
        );
      } else {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            subdomainPath +
            "rescheduleAppointment.do?cancellationKey=" +
            k +
            '"></iframe>'
        );
      }
    } else {
      //console.log('##########################')
      //console.log('here we send HTML request to NEW action')
      if (customBookingPageUrl) {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            customBookingPageUrl +
            ' "></iframe>'
        );
      } else if (k && typeof service_slug != "undefined" && service_slug) {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            subdomainPath +
            "/schedule?type=iframe&service_id=" +
            k +
            ' "></iframe>'
        );
      } else if (k && typeof category_slug != "undefined" && category_slug) {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            subdomainPath +
            "/schedule?type=iframe&category_id=" +
            k +
            ' "></iframe>'
        );
      } else if (k && typeof class_slug != "undefined" && class_slug) {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            subdomainPath +
            "/schedule?type=iframe&class_id=" +
            k +
            ' "></iframe>'
        );
      } else if (k && typeof panel_slug != "undefined" && panel_slug) {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            subdomainPath +
            "/schedule?type=iframe&panel_id=" +
            k +
            ' "></iframe>'
        );
      } else if (k) {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            subdomainPath +
            "/schedule/" +
            k +
            "?type=iframe" +
            ' "></iframe>'
        );
      } else {
        jQuery("#bookafy-fancy-box-content").html(
          '<iframe id="bookafy-fancy-box-iframe" frameborder="0" hspace="0" scrolling="auto" src="' +
            subdomainPath +
            "/schedule?type=iframe" +
            ' "></iframe>'
        );
      }
    }
    jQuery("#bookafy-fancy-box-content").append(
      "<div class='se-pre-con'></div>"
    );
  };
  bindEvents = function() {
    var self = this;
    jQuery("#bookafy-overlay , #bookafy-fancy-box-close-icon").bind(
      "click",
      function() {
        self.hidePopup();
      }
    );
  };
  positionPopup = function() {
    var windowHeight = jQuery(window).height();
    var windowScrollHeight = jQuery(document).height();
    var windowScrollTop = jQuery(document).scrollTop();
    var popupWidth = jQuery("#bookafy-fancy-box").width();
    var popupHeight = windowHeight - 100;

    jQuery("#bookafy-overlay").height(windowScrollHeight + "px");
    jQuery("#bookafy-fancy-box").css({
      "margin-left": "-" + popupWidth / 2 + "px",
      "margin-top": (windowHeight - popupHeight) / 4 + windowScrollTop + "px"
    });
    jQuery(".subdomain").css("overflow", "hidden");
  };
  hidePopup = function() {
    jQuery("#bookafy-overlay,#bookafy-fancy-box").hide();
    jQuery(".subdomain").css("overflow", "auto");
  };
  showPopup = function() {
    jQuery("#bookafy-overlay,#bookafy-fancy-box").show();
  };
  this.init(k);
};

loadCss = function() {
  // console.log('in loadCss');
  var cssFilePath =
    '<link href="https://app.bookafy.com/assets/mybookafyPopup.css.scss" rel="stylesheet" type="text/css" />';
  //var cssFilePath		=	'<link href="https://bookafystaging.com/assets/mybookafyPopup.css" rel="stylesheet" type="text/css" />';

  var appendCssFiles = function() {
    ////console.log('in appendCssFiles');
    jQuery("#bookafy-scheduling").css("visibility", "none");
    jQuery("head").append(cssFilePath);
    setTimeout(function() {
      loadbookafyFancyBox();
    }, 600);
  };

  //Binding click event to the "a" tag. Added this to override the FancyBox plugin
  var loadbookafyFancyBox = function() {
    ////console.log('in loadbookafyFancyBox');
    jQuery("[id=bookafy-scheduling]").on("click", function(e) {
      //console.log('############################');
      //console.log('in loadbookafyFancyBox onclick');

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      var bookingPageLink = jQuery(this).data("domain-name");
      var host = document.createElement("a");
      host.href = bookingPageLink;

      customBookingPageUrl = false;

      if (bookingPageLink.indexOf("custom_embed=true") > 0) {
        customBookingPageUrl = bookingPageLink;
      } else if (
        bookingPageLink.indexOf("category_id=") > 0 ||
        bookingPageLink.indexOf("category/") > 0
      ) {
        category_slug = bookingPageLink.split("category/")[1];
      } else if (
        bookingPageLink.indexOf("service_id=") > 0 ||
        bookingPageLink.indexOf("service/") > 0
      ) {
        service_slug =
          bookingPageLink.split("service_id=")[1] ||
          bookingPageLink.split("service/")[1];
      } else if (
        bookingPageLink.indexOf("schedule/") > 0 &&
        bookingPageLink.indexOf("?type=") > 0
      ) {
        user_id = bookingPageLink.split("schedule/")[1].split("?")[0];
      } else if (bookingPageLink.indexOf("class/") > 0) {
        class_slug = bookingPageLink.split("class/")[1];
      } else if (bookingPageLink.indexOf("panel/") > 0) {
        panel_slug = bookingPageLink.split("panel/")[1].split("?")[0];
      }

      var urlSplitArray = bookingPageLink.split("/");
      var companyKey = urlSplitArray[urlSplitArray.length - 1];
      if (companyKey.indexOf("?") != -1) {
        companyKey = companyKey.split("?")[1];
      }
      //console.log("companyKey: "+companyKey)
      bookafyPopup(companyKey, false, isBookinPageLoaded, e, host.hostname);
    });
  };

  if (typeof jQuery !== "undefined") {
    appendCssFiles();
  } else {
    var script = document.createElement("SCRIPT");

    script.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    var checkReady = function(callback) {
      if (window.jQuery) {
        callback(jQuery);
      } else {
        window.setTimeout(function() {
          checkReady(callback);
        }, 100);
      }
    };

    checkReady(function(jQuery) {
      appendCssFiles();
    });
  }
};
loadCss();

openBookafyPopup = function() {
  loadCss();
  setTimeout(function() {
    jQuery("#bookafy-scheduling").click();
  }, 600);
};
