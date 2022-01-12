function getDate(adition) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    date = (yyyy + parseInt(adition)) + '-' + mm + '-' + dd;
    return date;
}

window.addEventListener("load", function() {
    document.getElementById("dateBirth").setAttribute("min", getDate("-100"));
    document.getElementById("dateBirth").setAttribute("max", getDate("-18"));
});


//  const validation;
//  validation.validateEcCI = function(cad) {
//     cad.trim();
//     var total = 0;
//     var longitud = cad.length;
//     var longCheck = longitud - 1;
//     var message = "";
//     var flag = false;

//     if (cad !== "" && longitud == 10){
//         if(isNaN(cad))
//         {
//             message += " - La CI solo puede contener números\n";
//             flag = false;
//         }
//         else{
//             for(var i = 0; i < longCheck; i++){
//                 if(i == 0) {
//                     let firstNumbers = parseInt(cad.charAt(i)) * 10 + parseInt(cad.charAt(i+1));
//                     if(firstNumbers >= 25){
//                         message += " - La CI no corresponde a ninguna provincia\n";
//                         flag = false;
//                     }
//                 }
//                 if (i%2 === 0) {
//                     var aux = cad.charAt(i) * 2;
//                     if (aux > 9) aux -= 9;
//                     total += aux;
//                 } else {
//                     total += parseInt(cad.charAt(i));
//                 }
//             }

//             total = total % 10 ? 10 - total % 10 : 0;

//             if (cad.charAt(longitud-1) == total) {
//                 flag = true;
//             }else{
//                 message += " - Debe ingresar una CI ecuatoriana\n";
//                 flag = false;
//             }
//         }
//     }
//     else{
//         message += " - La CI debe tener 10 dígitos\n";
//         flag = false;
//     }
//     return [message, flag];
// }

// validation.validateDate = function(date){
//     var today = new Date();
//     var yyToday = today.getFullYear();

//     var dateArr = date.split("-");
//     var yyDate = dateArr[0];
//     return ((yyToday - yyDate) < 100) && (yyToday >= yyDate);
// }

// module.exports = validation;
// document.getElementById("save").addEventListener("click",function(){
//     var fullname = document.getElementById("fullName");    var model = document.getElementById("model");
//     var ci = document.getElementById("ci");
//     var birthdate = document.getElementById("birthdate");
//     var flag = false;
//     var message = "!!Errors Found!!\n\n";

//     nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,50}$/;

//     if(fullname.value == "" || ci.value == "" || birthdate.value == ""){
//         message += " - There can be no blank fields\n";
//     }

//     if(!nameRegex.test(fullname.value)){
//         message += " - The name field accepts just letters and spaces\n";
//         fullname.focus();
//         flag = true;
//     }

//     if(!validateEcCI(ci.value)[1]){
//         ci.focus();
//         flag = true;
//     }

//     if(!validateDate(birthdate.value)) {
//         message += " - The date cannot be passed today or before 100 years\n"
//         birthdate.focus();
//         flag = true;
//     }
//     message += validateEcCI(ci.value)[0];

//     if(!flag){
//         alert("Saved Correctly");
//         document.getElementById("form1").submit();
//     } else {
//         alert(message);
//     }
//     flag = false;
// })