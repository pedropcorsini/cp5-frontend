# Ideia e escopo

## O que a atividade pede
Uma landing page de tema livre feita com vibecode. O foco é o processo: como pensei, como conversei com a IA e como corrigi o caminho. Os registros (prompts, pesquisa, decisões de design, referências visuais e paleta) ficam nesta pasta.

## A ideia
**RACHA** é um app fictício para dividir contas entre amigos: o rolê, o delivery, o mercado da república, a viagem de formatura. O nome vem da gíria "rachar a conta".

A landing page usa o estilo do site da **Slush** (carteira de cripto), tirado do styles.refero.design: adesivos coloridos, tipografia gigante e espremida e uma fita 3D azul granulada. Uso só o estilo. Marca, textos e ilustrações são próprios.

A página é só vitrine: os botões não levam a um app de verdade.

## Público e tom
Universitários e jovens que saem em grupo. O tom é leve e direto, com gírias ("Rachou, pagou", "sem climão"). Tudo em português.

## Estrutura da página
O fundo da página é preto e cada seção é um "pôster" com cantos arredondados de 30px, alternando azul-claro (`#dceeff`), branco e cinza (`#cccccc`).

| # | Seção | Conteúdo |
|---|---|---|
| 0 | Marquee | Faixa lilás no topo com texto rolando: "RACHOU, PAGOU • NINGUÉM FICA DEVENDO • ..." |
| 1 | Nav | Logo "R" num círculo, pílulas (Como funciona, Rolê, República, Segurança, Baixar), botão "+" e CTA preto "ABRIR O APP". No celular, as pílulas vão para dentro do "+". |
| 2 | Hero | "RACHA" gigante, fita 3D por trás, adesivos (pizza, moeda com carinha, comanda, carteira), frase "Rachou, pagou." e dois botões de contorno. |
| 3 | Celulares | Dois celulares feitos em CSS com telas do app ("Conta do rolê: R$ 248,00 ÷ 4" e "Quem deve quem"), fita 3D atrás. |
| 4 | Bloco tipográfico | "TODO ROLÊ / TEM CONTA / RACHA NO APP" em escada, cartão roxo de QR code "BAIXAR", adesivos (check em flor, carteira). |
| 5 | Seções brancas | Duas seções com ilustração de um lado e título enorme do outro: "DIVIDE EM 3 TOQUES" e "PIX NA HORA, SEM CLIMÃO". |
| 6 | Carrossel | Cartões coloridos (laranja, amarelo, azul, lilás): "RACHA O DELIVERY", "MERCADO DA REP", "VIAGEM DE FORMATURA", "VAQUINHA DO PRESENTE", com adesivo em cada um e bolinhas de navegação. |
| 7 | Faixa final | Fundo preto, "BAIXA O RACHA" repetido em blocos coloridos inclinados rolando devagar, adesivos por cima, fita 3D. |
| 8 | Rodapé | Aviso de marca fictícia, fins estudantis (Front-End, CP5) e crédito da referência (Slush, via refero). |

## Fita 3D
- Feita em **Three.js** (via CDN, versão fixa): um tubo seguindo uma curva em "S", azul `#4da2ff`, com textura granulada gerada no código, sem imagens.
- Aparece no hero, nos celulares e na faixa final, cada uma com sua curva.
- Gira de leve com a rolagem e só renderiza quando está visível.
- Se o WebGL falhar, a página continua funcionando sem a fita. Para quem pede menos movimento no sistema, ela fica parada.

## Visual
- **Cores:** as 11 da ficha da referência, em variáveis CSS (detalhes em `paleta-e-tipografia.md`). Sem sombra e sem gradiente.
- **Fontes:** Anton no lugar de Lateral (paga) para os títulos, inclinada com `skew` onde a referência usa itálico. Satoshi (Fontshare) no lugar de Aeonik Pro (paga) para o resto.
- **Adesivos:** SVGs próprios (moeda, pizza, comanda, carteira, check em flor, copo), com contorno preto e "espessura" embaixo.
- **Contorno preto de 1px** em botões, pílulas e cartões. Pílulas totalmente arredondadas e cartões com 20 a 40px.
- **Movimento:** só o marquee, a fita, o carrossel e o hover dos botões.

## Stack e arquivos
HTML, CSS e JS puros, sem build. A página abre direto no navegador.

```
vibecode/
  index.html
  css/style.css
  js/main.js        (menu do "+", carrossel)
  js/fita3d.js      (fita em Three.js)
  img/adesivos/*.svg
  registros/
```

## Critérios de pronto
- Nenhum erro no console.
- Funciona no desktop e no celular (390px), sem rolagem lateral.
- Com WebGL desligado, a página continua inteira e legível.
- Com "reduzir movimento" ligado, nada anima.
- Os registros estão completos e batem com o que foi feito.

## Fora do escopo
- Login, cadastro ou qualquer funcionalidade real do app.
- Formulários que enviam dados.
- Usar logo, nome ou ilustrações da Slush.
