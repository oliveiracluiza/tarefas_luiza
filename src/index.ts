let listElement = document.querySelector("#app ul#pending-tasks") as HTMLUListElement;
let completedListElement = document.querySelector("#app ul#completed-tasks") as HTMLUListElement;
let inputElement = document.querySelector("#app input") as HTMLInputElement;
let buttonElement = document.querySelector("#app button") as HTMLElement;

let listaSalva: (string | null) = localStorage.getItem("@listagem_tarefas");
let tarefas: { texto: string, feita: boolean }[] = listaSalva !== null ? JSON.parse(listaSalva) : [];

function listarTarefas(){
  listElement.innerHTML = "";
  completedListElement.innerHTML = "";

  tarefas.map((item, index) => {
    let todoElement = document.createElement("li");
    let tarefaText = document.createTextNode(item.texto);

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");

    let posicao = index;

    linkElement.setAttribute("onclick", `deletarTarefa(${posicao})`);
    linkElement.setAttribute("style", "margin-left: 10px");

    let linkText = document.createTextNode("Excluir");
    linkElement.appendChild(linkText);

    let doneElement = document.createElement("a");
    doneElement.setAttribute("href", "#");
    doneElement.setAttribute("style", "margin-left: 10px");

    doneElement.setAttribute("onclick", `marcarFeita(${posicao})`);
    
    let doneText = document.createTextNode(item.feita ? "Desmarcar" : "Feita");
    
    doneElement.appendChild(doneText);
    todoElement.appendChild(tarefaText);
    todoElement.appendChild(doneElement);
    todoElement.appendChild(linkElement);

    if (item.feita) {
      completedListElement.appendChild(todoElement);
    } else {
      listElement.appendChild(todoElement);
    }
  });
}

listarTarefas();

function adicionarTarefa() {
  if (inputElement.value === "") {
    alert("Digite alguma tarefa!");
    return false;
  } else {
    let tarefaDigitada: string = inputElement.value;
    tarefas.push({ texto: tarefaDigitada, feita: false });

    inputElement.value = "";
    listarTarefas();
    salvarDados();
  }
}

buttonElement.onclick = adicionarTarefa;

function deletarTarefa(posicao: number) {
  tarefas.splice(posicao, 1);

  listarTarefas();
  salvarDados();
}

function marcarFeita(posicao: number) {
  tarefas[posicao].feita = !tarefas[posicao].feita;

  listarTarefas();
  salvarDados();
}

function salvarDados() {
  localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}
