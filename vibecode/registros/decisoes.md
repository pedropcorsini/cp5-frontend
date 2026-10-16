# Decisões de design

Cada decisão tem o porquê. Os itens marcados com (EU) foram escolhas minhas. Os outros foram propostos pela IA e aprovados por mim.

## Direção
- (EU) Referência principal: o site da Slush, tirado do styles.refero.design. Uso o estilo, não a marca.
- (EU) Tema: app fictício de finanças, para continuar no universo da referência (um app de dinheiro).
- (EU) Proposta: dividir contas entre amigos. O tom divertido combina com os adesivos.
- (EU) Nome: RACHA. Gíria de "rachar a conta", com 5 letras como SLUSH, para caber gigante no hero.
- (EU) Fita 3D feita de verdade em Three.js, e não como imagem, para se ajustar a qualquer tela.
- (EU) Stack em HTML, CSS e JS puros, sem build.

## O que veio da referência
- Tipografia gigante com entrelinha espremida (0.78 a 0.82): as palavras viram objetos.
- As seis cores fortes usadas juntas, como uma cartela de adesivos.
- Contorno preto de 1px, pílulas totalmente arredondadas e cartões com 20 a 40px de raio.
- Sem sombra e sem gradiente. A profundidade vem só da fita 3D.
- Fundo preto com as seções em "pôsteres" arredondados, como no vídeo do site.
- Ordem das seções: hero, celulares, bloco tipográfico com QR, seções de ilustração e título, carrossel de cartões e faixa final.

## Adaptações
- **Fontes gratuitas:** Anton no lugar de Lateral e Satoshi no lugar de Aeonik Pro, porque as originais são pagas. A Anton não tem itálico, então inclino com `skewX(-12deg)`.
- **Marquee lilás, não preto:** a ficha diz faixa preta, mas a página tem fundo preto e a faixa sumiria. O vídeo da referência também mostra a faixa clara.
- **Adesivos próprios:** desenhei moeda, pizza, comanda, carteira, check em flor e copo, todos ligados a "rachar a conta". Não usei foguete nem os desenhos da Slush.
- **"Espessura" dos adesivos:** a mesma forma deslocada, num tom mais escuro e chapado, imitando os adesivos 3D da referência sem usar gradiente.
- **Telas do app:** os tons escuros de roxo (`#1d1760` e `#2c2490`) são as únicas cores fora da ficha, porque a referência também mostra o app em roxo escuro.
- **QR code real:** em vez de um QR falso, ele aponta para o repositório do trabalho no GitHub.

## Decisões tomadas durante os testes
- **"SEM CLIMÃO / PIX NA HORA" em vez de "PIX NA HORA, / SEM CLIMÃO":** com a entrelinha espremida, o til e a vírgula se chocavam com a linha de cima. Mantive a entrelinha (regra da referência) e mudei a ordem, deixando a palavra acentuada na primeira linha.
- **Contorno branco no CTA do header:** sem ele, o botão preto sumia sobre a faixa preta.
- **Título do hero limitado pela altura da tela:** evita que o "RACHA" passe da tela em notebooks.
- **Fita só onde a referência tem:** hero, celulares e faixa final. As seções brancas ficam limpas, com ilustração e título.
- **Carrossel com setas e arrastar:** a rolagem nativa sozinha não funciona com mouse no desktop. A roda do mouse não mexe os cards, de propósito, para não prender a rolagem da página.
