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
    return;
  }

  if (!validarEmail(email)) {
    alert("O endereço de e-mail não é válido.");
    return;
  }

  if (senhaInput.value.length < 4) {
    alert("A senha não é válida.");
    return;
  }

  entrar(senha, email);
}

// Função para validar um endereço de e-mail
function validarEmail(email) {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Função para registrar um novo usuário
function entrar(senha, email) {
  // Cria um objeto de usuário
  let usuario = {
    senha,
    email,
  };

  const usuariosStorage = localStorage.getItem("usuarios");

  if (!usuariosStorage) {
    alert("Usuário não encontrado.");
    return;
  }

  const usuarios = JSON.parse(usuariosStorage);

  // Verifica se o usuário existe
  const usuarioEncontrado = usuarios.find(function (u) {
    return u.email === usuario.email;
  });

  if (!usuarioEncontrado) {
    alert("Usuário não encontrado.");
    return;
  }

  // Verifica se a senha está correta
  if (usuarioEncontrado.senha !== usuario.senha) {
    alert("Senha incorreta.");
    return;
  }

  // Salva o usuário no LocalStorage
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  // Redireciona para a página de perfil
  location.href = "index.html";
}

// Função para obter um usuário
function getUsuario(email) {
  // Obtém o usuário do LocalStorage
  let usuarioJSON = localStorage.getItem(email);

  // Converte a string JSON de volta em um objeto
  let usuario = JSON.parse(usuarioJSON);

  return usuario;
}
