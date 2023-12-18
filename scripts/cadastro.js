var botao = document.getElementById("botao-form");
botao.addEventListener("click", enviar);

var nomeInput = document.getElementById("nome");
var sobrenomeInput = document.getElementById("sobrenome");
var emailInput = document.getElementById("email");
var senhaInput = document.getElementById("senha");
var celularInput = document.getElementById("celular");
var ruaInput = document.getElementById("rua");
var numeroInput = document.getElementById("numero");
var bairroInput = document.getElementById("bairro");
var cepInput = document.getElementById("cep");
var cpfInput = document.getElementById("cpf");

function enviar(event) {
  event.preventDefault();

  var nome = document.getElementById("nome").value;
  var sobrenome = document.getElementById("sobrenome").value;
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;
  var celular = document.getElementById("celular").value;
  var rua = document.getElementById("rua").value;
  var numero = document.getElementById("numero").value;
  var bairro = document.getElementById("bairro").value;
  var cep = document.getElementById("cep").value;
  var cpf = document.getElementById("cpf").value;

  // Validações de campos vazios
  if (
    !nome ||
    !sobrenome ||
    !email ||
    !senha ||
    !celular ||
    !rua ||
    !numero ||
    !bairro ||
    !cep ||
    !cpf
  ) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  // Validações de formato
  if (!validarEmail(email)) {
    alert("O endereço de e-mail não é válido.");
    return;
  }

  if (!validarCPF(cpf)) {
    alert("O CPF não é válido.");
    return;
  }

  const usuario = {
    nome,
    sobrenome,
    email,
    senha,
    celular,
    rua,
    numero,
    bairro,
    cep,
    cpf,
  };

  const usuariosStorage = localStorage.getItem("usuarios");

  let usuarios;

  if (usuariosStorage) {
    usuarios = JSON.parse(usuariosStorage);
  } else {
    usuarios = [];
  }

  if (
    usuarios.find(function (u) {
      return u.email === usuario.email;
    })
  ) {
    alert("Já existe um usuário com este e-mail.");
    return;
  }

  alert("Cadastro realizado com sucesso!");

  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  usuarios.location.href = "entrar.html";
}

// Função para aplicar máscara de CPF
function mascaraCPF(input) {
  var valor = input.value;
  valor = valor.replace(/\D/g, ""); // Remove tudo o que não é dígito
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Insere um ponto entre o terceiro e o quarto dígitos
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2"); // Insere um ponto entre o terceiro e o quarto dígitos
  valor = valor.replace(/^(\d{3}\.\d{3}\.\d{3})(\d{1,2}).*$/, "$1-$2"); // Insere um hífen entre o terceiro e o quarto dígitos

  input.value = valor;
}

// Função para aplicar máscara de CEP
function mascaraCEP(input) {
  var valor = input.value;
  valor = valor.replace(/\D/g, ""); // Remove tudo o que não é dígito
  valor = valor.replace(/^(\d{5})(\d)/, "$1-$2"); // Insere um hífen depois do quinto dígito
  input.value = valor;
}

// Função para aplicar máscara de celular
function mascaraCelular(input) {
  var valor = input.value;
  valor = valor.replace(/\D/g, ""); // Remove tudo o que não é dígito
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
  valor = valor.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen entre o quarto e o quinto dígitos
  input.value = valor;
}

// Função para validar um endereço de e-mail
function validarEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Função para validar um CPF
function validarCPF(cpf) {
  var soma = 0;
  var resto;

  if (cpf === "000.000.000-00") return false;

  const reg = /(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/g;

  cpf = cpf.replace(reg, "$1$2$3$4");

  for (i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;

  for (i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

// Adiciona eventos de keyup para aplicar as máscaras
window.onload = function () {
  document.getElementById("cpf").addEventListener("keyup", function () {
    mascaraCPF(this);
  });

  document.getElementById("cep").addEventListener("keyup", function () {
    mascaraCEP(this);
  });

  document.getElementById("celular").addEventListener("keyup", function () {
    mascaraCelular(this);
  });

  // Adiciona evento de submit para validar o formulário
  document
    .getElementById("formCadastro")
    .addEventListener("submit", function (e) {
      if (!validarFormulario()) {
        e.preventDefault();
      }
    });
};
// Função para remover um usuário do Local Storage
function removerUsuario(username) {
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Find the index of the user with the given username
  var index = usuarios.findIndex(function (user) {
    return user.username === username;
  });

  // Remove the user from the array
  if (index !== -1) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
}

// Chamada da função para remover o usuário com o username "joao123"
removerUsuario("joao123");
