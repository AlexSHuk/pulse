// slick-slider carousel

$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    prevArrow:
      '<button type="button" class="slick-prev"> <img src="../icons/slider_arrow/prev_arrow.png">    </button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../icons/slider_arrow/next_arrow.png"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
          dotsClass: "slick-dots",
        },
      },
    ],
  });
});
