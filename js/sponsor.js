$(function () {

    //영상
    var videobg = $(".full-bg");
    $(window).resize(function(){
        var currenWindow = $(this),
            windowWidth = currenWindow.width(),
            windowHeight = currenWindow.height(),
            broswerRatio = windowWidth / windowHeight,
            videoRatio = 1920/1080;

        if(videoRatio > broswerRatio){
            videobg.css({
                height:'100vh',
                width:windowHeight * videoRatio,
                left:(windowWidth - windowHeight * videoRatio)/2,
                top:0,
            });
        }else{
            videobg.css({
                height: windowWidth / videoRatio,
                width: "100vw",
                left: 0,
                top:(windowHeight - windowWidth / videoRatio)/2,
            });
        }
    });//Resize
    $(window).trigger('resize');

    //로딩페이지=============================================
    function hotTitleEvent() {
        $(".ht1").delay(100).animate({ opacity: 1 });
        $(".ht2").delay(500).animate({ opacity: 1 });
        $(".ht3").delay(1000).animate({ opacity: 1 });
        $(".ht4").delay(1500).animate({ opacity: 1 });
    }
    hotTitleEvent();
    setTimeout(function () {
        $(".loadingWrap").css("display", "none");
        $(".sponsorWrap-1").css("display", "block");
    }, 4000);

    //후원금액================================================
    //금액선택
    $(".sponAmount>li").on("click", function () {
        $(this).addClass("onamount").siblings().removeClass("onamount")

        //기타 클릭시 인풋 입력가능
        var showAmount = $(this).index();
        console.log(showAmount);
        if (showAmount == 8) {
            $(".sponsorship>input").prop("disabled", false);
        }
        else {
            $(".sponsorship>input").prop("disabled", true);
        }
    })

    //다음버튼
    $(".nextBtn1").on("click", function () {
        $(".sponsorWrap-1").css("display", "none");
        $(".sponsorWrap-2").css("display", "block");
    })

    //후원자정보===============================================

    //이전,다음버튼
    $(".nextBtn2").on("click", function () {
        var infoSpan = $(".sponsorinfo").find(".infoSpan");

        var isRight = true;
        $("#sponsorForm").find("input").each(function (index, item) {
            if ($(this).val().trim() == '') {
                infoSpan.css("opacity", 1);
                infoSpan.text("*빈칸을 채워주세요.");
                isRight = false;
                return false;
            }
        });
        if (!isRight) {
            return;
        }

        $(".sponsorWrap-2").css("display", "none");
        $(".sponsorWrap-3").css("display", "block");

    });

    $(".prevBtn2").on("click", function () {
        $(".sponsorWrap-2").css("display", "none");
        $(".sponsorWrap-1").css("display", "block");
    });

    //결제하기=================================================

    //이전,후원하기버튼
    $(".nextBtn3").on("click", function () {
        var paySpan = $(".payment").find(".paySpan");
        var isRight = true;
        $("#paymentForm").find("input").each(function (index, item) {
            if ($(this).val().trim() == '') {
                paySpan.css("opacity", 1);
                paySpan.text("*빈칸을 채워주세요.");
                isRight = false;
                return false;
            }
        });
        if (!isRight) {
            return;
        }

        $(".sponsorWrap-3").css("display", "none");
        $(".sponsor-completed").css("display", "block");

    });

    $(".prevBtn3").on("click", function () {
        $(".sponsorWrap-3").css("display", "none");
        $(".sponsorWrap-2").css("display", "block");
    });

})