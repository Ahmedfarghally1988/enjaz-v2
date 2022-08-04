(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: AR (Arabic; العربية)
 */
$.extend($.validator.messages, {	
	required: "حقل إجباري",
    remote: "حقل غير صحيح",
    email: "بريد إلكتروني غير صحيح",
    ArabicText: "نص عربي فقط",
    saudinationalid: "رقم الهوية غير صحيح",
    regno: "رقم السجل غير صحيح",
    EnglishText: "أحرف إنجليزية فقط",
    loginname: "أحرف إنجليزية وأرقام فقط",
    complexpassword: "كلمة المرور يجب أن تتكوَّن من 8 خانات على الأقل وتحتوي على (حرف كبير وحرف صغير وحرف مميَّز ورقم) .. مثال: Example@123.",
    saudimobile: "أدخل رقم جوال صحيح، مثال: 0512345678",
    saudiphone: "أدخل رقم هاتف صحيح، مثال: 0112345678",
    mobile: "أدخل رقم جوال صحيح، مثال: 00966512345678",
    internationalphone: "أدخل رقم هاتف صحيح، مثال: 00966112345678",
    ArabicFullName: "الاسم رباعي باللغة العربية",
    EnglishFullName: "الاسم رباعي باللغة الإنجليزية",
    url: "رابط غير صحيح",
    required_from_group: "إجباري واحد على الأقل",
    date: "تاريخ غير صحيح",
    dateISO: "تاريخ غير صحيح (YYYY-MM-DD)",
    number: "رقم غير صحيح",
    digits: "أرقام فقط",
    creditcard: "بطاقة ائتمان غير صحيحة",
    equalTo: "أدخل نفس القيمة",
    maxlength: $.validator.format("أدخل على الأكثر {0} حروف"),
    minlength: $.validator.format("أدخل على الأقل {0} حروف"),
    rangelength: $.validator.format("طول الحقل أكبر من {0} وأقل من {1} حروف"),
    range: $.validator.format("أدخل قيمة أكبر من {0} وأقل من {1}"),
    max: $.validator.format("أدخل قيمة أقل من أو تساوي {0}"),
    min: $.validator.format("أدخل قيمة أكبر من أو تساوي {0}"),
    pattern: "حقل غير صحيح",
    

});

}));