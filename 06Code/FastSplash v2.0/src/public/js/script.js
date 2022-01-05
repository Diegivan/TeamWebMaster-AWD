$(document).ready(function () {
    $(".dropdown-toggle").dropdown();
});

// (function () {
//     'use strict';
//     window.addEventlistener('load', function () {
//         var forms = document.getElementsByClassName('needs-validation');
//         var validation = Array.prototype.filter.call(forms,
//             function (form) {
//                 form.addEventlistener('submit', function (event) {
//                     if (form.checkvalidity() === false) {
//                         event.preventDefault();
//                         event.stopPropagation();
//                     }
//                     form.classlist.add('was-validated');
//                 }, false);
//             });
//     }, false);
// })();