$(function(){

    $("#slider>li").css("width",$(".index_wrap").width());
    var len = $(".number > li").length;
    var index = 0;
    var adTimer;
    $(".number li").mouseover(function(){
        index = $(".number li").index(this);
        var test=$(this).index();
        console.log("test="+test+"index="+index);

        showImg(index);
    }).eq(0).mouseover();
    var sWidth=$("#slider").width();
    console.log("width="+sWidth);
    $("#slider").css("width",sWidth * (len));
    console.info($("#slider").width());
//滑入 停止动画，滑出开始动画.
    $('.index_wrap').hover(function(){
        clearInterval(adTimer);
    },function(){
        adTimer = setInterval(function(){
            index++;
            showImg(index);
            
            if(index==len)
            {
                index=0;
                 $("#slider").css('left','0').stop(true,false).animate({left : -sWidth*index},1000);
                  $(".number li").eq(0).addClass("on").siblings().removeClass("on");
                 // index=1;
                   // $(".number li").removeClass("on").eq(index).addClass("on");
                    // $(".number li").eq(index).addClass("on").siblings().removeClass("on");

            }
          
        } , 3000);
    }).trigger("mouseleave");


    //购物车显示效果
    $(".shopingcar").mouseover(function(){
        var obj=$("#shopCar");
        $(obj).css("display","block");
        $(obj).css("left",this.clientX);
        $(obj).css("top",this.clientY+10);
    }).mouseout(function(){
        $("#shopCar").css("display","none");
    });
    //图片选中的效果

    $(".img").mouseover(function () {
        $(this).find(".discription1").addClass("spanHover");
        $(this).find(".discription2").css("color","green");
    }).mouseout(function(){
        $(this).find(".discription1").removeClass("spanHover");
        $(this).find(".discription2").css("color","#666666");
    });
    //下拉框
    $(".navDown").parent().hover(function(){
        $(".fr p").addClass("hover");

        $(this).find(".navDown").slideDown("normal");
    },function(){
        $(".fr p").removeClass("hover");
        $(this).find(".navDown").stop().slideUp("normal");
    });

    $(".item").hover(function(){
        $(this).find(".boxShow").show();
        $(this).find(".i-master").find("span").addClass("arrow-left");
    },function(){
        $(this).find(".boxShow").hide();
        $(this).find(".i-master").find("span").removeClass("arrow-left");
    })
    //地区选择
    $(".cityDiv").click(function () {

        $("#maskLayer").css("left", ($(window).width() - $("#maskLayer").outerWidth()) / 2);
        $("#maskLayer").css("top", "120px");
        $(".mask").css({
            "display": "block",
            "height": $(document).height()
        });
        $("#maskLayer").css("display", "block");
        $("#city2").citySelect({

            //required: false
            prov: "江西",
            city: "南昌",
            dist: "青山湖区",
            nodata: "none"
        });

    });
    $("#btn").click(function () {
        if( $(".dist").val()!=null)
            $(".selectCity").html($(".city").val() + " " + $(".dist").val());
        else
            $(".selectCity").html($(".prov").val() + " " + $(".city").val());
        $("#maskLayer").css("display", "none");
        $(".mask").css({
            "display": "none"

        });
        //alert($(".city").val()+" "+$(".dist").val());
    })
    $("#close").click(function () {
        $("#maskLayer").css("display", "none");
        $(".mask").css({
            "display": "none"

        });
    });
    $(".second>ul>li").click(function(){
       $(".first").find(".first1").removeClass("show").next().css("display","none");
        $("#arrow").css("display","none");
        var list= $(".second>ul>li").find(".la");
       list.removeClass("show");
       list.next().css("display","none");
       list.next().each(function(index,value){
           var id="#"+value.className;
           $(id).css("display","none");

       });
       $(this).find(".la").addClass("show").next().css("display","inline-block");
        var showId="#"+ $(this).find(".la").addClass("show").next()[0].className;

       $(showId).css("display","block");
    });

    $(".first").click(function(){
        $(".second>ul>li").find(".la").removeClass("show");
        $(".second>ul>li").find(".la").next().css("display","none");
        $(this).find(".first1").addClass("show").next().css("display","inline-block");
        var list= $(".second>ul>li").find(".la");
        list.next().each(function(index,value){
            var id="#"+value.className;
            $(id).css("display","none");

        });
        $("#arrow").css("display","block");
    });
    $(".text").focus(function(){
        $(this).css("border-bottom","1px solid white");
        $(".tishi").css("display","block");
        //$(".tishi").on("click","div",function(){
         //   $(".text").val($(this).html());
         //   $(".tishi").css("display","none");
       // });

    }).blur(function(){
        $(this).css("border-bottom","2px solid #00A934");
        $(".tishi").css("display","none");
    });
    //var id=1;
    //setInterval(function(){
    //     console.info("hello world");
    //     var spans=$(".timer>span")[0];
    //    $(spans).html(id);
    //    id=id+1;
    //
    //},1000);
    var spans=$(".timer>span");
    var end = new Date();
    end.setFullYear(2016);
    end.setMonth(11);
    end.setDate(19);
    end.setHours(12);
    end.setMinutes(0);
    end.setSeconds(0);
    console.info(end.toDateString());
    var now = new Date();
    $.each(spans,function(i,v){
      $(this).html(getcha(now, end)[i]);

    });

    setInterval(function () {
        var now = new Date();
        $.each(spans,function(i,v){
            $(this).html(getcha(now, end)[i]);

        });
    }, 1000);

})


// 通过控制top ，来显示不同的幻灯片
function showImg(index){

    // var adHeight = $(".index_wrap").height();
    var widths=$(".index_wrap").width();
    //console.log("index="+index+" width="+widths);

    $("#slider").stop(true,false).animate({left : -widths*index},1000);
    //console.log($("#slider").css("left"));
    $(".number li").removeClass("on")
        .eq(index).addClass("on");
}
function getcha(now, end) {

    var arr = [];
    var cha = (end.getTime() - now.getTime()) / 1000;
    var days=parseInt(cha/(60*60*24));
    days=days<10?("0"+days):days;
    arr.push(days);
    cha%=60*60*24;
    var hours = parseInt(cha / (60 * 60));
    hours=hours<10?("0"+hours):hours;
    arr.push(hours)
    cha %= 60 * 60;
    var mints = parseInt(cha / 60);
    mints=mints>=10?mints:"0"+mints;
    arr.push(mints)
    var sends = (cha % 60).toFixed();
    sends=sends>=10?sends:"0"+sends;
    arr.push(sends)

    return arr;
}
/**
 * Created by 方杰 on 2016-04-26.
 */
