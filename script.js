var btnArea = document.getElementById("btnArea");
var disposicionTecladoVirtual = [
  "C",
  "+/-",
  "%",
  "&#247;",
  7,
  8,
  9,
  "x",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  0,
  ",",
  "="
];

var operacion = null;
var screen = document.getElementById("screen");

function crearCalculadora() {
  mostrarBotones();
  interaccionTeclado();
  // clickListeners();
}
function mostrarBotones() {
  for (i = 0; i < disposicionTecladoVirtual.length; i++) {
    let button = document.createElement("div");
    switch (disposicionTecladoVirtual[i]) {
      default:
        button.classList.add("btn");
        button.innerHTML = disposicionTecladoVirtual[i];
        button.id = `btn ${i}`;
        button.style.background = "#3d3d3d";
        button.style.color = "white";
        btnArea.appendChild(button);
        break;
      case Number("0"):
        button.id = "btn_zero";
        button.style.background = "#3d3d3d";
        button.innerHTML = disposicionTecladoVirtual[i];
        button.style.color = "white";
        btnArea.appendChild(button);
        break;
      case "C":
      case "+/-":
      case "%":
        button.classList.add("btn");
        button.innerHTML = disposicionTecladoVirtual[i];
        button.id = `btn ${i}`;
        button.style.background = "#6b6666";
        btnArea.appendChild(button);
      case "&#247;":
      case "+":
      case "-":
      case "x":
      case "=":
        button.classList.add("btn");
        button.innerHTML = disposicionTecladoVirtual[i];
        button.id = `btn ${i}`;
        button.style.color = "white";
        btnArea.appendChild(button);
    }
  }
}
function interaccionTeclado() {
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      //console.log(event.key);
      event.preventDefault();
      especificarTeclas(event.key);
      return event.key;
    }
    //true
  );
}
function clickListeners() {
  for (i = 0; i < disposicionTecladoVirtual.length; i++) {
    if (disposicionTecladoVirtual[i] !== Number("0")) {
      let button = document.getElementById(`btn ${i}`);
      button.addEventListener("click", () => {
        switch (button.innerHTML) {
          case "+":
          case "-":
          case "&#247;":
          case "x":
            var keyPressed = button.innerHTML;
            routeOperation(keyPressed);
            mostrarPorPantallaClicks(button);
            break;
          case "C":
            borrarUltimoCaracter();
            break;
          case "=":
            realizarOperacion();
            break;
          case "+/-":
            var swap = Number(screen.innerHTML);
            screen.innerHTML = swap * -1;
            break;
          case "%":
            mostrarPorPantallaClicks(button);
            var result = screen.innerHTML.slice(
              0,
              screen.innerHTML.indexOf("%")
            );
            screen.innerHTML = result / 100;
            break;
          default:
            mostrarPorPantallaClicks(button);
            break;
        }
      });
    } else {
      let button = document.getElementById(`btn_zero`);
      button.addEventListener("click", () => {
        mostrarPorPantallaClicks(button);
      });
    }
  }
}

function mostrarPorPantallaClicks(element) {
  let screenValue = screen.innerHTML;
  if (screenValue === "0" && screenValue.length < 10) {
    screen.innerHTML = element.innerHTML;
  } else if (screenValue.length < 10) {
    screen.innerHTML = screenValue + element.innerHTML;
  }
}
function mostrarPorPantallaTeclasPresionadas(keyPressed) {
  let screenValue = screen.innerHTML;
  if (screenValue === "0" && screenValue.length < 10) {
    screen.innerHTML = keyPressed;
  } else if (screenValue.length < 10) {
    screen.innerHTML = screenValue + keyPressed;
  }
}

function especificarTeclas(keyPressed) {
  switch (keyPressed) {
    case "0":
      keyPressed = Number(0);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;

    case "1":
      keyPressed = Number(1);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break; //To do: put break; after each case:
    case "2":
      keyPressed = Number(2);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "3":
      keyPressed = Number(3);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "4":
      keyPressed = Number(4);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "5":
      keyPressed = Number(5);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "6":
      keyPressed = Number(6);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "7":
      keyPressed = Number(7);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "8":
      keyPressed = Number(8);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "9":
      keyPressed = Number(9);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "+":
      keyPressed = "+";
      routeOperation(keyPressed);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "-":
      keyPressed = "-";
      routeOperation(keyPressed);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "/":
      keyPressed = "/";
      routeOperation(keyPressed);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "*":
      keyPressed = "*";
      routeOperation(keyPressed);
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
    case "Backspace":
      keyPressed;
      borrarUltimoCaracter();
      break;
    case "Enter":
      //keyPressed = "Enter";
      routeOperation(keyPressed);
      break;
    case " ":
      keyPressed;
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
  }
}
function routeOperation(keyPressed) {
  switch (keyPressed) {
    case "+":
      asignarVariableOperacion("+ (suma)");
      break;
    case "-":
      keyPressed = "-";
      asignarVariableOperacion("- (resta)");
      break;
    case "/":
      keyPressed = "/";
      asignarVariableOperacion("/ (dividir)");
      break;
    case "x":
    case "*":
      keyPressed = "*";
      asignarVariableOperacion("* (multiplicar)");
      break;
    case "Backspace":
      borrarUltimoCaracter();
      break;
    case "Enter":
      realizarOperacion();
      break;
    case " ":
      keyPressed;
      mostrarPorPantallaTeclasPresionadas(keyPressed);
      break;
  }
}
function asignarVariableOperacion(operacionSeleccionada) {
  operacion = operacionSeleccionada;
}
function realizarOperacion() {
  let screenValue = screen.innerHTML;
  if (operacion !== null) {
    switch (operacion) {
      case "+ (suma)":
        var firstValue = screenValue.slice(0, screenValue.indexOf("+"));
        var secondValue = screenValue.slice(
          screenValue.indexOf("+") + 1,
          screenValue.length
        );
        screen.innerHTML = Number(firstValue) + Number(secondValue);
        operacion = null;
        // sumar(firstNumber, secondNumber);
        break;
      case "- (resta)":
        var firstValue = screenValue.slice(0, screenValue.indexOf("-"));
        var secondValue = screenValue.slice(
          screenValue.indexOf("-") + 1,
          screenValue.length
        );
        screen.innerHTML = Number(firstValue) - Number(secondValue);
        operacion = null;
        // restar(firstNumber, secondNumber);
        break;
      case "* (multiplicar)":
        if (screenValue.indexOf("x") !== -1) {
          var firstValue = screenValue.slice(0, screenValue.indexOf("x"));
          var secondValue = screenValue.slice(
            screenValue.indexOf("x") + 1,
            screenValue.length
          );
        } else {
          if (screenValue.indexOf("*") !== -1) {
            var firstValue = screenValue.slice(0, screenValue.indexOf("*"));
            var secondValue = screenValue.slice(
              screenValue.indexOf("*") + 1,
              screenValue.length
            );
          }
        }

        screen.innerHTML = Number(firstValue) * Number(secondValue);
        operacion = null;
        //multiplicar(firstNumber, secondNumber);
        break;
      case "/ (dividir)":
        var firstValue = screenValue.slice(0, screenValue.indexOf("/"));
        var secondValue = screenValue.slice(
          screenValue.indexOf("/") + 1,
          screenValue.length
        );
        screen.innerHTML = Number(firstValue) / Number(secondValue);
        operacion = null;
        //dividir(firstNumber, secondNumber);
        break;
    }
  }
}
function borrarUltimoCaracter() {
  let screenValue = screen.innerHTML;
  screen.innerHTML = screenValue.slice(0, -1);
}

crearCalculadora();