gsap.registerPlugin(ScrollTrigger);

const containerPagina = document.querySelector(".container");

/* ROLAGEM SUAVE */
const rolagemSuave = new LocomotiveScroll({
  el: containerPagina,
  smooth: true
});

rolagemSuave.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(containerPagina, {
  scrollTop(valor) {
    return arguments.length
      ? rolagemSuave.scrollTo(valor, 0, 0)
      : rolagemSuave.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  tipoPin: containerPagina.style.transform ? "transform" : "fixed"
});

////////////////////////////////////
////////////////////////////////////
window.addEventListener("load", function () {
  let elementosPin = document.querySelectorAll(".pin-wrap > *");
  let pinWrap = document.querySelector(".pin-wrap");
  let larguraPinWrap = pinWrap.offsetWidth;
  let comprimentoRolagemHorizontal = larguraPinWrap - window.innerWidth;

  // Pinagem e rolagem horizontal

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scroller: containerPagina, // locomotive-scroll
      scrub: true,
      trigger: "#sectionPin",
      pin: true,
      // anticipatePin: 1,
      start: "top top",
      end: larguraPinWrap
    },
    x: -comprimentoRolagemHorizontal,
    ease: "none"
  });

  ScrollTrigger.addEventListener("refresh", () => rolagemSuave.update()); // locomotive-scroll

  ScrollTrigger.refresh();
});

const noise = () => {
  let canvas, ctx;

  let wWidth, wHeight;

  let noiseData = [];
  let frame = 0;

  let loopTimeout;


  // Create Noise
  const createNoise = () => {
    const idata = ctx.createImageData(wWidth, wHeight);
    const buffer32 = new Uint32Array(idata.data.buffer);
    const len = buffer32.length;

    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.5) {
        buffer32[i] = 0xff000000;
      }
    }

    noiseData.push(idata);
  };


  // Play Noise
  const paintNoise = () => {
    if (frame === 9) {
      frame = 0;
    } else {
      frame++;
    }

    ctx.putImageData(noiseData[frame], 0, 0);
  };


  // Loop
  const loop = () => {
    paintNoise(frame);

    loopTimeout = window.setTimeout(() => {
      window.requestAnimationFrame(loop);
    }, (1000 / 25));
  };


  // Setup
  const setup = () => {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;

    canvas.width = wWidth;
    canvas.height = wHeight;

    for (let i = 0; i < 10; i++) {
      createNoise();
    }

    loop();
  };


  // Reset
  let resizeThrottle;
  const reset = () => {
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeThrottle);

      resizeThrottle = window.setTimeout(() => {
        window.clearTimeout(loopTimeout);
        setup();
      }, 200);
    }, false);
  };


  // Init
  const init = (() => {
    canvas = document.getElementById('noise');
    ctx = canvas.getContext('2d');

    setup();
  })();
};

noise();

jQuery(document).scroll(function(event){


  var y = $(this).scrollTop();
  if (y > 100) {
    $('#mobile-menu').fadeIn();
  } else {
    $('#mobile-menu').fadeOut();
  }

});

jQuery(document).ready(function(event){
  var newloc;
  var val = 1;

  var amount = $('.content').length;
  var i;
  for (i = 1; i <= amount; i++) {
    var append = "<a href='#" + i + "'>0" + i + "</a>";
    var title = $("#" + i + " h1").text();
    var append2 = "<a href='#" + i + "'><span>" + title + "</span></a>";
    $("#slide-nav").append(append);
    $("#bigNav").append(append2);
  }

  $("#slide-nav").append('<a href="#bigNav" class="menu"><span class="fa fa-bars"></span> slides list</a>');
  $("#bigNav").append('<a href="#' + val + '"><span>Tutup Menu</span></a>');

  
  if(window.location.hash) {
    $(window.location.hash).css("display", "block");
    $(window.location.hash).animate({ opacity: "1" }, 500, "linear");
    $(window.location.hash + " .left").animate({ marginLeft: "0px" }, 500, "linear");
    $(window.location.hash + " .right").animate({ marginRight: "0px" }, 500, "linear");
    $("#slide-nav a[href='" + window.location.hash + "']").addClass("hov");
  } else {
    $("#1").css("display", "block");
    $("#1").animate({ opacity: "1" }, 500, "linear");
    $("#1 .left").animate({ marginLeft: "0px" }, 500, "linear");
    $("#1 .right").animate({ marginRight: "0px" }, 500, "linear");
    $("#slide-nav a[href='#1']").addClass("hov");
  }

  $(".prev").attr("href","#" + amount);
  $(".next").attr("href","#2");

  $(document).keydown(function(e) {
    if (e.keyCode == '32' || e.keyCode == '39' || e.keyCode == '40') {
      $('.next').trigger('click');
    }
    else if (e.keyCode == '37' || e.keyCode == '38') {
      $('.prev').trigger('click');
    }
  });


  $('html').on('click', 'a[href^="#"]', function(event){

    var data_id = $(this).attr('href');
    val = parseInt(data_id.replace('#', ''));
    var prev = parseInt(val - 1);
    var next = parseInt(val + 1);

    if (data_id != "#bigNav") {

      $("#slide-nav a").css("background", "transparent");
      $("#slide-nav a").removeClass("hov");


      if(val != amount)  $("#slide-nav a[href='#" + val + "']").addClass("hov");
      else if(val == amount)  $("#slide-nav a[href='#" + prev + "']").addClass("hov");

      if(prev <= 0) prev = amount;
      if(next > amount) next = 1;

      $(".prev").attr("href","#" + prev);
      $(".next").attr("href","#" + next);

      $(".left").animate({ marginLeft: "-100px" }, 500, "linear");
      $(".right").animate({ marginRight: "-100px" }, 500, "linear");
      $( "main > div" ).animate( {opacity: "0" }, 500, "linear", function() {
        $( "main > div" ).css("display", "none");
        $(data_id).css("display", "block");
        $(data_id).animate({ opacity: "1" }, 500);
        $(data_id + " .left").animate({ marginLeft: "0" }, 500, "linear");
        $(data_id + " .right").animate({ marginRight: "0" }, 500, "linear");
      });
    } 
  });


  $('html').on('click', '.close', function(event){
    $( "#bigNav" ).animate({opacity: 0}, 500, function() {
      $( "#bigNav" ).css("display", "none");
    } );
  });



});