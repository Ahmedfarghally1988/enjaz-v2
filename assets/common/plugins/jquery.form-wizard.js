// by mohannad abu sall
var FormWizardCallbackFnResult = false;
var FormWizard = function () {

    return {
        showTab: function (tabId, tabIdx) {
            $(tabId).bootstrapWizard('show', tabIdx);
        },

        populate: function (options) {

            var DEFAULT_SETTINGS = {
                // ajax call settings
                allowAjax: false,
                ajaxFireOnTab: null,
                ajaxUrl: '',
                ajaxParams: '',
                successAjaxCallbackFn: null,
                failureAjaxCallbackFn: null,
                // end ajax settings

                // client side event settings
                allowClientCall: false,
                clientCallFireOnTab: 1,
                clientCallbackFn: null,
                // end client side event settings

                // custom button
                customButtonClass: '',
                customButtonFireOnTab: null,
                customButtonCallbackFn: null,
                VisaKindId: null,
                Verify: false,
                // end custom button

                // normal settings
                formId: null,
                handleSubmit: true,
                submitCallbackFn: null,
                submitOnTab: null,
                hidePrevButtonOnLastStep: false,
                disableTabClick: true,
                ActiveStep: 0,
                // end normal settings
            };

            var _settings = $.extend(DEFAULT_SETTINGS, options);
            if (_settings.formId == null || _settings.formId == '') {
                throw "element form not present!";
            }

            if ($().bootstrapWizard) {
                var form = $(_settings.formId);
                if (form.length == 0 || form == null) {
                    throw "element form not present!";
                }

                var showHideButtons = function (tab, navigation, index) {
                    var i = navigation.find("li").length,
						idx = index + 1;

                    idx == 1 ? form.find(".button-home").show() : form.find(".button-home").hide();
                    idx == 1 ? form.find(".button-previous").hide() : form.find(".button-previous").show();

                    idx >= i ? (form.find(".button-next").hide(),
                              form.find(".button-submit").show(), null) :
                              (form.find(".button-next").show(), form.find(".button-submit").hide());

                    if (_settings.VisaKindId == 24) {//family
                        idx == 1 ? form.find(".button-Agree").show() : form.find(".button-Agree").hide();
                        idx == 1 ? form.find(".button-Disagree").show() : form.find(".button-Disagree").hide();
                        idx == 1 ? form.find(".button-next").hide() : form.find(".button-next").show();
                    }


                    if (_settings.submitOnTab == index) {
                        form.find(".button-next").hide();
                        form.find(".button-submit").show();
                    }

                    if (_settings.hidePrevButtonOnLastStep && index == i) {
                        form.find(".button-previous").hide();
                    }

                    if (_settings.customButtonFireOnTab == index) {
                        form.find(_settings.customButtonFireOnTab).show();
                    }
                };

                var handleOnShowTab = function (tab, navigation, index) {
                    var currentIdx = index + 1;

                    if (_settings.allowAjax) {
                        if (_settings.ajaxFireOnTab == currentIdx) {
                            $.ajax({
                                url: _settings.ajaxUrl,
                                type: "POST",
                                data: _settings.ajaxParams, //JSON.stringify({ kindId: 23, entryType: entryTypeVal }),
                                cache: false,
                                async: false,
                                datatype: "JSON",
                                contentType: 'application/json; charset=utf-8',
                                success: function (data) {
                                    if (_settings.successAjaxCallbackFn != null) {
                                        _settings.successAjaxCallbackFn(data);
                                    }
                                },
                                error: function (err) {
                                    if (_settings.failureAjaxCallbackFn != null) {
                                        _settings.failureAjaxCallbackFn(err);
                                    }
                                }
                            });
                        }
                    }

                    return true;
                };

                $(_settings.formId).bootstrapWizard({
                    nextSelector: ".button-next,.button-Agree",
                    previousSelector: ".button-previous",
                    onTabClick: function (tab, navigation, index) {
                        if (_settings.disableTabClick) {
                            return false;
                        }

                        return true;
                    },
                    onNext: function (tab, navigation, index) {
                        var formIsValid = false;
                        if (form.valid()) {
                            if (_settings.allowClientCall) {
                                if (_settings.clientCallFireOnTab == index) {
                                    if (_settings.clientCallbackFn != null) {
                                        _settings.clientCallbackFn();
                                        return FormWizardCallbackFnResult;
                                    }
                                }
                            }
                            formIsValid = true;
                        }

                        return formIsValid ? showHideButtons(tab, navigation, index) : false;
                    },
                    onPrevious: function (tab, navigation, index) {
                        showHideButtons(tab, navigation, index);
                    },
                    onTabShow: function (tab, navigation, index) {
                        if (!handleOnShowTab(tab, navigation, index)) {
                            return false;
                        }

                        // calculate progress
                        var i = navigation.find("li").length,
                            idx = index + 1,
                            percent = idx / i * 100;
                        $("#bar").find(".progress-bar").css({
                            width: percent + "%"
                        });
                    }
                });

                if (_settings.customButtonCallbackFn != null) {
                    form.find(_settings.customButtonClass).click(function () {
                        _settings.customButtonCallbackFn();
                    });
                }

                form.find(".button-submit").click(function () {
                    if (!_settings.handleSubmit && _settings.submitCallbackFn) {
                        _settings.submitCallbackFn(form);
                    }
                    else {
                        try {
                            if (_settings.Verify && $(this).attr("data-id") == "1") {
                                form.find("#WizardVerifyStep").val("true");
                            }
                        } catch (e) { }

                        form.submit();
                    }
                }).hide();

                if (_settings.ActiveStep > 0) {
                    form.bootstrapWizard('show', _settings.ActiveStep);
                    form.find(".button-previous").show();
                    if (_settings.submitOnTab == _settings.ActiveStep) {
                        form.find(".button-next").hide();
                        form.find(".button-submit").show();
                    }
                    else {
                        form.find(".button-next").show();
                    }
                }

                try {
                    if (_settings.VisaKindId == 24) {//family
                        _settings.ActiveStep == 0 ? form.find(".button-Agree").show() : form.find(".button-Agree").hide();
                        _settings.ActiveStep == 0 ? form.find(".button-Disagree").show() : form.find(".button-Disagree").hide();
                    }
                    _settings.ActiveStep == 0 ? form.find(".button-home").show() : form.find(".button-home").hide();
                } catch (e) { }
            }
            else {
                throw "bootstrapWizard plugin not installed!";
            }
        }
    }
}();