
function sumar() {
    document.getElementsByName("resultado")[0].value = 
        Number(document.getElementsByName("num1")[0].value) + Number(document.getElementsByName("num2")[0].value);
}
function restar() {
    document.getElementsByName("resultado")[0].value = 
        Number(document.getElementsByName("num1")[0].value) - Number(document.getElementsByName("num2")[0].value);
}
function multiplicar() {
    document.getElementsByName("resultado")[0].value = 
        Number(document.getElementsByName("num1")[0].value) * Number(document.getElementsByName("num2")[0].value);
}
function dividir() {
    if (Number(document.getElementsByName("num2")[0].value) == 0) {
        document.getElementsByName("resultado")[0].value = "No se puede dividir por 0"
    } else {
        document.getElementsByName("resultado")[0].value = 
        Number(document.getElementsByName("num1")[0].value) / Number(document.getElementsByName("num2")[0].value);
    }    
}