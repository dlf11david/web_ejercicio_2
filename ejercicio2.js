var input = document.getElementById("resultado");
var operator = ['+','-','x','/'];
var punto = false;

function Stack() {
    this.datastore = [];
    this.tos = 0;
    this.push = function (element) {
        this.datastore[this.tos++] = element;
    }
    this.pop = function () {
        return this.datastore[--this.tos];
    }
    this.peek = function () {
        return this.datastore[this.tos-1];
    }
    this.length = function () {
        return this.tos;
    }
}

function limpiar() {
    input.value = "0";
    punto = false;
}

function calcular() {
    var expresion = input.value;
    var lastChar = expresion.substring(expresion.length - 1);
    expresion = expresion.replace(/x/g,'*');    
    if(operator.indexOf(lastChar) > -1)
    {
        expresion = expresion.substring(0, expresion.length - 1);
    }
    if(expresion != '')
    {
        var postfix = logica(expresion);
        var result = post(postfix);
        input.value = result;
    }
    if(input.value.indexOf('.') > -1)
        punto = true;
    else
        punto = false;
}

function setOperacion(btnValue) {
    var inputVal = input.value;
    var lastChar = inputVal.substring(inputVal.length - 1);
    var btnVal = btnValue;
    if(inputVal!='' && operator.indexOf(lastChar) == -1)
    {
        input.value += " " + btnVal + " ";
    }
    else if(inputVal == '' && btnVal == '-')
    {
        input.value += " " + btnVal + " ";
    }
    if(operator.indexOf(lastChar) > -1 && inputVal.length > 1)
    {
        input.value = inputVal.substring(0, inputVal.length - 1) + btnVal;
    }
    punto = false;

}

function setDecimal(btnValue) {
    var btnVal = btnValue;
    if(!punto)
    {
        input.value += btnVal;
        punto = true;
    }
}

function setValue(btnValue) {
    if(input.value == '0')
        input.value="";
    var btnVal = btnValue;
    input.value += btnVal;
}


function logica(expression) {
    var operators = '+-/*';
    var precedence = {'*':3,'/':3,'+':2,'-':2};
    var associative = {'*':'Left','/':'Left','+':'Left','-':'Left'};
    var postfix="";
    var s = new Stack();
    var token;
    var operador1;
    var operador2;
    var res1 = expression.split(" ");
    for(var i=0; i<res1.length; i++) {
        token = res1[i];
        if(operators.indexOf(token) == -1 && token != '(' && token != ')')
            postfix+=token + " ";
        else if(operators.indexOf(token) > -1) {
            operador1 = token;
            operador2 = s.peek();
            while(operators.indexOf(operador2) > -1 && ((associative[operador2] == 'Left' && precedence[operador1] <= precedence[operador2]) ||
                (associative[operador2] == 'Right' && precedence[operador1] < precedence[operador2]))) {
                postfix+=operador2 + " ";
                s.pop();
                operador2 = s.peek();
            }
            s.push(operador1);
        }
    }
    while (s.length()>0){
        postfix += s.pop() + " ";
    }
    return postfix;
}

function post(postfix) {
    var operators = '+-/*';
    var s = new Stack();
    var res2 = postfix.split(" ");
    for(var j=0; j<res2.length - 1; j++) {
        if(operators.indexOf(res2[j]) == -1) {
            s.push(res2[j]);
        }
        else {
            var op1 = s.pop();
            var op2 = s.pop();
            var interResult = resultadoIntermedio(op1, op2, res2[j]);
            s.push(interResult);
        }
    }
    return s.pop();

}

function resultadoIntermedio(operand1, operand2, operator) {
    var interResult;
        switch (operator){
        case '+':
            interResult = Number(operand2) + Number(operand1);
            break;
        case '-':
            interResult = Number(operand2) - Number(operand1);
            break;
        case '*':
            interResult = Number(operand2) * Number(operand1);
            break;
        case '/':
            interResult = Number(operand2) / Number(operand1);
            break;
        default:
            console.log("ERROR");
        }
    return interResult;
}


