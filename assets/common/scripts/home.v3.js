jQuery(document).ready(function ($) {
    

    // accept cookies
    if (!$.cookie("acceptCookies")) {
        $(".cookiealert").addClass('show');
    }
    $('.acceptcookies').on("click", function () {
        $.cookie("acceptCookies", true, { path: '/' });
        $(".cookiealert").removeClass('show');
    });


	$(".nav-tabs a").on('click', function () {
        initTabs();
        setCardHeights();
    });
    // browse
    setCardHeights();
    $(".home-services .nav-tabs a:eq(2)").trigger('click');

    $(".home-services .nav-tabs a").on('click', function () {
        var cur_sel_ben = $(this).attr("data-ben");
        $(".home-services .nav-tabs .active").removeClass("active");
        $(this).parent().addClass("active");
        $("#homeparentstab_2 .home-cards-links li").show().not('[data-filter*="' + cur_sel_ben + '"]').hide();
        setCardHeights();
        return false;
    });

    // reset tabs after showing parent tab
    $("a[data-toggle='tab']").on('shown.bs.tab', function () {
        //$(".home-services .nav-tabs a:eq(2)").trigger('click');
        $(".home-services .tab-pane.active  .nav-tabs a:eq(0)").trigger('click');
        setCardHeights();
    });

    // switch to specific service tab in index 2
    if ($(".home-tabs-parents").length > 0) {
        $("#homeparentstab_" + getUrlVars()["service_type"] + "_link").trigger('click');
        $(".lang-ar .draggable-container.home-tabs-parents").scrollLeft(1 - ((getUrlVars()["service_type"] - 1) * 120));
        $(".lang-en .draggable-container.home-tabs-parents").scrollLeft(((getUrlVars()["service_type"] - 1) * 200));
    }

    // random bg image for homepage banner 
    $('.home-banner').addClass('home-banner-' + Math.floor(Math.random() * 5));



    // footer-toggle
    $(".footer-toggle").on('click', function () {
        $(this).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
        $(this).parent().next().slideToggle();
        return false;
    });
    // FAQ-toggle
    $(".faq-toggle").on('click', function () {
        $(this).toggleClass('active').find("i").toggleClass("fa-plus").toggleClass("fa-minus");
        $(this).next().slideToggle();
        return false;
    });
    // handle menu toggler icon click
    $(".page-header .menu-toggler").on("click", function (event) {
        if (getViewPort().width < getResponsiveBreakpoint('md')) {
            var menu = $(".page-header .page-header-menu-mobile");
            var toggler = $(".page-header .menu-toggler");
            if (menu.hasClass("page-header-menu-opened")) {
                //menu.slideUp(300);
                menu.removeClass("page-header-menu-opened");
                toggler.removeClass("menu-toggler-opened");
            } else {
                //menu.slideDown(300);
                menu.addClass("page-header-menu-opened");
                toggler.addClass("menu-toggler-opened");
            }

            if ($('body').hasClass('page-header-top-fixed')) {
                scrollTo();
            }
        }
    });

    // form validation
    if ($('.validate').length > 0)
        $('.validate').validate();


    // tooltips
    $('.tooltips').tooltip();


    // disable click on tooltip links
    $("a.tooltips[href=''],a.tooltips[href='#']").on('click', function (event) {
        if ($(this).data("target") === undefined) {
            event.stopPropagation();
            return false;
        }
    });

    // bootstrap nav dropdown on hover 
    $('ul.nav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });

    // smooth scroll
    $('a.scrollable').not('[href="#"]').not('[href="#0"]').click(function (t) { if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) { var e = $(this.hash); (e = e.length ? e : $("[name=" + this.hash.slice(1) + "]")).length && (t.preventDefault(), $("html, body").animate({ scrollTop: e.offset().top }, 1e3, function () { var t = $(e); if (t.focus(), t.is(":focus")) return !1; t.attr("tabindex", "-1"), t.focus() })) } });

    // go to top 
    handleGoTop();
	
});


function setHeight(col) {
    var $col = $(col);

    var $maxHeight = 0;
    $col.each(function () {
        $(this).height('auto');
        var $thisHeight = $(this).outerHeight();
        if ($thisHeight > $maxHeight) {
            $maxHeight = $thisHeight;
        }
    });
    $col.height($maxHeight);
}

function setCardHeights() {
    setHeight($('.home-cards-links:visible li .card-outer'));
}




function initTabs() {
    // scrollable tabs head
    var tab_width = 0;
    $(".nav-tabs, .steps").not('.nav-tabs-nodrag').each(function () {
        tab_width = 0;
        $(this).find("li").each(function () {
            tab_width += $(this).width();
        });
        $(this).width(tab_width + 160);
    });
}


function getViewPort() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }

    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
}


function scrollTo(el, offeset) {
    var pos = (el && el.size() > 0) ? el.offset().top : 0;

    if (el) {
        if ($('body').hasClass('page-header-fixed')) {
            pos = pos - $('.page-header').height();
        }
        pos = pos + (offeset ? offeset : -1 * el.height());
    }

    $('html,body').animate({
        scrollTop: pos
    }, 'slow');
}
function getResponsiveBreakpoint(size) {
    // bootstrap responsive breakpoints
    var sizes = {
        'xs': 480,     // extra small
        'sm': 768,     // small
        'md': 990,     // medium
        'lg': 1200     // large
    };
    
    return sizes[size] ? sizes[size] : 0;
}

function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 0; //It is not IE
}

// Handles the go to top button at the footer
var handleGoTop = function () {
    var offset = 100;
    var duration = 500;

    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
        $(window).bind("touchend touchcancel touchleave", function (e) {
            if ($(this).scrollTop() > offset) {
                $('.scroll-to-top').fadeIn(duration);
            } else {
                $('.scroll-to-top').fadeOut(duration);
            }
        });
    } else {  // general 
        $(window).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.scroll-to-top').fadeIn(duration);
            } else {
                $('.scroll-to-top').fadeOut(duration);
            }
        });
    }

    $('.scroll-to-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    });
};

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



// by mohannad abu sall
(function ($) {

    function implementNumeric(max) {

        $(this).numeric({
            allowPlus: false, // Allow the + sign
            allowMinus: false,  // Allow the - sign
            allowThouSep: false,  // Allow the thousands separator, default is the comma eg 12,000
            allowDecSep: false,  // Allow the decimal separator, default is the fullstop eg 3.141
            allowLeadingSpaces: false,
            maxDigits: max
        });
    }

    function implementArabicOnly(max) {

        $(this).alphanum({
            allowLatin: false,
            allowPlus: false, // Allow the + sign
            allowMinus: false,  // Allow the - sign
            allowThouSep: false,  // Allow the thousands separator, default is the comma eg 12,000
            allowDecSep: false,  // Allow the decimal separator, default is the fullstop eg 3.141
            allowLeadingSpaces: false,
            allowSpace: true, // Allow the space character
            allowUpper: true, // Allow Upper Case characters
            allowOtherCharSets: true,
            allowNumeric: false,
            maxLength: max
        });
    }

    function implementArabicOnlyWithNumbers(max) {

        $(this).alphanum({
            allowLatin: false,
            allowPlus: false, // Allow the + sign
            allowMinus: false,  // Allow the - sign
            allowThouSep: false,  // Allow the thousands separator, default is the comma eg 12,000
            allowDecSep: false,  // Allow the decimal separator, default is the fullstop eg 3.141
            allowLeadingSpaces: false,
            allowSpace: true, // Allow the space character
            allowUpper: true, // Allow Upper Case characters
            allowOtherCharSets: true,
            allowNumeric: true,
            maxLength: max
        });
    }

    function implementEnglishOnly(max) {

        $(this).alphanum({
            allowPlus: false, // Allow the + sign
            allowMinus: false,  // Allow the - sign
            allowThouSep: false,  // Allow the thousands separator, default is the comma eg 12,000
            allowDecSep: false,  // Allow the decimal separator, default is the fullstop eg 3.141
            allowLeadingSpaces: false,
            allowSpace: true, // Allow the space character
            allowUpper: true, // Allow Upper Case characters
            allowOtherCharSets: false,
            allowNumeric: false,
            maxLength: max
        });
    }
    function implementEmailOnly() {

        $(this).alphanum({
            allow: '.!@#$%^&*{}-_|~/+=',
            allowPlus: false, // Allow the + sign
            allowMinus: true,  // Allow the - sign
            allowThouSep: false,  // Allow the thousands separator, default is the comma eg 12,000
            allowDecSep: false,  // Allow the decimal separator, default is the fullstop eg 3.141
            allowLeadingSpaces: false,
            allowSpace: false, // Allow the space character
            allowUpper: true, // Allow Upper Case characters
            allowOtherCharSets: false,
            allowNumeric: true,
            maxLength: 50
        });
    }

    function implementExecludeSpecialChars(max) {

        $(this).alphanum({
            allowPlus: false, // Allow the + sign
            allowMinus: false,  // Allow the - sign
            allowThouSep: false,  // Allow the thousands separator, default is the comma eg 12,000
            allowDecSep: false,  // Allow the decimal separator, default is the fullstop eg 3.141
            allowLeadingSpaces: false,
            allowSpace: true, // Allow the space character
            allowUpper: true, // Allow Upper Case characters
            allowOtherCharSets: true,
            allowNumeric: true,
            maxLength: max
        });
    }

    $.fn.extend({
        Numeric: function (max) {
            implementNumeric.call(this, max);
        },

        ExecludeSpecialChars: function (max) {
            implementExecludeSpecialChars.call(this, max);
        },

        ArabicOnly: function (max) {
            implementArabicOnly.call(this, max);
        },
        ArabicOnlyWithNumbers: function (max) {
            implementArabicOnlyWithNumbers.call(this, max);
        },
        EnglishOnly: function (max) {
            implementEnglishOnly.call(this, max);
        },
        EmailOnly: function () {
            implementEmailOnly.call(this);
        }
    });

})(jQuery);


