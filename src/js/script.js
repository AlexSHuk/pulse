$(document).ready(function () {
  // slick-slider carousel
  $(".carousel__inner").slick({
    speed: 1200,
    prevArrow:
      '<button type="button" class="slick-prev"> <img src="icons/slider_arrow/prev_arrow.png">    </button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/slider_arrow/next_arrow.png"></button>',
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

  // tabs for catalog block
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  // buttons next&prev in catalog item
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  // Modal windows
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #success").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__subtitle").text(
        $(".catalog-item__subtitle").eq(i).text()
      );
      $(".overlay, #order").fadeIn("slow");
    });
  });
  // Validation form input
  function validateForms(form){
    $(form).validate({
      rules: {
        name:'required',
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages:{
        name: 'Введите имя',
        phone: 'Введите номер телефона',
        email:{
          required:'Введите адрес эл. почты ',
          email:'Неверно введен адрес почты'
        }
      }
    });
  }
  validateForms('#consultation-form');
  validateForms('#order form');
  validateForms('#consultation form');
// input mask
$('input[name=phone]').mask("+38 (999) 999-99-99");
// smooth scroll & pageUp
$(window).scroll(function(){
  if ($(this).scrollTop() >1600) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
})
$("a[href=#up]").click(function(){
  const _href = $(this).attr('href');
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
})
// send data from input to server
$('form').submit(function(e){
  e.preventDefault();

  if (!$(this).valid()){
    return;
  }

  //"try ... catch" construct , add a valid recipient
try{
  $.ajax({
  type: "POST",
  url:"../mailer/smart.php",
  data: $(this).serialize()
}).done(function(){
  $(this).find("input").val("");
  $('#consultation, #order').fadeOut();
  $('.overlay, #success').fadeIn('slow');

  $('form').trigger('reset');
});
} catch(e){
}  
$(this).find("input").val("");
$('#consultation, #order').fadeOut();
$('.overlay, #success').fadeIn('slow');
$('form').trigger('reset');
  return false; 
})

  new WOW().init();
});
