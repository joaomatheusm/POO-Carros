class Carro { // Classe pai / base
    constructor(nome, portas) {
        this.nome = nome;
        this.portas = portas;
        this.ligado = false;
        this.vel = 0;
        this.cor = undefined;
    }

    ligar = function() {
        this.ligado = true;
    }

    desligar = function() {
        this.ligado = false;
    }

    setCor = function(cor) {
        this.cor = cor;
    }
}

class Militar extends Carro { // Classe filho
    constructor(nome, portas, blindagem, municao) {
        super(nome, portas);
        this.blindagem = blindagem;
        this.municao = municao;
        this.setCor('Verde');
    }

    atirar = function() {
        if (this.municao > 0) {
            this.municao--;
        }
    }
}

class Utilitario extends Carro {
    constructor(nome, portas, lugares) {
        super(nome, portas);
        this.lugares = lugares;
    }
}

const getObjetoCarro = () => {
    const todosTipos = [...document.getElementsByName('f_tipo')];
    const tipoSelecionado = todosTipos.filter(element => element.checked);

    if (tipoSelecionado[0].id === 'f_tipoNormal') {
        const carro = new Carro(caixaNome.value, caixaPortas.value);
        return carro;
    } else {
        const carro = new Militar(caixaNome.value, caixaPortas.value, caixaBlindagem.value, caixaMunicao.value);
        return carro;
    }
}

const resetarValores = () => {
    caixaNome.value = '';
    caixaPortas.value = 0;
    caixaBlindagem.value = 0;
    caixaMunicao.value = 0;
    caixaNome.focus();
}

const criarElementoCarro = (carro) => {
    const novoElemento = document.createElement('div');
    novoElemento.setAttribute('class', 'carro');
    novoElemento.innerHTML = `Nome: ${carro.nome}<br>
        Portas: ${carro.portas}<br>
        Cor: ${carro.cor ? carro.cor : 'Preto'}<br>
        Blindagem: ${carro.blindagem ? carro.blindagem : 'Não possui'}<br>
        Munição: ${carro.municao ? carro.municao : 'Não possui'}`

    const botaoRemover = document.createElement('button');
    botaoRemover.setAttribute('id', 'btn_removerCarro');
    botaoRemover.innerHTML = 'Remover';
    
    botaoRemover.addEventListener('click', (evt) => {
        const index = carros.indexOf(carro);
        
        carros.splice(index, 1);

        evt.target.parentNode.remove();
        console.log(carros);
    });

    novoElemento.appendChild(botaoRemover);
    
    return novoElemento;
}

const caixaNome = document.querySelector('#f_nome');
const caixaPortas = document.querySelector('#f_portas');
const caixaBlindagem = document.querySelector('#f_blindagem');
const caixaMunicao = document.querySelector('#f_municao');
const rbMilitar = document.querySelector('#f_tipoMilitar');
const rbNormal = document.querySelector('#f_tipoNormal');
const btnAdd = document.querySelector('#btn_addCarro');
const caixaCarros = document.querySelector('.carros');

rbMilitar.addEventListener('click', () => {
    caixaBlindagem.removeAttribute('disabled', 'disabled');
    caixaMunicao.removeAttribute('disabled', 'disabled');
});

rbNormal.addEventListener('click', () => {
    caixaBlindagem.setAttribute('disabled', 'disabled');
    caixaMunicao.setAttribute('disabled', 'disabled');
});

let carros = [];

btnAdd.addEventListener('click', () => {
    const carro = getObjetoCarro();
    
    carros.push(carro);
    
    caixaCarros.appendChild(criarElementoCarro(carro));

    resetarValores();

    console.log(carros);
});