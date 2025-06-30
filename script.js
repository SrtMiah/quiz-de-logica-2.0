// ——— tsParticles background ———
tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    particles: {
        number: { value: 420 },
        color: { value: ["#ffae00", "#ff6a00", "#ff3c00", "#ffd700", "#ff4500", "#ffa500", "#ffff33"]},
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: [ 1, 4 ] },
        move: {
            enable: true,
            speed: 1,
            direction: "top",
            outModes: { default: "out" },
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" }
        },
        modes: {
            repulse: { distance: 100 },
            push: { quantity: 4 }
        }
    }
});

// —————————————— fim tsParticles ——————————————



const perguntas = document.querySelectorAll('.pergunta');
const botoesProximo = document.querySelectorAll('.proximo');

let perguntaAtual = 0;

//Gabarito das respostas correstas (value do input)

const respostascorretas = [
    "nenhum",  //pergunta 1
    "duas",  //pergunta 2
    "Qual",  //pergunta 3
    "umReal",  //pergunta 4
    "nenhumaHora",  //pergunta 5
    "dezHoras",  //pergunta6
    "dez",  //pergunta 7
    "mapa",  //pergunta 8
    "sopro",  //pergunta 9
    "eco"  //pergunta 10
];

botoesProximo.forEach((botao) => {
    botao.addEventListener('click', () => {
        const alternativas = perguntas[perguntaAtual].querySelectorAll('input[type="radio"]');
        const algumaSelecionada = Array.from(alternativas).some(alt => alt.checked);

        if (!algumaSelecionada) {
            alert('Por favor, selecione uma alternativa antes de prosseguir.');
            return;
        }

        perguntas[perguntaAtual].classList.remove('ativa');

        if (perguntaAtual < perguntas.length - 1) {
            perguntaAtual++;
            perguntas[perguntaAtual].classList.add('ativa');
        } else {
            mostrarResultado ();
        }
    });
});

function mostrarResultado() {
    let acertos = 0;
    let total = perguntas.length;
    let tabelaHTML = '<tr><th>Pergunta</th></th>Resposta</th><th>Correta?</th></tr>';

    perguntas.forEach((pergunta, index) => {
        const titulo = pergunta.querySelector('h2').textContent;
        const selecionada = pergunta.querySelector('input[type="radio"]:checked');
        const resposta = selecionada ? selecionada.nextElementSibling.textContent : 'Nenhuma';
        const correta = respostascorretas[index];
        const acertou = selecionada && selecionada.value === correta;

    if (acertou) acertos++;

    tabelaHTML += `
        <tr>
            <td>${titulo}</td>
            <td>${resposta}</td>
            <td>${acertou ? '✅' : '❌' }</td>
        </tr>
    `;
});

//exibir pontuação
document.getElementById('pontuacao').textContent= `Você acertou ${acertos} de ${total} perguntas.`;

//avaliação
let avaliação = '';
        if (acertos <= 2) {
        avaliação = 'Nâo desista, a cada tentativa uma nova oportunidade de aprender!'
        } else if (acertos <= 5) {
            avaliação == 'Bom trabalho! Você está no caminho certo, continue assim!';
        } else if (acertos <=8) {
            avaliação = 'Excelente! Você tem um bom raciocínio lógico, continue assim!';
        } else {
            avaliação = 'Incrível! Você é um verdadeiro mestra de lógica!!';
        }

document.getElementById('feedback').textContent = avaliação;

//exibir a seção de resultados
document.getElementById('tabela').innerHTML = tabelaHTML
document.getElementById('resultado').style.display = 'block';
document.getElementById('estatica-pontuacao').style.display = 'block';
document.getElementById('gabarito').style.display = 'block';
document.getElementById('feedback-form').style.display = 'block';
}

