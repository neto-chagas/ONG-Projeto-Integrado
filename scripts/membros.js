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

    const removeButtonCell = row.insertCell();
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.classList.add("botao-remove"); // Add the "botao-remove" class
    removeButton.addEventListener("click", () => {
      removeUsuario(usuario);
    });
    removeButtonCell.appendChild(removeButton);
  });
}

function removeUsuario(usuario) {
  const usuariosString = localStorage.getItem("usuarios");

  if (!usuariosString) return;

  const usuarios = JSON.parse(usuariosString);

  const index = usuarios.findIndex(
    (u) => u.nome === usuario.nome && u.email === usuario.email
  );
  if (index !== -1) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    tableBody.innerHTML = "";
    init();
  }
}

window.onload = init;
