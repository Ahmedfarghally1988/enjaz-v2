
$(document).ready(function () { 

    initTabs();

    // accept cookies
    if (!$.cookie("acceptCookies")) {
        $(".cookiealert").addClass('show');
    }
    $('.acceptcookies').on("click", function () {
        $.cookie("acceptCookies", true, { path: '/' });
        $(".cookiealert").removeClass('show');
    });

    // footer-toggle
    $(".footer-toggle").on('click', function (e) {
        $(this).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
        $(this).parent().next().slideToggle();
        e.stopPropagation();
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
                menu.removeClass("page-header-menu-opened");
                toggler.removeClass("menu-toggler-opened");
            } else {
                menu.addClass("page-header-menu-opened");
                toggler.addClass("menu-toggler-opened");
            }

            if ($('body').hasClass('page-header-top-fixed')) {
                scrollTo();
            }
        }
    });

    // handle back to top 
    handleGoTop();
    


    // scrollable wizard heads
    $(".form-wizard .steps").addClass('draggable').wrap("<div class='draggable-container'></div>");
    $(".form-wizard .form-actions .btn").on('click', function () {
        setTimeout(function () {
            $(".draggable-container").scrollLeft(1 - ($(".form-wizard .draggable-container .active").index() * $(".form-wizard .draggable-container .active").width()));
        }, 100);
    });




    // jTable
    //$('.jtable-no-data-row').hide();// hide no data found at first time.

    $('input:visible:enabled').not('.fake,.hasCalendarPicker,[readonly="readonly"]').eq(0).focus();
    var $inp = $('input');
    $inp.bind('keydown', function (e) {
        //var key = (e.keyCode ? e.keyCode : e.charCode);
        var key = e.which;
        if (key == 13) {
            if ($("input:submit:first").length > 0) {
                if (GetIEVersion() == 0) {
                    $("input:submit:first").click();
                }
            }
            else if ($("input:button:first").length > 0) {
                $("input:button:first").click();
            }
        }
    });

    // print icon 
    $("#print_icon").on('click', function () {
        window.print();
        return false;
    });

    // form validation
    if ($('.validate').length > 0)
        $('.validate').validate();

    // Handle Select2 Dropdowns
    if ($().select2) {
        $('html.en .select2me').select2({
            placeholder: "Select",
            allowClear: true,
            minimumResultsForSearch:6
        });
        $('html.ar .select2me').select2({
            placeholder: "اختر",
            dir:'rtl',
            allowClear: true,
            minimumResultsForSearch:6
        });
    }
    if ($().valid) {
        $('.select2me').on('change', function () {
            $(this).valid();
        });
    }

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


    // add anti forgery token for all froms found in the page
    if ($("form input[name=__RequestVerificationToken]").length == 0) {
        $("input[name=__RequestVerificationToken]").appendTo("form");
    }

    // Since confModal is essentially a nested modal it's enforceFocus method
    // must be no-op'd or the following error results 
    // "Uncaught RangeError: Maximum call stack size exceeded"
    // But then when the nested modal is hidden we reset modal.enforceFocus
    var enforceModalFocusFn = $.fn.modal.Constructor.prototype.enforceFocus;

    $.fn.modal.Constructor.prototype.enforceFocus = function () { };







    // feedback range
    var sheet = document.createElement('style'),
        $rangeInput = $('.range input'),
        prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

    document.body.appendChild(sheet);

    var getTrackStyle = function (el) {
        var curVal = el.value,
            val = (curVal - 1) * 23.3333333338,
            style = '';

        // Set active label
        $('.range-labels li').removeClass('active selected');

        var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');

        curLabel.addClass('active selected');
        curLabel.prevAll().addClass('selected');

        $('.range').attr('class', '').addClass('range range-' + curVal);
        $('.feedback-icon').attr('class', '').addClass('feedback-icon feedback-icon-' + curVal);
        $('.feedback-textarea').attr('class', '').addClass('feedback-textarea feedback-textarea-' + curVal);
        return style;
    }

    $rangeInput.on('input', function () {
        sheet.textContent = getTrackStyle(this);
    });

    // Change input value on label click
    $('.range-labels li').on('click', function () {
        var index = $(this).index();

        $rangeInput.val(index + 1).trigger('input');

    });

});




function GetJTableRowsCount(jtable) {
    //return $(jtable + ' tbody tr').not('.jtable-no-data-row').length
    return $(jtable).find(".jtable-data-row").length;
}

function RemoveJTableRow(row) {
    row.closest('tr').remove();
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




function ShowMessage(title, message, color) {

    if (color == null) {
        color = "black";
    }
    color = color.toLowerCase();

    $("#dlgMessageTitle").text(title);
    $("#dlgMessageContent p").html(message);
    var cssClass = "";
    switch (color) {
        case color = 'red':
            cssClass = "note-danger";
            break;
        case color = 'green':
            cssClass = "note-success";
            break;
        case color = 'blue':
            cssClass = "note-info";
            break;
        default:            
            break;
    }
    $("#dlgMessageContent .note").addClass(cssClass).show();
    $("#dlgMessage").modal("show");
}



function initTabs() {
    // scrollable tabs head
    var tab_width = 0;
    $(".nav-tabs, .steps").not('.nav-tabs-nodrag').each(function () {
        tab_width = 0;
        $(this).find("li").each(function () {
            tab_width += $(this).width();
        });
        $(this).width(tab_width + 80);
        console.log(tab_width);
    });
}


/*
 * Bootstrap Cookie Alert by Wruczek
 * https://github.com/Wruczek/Bootstrap-Cookie-Alert
 * Released under MIT license
 */
(function () {
    "use strict";

    var cookieAlert = document.querySelector(".cookiealert");
    var acceptCookies = document.querySelector(".acceptcookies");

    if (!cookieAlert) {
        return;
    }

    cookieAlert.offsetHeight; // Force browser to trigger reflow (https://stackoverflow.com/a/39451131)

    // Show the alert if we cant find the "acceptCookies" cookie
    if (!getCookie("acceptCookies")) {
        cookieAlert.classList.add("show");
    }

    // When clicking on the agree button, create a 1 year
    // cookie to remember user's choice and close the banner
    acceptCookies.addEventListener("click", function () {
        setCookie("acceptCookies", true, 365);
        cookieAlert.classList.remove("show");

        // dispatch the accept event
        window.dispatchEvent(new Event("cookieAlertAccept"))
    });

    // Cookie functions from w3schools
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
})();
