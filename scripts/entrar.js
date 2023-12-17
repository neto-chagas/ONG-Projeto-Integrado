var botao = document.getElementById("botao-form");
botao.addEventListener("click", enviar);
var emailInput = document.getElementById("email");
var senhaInput = document.getElementById("senha");

function enviar(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  // Validações de campos vazios
  if (!email || !senha) {
    alert("Todos os campos são obrigatórios.");
    return false;
  }

  if (!validarEmail(email)) {
    alert("O endereço de e-mail não é válido.");
    return false;
  }

  if (senhaInput.value.length < 8)
  {

    alert("A senha não é valida.");
    return false;

  }

  // Se todas as validações passarem, retorna true
  return true;
}

// Função para validar um endereço de e-mail
function validarEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
