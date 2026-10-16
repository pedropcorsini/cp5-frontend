# cp5-frontend

Repositório com as entregas do Checkpoint 5 de Front-End: imagens das resoluções dos sites de treinamento de CSS, os exercícios de Bootstrap e Tailwind e a atividade de vibecode.

## Conteúdo

- `css-garden/`: capturas de tela das resoluções dos níveis do CSS Garden
- `flexbox-froggy/`: capturas de tela das resoluções dos níveis do Flexbox Froggy
- `exercicio-bootstrap/`: página da marca fictícia Grão Nobre feita com Bootstrap 5 (navbar, hero, modal, carrossel de depoimentos, FAQ em accordion e footer)
- `exercicio-tailwind/`: página do ateliê fictício Fio & Prensa feita com Tailwind CSS (menu, hero, etapas do ofício, galeria em grid, depoimento e footer)

Nas pastas de imagens, cada imagem mostra o código da solução e o resultado do nível correspondente. Para ver os exercícios, abra o `index.html` da pasta correspondente no navegador.

## Vibecode

A pasta `vibecode/` é a única atividade feita com apoio de IA, como pede o enunciado. É a landing page do **RACHA**, um app fictício para dividir contas entre amigos (o rolê, o delivery, o mercado da república). O estilo foi inspirado no site da Slush, tirado do [styles.refero.design](https://styles.refero.design): tipografia gigante e espremida, adesivos coloridos com contorno preto e uma fita 3D azul granulada.

- `index.html`, `css/` e `js/`: a página, em HTML, CSS e JavaScript puros. A fita 3D é feita com Three.js (via CDN) em `js/fita3d.js`.
- `img/`: os adesivos em SVG, desenhados para o projeto, e o QR code que leva a este repositório.
- `registros/`: o processo da atividade.
  - `prompts.md`: log de cada rodada da conversa com a IA (o que pedi, o que ela entregou, o que deu errado e como corrigimos).
  - `referencias.md` e `referencias/`: prints, vídeo e ficha de estilo da referência.
  - `ideia-e-escopo.md`: a ideia, o público, as seções e os critérios de pronto.
  - `pesquisa.md`: apps que já dividem contas (Splitwise, Tricount, Nubank) e o que isso mudou no RACHA.
  - `paleta-e-tipografia.md`: as cores e as fontes, com o porquê de cada troca.
  - `plano.md`: o plano de implementação escrito antes do código.
  - `decisoes.md`: as decisões de design, separando as minhas das propostas pela IA.

Para ver a página, abra `vibecode/index.html` no navegador. A fita 3D precisa de internet para carregar o Three.js. Sem internet ou sem WebGL, a página funciona sem ela.
