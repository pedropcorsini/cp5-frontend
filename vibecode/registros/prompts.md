# Log de prompts

Registro da conversa com a IA durante a atividade. Cada rodada tem o que eu pedi (prompt literal), o que a IA entregou, o que estava errado ou o que eu quis mudar, e como corrigimos.

## Rodada 1. Pedido inicial com a referência

**Pedi:**
> Você é um dev front-end senior, especialista em criacao de lps, ui/ux e design. Com seus conhecimentos, crie uma lp com esse design/ref retirado de um site de referencias (styles.refero.design), prompt: [ficha de estilo "Slush — Style Reference", guardada completa em `referencias/slush-style-reference.md`] video do site: https://images.refero.design/styles/refero.design/video/45251ff4-cbde-44fe-84f7-24fb525acadd.mp4 [3 prints do site]. Me faça perguntas caso precise.

**IA fez:**
- Guardou os 3 prints, baixou o vídeo e a ficha de estilo em `referencias/`.
- Como não tem ffmpeg na máquina, extraiu quadros do vídeo (um a cada 2 s) com um script em Swift (AVFoundation) e montou duas folhas de contato, para ver as seções do site que não estavam nos prints.
- Anotou o que viu em `referencias.md`.
- Antes de codar, começou a fazer perguntas (uma por vez) para fechar o tema da página, já que a referência é de uma marca real (Slush) e a ideia é usar o estilo, não copiar a marca.

## Rodada 2. Tema

**IA perguntou:** qual seria o tema da LP, já que a referência é de uma marca real (Slush). Opções: app fictício de finanças (recomendado), evento fictício, produto físico fictício ou outra ideia.

**O que aconteceu:** na primeira vez marquei "Produto físico fictício", interrompi e pedi: "Retorne, refaca a pergunta e continue."

**Decidi:** app fictício de finanças. Fica no mesmo universo da referência (app de dinheiro), mas com marca própria, sem copiar a Slush.

## Rodada 3. Proposta do app

**IA perguntou:** qual a proposta do app. Opções: dividir contas (recomendado), finanças para universitários, cofrinho de metas ou carteira digital geral.

**Decidi:** dividir contas. Um app para rachar rolê, mercado e contas da república entre amigos. O tom divertido combina com os adesivos e cabe em frases curtas.

## Rodada 4. Nome da marca

**IA perguntou:** o nome da marca, lembrando que ele vira a palavra gigante do hero (como "SLUSH" na referência), então nomes curtos funcionam melhor. Opções: RACHA (recomendado), VAQUINHA, RATEIO ou outro.

**Decidi:** RACHA. É a gíria de "rachar a conta", tem 5 letras como SLUSH e rende frases como "Racha aí" e "Rachou, pagou".

## Rodada 5. Como fazer a fita 3D

**IA perguntou:** como fazer a fita 3D azul granulada, que é a assinatura visual da referência. Opções: 3D de verdade no código com Three.js (recomendado), imagem gerada em outra IA ou SVG com filtros.

**Decidi:** 3D de verdade no código (Three.js). É o mais parecido com a referência, se ajusta a qualquer tela e pode girar de leve com a rolagem.

## Rodada 6. Stack

**IA perguntou:** qual stack usar no resto da página, fora a fita em Three.js. Opções: HTML, CSS e JS puros (recomendado), Tailwind via CDN ou Vite com JS.

**Decidi:** HTML, CSS e JS puros. Os tokens da ficha viram variáveis CSS, dá controle fino nos títulos e adesivos, e a página abre direto no navegador, sem build.

## Rodada 7. Proposta de design

**IA entregou:** uma proposta completa antes de qualquer código: as seções na ordem do vídeo da referência (marquee, nav, hero, celulares, bloco tipográfico com QR, duas seções brancas, carrossel de cartões, faixa final e rodapé), como fazer a fita 3D em Three.js, as fontes gratuitas que vão substituir as pagas (Anton e Satoshi), os adesivos em SVG, a estrutura de arquivos e como testar.

**Pedi:** "Aprovado!! Pode seguir."

**Próximo passo:** a IA escreve a proposta em `ideia-e-escopo.md` para eu revisar antes do código.

## Rodada 8. Plano e primeira versão

**Pedi:** "pode seguir com o plano e o código"

**IA entregou:**
- O plano em `plano.md`, com as tarefas e os 5 riscos que ela ia testar de propósito.
- 7 adesivos em SVG desenhados do zero (moeda com carinha, moeda "R", pizza, comanda, carteira, check em flor e copo), com contorno preto e "espessura" chapada embaixo, sem gradiente.
- Um QR code real, gerado com Python, que leva ao repositório do trabalho.
- A página completa: `index.html`, `css/style.css`, `js/main.js` (header, menu do "+" e carrossel) e `js/fita3d.js` (fita 3D).

**Problemas que a IA encontrou e corrigiu sozinha durante os testes:**
1. **Fita 3D aberta direto do arquivo:** o Chrome bloqueia `<script type="module" src>` em `file://`. Antes de testar, a IA trocou por um script comum que importa o Three.js com `import()`. Ela confirmou que o CDN libera CORS para qualquer origem (`access-control-allow-origin: *`).
2. **"RACHA" alto demais:** em janelas baixas, o título passava da altura da tela. Agora o tamanho também é limitado pela altura (`min(31vw, 50svh)`).
3. **Celulares viraram cápsulas:** a unidade `cqi` usada no próprio celular media a tela, não o celular, e o raio da borda ficou gigante. A IA trocou por valores em px e %.
4. **Til e vírgula sumindo:** com a entrelinha espremida (0.8), a vírgula de "PIX NA HORA," caía na linha de baixo e o til de "CLIMÃO" ficava escondido atrás de "HORA". Para manter a entrelinha da referência, a IA inverteu as linhas ("SEM CLIMÃO / PIX NA HORA") e tirou a vírgula. Assim a palavra com acento fica na primeira linha.
5. **CTA sumindo:** o botão preto "ABRIR O APP" do header desaparecia sobre a faixa preta. Ganhou contorno branco.
6. **Celular (390px):** a carteira do hero e a linha "TEM CONTA" com o cartão de QR passavam da tela. A IA diminuiu o título e a escada no celular.
7. **Fita sem WebGL:** num teste em que desligou o canvas, a criação da textura dava erro sem tratamento. Toda a montagem da fita foi para dentro de um `try/catch`.
8. **Âncoras:** ao clicar em "Pix" no menu, a seção parava embaixo do header fixo. A IA adicionou `scroll-margin-top`.

**Como foi conferido:**
- Desktop (1434 px): todas as seções, sem erro no console.
- Celular: a página foi carregada num iframe de 390 px. A largura da rolagem ficou igual à da tela, então não há rolagem lateral.
- Sem WebGL: simulação com o WebGL desligado e com todo canvas desligado. Nenhum erro de script e a página aparece inteira.
- Menu "+": Enter abre, Esc fecha e devolve o foco, e clicar num link fecha o menu.
- Aberto direto do arquivo (`file://`): a extensão do navegador da IA não abre `file://`, então eu abri com duplo clique e conferi. A fita 3D apareceu certinho.
- Não testado: o modo "reduzir movimento" não foi testado de verdade no navegador, só conferido no código (o CSS desliga as animações e o JS deixa a fita parada).

## Rodada 9. Carrossel não mexia

**Pedi:** "abri, a fita apareceu certinho mas a secao Dá pra rachar de tudo nao está funcional (os cards nao se movimentam)"

**O que a IA fez primeiro:** reproduziu o problema no navegador antes de mexer no código. Ela admitiu que, na rodada 8, só tinha tirado print do carrossel, sem testar a interação.

| Como tentou mexer | Resultado |
|---|---|
| Clicar numa bolinha | Funcionava |
| Roda do mouse em cima dos cards | Rolava a página, não os cards |
| Arrastar com o mouse | Não mexia nada |

**Causa:** o carrossel dependia só da rolagem horizontal nativa do navegador, que no desktop com mouse só responde a trackpad ou shift + roda. A barra de rolagem estava escondida e as bolinhas eram pequenas demais para alguém perceber que eram clicáveis.

**Segundo problema achado junto:** em tela larga cabem 3 cards e meio, então as bolinhas 4, 5 e 6 levavam todas ao mesmo lugar (o fim do trilho).

**Correção:**
- Arrastar com o mouse: o card encaixa ao soltar, e um puxão curto (mais de 50 px) já troca de card na direção do gesto. No toque continua a rolagem nativa.
- Setas ← e → ao lado das bolinhas, no estilo das pílulas com contorno preto. Cada seta desliga quando chega na ponta.
- As bolinhas agora representam as "paradas" reais. São 4 no desktop e 6 no celular, onde cabe um card por vez.
- A roda do mouse continua rolando a página, de propósito, para não prender a rolagem.

**Como foi conferido:**
- Desktop: arrastar 300 px para a esquerda levou ao card seguinte. Duas setas chegaram ao fim e a seta "próximo" desligou. Arrastar de volta encaixou no card certo. Nenhum erro no console.
- Celular (iframe de 390 px): 6 bolinhas, a seta anda exatamente um card, sem rolagem lateral.
