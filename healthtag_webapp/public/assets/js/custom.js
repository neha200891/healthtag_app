$(document).ready(function(){
    var lazyLoadInstance = new LazyLoad({elements_selector:"img.lazy, video.lazy, div.lazy, section.lazy, header.lazy, footer.lazy,iframe.lazy"});
    let bannerHeight = $(window).height();


    // window.addEventListener('scroll', function() {
    //   if (window.scrollY > 50) {
    //     $('#navbar').addClass('fixed-top');
    //     $('#navbar .navbar-brand img').attr('src',logo);

    //     navbar_height = document.querySelector('.navbar').offsetHeight;
    //     document.body.style.paddingTop = navbar_height + 'px';
    //   } else {
    //     $('#navbar').removeClass('fixed-top');
    //     document.body.style.paddingTop = '0';
        
    //     if($('#navbar').hasClass('dark')){
    //         $('#navbar .navbar-brand img').attr('src',logoWhite);
    //     } else {
    //         $('#navbar .navbar-brand img').attr('src',logo);
    //     }        
    //   } 
    // });


    $("#center").not('.slick-initialized').slick({
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots:false,
        prevArrow:'<i class="fa-sharp fa-solid fa-angle-left right-arrow arrow"></i>',
        nextArrow:'<i class="fa-sharp fa-solid fa-angle-right left-arrow arrow"></i>',
        responsive: [{
            breakpoint: 1200,
            settings: {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 5,
                slidesToScroll: 1,
               
            }
        },{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,      
            }
        }]
    });

    $("#logo-slider").not('.slick-initialized').slick({
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots:false,
        prevArrow:'<i class="fa-sharp fa-solid fa-angle-left right-arrow arrow"></i>',
        nextArrow:'<i class="fa-sharp fa-solid fa-angle-right left-arrow arrow"></i>',
        responsive: [{
            breakpoint: 1200,
            settings: {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 5,
                slidesToScroll: 1,
               
            }
        },{
            breakpoint: 1024,
            settings: {
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 992,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 576,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,      
            }
        }]
    
    });

    $("#service-slider").not('.slick-initialized').slick({
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        dots:false,
        prevArrow:'<i class="fa-sharp fa-solid fa-angle-left right-arrow arrow"></i>',
        nextArrow:'<i class="fa-sharp fa-solid fa-angle-right left-arrow arrow"></i>',
        responsive: [{
            breakpoint: 1200,
            settings: {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 5,
                slidesToScroll: 1,
               
            }
        },{
            breakpoint: 1024,
            settings: {
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 576,
            settings: {
                arrows: true,
                 arrows: true,
                slidesToShow: 2,
                slidesToScroll: 1,      
            }
        }]
    
    });

    $("#slider-for").not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '#slider-nav',
         responsive: [{
            breakpoint: 1200,
            settings: {
                centerMode: false,
                centerPadding: '0px',
                slidesToShow: 1,
                slidesToScroll: 1,
               
            }
        },{
            breakpoint: 1024,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 576,
            settings: {
                arrows: false,
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,      
            }
        }]
    });
    
    $("#slider-nav").not('.slick-initialized').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '#slider-for',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 3,
                slidesToScroll: 1,
               
            }
        },{
            breakpoint: 1024,
            settings: {
                arrows: false,
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 992,
            settings: {
                 arrows: false,
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },{
            breakpoint: 576,
            settings: {
                arrows: false,
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,      
            }
        }]
    });
    

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });
     
    // Product quantity add and remove js
    var input = $('.quantity'),
        minValue =  parseInt(input.attr('min')),
        maxValue =  parseInt(input.attr('max'));
        

    $('.plus').on('click', function () {
      var inputValue = input.val();
      if (inputValue < maxValue) {
        input.val(parseInt(inputValue) + 1);
      }
    });

    $('.minus').on('click', function () {
        var inputValue = input.val();
            if (inputValue < maxValue) {
          input.val(parseInt(inputValue) - 1);
        }
    });

    $("#add-new-address").click(function(){
        $("#fill-address-form").slideDown("slow");
    });

    $("#add-new-card").click(function(){
        $(".payment-method").slideDown("slow");

    });

    $("#open-order").click(function(){
        $("#table-section-hide").addClass('d-none');
        $("#order-history-show").removeClass('d-none');
    });

    $("#subscriptions-manage").click(function(){

        $("#manage-subscriptions-hide").addClass('d-none');
        $("#subscriptions-section-show").removeClass('d-none');
    });

});

   