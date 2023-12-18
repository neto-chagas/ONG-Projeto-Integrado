/**
 * @type {HTMLTableElement}
 */
const table = document.getElementById("tabela-membros");

const tableBody = table.tBodies.item(0);

function init() {
  const usuariosString = localStorage.getItem("usuarios");

  if (!usuariosString) return;

  const usuarios = JSON.parse(usuariosString);

  usuarios.forEach((usuario) => {
    const row = tableBody.insertRow();

    const nomeCell = row.insertCell();
    nomeCell.textContent = usuario.nome;

    const emailCell = row.insertCell();
    emailCell.textContent = usuario.email;

    const telefoneCell = row.insertCell();
    telefoneCell.textContent = usuario.telefone;
  });
}

window.onload = init;
