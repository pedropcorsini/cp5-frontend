// RACHA | fita 3D azul granulada (Three.js)
// Script comum (não módulo) para a página funcionar aberta direto do arquivo.
// O Three.js entra por import dinâmico; se algo falhar, a página segue sem a fita.

(async () => {
  const canvases = [...document.querySelectorAll('canvas.fita')];
  if (!canvases.length) return;

  let THREE;
  try {
    THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  } catch (erro) {
    document.documentElement.classList.add('sem-fita');
    return;
  }

  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Curvas em coordenadas relativas à tela: x e y de -1 a 1 são as bordas,
  // z é medido em "meias alturas". Pontos fora de -1..1 ficam fora da tela.
  // raio é proporcional ao menor lado da tela.
  const CURVAS = {
    hero: {
      raio: 0.2,
      pontos: [
        [-0.05, 1.45, -0.6], [-0.35, 0.78, -0.3], [-0.86, 0.28, 0], [-0.92, -0.38, 0.2],
        [-0.45, -0.72, 0.3], [0.25, -0.64, 0.2], [0.72, -0.22, 0], [0.62, 0.36, -0.3],
        [0.86, 0.82, -0.4], [1.45, 1.0, -0.5],
      ],
    },
    celulares: {
      raio: 0.2,
      pontos: [
        [-0.62, 0.6, 0], [-0.58, 0.18, 0.2], [-0.22, -0.18, 0.2], [0.28, -0.02, 0],
        [0.64, 0.52, -0.2], [0.95, 1.5, -0.4],
      ],
    },
    faixa: {
      raio: 0.13,
      pontos: [
        [-1.45, -0.9, -0.4], [-0.6, 0.62, 0], [0.08, -0.25, 0.2], [0.7, 0.68, 0], [1.45, -0.45, -0.4],
      ],
    },
  };

  const DISTANCIA_CAMERA = 12;
  const CAMPO_DE_VISAO = 30;
  const meiaAlturaVisivel = Math.tan(THREE.MathUtils.degToRad(CAMPO_DE_VISAO / 2)) * DISTANCIA_CAMERA;

  // Textura de "espuma": pontinhos claros e escuros num cinza médio, usada como relevo
  function criarTexturaGranulada() {
    const tamanho = 256;
    const tela = document.createElement('canvas');
    tela.width = tela.height = tamanho;
    const ctx = tela.getContext('2d');
    ctx.fillStyle = 'rgb(128,128,128)';
    ctx.fillRect(0, 0, tamanho, tamanho);

    for (let i = 0; i < 2600; i++) {
      const tom = Math.random() < 0.5 ? 40 + Math.random() * 50 : 170 + Math.random() * 80;
      const raio = 0.6 + Math.random() * 2.2;
      const x = Math.random() * tamanho;
      const y = Math.random() * tamanho;
      ctx.fillStyle = `rgb(${tom},${tom},${tom})`;
      // desenha também nas bordas opostas para a textura emendar sem costura
      for (const dx of [-tamanho, 0, tamanho]) {
        for (const dy of [-tamanho, 0, tamanho]) {
          ctx.beginPath();
          ctx.arc(x + dx, y + dy, raio, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const textura = new THREE.CanvasTexture(tela);
    textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
    return textura;
  }

  try {
    iniciar();
  } catch (erro) {
    // qualquer falha na montagem: a página segue sem a fita
    document.documentElement.classList.add('sem-fita');
  }

  function iniciar() {
    const texturaBase = criarTexturaGranulada();

    function criarFita(canvas, config) {
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch (erro) {
        return null;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const cena = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(CAMPO_DE_VISAO, 1, 0.1, 100);
      camera.position.z = DISTANCIA_CAMERA;

      cena.add(new THREE.HemisphereLight(0xffffff, 0x1d4fc4, 2.1));
      const sol = new THREE.DirectionalLight(0xffffff, 2.2);
      sol.position.set(-4, 6, 8);
      cena.add(sol);

      const textura = texturaBase.clone();
      const material = new THREE.MeshStandardMaterial({
        color: '#4da2ff',
        roughness: 0.92,
        metalness: 0,
        bumpMap: textura,
        bumpScale: 1.6,
      });

      const grupo = new THREE.Group();
      cena.add(grupo);

      const fita = {
        canvas,
        visivel: false,
        giroAtual: 0,
        montar,
        desenhar,
      };

      function montar() {
        const largura = canvas.clientWidth;
        const altura = canvas.clientHeight;
        if (!largura || !altura) return;

        renderer.setSize(largura, altura, false);
        camera.aspect = largura / altura;
        camera.updateProjectionMatrix();

        const meiaAltura = meiaAlturaVisivel;
        const meiaLargura = meiaAltura * camera.aspect;
        const raio = config.raio * Math.min(meiaAltura, meiaLargura);

        const pontos = config.pontos.map(
          ([x, y, z]) => new THREE.Vector3(x * meiaLargura, y * meiaAltura, z * meiaAltura)
        );
        const curva = new THREE.CatmullRomCurve3(pontos, false, 'centripetal');

        // limpa a versão anterior (o resize refaz tudo)
        grupo.children.forEach((malha) => malha.geometry.dispose());
        grupo.clear();

        const tubo = new THREE.TubeGeometry(curva, 700, raio, 56, false);
        grupo.add(new THREE.Mesh(tubo, material));

        // pontas arredondadas, como a fita da referência
        const esfera = new THREE.SphereGeometry(raio, 56, 28);
        [pontos[0], pontos[pontos.length - 1]].forEach((ponto) => {
          const ponta = new THREE.Mesh(esfera, material);
          ponta.position.copy(ponto);
          grupo.add(ponta);
        });

        // grão com o mesmo tamanho ao longo de todo o tubo
        const voltas = 1.5;
        textura.repeat.set((curva.getLength() / (2 * Math.PI * raio)) * voltas, voltas);
        textura.needsUpdate = true;

        desenhar(true);
      }

      function desenhar(forcar = false) {
        if (!forcar && !fita.visivel) return;

        let alvo = 0;
        if (!reduzirMovimento.matches) {
          const caixa = canvas.getBoundingClientRect();
          // -1 quando a seção está abaixo da tela, 1 quando já passou
          alvo = THREE.MathUtils.clamp(
            (window.innerHeight / 2 - (caixa.top + caixa.height / 2)) / window.innerHeight,
            -1,
            1
          );
        }
        fita.giroAtual += (alvo - fita.giroAtual) * (forcar ? 1 : 0.08);

        grupo.rotation.y = fita.giroAtual * 0.35;
        grupo.rotation.x = fita.giroAtual * -0.12;
        grupo.position.y = fita.giroAtual * 0.4;

        renderer.render(cena, camera);
      }

      return fita;
    }

    const fitas = canvases
      .map((canvas) => criarFita(canvas, CURVAS[canvas.dataset.fita]))
      .filter(Boolean);

    if (!fitas.length) {
      document.documentElement.classList.add('sem-fita');
      return;
    }

    fitas.forEach((fita) => fita.montar());

    // Só desenha o que está na tela
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          const fita = fitas.find((item) => item.canvas === entrada.target);
          fita.visivel = entrada.isIntersecting;
          if (fita.visivel) fita.desenhar(true);
        });
      },
      { rootMargin: '120px 0px' }
    );
    fitas.forEach((fita) => observador.observe(fita.canvas));

    // Refaz a curva quando o tamanho muda
    const observadorTamanho = new ResizeObserver((entradas) => {
      entradas.forEach((entrada) => {
        fitas.find((item) => item.canvas === entrada.target).montar();
      });
    });
    fitas.forEach((fita) => observadorTamanho.observe(fita.canvas));

    // Giro leve com a rolagem (desligado em "reduzir movimento")
    function quadro() {
      if (!reduzirMovimento.matches) fitas.forEach((fita) => fita.desenhar());
      requestAnimationFrame(quadro);
    }
    requestAnimationFrame(quadro);

    reduzirMovimento.addEventListener('change', () => fitas.forEach((fita) => fita.desenhar(true)));
  }
})();
