// Glass window

// by Mexalim
// - ICQ 590881221
// - Email info@mexalim.com.ua

(function ($) {
    $(function () {
        var popwindow = $('.popwindow');
        var popbutton = $('.popbutton');
        $("body").prepend("<div class='mask'></div>");
        function preparewindow(windowobject) {
            var winwidth = windowobject.data("width");
            var winheight = windowobject.data("height");
            var winmargin = winwidth / 2;
            var wintitle = windowobject.data("title");

            windowobject.wrap("<div class='box_window'></div>");
            windowobject.addClass("box_window_in");
            windowobject.parent(".box_window").prepend("<div class='bw_close'>Закрыть</div>");

            windowobject.parent(".box_window").prepend("<div class='box_title'>" + wintitle + "</div>");
            windowobject.parent(".box_window").css({'width': winwidth, 'height': winheight, 'margin-left': '-' + winmargin})
            windowobject.css({'height': winheight})
        }
        if (popwindow.length) {
            preparewindow(popwindow);
            popbutton.click(function () {
                var idwind = $(this).data("window");
                $("#" + idwind).parent(".box_window").fadeIn().addClass("windactiv");
                $(".mask").fadeIn();
                $(".to_blur").addClass("blur");
            });
        }
        ;
        $(".mask, .bw_close").click(function () {
            $(".windactiv").fadeOut();
            $(".windactiv").removeClass("windactiv");
            $(".mask").fadeOut();
            $(".to_blur").removeClass("blur");
        });
    });
})(jQuery);



$('.special-offer-buy-form__select-model').on('change', function () {

    $('.special-offer-buy-form__select-complectation').prop('selectedIndex', 0);

    $('.special-offer-buy-form__select-complectation option').each(function () {
        $(this).hide();
    })

    $('.option-complectation-' + $('.special-offer-buy-form__select-model').val()).each(function () {
        $(this).show();
    })

});



jQuery(function ($) {
    $("#phone_test_drive").mask("+7 (999) 999-9999");
    $("#special-offer-buy-form__phone").mask("+7 (999) 999-9999");
    $("#recall-phone").mask("+7 (999) 999-9999");
    $("#trade-in-form__phone").mask("+7 (999) 999-9999");
});


var sourceHash = window.location.hash;

console.log(sourceHash);

var ex = document.referrer; //

//console.log(ex);

searchSource();

function searchSource(){
    
    $.ajax({
        url: '/files/landing/source.php',
        type: "POST",
        //async: false,
        cache: false,
        data: {
            ref: ex
        },
        success: function () {

            //$('#' + container).html('Сообщение отправлено!');

        }
    });
}

$('#sell-car-type').on('change', function () {
    if ($('#sell-car-type').val() == 'Утилизация' || $('#sell-car-type').val() == 'трейд-ин') {
        $('.trade-in-block-utilization').show('slow');
    } else {
        $('.trade-in-block-utilization').hide('slow');
    }
    ;
});



function requiredMail() {
    if ($('.required-phone').val().length === 17) {
        $('.required-mail').removeAttr('required');
    }
    ;
}
;



function scrollToAnchor(aid) {
    var aTag = $("a[name='" + aid + "']");
    $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
}



function sendgetbest(about, container) {

    if ($('#special-offer-buy-form__phone').val().length < 16 && $('#phone_test_drive').val().length < 16 && $('#recall-phone').val().length < 16) {

        alert('Телефон обязательное поле');

        //alert($('#trade-in-form__phone').val().length);
        return;
    }

    var uniq = "";

    uniq = uniqq();

    $.ajax({
        url: '/files/landing/mailspo.php',
        type: "POST",
        //async: false,
        cache: false,
        data: {
            sbj: typeOfRequest, //about
            name: $('#special-offer-buy-form__name').val() + ' ' + $('#name_test_drive').val(),
            vremya: $('#time_test_drive').val() + ' ' + $('#time_recall-phone').val(),
            phone: $('#special-offer-buy-form__phone').val() + ' ' + $('#phone_test_drive').val() + ' ' + $('#recall-phone').val(),
            email: $('#special-offer-buy-form__mail').val(),
            typeOfclient: $('input[name=Покупатель]:checked', '#special-offer-buy-form-popup').val(),
            buy: $('input[name="Способ покупки"]:checked', '#special-offer-buy-form-popup').val(),
            compl: $(".special-offer-buy-form__select-complectation_ option:selected").text(),
            first_vznos: $('input[name="Утилизация или трейд-ин"]:checked', '#special-offer-buy-form-popup').val(),
            office: $('input[name="Сервисный центр"]:checked', '#special-offer-buy-form-popup').val() + ' ' + $('input[name="Сервисный центр"]:checked', '#special-offer-test-drive-popup').val(),
            num_order: uniq
        },
        success: function (txt) {

            //$('#' + container).html('Сообщение отправлено!');

            alert('Ваша заявка успешно отправлена.' + "\n\n" + 'Номер ' + uniq);

            $(':input').val('');
        }
    });


}

function sendgetbest_main(about, container) { // sendUtilTradein

    if ($('#trade-in-form__phone').val().length < 16) {

        alert('Телефон обязательное поле');

        //alert($('#trade-in-form__phone').val().length);
        return;
    }

    var uniq = uniqq();


    $.ajax({
        url: '/files/landing/mailutil.php',
        type: "POST",
        //async: false,
        cache: false,
        data: {
            sbj: about,
            name: $('#trade-in-form__name').val(),
            phone: $('#trade-in-form__phone').val(),
            email: $('#trade-in-form__mail').val(),
            compl: $(".special-offer-buy-form__select-complectation_tradein option:selected").text(),
            ur_fiz: $('input[name=Покупатель]:checked', '.special-offer-buy-form').val(), //trade-in-form-physical 
            credit_cash: $('input[name="Способ покупки"]:checked', '.special-offer-buy-form').val(),
            typeSale: $("#sell-car-type option:selected").text(),
            avto: $('#trade-in-form__model-car').val() + ' ' + $('#trade-in-form__year-of-issue').val() + 'г., пробег ' + $('#trade-in-form__mileage').val(),
            description: $('#sell-car__description').val(),
            office: $('input[name=Автосалон]:checked', '.special-offer-buy-form').val(),
            num_order: uniq
        },
        success: function () {

            alert('Ваша заявка успешно отправлена.' + "\n\n" + 'Номер ' + uniq);

            $(':input').val('');
        }
    });


}

function uniqq() {

    var result = "";

    $.ajax({
        url: "/files/landing/uniq.php",
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}


/*
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.1
 */
!function (factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function ($) {
    var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
    $.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, $.fn.extend({
        caret: function (begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden"))
                return "number" == typeof begin ? (end = "number" == typeof end ? end : begin,
                        this.each(function () {
                            this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(),
                                    range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin),
                                    range.select());
                        })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(),
                        begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length),
                        {
                            begin: begin,
                            end: end
                        });
        },
        unmask: function () {
            return this.trigger("unmask");
        },
        mask: function (mask, settings) {
            var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
            if (!mask && this.length > 0) {
                input = $(this[0]);
                var fn = input.data($.mask.dataName);
                return fn ? fn() : void 0;
            }
            return settings = $.extend({
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length,
                    firstNonMaskPos = null, $.each(mask.split(""), function (i, c) {
                        "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])),
                                null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
                    }), this.trigger("unmask").each(function () {
                function tryFireCompleted() {
                    if (settings.completed) {
                        for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++)
                            if (tests[i] && buffer[i] === getPlaceholder(i))
                                return;
                        settings.completed.call(input);
                    }
                }
                function getPlaceholder(i) {
                    return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                }
                function seekNext(pos) {
                    for (; ++pos < len && !tests[pos]; )
                        ;
                    return pos;
                }
                function seekPrev(pos) {
                    for (; --pos >= 0 && !tests[pos]; )
                        ;
                    return pos;
                }
                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin, j = seekNext(end); len > i; i++)
                            if (tests[i]) {
                                if (!(len > j && tests[i].test(buffer[j])))
                                    break;
                                buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                            }
                        writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }
                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos, c = getPlaceholder(pos); len > i; i++)
                        if (tests[i]) {
                            if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t)))
                                break;
                            c = t;
                        }
                }
                function androidInputEvent() {
                    var curVal = input.val(), pos = input.caret();
                    if (oldVal && oldVal.length && oldVal.length > curVal.length) {
                        for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1]; )
                            pos.begin--;
                        if (0 === pos.begin)
                            for (; pos.begin < firstNonMaskPos && !tests[pos.begin]; )
                                pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    } else {
                        for (checkVal(!0); pos.begin < len && !tests[pos.begin]; )
                            pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    }
                    tryFireCompleted();
                }
                function blurEvent() {
                    checkVal(), input.val() != focusText && input.change();
                }
                function keydownEvent(e) {
                    if (!input.prop("readonly")) {
                        var pos, begin, end, k = e.which || e.keyCode;
                        oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(),
                                begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1),
                                        end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1),
                                e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText),
                                input.caret(0, checkVal()), e.preventDefault());
                    }
                }
                function keypressEvent(e) {
                    if (!input.prop("readonly")) {
                        var p, c, next, k = e.which || e.keyCode, pos = input.caret();
                        if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                            if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)),
                                    p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                                if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                    var proxy = function () {
                                        $.proxy($.fn.caret, input, next)();
                                    };
                                    setTimeout(proxy, 0);
                                } else
                                    input.caret(next);
                                pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                            }
                            e.preventDefault();
                        }
                    }
                }
                function clearBuffer(start, end) {
                    var i;
                    for (i = start; end > i && len > i; i++)
                        tests[i] && (buffer[i] = getPlaceholder(i));
                }
                function writeBuffer() {
                    input.val(buffer.join(""));
                }
                function checkVal(allow) {
                    var i, c, pos, test = input.val(), lastMatch = -1;
                    for (i = 0, pos = 0; len > i; i++)
                        if (tests[i]) {
                            for (buffer[i] = getPlaceholder(i); pos++ < test.length; )
                                if (c = test.charAt(pos - 1),
                                        tests[i].test(c)) {
                                    buffer[i] = c, lastMatch = i;
                                    break;
                                }
                            if (pos > test.length) {
                                clearBuffer(i + 1, len);
                                break;
                            }
                        } else
                            buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""),
                            clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))),
                            partialPosition ? i : firstNonMaskPos;
                }
                var input = $(this), buffer = $.map(mask.split(""), function (c, i) {
                    return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                }), defaultBuffer = buffer.join(""), focusText = input.val();
                input.data($.mask.dataName, function () {
                    return $.map(buffer, function (c, i) {
                        return tests[i] && c != getPlaceholder(i) ? c : null;
                    }).join("");
                }), input.one("unmask", function () {
                    input.off(".mask").removeData($.mask.dataName);
                }).on("focus.mask", function () {
                    if (!input.prop("readonly")) {
                        clearTimeout(caretTimeoutId);
                        var pos;
                        focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function () {
                            input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
                        }, 10);
                    }
                }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function () {
                    input.prop("readonly") || setTimeout(function () {
                        var pos = checkVal(!0);
                        input.caret(pos), tryFireCompleted();
                    }, 0);
                }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent),
                        checkVal();
            });
        }
    });
});

// start
var typeOfRequest;
//                                  0                               1                          2                    3                     4                                       
var typeOfOrder = new Array("Заявка на приобритение", "Заявка на Утилизацию/трейд-ин", "Заявка на кредит", "Запрос на тест-драйв", "Запрос звонка");
function  typeOfReq(req) {

    typeOfRequest = typeOfOrder[req];

    console.log(req);
}
// end

(function() {

    var hashHash = window.location.hash.substr(1);
    var complectationButton = document.querySelector('.btn-1');
    var utilizationButton = document.querySelector('.btn-span-6');
    var creditButton = document.querySelector('.btn-span-7');

    switch (hashHash) {

        case 'complectation':   

            function complectationClick() {
                complectationButton.click()
            }
            setTimeout(complectationClick, 500)

            break;

        case 'utilization':          

            function utilizationClick() {
                utilizationButton.click();
              }  
            setTimeout(utilizationClick, 500)

            break;

        case 'credit':       

            function creditClick() {
                creditButton.click();
            }     
            setTimeout(creditClick, 500)
            break;

        default:
            // statements_def
            break;
    }

})();

