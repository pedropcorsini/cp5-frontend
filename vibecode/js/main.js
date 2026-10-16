// RACHA | interface: header que encolhe, menu do "+" e carrossel

// Header: sobe e esconde as pílulas depois que a página rola
const header = document.getElementById('header');

function atualizarHeader() {
  header.classList.toggle('rolou', window.scrollY > 40);
}
atualizarHeader();
window.addEventListener('scroll', atualizarHeader, { passive: true });

// Menu do "+"
const botaoMais = document.getElementById('botao-mais');
const menu = document.getElementById('menu');

function abrirMenu(abrir) {
  menu.hidden = !abrir;
  botaoMais.setAttribute('aria-expanded', String(abrir));
  botaoMais.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
}

botaoMais.addEventListener('click', () => abrirMenu(menu.hidden));

menu.addEventListener('click', (evento) => {
  if (evento.target.closest('a')) abrirMenu(false);
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && !menu.hidden) {
    abrirMenu(false);
    botaoMais.focus();
  }
});

document.addEventListener('click', (evento) => {
  if (!menu.hidden && !header.contains(evento.target)) abrirMenu(false);
});

// Carrossel: setas, bolinhas e arrastar com o mouse.
// A rolagem horizontal nativa só responde a trackpad e toque; com mouse, nada mexia.
const trilho = document.getElementById('carrossel-trilho');
const pontos = document.getElementById('carrossel-pontos');
const anterior = document.getElementById('carrossel-anterior');
const proximo = document.getElementById('carrossel-proximo');
const cartoes = [...trilho.querySelectorAll('.cartao')];
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

// Paradas = posições de rolagem que existem de verdade. Em tela larga vários
// cartões cabem de uma vez, e os últimos levariam todos ao mesmo ponto (o fim).
let paradas = [];
let atual = 0;

function calcularParadas() {
  const maximo = trilho.scrollWidth - trilho.clientWidth;
  const posicoes = cartoes.map((cartao) => Math.min(cartao.offsetLeft - cartoes[0].offsetLeft, maximo));
  paradas = posicoes.filter((posicao, indice) => indice === 0 || posicao - posicoes[indice - 1] > 1);

  pontos.replaceChildren(
    ...paradas.map((_, indice) => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.setAttribute('aria-label', `Ir para a posição ${indice + 1} de ${paradas.length}`);
      botao.addEventListener('click', () => irPara(indice));
      return botao;
    })
  );
  marcarAtual();
}

function irPara(indice) {
  const alvo = Math.max(0, Math.min(indice, paradas.length - 1));
  trilho.scrollTo({ left: paradas[alvo], behavior: reduzirMovimento.matches ? 'auto' : 'smooth' });
}

function paradaMaisProxima() {
  let melhor = 0;
  paradas.forEach((posicao, indice) => {
    if (Math.abs(posicao - trilho.scrollLeft) < Math.abs(paradas[melhor] - trilho.scrollLeft)) melhor = indice;
  });
  return melhor;
}

function marcarAtual() {
  atual = paradaMaisProxima();
  [...pontos.children].forEach((botao, indice) => {
    botao.setAttribute('aria-current', String(indice === atual));
  });
  anterior.disabled = atual === 0;
  proximo.disabled = atual === paradas.length - 1;
}

anterior.addEventListener('click', () => irPara(atual - 1));
proximo.addEventListener('click', () => irPara(atual + 1));

// Arrastar com o mouse (no toque, a rolagem nativa já resolve)
let arraste = null;

trilho.addEventListener('pointerdown', (evento) => {
  if (evento.pointerType !== 'mouse' || evento.button !== 0) return;
  arraste = { x: evento.clientX, rolagem: trilho.scrollLeft, parada: atual, moveu: false };
  trilho.setPointerCapture(evento.pointerId);
});

trilho.addEventListener('pointermove', (evento) => {
  if (!arraste) return;
  const deslocamento = evento.clientX - arraste.x;
  if (!arraste.moveu && Math.abs(deslocamento) < 4) return;
  arraste.moveu = true;
  trilho.classList.add('arrastando');
  trilho.scrollLeft = arraste.rolagem - deslocamento;
});

function soltar(evento) {
  if (!arraste) return;
  const { moveu, parada, x } = arraste;
  const deslocamento = evento.clientX - x;
  arraste = null;
  trilho.classList.remove('arrastando');
  if (!moveu) return;

  // um puxão curto também troca de cartão, na direção do gesto
  let alvo = paradaMaisProxima();
  if (alvo === parada && Math.abs(deslocamento) > 50) alvo += deslocamento < 0 ? 1 : -1;
  irPara(alvo);
}
trilho.addEventListener('pointerup', soltar);
trilho.addEventListener('pointercancel', soltar);

calcularParadas();
trilho.addEventListener('scroll', marcarAtual, { passive: true });
new ResizeObserver(calcularParadas).observe(trilho);
