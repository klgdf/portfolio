import __CONFIG_GLOBAL from '../../../../site.config.json'; // глобальный файл конфигурации сайта
import __FORMS_GLOBAL from './json/forms.json'; // статичные элементы для форм + переводы
import { definesLanguage } from './global'; // хук для определения языка
import CryptoJS from 'crypto-js'; // билеотека для SHA256 шифрования

/**
 * Функция для открытия модального окна обратной связи
 */
(function openCallbackForm(formId = '#callback') {
    if ($('.callback-open-js').length) {
        $('.callback-open-js').magnificPopup({
            items: {
                src: formId,
                type: 'inline'
            },
            callbacks: {
                close: () => $(`${formId}Form`).trigger('reset'),
            }
            // mainClass: "callback-modal"
        });
    }
})();

/**
 * Функция для открытия модального окна об успешной отправлении формы обратной связи
 */
(function showSuccesText() {
    $(document).on('form_submitted', function(e, data) {
        // в data хранится ответ
        $('form').find('input').val('');
        $.magnificPopup.close();
        $.magnificPopup.open({
            items: {
                src: '.saccess-popup'
            },
            type: 'inline'
        }, 0);
    });

    $(document).on('form_error', function(e, data) {
        // в data хранится ответ
        // console.log(data);
    });
})();

/**
 * Валидация формы обратной связи
 */
if( $('#callbackForm').length )
{
    let formLang = definesLanguage();

    $('#callbackForm').validate({
		rules: {
            first_name: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            last_name: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            phone_number: {
                required: true,
                minlength: 7,
                maxlength: 50
            },
            email: {
                required: true,
                email: true,
                newEmailRules: true
            },
            language: {
                required: true,
            },
            agreement: {
                required: true,
            }
		},
		messages: {
            first_name: {
                required: __FORMS_GLOBAL.callback.requiredText[formLang],
                minlength: __FORMS_GLOBAL.callback.minlength_2[formLang],
                maxlength: __FORMS_GLOBAL.callback.maxlength_30[formLang]
            },
            last_name: {
                required: __FORMS_GLOBAL.callback.requiredText[formLang],
                minlength: __FORMS_GLOBAL.callback.minlength_2[formLang],
                maxlength: __FORMS_GLOBAL.callback.maxlength_30[formLang]
            },
            phone_number: {
                required: __FORMS_GLOBAL.callback.requiredText[formLang],
                minlength: __FORMS_GLOBAL.callback.minlength_7[formLang],
                maxlength: __FORMS_GLOBAL.callback.maxlength_50[formLang]
            },
            email: {
                required: __FORMS_GLOBAL.callback.requiredText[formLang],
                email: __FORMS_GLOBAL.callback.emailText[formLang],
                newEmailRules: __FORMS_GLOBAL.callback.emailText[formLang]
            },
            language: {
                required: __FORMS_GLOBAL.callback.requiredText[formLang],
            },
            agreement: {
                required: __FORMS_GLOBAL.callback.requiredText[formLang],
            }
		}
    });
}

/**
 * Объявление переменных для форм авторизаций
 */
if ( $('.form-wrapper').length ) {
        // хосты для запросов
    var hosts = {
            web: {
                host: 'https://trade.' + __CONFIG_GLOBAL.companyData.domain + ':8884/web',
                type: 'dispatchregister'
            },
            createacc: {
                host: 'https://trade.' + __CONFIG_GLOBAL.companyData.domain + ':8892/api/',
            },
            auth2: {
                host: 'https://trade.' + __CONFIG_GLOBAL.companyData.domain + '/#/?key=',
                endhost: '#/auth',
            },
        },
        sendType = 'POST',
        contentType = 'application/json; charset=utf-8',
        // все возможные типы полей, которые принимает API (id - это уникальный идентификато id поля в форме!!!!)
        field = [
            { id: 'submit-name', name: 'FirstName', required: 'true', default: '' },
            { id: 'submit-lastname', name: 'LastName', required: 'true', default: '' },
            { id: 'submit-email', name: 'Email', required: 'true', default: '' },
            { id: 'submit-pass-show', name: 'Password', required: 'true', default: '' },
            { id: 'submit-phone', name: 'PhoneNumber', required: 'true', default: '' },
            { id: 'submit-promo', name: 'PromoCode', required: 'false', default: '' },
            { id: '', name: 'AffiliateCode', required: 'false', default: '' },
            { id: '', name: 'PartnerLink', required: 'false', default: '' },
            { id: '', name: 'Key', required: 'false', default: CryptoJS.SHA256(__CONFIG_GLOBAL.javascript.forms.sha).toString() },
            { id: '', name: 'Language', required: 'false', default: __CONFIG_GLOBAL.defaultLanguage },
            { id: 'submit-email', name: 'Login', required: 'false', default: '' },
            { id: '', name: 'ConfirmUrl', required: 'false', default: '' },
            { id: '', name: 'CreateAutoLoginUrl', required: 'false', default: true },
            { id: '', name: 'SubscribeMails', required: 'false', default: 1 },
            { id: 'submit-name', name: 'MiddleName', required: 'false', default: '' }
        ],
        fieldAuth = [
            { id: 'auth-code', name: 'Code', required: 'false', default: '' },
            { id: '', name: 'Key', required: 'false', default: CryptoJS.SHA256(__CONFIG_GLOBAL.javascript.forms.sha).toString() },
            { id: 'submit-email', name: 'Login', required: 'true', default: '' },
            { id: 'submit-pass-show', name: 'Password', required: 'true', default: '' },
            { id: '', name: 'PasswordHashed', required: 'false', default: true },
            { id: '', name: 'TwoFAToken', required: 'false', default: null }
        ],
        fieldResetPassword = [
            { id: '', name: 'Key', required: 'false', default: CryptoJS.SHA256(__CONFIG_GLOBAL.javascript.forms.sha).toString() },
            { id: 'submit-email', name: 'Login', required: 'true', default: '' }
        ],
        // используемые методы для регистрации, авторизации и восстановления пароля в глобальном файле конфигурации
        methods = __CONFIG_GLOBAL.javascript.forms.methods,
        mainHostMethods,
        submitData = {},
        authData = {},
        resetData = {},
        info = __FORMS_GLOBAL.info,
        currentLanguge = definesLanguage(),
        errorText = __FORMS_GLOBAL.errorText,
        openTwoauthstepPopupFlag = false;

    /**
     * Валидация формы авторизации. Правила (rules) привязываются к значению атрибута "name"
     */
    $('#enter-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
                newEmailRules: true
            },
            password: {
                required: true,
                // excludingRussian: true
            }
        },
        messages: {
            email: {
                email: errorText.emailText[currentLanguge],
                newEmailRules: errorText.emailText[currentLanguge]
            },
        }
    });

    /**
     * Валидация формы восстановление пароля. Правила (rules) привязываются к значению атрибута "name"
     */
    $('#restore-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
                newEmailRules: true
            },
        },
        messages: {
            email: {
                email: errorText.emailText[currentLanguge],
                newEmailRules: errorText.emailText[currentLanguge]
            },
        }
    });

    /**
     * Валидация формы регистрации. Правила (rules) привязываются к значению атрибута "name"
     */
    $('#form-signup').validate({
        rules: {
            first_name: {
                required: true,
                excludingRussian: true,
                minlength: 2,
                maxlength: 30
            },
            last_name: {
                required: true,
                excludingRussian: true,
                minlength: 2,
                maxlength: 40
            },
            email: {
                required: true,
                email: true,
                newEmailRules: true
            },
            phone_number: {
                required: true,
                minlength: 7,
                maxlength: 50
            },
            password: {
                required: true,
                // excludingRussian: true,
                minlength: 8,
                newPasswordRules: true,
            },
            confirm_password: {
                required: true,
                // excludingRussian: true,
                newPasswordRules: true,
                equalTo: "#submit-pass-show"
            },
            user_agreement: "required",
            refund_cancellation: "required"
        },
        messages: {
            first_name: {
                minlength: errorText.minlength_2[currentLanguge],
                maxlength: errorText.maxlength_30[currentLanguge]
            },
            last_name: {
                minlength: errorText.minlength_2[currentLanguge],
                maxlength: errorText.maxlength_40[currentLanguge]
            },
            email: {
                email: errorText.emailText[currentLanguge],
                newEmailRules: errorText.emailText[currentLanguge]
            },
            phone_number: {
                minlength: errorText.minlength_7[currentLanguge],
                maxlength: errorText.maxlength_50[currentLanguge],
            },
            password: {
                minlength: errorText.minlength_8[currentLanguge],
                equalTo: errorText.equalToText[currentLanguge],
            },
            confirm_password: {
                minlength: errorText.minlength_8[currentLanguge],
                equalTo: errorText.equalToText[currentLanguge],
            }
        }
    });

    /**
     * Валидация формы двухэтапной авторизации. Правила (rules) привязываются к значению атрибута "name"
     */
    $('#twoauthstep-form').validate({
        rules: {
            code: {
                required: true,
            }
        }
    });

    /**
     * Событие на кнопке регистрации
     */
    $('.js--submit-form').unbind('click').click(function(e) {
        e.preventDefault();
        // если все поля валидированы, то отправляем запрос
        if ($("#form-signup").valid()) {
            sumbitform(this);
        } else {
            $('form-item_input.error').focus();
        }
    });

    /**
     * Событие на кнопке двухэтапной авторизации
     */
    $('.js--send-authcode').unbind('click').click(function(e) {
        e.preventDefault();
        // если все поля валидированы, то отправляем запрос
        if ($("#twoauthstep-form").valid()) {
            loginform(this);
        } else {
            $('form-item_input.error').focus();
        }
    });

    /**
     * Событие на кнопке авторизации
     */
    $('.js--login-form').unbind('click').click(function(e) {
        e.preventDefault();
        // если все поля валидированы, то отправляем запрос
        if ($("#enter-form").valid()) {
            loginform(this);
        } else {
            $('form-item_input.error').focus();
        }

    });

    /**
     * Событие на кнопке восстановления пароля
     */
    $('.js--repass').unbind('click').click(function(e) {
        e.preventDefault();
        // если все поля валидированы, то отправляем запрос
        if ($("#restore-form").valid()) {
            repass(this);
        } else {
            $('form-item_input.error').focus();
        }

    });

    /**
    * Основная фукнция восстановления пароля
    */
    function repass(el) {
        // массив для полуения токена
        for (var i = 0; i < fieldResetPassword.length; i++) {
            if (fieldResetPassword[i].id != '') {
                if (fieldResetPassword[i].required == 'true' && $('#' + fieldResetPassword[i].id).val() == '') {
                    // события ошибок, добавить классы к полям и уведомить пользователя
                    $('#' + fieldResetPassword[i].id).closest('.group-input').addClass('error');
                    break;
                } else {
                    resetData[fieldResetPassword[i].name] = $('#' + fieldResetPassword[i].id).val();
                }
            } else {
                resetData[fieldResetPassword[i].name] = fieldResetPassword[i].default;
            }
        }
        mainHostMethods = hosts.createacc.host;
        $.ajax({
            url: mainHostMethods + methods.reset,
            type: sendType,
            data: JSON.stringify(resetData),
            contentType: contentType,
            success: function(data) {
                if (data.Error != null) {
                    if (data.Error == '1101') {
                        infomessage('errorUserNotFound');
                    } else {
                        infomessage('errorGlobal');
                    }
                } else {
                    infomessage('successRepass', 'succesRepass');
                    // чистим поля после восстановления
                    fieldResetPassword.forEach( (fieldreset) => {
                        $('#' + fieldreset.id).val('');
                    })
                }
            },
            error: function() {
                infomessage('errorGlobal');
            }
        });
    };

    /**
    * Основная фукнция авторизации
    */
    function loginform(el) {
        // массив для полуения токена
        for (var i = 0; i < fieldAuth.length; i++) {
            if (fieldAuth[i].id != '') {
                if (fieldAuth[i].required == 'true' && $('#' + fieldAuth[i].id).val() == '') {
                    // события ошибок, добавить классы к полям и уведомить пользователя
                    $('#' + fieldAuth[i].id).closest('.group-input').addClass('error');
                    break;
                } else {
                    authData[fieldAuth[i].name] = $('#' + fieldAuth[i].id).val();
                }
            } else {
                authData[fieldAuth[i].name] = fieldAuth[i].default;
            }
        }
        // md5 пароль пользователя для авторизации
        authData.Password = CryptoJS.MD5(authData.Password).toString();

        mainHostMethods = hosts.createacc.host;
        $.ajax({
            url: mainHostMethods + methods.createtoken,
            type: sendType,
            data: JSON.stringify(authData),
            contentType: contentType,
            success: function(data) {
                try {
                    if (data.Error != null) {
                        // всплывающее окно о ошибке
                        // коды ошибок?
                        if (data.Error == '1801') {
                            // двух этапная авторизация
                            // показываем диалоговое окно с полем #auth-code

                            if (openTwoauthstepPopupFlag == true) {
                                showTwoauthstepMessage();
                            } else {
                                openTwoauthstepPopup();
                            }
                        } else if (data.Error == '1101' || data.Error == '1800') {
                            infomessage('errorPassword');
                        } else {
                            // ошибка
                            infomessage('errorGlobal');
                        }
                    } else {
                        // чистим поля после восстановления
                        fieldAuth.forEach( (fieldauths) =>{
                            if (fieldauths.id != '') {
                                $('#' + fieldauths.id).val('');
                            }
                        });
                        // запускам редирект на платформу
                        var two_fa_token = '';

                        if (data.Result.TwoFAToken) {
                            two_fa_token = '&two_fa_token=' + data.Result.TwoFAToken.toString();
                        }

                        window.location.href = hosts.auth2.host + data.Result.AccessToken.toString() + two_fa_token;
                    }
                } catch (e) {
                    // ошибка обработки ответа
                    infomessage('errorGlobal');
                }
            },
            error: function() {
                infomessage('errorGlobal');
            }
        });
    };

    /**
    * Основная фукнция регистрации
    */
    function sumbitform(el) {
        for (var i = 0; i < field.length; i++) {
            if (field[i].id != '') {
                if (field[i].required == 'true' && $('#' + field[i].id).val() == '') {
                    // события ошибок, добавить классы к полям и уведомить пользователя
                    $('#' + field[i].id).closest('.group-input').addClass('error');
                    infomessage('errorInput');
                    break;
                } else {
                    submitData[field[i].name] = $('#' + field[i].id).val();
                }
            } else {
                submitData[field[i].name] = field[i].default;
            }
        }
        // массив для полуения токена
        for (var i = 0; i < fieldAuth.length; i++) {
            if (fieldAuth[i].id != '') {
                if (fieldAuth[i].required == 'true' && $('#' + fieldAuth[i].id).val() == '') {
                    // события ошибок, добавить классы к полям и уведомить пользователя
                    $('#' + fieldAuth[i].id).closest('.group-input').addClass('error');
                    break;
                } else {
                    authData[fieldAuth[i].name] = $('#' + fieldAuth[i].id).val();
                }
            } else {
                authData[fieldAuth[i].name] = fieldAuth[i].default;
            }
        }
        // md5 пароль пользователя для авторизации
        authData.Password = CryptoJS.MD5(authData.Password).toString();

        mainHostMethods = hosts.createacc.host;
        $.ajax({
            url: mainHostMethods + methods.createacc,
            type: sendType,
            data: JSON.stringify(submitData),
            contentType: contentType,
            success: function(data) {
                try {
                    if (data.Error != null) {
                        if (data.Error == "1102") {
                            infomessage('errorUserExist');
                        } else if (data.Error == "1105") {
                            infomessage('errorPhoneExist');
                        } else {
                            // всплывающее окно о ошибке
                            // коды ошибок?
                            infomessage('errorGlobal');
                        }
                    } else {
                        // успешная регистрация
                        if (data.Result.RegistrationTime == 0) {
                            // запуск авторизации
                            // authData.Result.UserId - id пользователя
                            // authData.Result.AutoLoginUrl - ссылка автологина
                            $.ajax({
                                url: mainHostMethods + methods.createtoken,
                                type: sendType,
                                contentType: contentType,
                                data: JSON.stringify(authData),
                                success: function(data) {
                                    try {
                                        if (data.Error != null) {
                                            // всплывающее окно о ошибке
                                            // коды ошибок?
                                            infomessage('errorGlobal');
                                        } else {
                                            // запускам редирект на платформу
                                            window.location.href = hosts.auth2.host + data.Result.AccessToken.toString() + hosts.auth2.endhost;
                                        }
                                    } catch (e) {
                                        // ошибка обработки ответа
                                        console.log(e);
                                        infomessage('errorGlobal');
                                    }
                                },
                                error: function() {
                                    infomessage('errorGlobal');
                                }
                            });
                        } else {
                            // сообщение о том что пользователь встал на очередь регистрации и скоро будет зарегестрирован, пусь подождет какое то время
                            // authData.Result.RegistrationTime - указывает сколько времени надо ждать
                            infomessage('errorSubmitTime');
                        }
                    }
                } catch (e) {
                    // ошибка обработки ответа
                    console.log(e);
                    infomessage('errorGlobal');
                }
            },
            error: function() {
                infomessage('errorGlobal');
            }
        });
    };

    /**
    * Основная фукнция открытия диологово окна о сообщение с упехом или не успехом выполнения выше указанных функций
    */
    function infomessage(mess, classAdditional) {
        var lang = definesLanguage();
        $.magnificPopup.open({
            items: {
                src: '#information-popup'
            },
            type: 'inline',
            mainClass: classAdditional !== undefined ? classAdditional : "",
            callbacks: {
                open: function() {
                    $('.js-text').html(info[lang][mess]);

                },
            }

        }, 0);
    };

    /**
    * Открытия формы двух этапной авторизации
    */
    function openTwoauthstepPopup() {
        openTwoauthstepPopupFlag = true;
        $.magnificPopup.open({
            items: {
                src: '#twoauthstep-popup'
            },
            type: 'inline',
            callbacks: {
                close: function() {
                    openTwoauthstepPopupFlag = false;
                }
            }
        });
    }

    /**
    * Открытия модального окна о двух этапной авторизации
    */
    function showTwoauthstepMessage() {
        $('#auth-code').addClass('error');
        $('#auth-code').after('<label class="error" id="auth-code-error" class="error" for="auth-code" style="">' + errorText.openTwoauthstepPopupRules[currentLanguge] + '</label>');

        setTimeout(function() {
            if ($('#auth-code-error').html() == errorText.openTwoauthstepPopupRules[currentLanguge]) {
                $('#auth-code').removeClass('error');
                $('#auth-code-error').detach();
            }
        }, 2700);
    }

    /**
    * Переопределяем сообщение по умолчанию-
    */
    $.extend($.validator.messages, {
        required: errorText.requiredText[currentLanguge],
        excludingRussian: errorText.excludingRussian[currentLanguge],
    });
    $.extend($.validator.messages, {
        required: errorText.requiredText[currentLanguge],
        newPasswordRules: errorText.errorPasswordText[currentLanguge],
    });
};

/**
* Новые правила для validation plagin
*/
$.validator.addMethod("phoneMethod", function(value, element) {
    return this.optional(element) || /^[0-9\(\)\-\+\.\,\ ]+$/.test(value);
});
$.validator.addMethod("excludingRussian", function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\.\,\!\?\:\…\_\-\/\"\$\@\#\&\^\(\)\%\~\|]*$/.test(value);
});
$.validator.addMethod("newEmailRules", function(value, element) {
    return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
});
$.validator.addMethod("newPasswordRules", function(value, element) {
    return this.optional(element) || /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]{8,}$/.test(value);
});

/**
* Маски на почту
*/
if ($('input[name="email"]').length) {
    $('input[name="email"]').mask('AB', {
        translation: {
            'A': {
                pattern: /[^\s\.\/]/
            },
            'B': {
                pattern: /\S/,
                recursive: true
            }
        },
    });
}
/**
* Маски на телефон
*/
if ($('input[name="phone_number"]').length) {
    $('input[name="phone_number"]').mask('Z', {
        translation: {
            'Z': {
                pattern: /^[0-9\(\)\-\+\ ]+$/,
                recursive: true
            }
        },
    });
}