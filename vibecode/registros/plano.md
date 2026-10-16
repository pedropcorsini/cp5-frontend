# Plano de implementação

> Plano escrito pela IA a partir de `ideia-e-escopo.md`, antes do código. Cada tarefa termina com uma verificação no navegador.

**Objetivo:** construir a landing page do RACHA no estilo da referência Slush.

**Arquitetura:** uma página estática (`index.html`), um CSS com os tokens da ficha em variáveis, um JS para a interface (menu, carrossel, header) e um módulo separado para a fita 3D em Three.js. Os adesivos são SVGs em arquivos próprios.

**Stack:** HTML, CSS e JS puros. Three.js 0.160.0 via jsDelivr (import map). Anton (Google Fonts) e Satoshi (Fontshare).

## Regras globais
- Só cores da ficha (as telas do app podem usar tons escuros do roxo).
- Sem `box-shadow` e sem gradiente.
- Botão de ação preto ou com contorno preto, nunca azul.
- Contorno preto de 1px em botões, pílulas e cartões. Pílulas com `border-radius: 1600px`, cartões de 20 a 40px.
- Títulos em Anton com `line-height` entre 0.75 e 0.80.
- Textos em português, sem travessão.

## Riscos que a IA vai testar de propósito
1. **Rolagem lateral no celular:** os títulos gigantes e os adesivos podem vazar da tela. Teste: em 390px, `document.documentElement.scrollWidth` igual à largura da janela.
2. **WebGL indisponível:** a página não pode quebrar. Teste: forçar falha na criação do renderer e conferir se não há erro no console e se o resto aparece.
3. **Reduzir movimento:** o marquee, a faixa final e a fita precisam ficar parados. Teste: emular `prefers-reduced-motion: reduce`.
4. **Menu "+" no teclado:** abrir com Enter, fechar com Esc e ao clicar num link, com `aria-expanded` certo.
5. **Desempenho da fita:** três canvas 3D na mesma página. Só renderiza o que estiver visível (IntersectionObserver).

## Arquivos
| Arquivo | Responsabilidade |
|---|---|
| `vibecode/index.html` | Estrutura e textos de todas as seções |
| `vibecode/css/style.css` | Tokens, layout, componentes, responsivo |
| `vibecode/js/main.js` | Header que encolhe, menu "+", carrossel com bolinhas |
| `vibecode/js/fita3d.js` | Fita 3D: curvas, textura granulada, render só quando visível |
| `vibecode/img/adesivos/*.svg` | moeda, moeda-r, pizza, comanda, carteira, check-flor, copo |
| `vibecode/img/qr-code.svg` | QR code real (aponta para o repositório do trabalho) |

## Tarefas

### Tarefa 1. Base
- [x] `index.html` com o esqueleto das seções, fontes e import map do Three.js.
- [x] `style.css` com os tokens da ficha, fundo preto, painéis arredondados de 30px, marquee no topo e header fixo (logo, pílulas, "+", CTA).
- [x] Menu "+" com `aria-expanded`, Esc e fechamento ao clicar num link.
- [x] Verificar: abre sem erro, marquee rola, menu funciona no teclado.

### Tarefa 2. Adesivos
- [x] Desenhar os 7 SVGs com contorno preto e a "espessura" embaixo (a mesma forma deslocada, num tom mais escuro e chapado, sem gradiente).
- [x] Gerar o QR code em SVG com Python (`qrcode`).
- [x] Verificar: abrir cada SVG e conferir o desenho.

### Tarefa 3. Painel azul (hero, celulares, escada)
- [x] Hero: "RACHA" gigante, adesivos posicionados em porcentagem sobre o título, frase e dois botões.
- [x] Celulares em CSS com as telas "Conta do rolê" e "Quem deve quem".
- [x] Escada tipográfica "TODO ROLÊ / TEM CONTA / RACHA NO APP" com o cartão de QR roxo.
- [x] Verificar no desktop e em 390px.

### Tarefa 4. Painel branco, carrossel, faixa final e rodapé
- [x] Duas seções de ilustração e título: "DIVIDE EM 3 TOQUES" e "PIX NA HORA, SEM CLIMÃO".
- [x] Carrossel com `scroll-snap`, cartões coloridos e bolinhas que acompanham a rolagem.
- [x] Faixa final com duas fileiras de blocos "BAIXA O RACHA" rolando em sentidos opostos.
- [x] Rodapé com aviso de marca fictícia, fins estudantis e créditos.
- [x] Verificar no desktop e em 390px.

### Tarefa 5. Fita 3D
- [x] `fita3d.js`: um `TubeGeometry` sobre uma `CatmullRomCurve3`, com a curva em coordenadas relativas ao tamanho da tela e refeita no resize.
- [x] Textura granulada gerada num `<canvas>` e usada como `bumpMap`.
- [x] Giro leve conforme a rolagem; renderiza só quando visível; parada com "reduzir movimento"; sai sem erro se o WebGL falhar.
- [x] Verificar os riscos 2, 3 e 5.

### Tarefa 6. Revisão final
- [x] Rodar os 5 testes de risco.
- [x] Atualizar `prompts.md` e `decisoes.md` com o que aconteceu de verdade.
