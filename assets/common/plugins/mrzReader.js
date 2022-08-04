$(document).ready(function () {

    try {
        $('#btnRefreshCaptcha').click(function () {
            $('#Captcha').val('');
            $('#imgCaptcha').attr('src', function () {
                $('#imgCaptcha').attr('src', ROOT + '/Base/GetRandomCaptchaImage' + '?' + Math.random());
            });
        });
    }
    catch (e) { }

    //$("#tbMRZCode").bind("cut copy paste", function (e) {
    //    e.preventDefault();
    //});

    setTimeout(tbMRZCode_focus, 10);

    document.onkeydown = function (e) {
        var ev = e || window.event;
        if (ev.ctrlKey) {
            if (ev.preventDefault)
                ev.preventDefault();
            else
                ev.returnValue = false;
        }
    };

});

function tbMRZCode_onKeyUp(e) {
    var _key = e.keyCode || e.which;
    if (_key == 13 && $("#tbMRZCode").val().length >= 88) {
        MRZCode_data();
    }
}

function tbMRZCode_onKeyPress(e) {
    if ($("#tbMRZCode").val().length == 1) {
        setTimeout(tbMRZCod_clear, 3000);
    }
}

function tbMRZCode_focus() {
    var rbPassportChecked = false;
    var tbCaptchaFocus = false;

    try { rbPassportChecked = $("#rbReaderPassport").is(':checked'); } catch (e) { }
    try { if ($("#btnSubmit").attr('title') == '-') { rbPassportChecked = true; } } catch (e) { }
    try { if ($("#Captcha").attr('title') == 'on') { tbCaptchaFocus = true; } } catch (e) { }

    if (rbPassportChecked && !tbCaptchaFocus)
        $("#tbMRZCode").focus();

    setTimeout(tbMRZCode_focus, 10);
}

function tbMRZCod_clear() {
    var MRZCodeLength = $("#tbMRZCode").val().length;
    if (MRZCodeLength > 0 && MRZCodeLength < 60) {
        $("#tbMRZCode").val('');
    }
}

function MRZCode_data() {   
    var MRZCode = $("#tbMRZCode").val();
    $("#tbMRZCode").val('');
    
    var lines;
    var splitDone = false;
    while (splitDone == false) {
        if (MRZCode.indexOf('\n') > 0) {
            lines = MRZCode.split('\n');
            if (lines[0].length >= 88) {
                MRZCode = lines[0];
            }
            else
                splitDone = true;
        }
        else if (MRZCode.length >= 88) {
            lines = MRZCode.match(/(.{1,44})/g);
            splitDone = true;
        }
    }

    var issuer = lines[0].substr(2, 3);
    var names = lines[0].substr(5).split("<<");
    var lName = names[0].replace(new RegExp('<', 'g'), " ");
    var fName = '', middle1 = '', middle2 = '';
    if (names.length > 1) {
        names = names[1].split("<");
        for (var i = 0; i < names.length; i++) {
            if (names[i].length > 0) {
                if (fName.length > 0) {
                    if (middle1.length > 0) {
                        if (middle2.length <= 0)
                            middle2 = names[i];
                    }
                    else
                        middle1 = names[i];
                }
                else {
                    fName = names[i];
                }
            }
        }
    }
    var passportNo = lines[1].substr(0, 9).replace(new RegExp('<', 'g'), "");
    var nationality = lines[1].substr(10, 3);
    
    MRZCode_set(fName, lName, passportNo, nationality);
}