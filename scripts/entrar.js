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

  if (senhaInput.value.length < 8) {
    alert("A senha não é válida.");
    return false;
  }

  registrarUsuario(senha, email);

  // Se todas as validações passarem, retorna true
  alert("E-mail e senha válidos!");
  return true;
}

// Função para validar um endereço de e-mail
function validarEmail(email) {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Função para registrar um novo usuário
function registrarUsuario(senha, email) {
  // Cria um objeto de usuário
  let usuario = {
    senha,
    email,
  };

  // Converte o objeto de usuário em uma string JSON
  let usuarioJSON = JSON.stringify(usuario);

  // Armazena o usuário no LocalStorage
  localStorage.setItem(email, usuarioJSON);
}

// Função para obter um usuário
function getUsuario(email) {
  // Obtém o usuário do LocalStorage
  let usuarioJSON = localStorage.getItem(email);

  // Converte a string JSON de volta em um objeto
  let usuario = JSON.parse(usuarioJSON);

  return usuario;
}
