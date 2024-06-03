"use strict";
var listElement = document.querySelector("#app ul#pending-tasks");
var completedListElement = document.querySelector("#app ul#completed-tasks");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");
var listaSalva = localStorage.getItem("@listagem_tarefas");
var tarefas = listaSalva !== null ? JSON.parse(listaSalva) : [];
function listarTarefas() {
    listElement.innerHTML = "";
    completedListElement.innerHTML = "";
    tarefas.map(function (item, index) {
        var todoElement = document.createElement("li");
        var tarefaText = document.createTextNode(item.texto);
        var linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        var posicao = index;
        linkElement.setAttribute("onclick", "deletarTarefa(".concat(posicao, ")"));
        linkElement.setAttribute("style", "margin-left: 10px");
        var linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText);
        var doneElement = document.createElement("a");
        doneElement.setAttribute("href", "#");
        doneElement.setAttribute("style", "margin-left: 10px");
        doneElement.setAttribute("onclick", "marcarFeita(".concat(posicao, ")"));
        var doneText = document.createTextNode(item.feita ? "Desmarcar" : "Feita");
        doneElement.appendChild(doneText);
        todoElement.appendChild(tarefaText);
        todoElement.appendChild(doneElement);
        todoElement.appendChild(linkElement);
        if (item.feita) {
            completedListElement.appendChild(todoElement);
        }
        else {
            listElement.appendChild(todoElement);
        }
    });
}
listarTarefas();
function adicionarTarefa() {
    if (inputElement.value === "") {
        alert("Digite alguma tarefa!");
        return false;
    }
    else {
        var tarefaDigitada = inputElement.value;
        tarefas.push({ texto: tarefaDigitada, feita: false });
        inputElement.value = "";
        listarTarefas();
        salvarDados();
    }
}
buttonElement.onclick = adicionarTarefa;
function deletarTarefa(posicao) {
    tarefas.splice(posicao, 1);
    listarTarefas();
    salvarDados();
}
function marcarFeita(posicao) {
    tarefas[posicao].feita = !tarefas[posicao].feita;
    listarTarefas();
    salvarDados();
}
function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}
