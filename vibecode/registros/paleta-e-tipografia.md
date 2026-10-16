# Paleta e tipografia

## Paleta
Mantive as cores da ficha de estilo da Slush (`referencias/slush-style-reference.md`). A graça do estilo é usar várias cores fortes ao mesmo tempo, como uma cartela de adesivos, então nenhuma delas é "a cor de destaque".

| Cor | Hex | Variável | Onde entra no RACHA |
|---|---|---|---|
| Preto | `#000000` | `--color-carbon` | Texto, contornos, CTA principal, fundo da página |
| Branco | `#ffffff` | `--color-paper-white` | Seções brancas, botões de contorno, pílulas |
| Azul-claro | `#dceeff` | `--color-sky-wash` | Fundo do hero e das seções principais |
| Cinza | `#cccccc` | `--color-concrete-gray` | Seção de respiro entre as outras |
| Cinza-claro | `#e9e9e9` | `--color-soft-mist` | Detalhes sutis |
| Azul elétrico | `#4da2ff` | `--color-electric-blue` | Fita 3D e cartões. Nunca em botão ou link. |
| Verde | `#55db9c` | `--color-mint-pop` | Adesivo de check, cartões. Não é cor de "sucesso". |
| Lilás | `#e9ccff` | `--color-lavender` | Cartões e adesivo da comanda |
| Laranja | `#fb4903` | `--color-ember` | Adesivo da pizza, cartões |
| Amarelo | `#ffd731` | `--color-sunburst` | Moedas, cartões. Nunca como fundo de texto corrido. |
| Roxo | `#5c4ade` | `--color-voltage-violet` | Cartão de QR code, carteira, telas do app |

## Regras herdadas da referência
- Sem sombra e sem gradiente. A única profundidade é a da fita 3D.
- Botão de ação é preto ou com contorno preto, nunca azul.
- Contorno preto de 1px em tudo que é clicável.

## Tipografia
A Slush usa duas fontes pagas (Lateral e Aeonik Pro). Troquei por gratuitas parecidas:

| Na referência | No RACHA | Uso |
|---|---|---|
| Lateral 800 | **Anton** (Google Fonts) | Títulos gigantes, com `line-height` entre 0.75 e 0.80 para as letras "empilharem". Nos títulos em itálico da referência, inclino com `skew`. |
| Aeonik Pro 500/700 | **Satoshi** (Fontshare) | Texto, botões, nav e subtítulos. Botões e nav em caixa alta com `letter-spacing` de 0.032em. |
