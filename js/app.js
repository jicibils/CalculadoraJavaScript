var resultado
var contador_operaciones = 0
var operacion = {
  primer_operando: "",
  segundo_operando: "",
  operando: "",
  contador:0 // lo usamos para guardar el segundo operando y que se pueda seguir apretando el igual y seguir haciendo la ultima operacion
}
var Calculadora = {
  //controlamos todo con respecto a tocar la tecla punto
  show_button_dot: function(idButton) {
    //si en la pantalla hay solo un cero y agregar un punto a su derecha
    if ((document.getElementById('display').innerHTML == "0") && (idButton == "punto") ) {
      document.getElementById('display').innerHTML = "0."
    }
    //controlamos que no pueda quedar un numero de 7 cifras y un punto al final
    if (document.getElementById('display').innerHTML.length < 8) {
      //controlamos que haya numeros para poner el punto despued de un numero != de cero
      if ((document.getElementById('display').innerHTML != "0") && (idButton == "punto") ) {
        var flag = false
        //verificamos que no haya otro punto antes
        for (var i = 0; i < document.getElementById('display').innerHTML.length; i++) {
          if (document.getElementById('display').innerHTML[i] == ".") {
            flag = true
          }
        }
        if (!(flag)) {
          document.getElementById('display').innerHTML += "."
        }
      }
    }
  },

  //controlamos todo con respecto a tocar algun numero
  show_button_number: function(idButton) {
    //si en la pantalla hay solo un cero y apretaste un boton que no sea cero se limpia la pantalla
    if ((document.getElementById('display').innerHTML == "0") && (idButton != "0") ) {
      document.getElementById('display').innerHTML = " "
    }
    //controlando cuando apretas el cero y no hay nada que no haga nada
    if ((idButton == "0") && (document.getElementById('display').innerHTML == "0")) {
      document.getElementById('display').innerHTML = "0"
    }else {//cuando apretas el cero y si hay algo que ponga el cero
      if (idButton == "0") {
        document.getElementById('display').innerHTML += idButton
      }
    }
    //si se aprieta el 1 o 2 o 3 o 4 se pone el numero que corresponda
    if (idButton == "1" || idButton == "2" || idButton == "3" || idButton == "4" ) {
      document.getElementById('display').innerHTML += idButton
    }
    //si se aprieta el 5 o 6 o 7 o 8 0 9 se pone el numero que corresponda
    if (idButton == "5" || idButton == "6" || idButton == "7" || idButton == "8" || idButton == "9" ) {
      document.getElementById('display').innerHTML += idButton
    }

  },

  //controlamos todo con respecto a tocar la tecla sign
  show_button_sign: function(idButton) {
    //si en la pantalla hay solo un cero y no agregar nada
    if (document.getElementById('display').innerHTML.length <= 10) {
      if ((document.getElementById('display').innerHTML != "0") && (idButton == "sign") ) {
        var flag = false
        //verificamos que no haya otro "-" antes
        for (var i = 0; i < document.getElementById('display').innerHTML.length; i++) {
          if (document.getElementById('display').innerHTML[i] == "-") {
            flag = true
          }
        }
        if (flag) {
          var number=""
          for (var i = 0; i < document.getElementById('display').innerHTML.length; i++) {
            if (document.getElementById('display').innerHTML[i] != "-") {
              number += document.getElementById('display').innerHTML[i]
            }
          }
          document.getElementById('display').innerHTML = number
        }else {
          document.getElementById('display').innerHTML = "-"+document.getElementById('display').innerHTML
        }

      }
    }
  },
  suma: function(primer_operando) {
    return ((parseFloat(primer_operando) + parseFloat(document.getElementById('display').innerHTML))) ;
  },
  resta: function(primer_operando) {
    return ((parseFloat(primer_operando) - parseFloat(document.getElementById('display').innerHTML))) ;
  },
  multiplicacion: function(primer_operando) {
    return ((parseFloat(primer_operando) * parseFloat(document.getElementById('display').innerHTML))) ;
  },
  division: function(primer_operando) {
    if (document.getElementById('display').innerHTML == "0") {
      alert("No se puede dividir por cero")
      return "Error";
    }else {
      return ((parseFloat(primer_operando) / parseFloat(document.getElementById('display').innerHTML))) ;
    }
  },

  operations: function(idButton) {
    var operacion = {
      operando: idButton,
      primer_operando: document.getElementById('display').innerHTML
    }
    document.getElementById('display').innerHTML = ""
    return operacion;

  },

  acumulador_operandos: function(idButton) {
    var oper = {
      operando: "",
      acum:""
    }
    switch (operacion.operando) {
      case "mas":
        var acum = (parseFloat(operacion.primer_operando) + parseFloat(document.getElementById('display').innerHTML))
        oper.operando = idButton
        oper.acum = acum
        break;
      case "menos":
        var acum = (parseFloat(operacion.primer_operando) - parseFloat(document.getElementById('display').innerHTML))
        oper.operando = idButton
        oper.acum = acum
        break;
      case "por":
        var acum = (parseFloat(operacion.primer_operando) * parseFloat(document.getElementById('display').innerHTML))
        oper.operando = idButton
        oper.acum = acum
        break;
      case "dividido":
        var acum = (parseFloat(operacion.primer_operando) / parseFloat(document.getElementById('display').innerHTML))
        oper.operando = idButton
        oper.acum = acum
        break;
      default:
      console.log("Error");
    }
    document.getElementById('display').innerHTML = ""
    return oper;

  },

  push_igual: function(operando,primer_operando) {
    if (operacion.contador == 0) {
      operacion.segundo_operando = document.getElementById('display').innerHTML;
      operacion.primer_operando = operacion.segundo_operando
      operacion.contador++
    }
    switch (operando) {
      case "mas":
        resultado = Calculadora.suma(primer_operando)
        break;
      case "menos":
        resultado = Calculadora.resta(primer_operando)
        break;
      case "por":
        resultado = Calculadora.multiplicacion(primer_operando)
        break;
      case "dividido":
        resultado = Calculadora.division(primer_operando)
        break;
      default:
      console.log("Error");
    }
    if (resultado.toString().length > 8) {
      alert("Numero Truncado solo se muestran 8 cifras")
      var number=""
      for (var i = 0; i < 8; i++) {
        number += resultado.toString()[i]
      }
      document.getElementById('display').innerHTML = number
    }else {
      document.getElementById('display').innerHTML = resultado
    }
  },

  push_button: function(idButton) {

    // si hay menos de 8 digitos entramos sino no!
    if (idButton == "on") {
      // alert("1")
      document.getElementById('display').innerHTML="0"
      contador_operaciones = 0
      resultado = ""
      operacion.primer_operando = ""
      operacion.segundo_operando = ""
      operacion.operando = ""
      operacion.contador = 0

    }
    if (idButton == "sign") {
      // alert("2")
      Calculadora.show_button_sign(idButton)
    }
    if (idButton == "dividido" || idButton == "por" || idButton == "menos" || idButton == "mas") {
      // alert("3")
      if (contador_operaciones == 0) {
        resultado = Calculadora.operations(idButton)
        operacion.primer_operando = resultado.primer_operando
        operacion.operando = resultado.operando
        operacion.contador = 0
        contador_operaciones++
      }else{
        if (contador_operaciones>0) {
          resultado = Calculadora.acumulador_operandos(idButton)
          operacion.primer_operando = resultado.acum
          operacion.operando = resultado.operando
          operacion.contador = 0
        }
      }
    }
    if (idButton == "igual") {
      contador_operaciones = 0
      // alert("4")
      Calculadora.push_igual(operacion.operando,operacion.primer_operando)
    }
    if (document.getElementById('display').innerHTML.length <= 8) {
      //si se aprieta el on se limpa la pantalla y se le pone un 0
      if (idButton == "punto") {
        // alert("5")
        Calculadora.show_button_dot(idButton)
      }
      if (idButton == "0" || idButton == "1" || idButton == "2" || idButton == "3" || idButton == "4" ) {
        // alert("6")
        Calculadora.show_button_number(idButton)
      }
      if (idButton == "5" || idButton == "6" || idButton == "7" || idButton == "8" || idButton == "9" ) {
        // alert("7")
        Calculadora.show_button_number(idButton)
      }
    }
  },

  minSizeButton: function() {
    this.style=" padding:2px;"
    Calculadora.push_button(this.id)
  },
  maxSizeButton: function() {
    this.style=" padding:0px;"
  },

  //(INIT)
  whichElement: function(e) {
      var targ;
      if (!e) {
          var e = window.event;
      }
      if (e.target) {
          targ=e.target;
      } else if (e.srcElement) {
          targ=e.srcElement;
      }

      document.getElementById(targ.id).onmousedown=Calculadora.minSizeButton
      document.getElementById(targ.id).onmouseup=Calculadora.maxSizeButton
  }
}
