const perguntasUX = [
    {
        texto: 'Uma pessoa abandona o cadastro porque não entende por que precisa informar seu telefone. O que faltou?',
        opcoes: ['Empatia e contexto', 'Mais animações', 'Um menu maior'],
        certa: 0,
        explicacao: 'Uma boa experiência explica o motivo de cada pedido e respeita a expectativa da pessoa.'
    },
    {
        texto: 'Depois de clicar em comprar, a pessoa não sabe se o pedido foi confirmado. Qual momento da jornada precisa melhorar?',
        opcoes: ['Descoberta', 'Conquista e feedback', 'Identidade visual'],
        certa: 1,
        explicacao: 'O feedback confirma que a tarefa deu certo e cria segurança para continuar.'
    },
    {
        texto: 'Qual é a melhor forma de descobrir se uma solução realmente funciona?',
        opcoes: ['Perguntar apenas à equipe', 'Adicionar mais recursos', 'Testar com pessoas reais'],
        certa: 2,
        explicacao: 'Observar pessoas reais usando a interface revela problemas que uma opinião interna pode esconder.'
    }
];

const quizNumeroUX = document.querySelector('#quiz-numero');
const quizPerguntaUX = document.querySelector('#quiz-pergunta');
const quizOpcoesUX = document.querySelector('#quiz-opcoes');
const quizRespostaUX = document.querySelector('#quiz-resposta');
const quizProximaUX = document.querySelector('#quiz-proxima');
let atualUX = 0;
let acertosUX = 0;
let terminouUX = false;

function mostrarPerguntaUX() {
    const pergunta = perguntasUX[atualUX];
    quizNumeroUX.textContent = atualUX + 1;
    quizPerguntaUX.textContent = pergunta.texto;
    quizRespostaUX.textContent = '';
    quizProximaUX.hidden = true;
    quizOpcoesUX.innerHTML = '';
    pergunta.opcoes.forEach((opcao, posicao) => {
        const botao = document.createElement('button');
        botao.className = 'quiz-opcao';
        botao.textContent = opcao;
        botao.addEventListener('click', () => responderUX(posicao));
        quizOpcoesUX.appendChild(botao);
    });
}

function responderUX(escolhida) {
    const pergunta = perguntasUX[atualUX];
    const botoes = quizOpcoesUX.querySelectorAll('button');
    botoes.forEach((botao) => { botao.disabled = true; });
    botoes[pergunta.certa].classList.add('certa');
    if (escolhida === pergunta.certa) {
        acertosUX++;
        quizRespostaUX.textContent = 'Acertou! ' + pergunta.explicacao;
    } else {
        botoes[escolhida].classList.add('errada');
        quizRespostaUX.textContent = 'Quase! ' + pergunta.explicacao;
    }
    quizProximaUX.textContent = atualUX === perguntasUX.length - 1 ? 'Ver resultado' : 'Próxima →';
    quizProximaUX.hidden = false;
}

function mostrarResultadoUX() {
    terminouUX = true;
    quizPerguntaUX.textContent = 'Você acertou ' + acertosUX + ' de ' + perguntasUX.length + '!';
    quizOpcoesUX.innerHTML = '';
    quizRespostaUX.textContent = acertosUX === perguntasUX.length
        ? 'Excelente! Você já está pensando na experiência de quem usa.'
        : 'Revise as etapas acima e tente perceber a interface pelo olhar da pessoa usuária.';
    quizProximaUX.textContent = 'Recomeçar';
}

quizProximaUX.addEventListener('click', () => {
    if (terminouUX) {
        atualUX = 0;
        acertosUX = 0;
        terminouUX = false;
        mostrarPerguntaUX();
    } else if (atualUX < perguntasUX.length - 1) {
        atualUX++;
        mostrarPerguntaUX();
    } else {
        mostrarResultadoUX();
    }
});

mostrarPerguntaUX();
