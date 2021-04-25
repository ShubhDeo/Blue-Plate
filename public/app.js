const tl = new TimelineMax();
const header = document.querySelector(".heading");
const page = document.querySelector(".banner");
const button = document.querySelector(".button");
const indicator = document.querySelector(".indicator");
const navbar = document.querySelector("nav");


tl.fromTo(navbar,1,{opacity:"0"},{opacity: "1", ease: Power2.easeInOut});
tl.fromTo(header,2,{opacity:"0"},{opacity: "1", ease: Power2.easeInOut},"-=1").fromTo(button,1,{opacity:"0"},{opacity: "1", ease: Power2.easeInOut},"-=1.5").fromTo(indicator,1,{opacity:"0"},{opacity: "1", ease: Power2.easeInOut},"-=1.5");
;

$('.nav-link').click(function() {
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
     scrollTop: $(sectionTo).offset().top
    }, 1500);
});

$('#indicator').click(function() {
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
     scrollTop: $(sectionTo).offset().top
   }, 1000);
});
