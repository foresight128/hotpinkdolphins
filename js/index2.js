$(function () {
  $("html").css("overflow", "hidden");


  var wH = $(window).height();
  var sH = $("section").css("height", wH);
  var sCount = $("section").length;
  $("#container").css("height", sH * sCount);

  //페이지 스크롤==================================================
  var moveTop = 0;
  var flag = false;
  $("section").each(function (i) {
    $(this).on("mousewheel DOMMouseScroll", function (e) {
      // console.log(e)

      var event = e.originalEvent;
      //방향을 체크할 변수
      var delta = 0;

      if (event.detail) {
        delta = event.detail * -40;
      } else {
        delta = event.wheelDelta;
      }
      console.log("move 전:" + i, delta, $(this).next().length, flag);

      if (delta < 0) {
        if (i == 0 && flag == false) {
          $(".bigText>p:eq(0)").stop().animate(
            {
              opacity: 0,
            },
            1000
          );
          $(".bigText>p:eq(1)")
            .stop()
            .animate(
              {
                opacity: 1,
              },
              1000,
              function () {
                flag = true;
              }
            );
        } else {
          if ($(this).next().length) {
            moveTop = $(this).next().offset().top;
          } else {
            // moveTop = $("section").eq(0).offset().top;
          }
        }
      } else {


        if ($(this).prev().length) {
          moveTop = $(this).prev().offset().top;
        }
        else {
          // console.log("sddsf")
        }
        console.log(i, flag)
        if (i == 1) {
          $(".bigText>p:eq(0)").css("opacity", 1)
          $(".bigText>p:eq(1)").css("opacity", 0)
          flag = false;
        }
        else {
          // console.log("11111")
        }

      }

      $("html,body").stop().animate(
        {
          scrollTop: moveTop,
        },
        700
      );
    });
  });

  var scTop = $(this).scrollTop();
  // console.log(scTop);
  // 스크롤 이벤트 ====================================================
  $(window).scroll(function (e) {
    scTop = $(this).scrollTop();
    // console.log(scTop);

    //introText===================================

    var introText = $(".introText");
    var introSpan = introText.find("span");

    if (scTop >= "920") {
      introSpan.addClass("onSpan");
    } else {
      introSpan.removeClass("onSpan");
    }
  });

  // krWhaleWrap===========================
  $(".krWhaleImg").on({
    mouseenter: function () {
      $(this).addClass("onImg").children().css("transition-duration", "0.5s");
    },
    mouseleave: function () {
      $(this).removeClass("onImg");
    },
  });

  // hNews====================================
  var showBanner = 0;
  var bCount = $(".nBanner>li").length;
  // console.log(bCount);

  function fadeBanner() {
    $(".nBanner>li")
      .eq(showBanner)
      .stop()
      .fadeIn(500)
      .siblings()
      .stop()
      .fadeOut(500);
    $(".newsText>li")
      .eq(showBanner)
      .stop()
      .fadeIn(500)
      .siblings()
      .stop()
      .fadeOut(500);
    $(".pageBtn>li")
      .eq(showBanner)
      .addClass("onPageBtn")
      .siblings()
      .removeClass("onPageBtn");

    if (showBanner < bCount) {
      showBanner++;
    } else {
      showBanner = 0;
    }
  }

  $(".pageBtn>li").click(function () {
    showBanner = $(this).index();
    fadeBanner();
  });
  $(".nextBtn").click(function () {
    if (showBanner == bCount) {
      showBanner = 0;
    }
    fadeBanner();
  });
  $(".prevBtn").click(function () {
    if (showBanner == 0) {
      showBanner = bCount;
    }
    showBanner--;
    $(".nBanner>li")
      .eq(showBanner)
      .stop()
      .fadeIn(500)
      .siblings()
      .stop()
      .fadeOut(500);
    $(".newsText>li")
      .eq(showBanner)
      .stop()
      .fadeIn(500)
      .siblings()
      .stop()
      .fadeOut(500);
    $(".pageBtn>li")
      .eq(showBanner)
      .addClass("onPageBtn")
      .siblings()
      .removeClass("onPageBtn");
  });

  var timer = setInterval(fadeBanner, 3000);

  $(".play").click(function () {
    if ($(this).hasClass("pause")) {
      $(this).find("img").attr("src", "images/icon-pasue.png");
      setInterval(fadeBanner, 3000);
    } else {
      $(this).addClass("pause");
      $(this).find("img").attr("src", "images/icon-play.png");
      clearInterval(timer);
    }
  });

  // actContents==============================
  var imgBanner = $(".imgBanner");
  var imgLi = imgBanner.find("li");
  var showAct = 0;
  var countAct = imgLi.length;
  var liWidth = imgLi.width();

  var objLast = $(".imgBanner>li:last").clone();
  var objFirst = $(".imgBanner>li:lt(2)").clone();
  imgBanner.append(objFirst);
  imgBanner.prepend(objLast);
  var imgLi = imgBanner.find("li");
  var cloneCount = imgLi.length;
  imgBanner.width(cloneCount * liWidth);
  console.log(imgBanner.width());
  imgLi.width(liWidth);

  function slideBanner() {
    imgBanner.stop().animate(
      {
        "margin-left": -showAct * liWidth - liWidth / 2,
      },
      500
    );

    $(imgLi)
      .eq(showAct + 1)
      .addClass("onImgBanner")
      .siblings()
      .removeClass("onImgBanner");
  }

  $(".nBtn").on("click", function () {
    if (showAct == countAct) {
      showAct = 0;
      imgBanner.css("margin-left", -liWidth / 2);
    }
    showAct++;
    slideBanner();
  });

  $(".pBtn").on("click", function () {
    if (showAct == 0) {
      showAct = countAct;
      imgBanner.css("margin-left", -showAct * countAct - liWidth / 2);
    }
    showAct--;
    slideBanner();
  });

  setInterval(function () {
    $(".nBtn").trigger("click");
  }, 3000);

  // subscribeWrap============================
  $(".letterBtn").on({
    click: function () {
      var letterEmail = $(".letterEmail");
      var letterSpan = $(".subscribeWrap").find(".footS");
      var email = letterEmail.val();
      // var email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

      if (email == false) {
        letterSpan.text("이메일을 입력해주세요.");
      } else {
        if (email.indexOf("@") < 0 || email.indexOf(".") < 0) {
          letterSpan.text("잘못된 이메일 주소입니다.");
        } else {
          letterEmail.val("");
          letterSpan.text("입력하신 메일 주소로 확인 메일을 보내드렸습니다.");
        }
      }
    },
  });
});
