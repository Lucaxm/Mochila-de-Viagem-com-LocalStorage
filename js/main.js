const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (par_cadaItem) => {
    criaElementoHTML(par_cadaItem)
} )

form.addEventListener("submit", (submitClick) => {
    submitClick.preventDefault()

    const nome = submitClick.target.elements['nome']
    const quantidade = submitClick.target.elements['quantidade']

    const existe = itens.find( itemLocalStorage => itemLocalStorage.nome === nome.value )

    const itemEscrito = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemEscrito.id = existe.id
        
        atualizaElemento(itemEscrito)

        itens[itens.findIndex(itemIndex => itemIndex.id === existe.id)] = itemEscrito
    } else {
        itemEscrito.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElementoHTML(itemEscrito)

        itens.push(itemEscrito)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElementoHTML(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(itemEscrito) {
    document.querySelector("[data-id='"+itemEscrito.id+"']").innerHTML = itemEscrito.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}