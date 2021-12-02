// js Document

    // Created on : 05/12/2018. 
    // Description: cryto - Bitcoin & Cryptocurrency Landing Page HTML Template.
    // Version    : 1.0.
    // Author     : @creativegigs.


(function($) {
    "use strict";
    
    
    $(document).on ('ready', function (){
        
        // -------------------- Navigation Scroll
        $(window).on('scroll', function (){   
          var sticky = $('.theme-main-menu'),
          scroll = $(window).scrollTop();
          if (scroll >= 100) sticky.addClass('fixed');
          else sticky.removeClass('fixed');

        });



        // ------------------------- Add OnepageNav
        if($('body').length){
          // Smooth scrolling using jQuery easing
          $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click',function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
              }
            }
          });

          // Closes responsive menu when a scroll trigger link is clicked
          $('.js-scroll-trigger').on('click',function() {
            $('.navbar-collapse').collapse('hide');
          });

          // Activate scrollspy to add active class to navbar items on scroll
          $('body').scrollspy({
            target: '#mega-menu-holder',
            offset: 100
          });
        }

        // ------------------------------ Video Blog 
          var embed = $ (".embed-video");
            if (embed.length) {
              embed.fitVids();
            }


        // ------------------------ Market Rate Slider
        var mSlider = $ ("#market-rate");
        if(mSlider.length) {
            mSlider.owlCarousel({
              loop:true,
              nav:false,
              dots:false,
              margin:30,
              autoplay:true,
              autoplayTimeout:1000,
              smartSpeed:1200,
              autoplayHoverPause:true,
              lazyLoad:true,
              responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:2
                    },
                    992:{
                        items:3
                    },
                    1300:{
                        items:4,
                    }
                },
          })
        }



        // ------------------------------- Testimonial Slider
        var tSlider = $ (".testimonial-slider");
        if(tSlider.length) {
            tSlider.owlCarousel({
              loop:true,
              nav:false,
              dots:true,
              autoplay:true,
              margin:30,
              autoplayTimeout:4000,
              smartSpeed:1200,
              autoplayHoverPause:true,
              lazyLoad:true,
              responsive:{
                    0:{
                        items:1
                    },
                    500:{
                        items:1
                    },
                    992:{
                        items:2
                    }
                },
          })
        }


        // ------------------------------- Testimonial Slider
        var tSlider = $ (".testimonial-slider-two");
        if(tSlider.length) {
            tSlider.owlCarousel({
              loop:true,
              nav:false,
              dots:true,
              autoplay:true,
              margin:30,
              autoplayTimeout:4000,
              smartSpeed:1200,
              autoplayHoverPause:true,
              lazyLoad:true,
              responsive:{
                    0:{
                        items:1
                    },
                    992:{
                        items:2
                    },
                    1530:{
                        items:3
                    }
                },
          })
        }


        // ------------------------------- Partner Slider
        var pSlider = $ (".partner-slider");
        if(pSlider.length) {
            pSlider.owlCarousel({
              loop:true,
              nav:false,
              dots:false,
              autoplay:true,
              autoplayTimeout:4000,
              smartSpeed:1200,
              autoplayHoverPause:true,
              lazyLoad:true,
              responsive:{
                    0:{
                        items:2
                    },
                    768:{
                        items:3
                    },
                    992:{
                        items:4
                    },
                    1200:{
                        items:5
                    }
                },
          })
        }


        // ------------------------------- Work Progress Slider
        var pSlider = $ (".progress-slider");
        if(pSlider.length) {
            pSlider.owlCarousel({
              loop:true,
              nav:false,
              dots:false,
              autoplay:true,
              margin:30,
              autoplayTimeout:4000,
              smartSpeed:1200,
              autoplayHoverPause:true,
              lazyLoad:true,
              responsive:{
                    0:{
                        items:1
                    },
                    576:{
                        items:2
                    },
                    1550:{
                        items:3
                    }
                },
          })
        }


        // ------------------------- Road Map
        var timeline = $('#timeline-frame');
        if(timeline.length) {
            
            var events = [
            {
              date: 'Apr 10, 2018',
              content: '<p>Development <br> Started</p>'
            },
            {
              date: 'Jun 14, 2018',
              content: '<p>Pre-ICO Opens</p>'
            },
            {
              date: 'Jul 24, 2018',
              content: '<p>Private Token <br> Round</p>'
            },
            {
              date: 'Sep 14, 2018',
              content: '<p>Pre-ICO <br> Closed</p>'
            },
            {
                date: 'Dec 24, 2018',
                content: '<p>Decentralized <br> Platform Launch</p>'
            },
            {
                date: 'Jan 15, 2019',
                content: '<p>App Integration <br> Process</p>'
            },
            {
                date: 'Q4 - 2019',
                content: '<p>Development Started</p>'
            },
            {
                date: 'Q1 - 2020',
                content: '<p>Development Started</p>'
            },
            {
                date: 'Q2 - 2020',
                content: '<p>Development Started</p>'
            },
            {
                date: 'Q3 - 2020',
                content: '<p>Development Started</p>'
            },
            {
                date: 'Q4 - 2020',
                content: '<p>Development Started</p>'
            },
            {
              date: 'Q1 - 2021',
              content: '<p>Development Started</p>'
            },
            {
              date: 'Q2 - 2021',
              content: '<p>Development Started</p>'
            },
            {
              date: 'Q3 - 2021',
              content: '<p>Development Started</p>'
            },
            {
              date: 'Q4 - 2021',
              content: '<p>Development Started</p>'
            }
          ];

            timeline.roadmap(events, {
                eventsPerSlide: 6,
                slide: 1,
                prevArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                nextArrow: '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            });
        }




        
        // -------------------- Remove Placeholder When Focus Or Click
        $("input,textarea").each( function(){
            $(this).data('holder',$(this).attr('placeholder'));
            $(this).on('focusin', function() {
                $(this).attr('placeholder','');
            });
            $(this).on('focusout', function() {
                $(this).attr('placeholder',$(this).data('holder'));
            });     
        });
        
        // -------------------- From Bottom to Top Button
            //Check to see if the window is top if not then display button
        $(window).on('scroll', function (){
          if ($(this).scrollTop() > 200) {
            $('.scroll-top').fadeIn();
          } else {
            $('.scroll-top').fadeOut();
          }
        });
            //Click event to scroll to top
        $('.scroll-top').on('click', function() {
          $('html, body').animate({scrollTop : 0},1500);
          return false;
        });




        // ----------------------------- Counter Function
        var timer = $('.timer');
        if(timer.length) {
            timer.appear(function () {
              timer.countTo();
          });
        }

        // ------------------------------------- Fancybox
        var fancy = $ (".fancybox");
        if(fancy.length) {
          fancy.fancybox({
            arrows: true,
            animationEffect: "zoom-in-out",
            transitionEffect: "zoom-in-out",
          });
        }


         // ------------------------------ Language Switcher
         var plang = $('#polyglotLanguageSwitcher');
         if (plang.length) {
              plang.polyglotLanguageSwitcher({
                effect: 'fade',
                        testMode: true,
                        onChange: function(evt){
                            alert("The selected language is: "+evt.selectedItem);
                        }
                      //      ,afterLoad: function(evt){
                      //          alert("The selected language has been loaded");
                      //      },
                      //      beforeOpen: function(evt){
                      //          alert("before open");
                      //      },
                      //      afterOpen: function(evt){
                      //          alert("after open");
                      //      },
                      //      beforeClose: function(evt){
                      //          alert("before close");
                      //      },
                      //      afterClose: function(evt){
                      //          alert("after close");
                      //      }
              });
          };







          // ---------------------------------- Validation Alert
          var closeButton = $ (".closeAlert");
            if(closeButton.length) {
                closeButton.on('click', function(){
                  $(".alert-wrapper").fadeOut();
                });
                closeButton.on('click', function(){
                  $(".alert-wrapper").fadeOut();
                })
            };


            // ------------------------------- Related Blog Slider
            var tSlider = $ (".related-blog-slider");
            if(tSlider.length) {
                tSlider.owlCarousel({
                  loop:true,
                  nav:false,
                  dots:false,
                  autoplay:true,
                  autoplayTimeout:4000,
                  autoplayHoverPause:true,
                  smartSpeed:1100,
                  lazyLoad:true,
                  responsive:{
                        0:{
                            items:1
                        },
                        500:{
                            items:2
                        },
                        992:{
                            items:3
                        }
                    },
              })
            };


            // -------------------------------- Accordion Panel
            if ($('.theme-accordion > .panel').length) {
              $('.theme-accordion > .panel').on('show.bs.collapse', function (e) {
                    var heading = $(this).find('.panel-heading');
                    heading.addClass("active-panel");
                    
              });
              $('.theme-accordion > .panel').on('hidden.bs.collapse', function (e) {
                  var heading = $(this).find('.panel-heading');
                    heading.removeClass("active-panel");
                    //setProgressBar(heading.get(0).id);
              });
              $('.panel-heading a').on('click',function(e){
                  if($(this).parents('.panel').children('.panel-collapse').hasClass('in')){
                      e.stopPropagation();
                  }
              });
            };


        
    });

    
    $(window).on ('load', function (){ // makes sure the whole site is loaded

        // -------------------- Site Preloader
        $('#loader').fadeOut(); // will first fade out the loading animation
        $('#loader-wrapper').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({'overflow':'visible'});


        // ------------------------------- AOS Animation 
        AOS.init({
          duration: 1000,
          mirror: true
        });



    })
    
})(jQuery)