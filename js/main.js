validate("login", 4)
validate("password", 8);
function validate(input, range) {

    notice(input, range) 
    $(`input[id=${input}]`).on('keyup', function () {
        let length = $(this).val().length;
        status(length, range, this);
        focus(length, `input[id=${input}]`);
    });
}
// некоторые стили для label  при фокусе
function focus(length, element) {
    if (length > 0) {
        $(element).parent().find($(`label`) || $(`label`)).css({
            transform: "translateY(5px)",
            top: "0",
            "font-size": "0.625rem"
        });
    } else if (length <= 0) {
        $(element).parent().find($(`label`) || $(`label`)).removeAttr("style");
    }
}
// отображение статуса ввода данных
function status(length, count, element) {
    focus(element)
    if (length >= count) {
        $(element).parent().find(".authorization-form__status").attr("data-status", "success");
    } else if (length > 0 && length < count) {
        $(element).parent().find(".authorization-form__status").attr("data-status", "error");
    } else if (length < count) {
        $(element).parent().find(".authorization-form__status").attr("data-status", "empty");
    }
}
// отображение пароля в виде символов 
$(".show-password").on('click', function () {
    if ($(this).attr("data-status") === "visible") {
        $(this).attr("data-status", "hidden");
        $("#current-eye").attr("xlink:href", "images/sprite.svg#hidden-password");
        $("#password").attr("type", "password");

    } else if ($(this).attr("data-status") === "hidden") {
        $(this).attr("data-status", "visible");
        $("#current-eye").attr("xlink:href", "images/sprite.svg#visible-password");
        $("#password").removeAttr("type");
    }
});

//отображение нотисов 
function notice(input, count) {
    $('.button[data-tupe="login"]').on("click", function () {
        if ($(`input[id="${input}"]`).val().length < count) {
            $(`input[id="${input}"]`).parent().next().attr("data-active", "1");
            $(`input[id="${input}"]`).parent().find(".authorization-form__status").attr("data-status", "error");
        } else if ($(`input[id="${input}"]`).val().length >= count) {
            $(`input[id="${input}"]`).parent().next().attr("data-active", "0");
            $(`input[id="${input}"]`).parent().find(".authorization-form__status").attr("data-status", "success");
        }

    });
}