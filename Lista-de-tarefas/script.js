const form = document.getElementById("form");
const entrada = document.getElementById("entrada");
const lista = document.getElementById("lista");
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrar() {
  lista.innerHTML = "";
  tarefas.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = t.feita ? "feita" : "";
    li.innerHTML = `<span>${t.texto}</span><button>X</button>`;
    li.querySelector("span").onclick = () => { t.feita = !t.feita; salvar(); mostrar(); };
    li.querySelector("button").onclick = () => { tarefas.splice(i, 1); salvar(); mostrar(); };
    lista.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  tarefas.push({ texto: entrada.value, feita: false });
  entrada.value = "";
  salvar();
  mostrar();
};

mostrar();