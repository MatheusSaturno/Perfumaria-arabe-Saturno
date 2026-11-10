// Estado da Aplicação
const AppState = {
  produtos: [...PRODUTOS],
  filtroCategoria: 'todos',
  filtroMarca: 'todas',
  buscaTexto: '',
  carrinho: [],
  numeroWhatsApp: '5511999999999', // Vendedor pode alterar
  mensagemWhatsAppPendente: ''
};

const CONTATOS_WHATSAPP = [
  { nome: 'Amélia', telefone: '5511969036139' },
  { nome: 'Nathaniel', telefone: '5511997369986' }
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarConfiguracoes();
  configurarEventos();
  renderizarMarcas();
  renderizarProdutos();
  atualizarContadorCarrinho();
});

// Carregar Dados Salvos (Telefone e Carrinho)
function carregarConfiguracoes() {
  const zapSalvo = localStorage.getItem('perfumes_whatsapp_numero');

  if (zapSalvo) {
    AppState.numeroWhatsApp = zapSalvo;
  }

  const carrinhoSalvo = localStorage.getItem('perfumes_carrinho');
  if (carrinhoSalvo) {
    try {
      AppState.carrinho = JSON.parse(carrinhoSalvo);
    } catch (e) {
      AppState.carrinho = [];
    }
  }
}

function salvarCarrinho() {
  localStorage.setItem('perfumes_carrinho', JSON.stringify(AppState.carrinho));
  atualizarContadorCarrinho();
}

// Configurar Eventos da Interface
function configurarEventos() {
  // Busca em tempo real
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');

  searchInput.addEventListener('input', (e) => {
    AppState.buscaTexto = e.target.value.toLowerCase().trim();
    btnClearSearch.style.display = AppState.buscaTexto ? 'block' : 'none';
    renderizarProdutos();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    AppState.buscaTexto = '';
    btnClearSearch.style.display = 'none';
    renderizarProdutos();
  });

  // Abas de Categoria
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.filtroCategoria = btn.dataset.category;
      renderizarProdutos();
    });
  });

  // Carrinho Drawer
  const btnCartNav = document.getElementById('btnCartNav');
  const floatingCartBtn = document.getElementById('floatingCartBtn');
  const cartOverlay = document.getElementById('cartDrawerOverlay');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');

  const abrirCarrinho = () => {
    cartOverlay.classList.add('open');
    document.getElementById('cartDrawer').classList.add('open');
    renderizarItensCarrinho();
  };

  const fecharCarrinho = () => {
    cartOverlay.classList.remove('open');
    document.getElementById('cartDrawer').classList.remove('open');
  };

  btnCartNav.addEventListener('click', abrirCarrinho);
  floatingCartBtn.addEventListener('click', abrirCarrinho);
  cartOverlay.addEventListener('click', fecharCarrinho);
  btnCloseDrawer.addEventListener('click', fecharCarrinho);

  // Finalizar Compra via WhatsApp
  document.getElementById('btnCheckoutWhatsApp').addEventListener('click', finalizarPedidoWhatsApp);

  const whatsappContactOverlay = document.getElementById('whatsappContactOverlay');
  whatsappContactOverlay.addEventListener('click', (e) => {
    if (e.target === whatsappContactOverlay || e.target.closest('.modal-close')) {
      fecharSeletorWhatsApp();
    }
  });

  whatsappContactOverlay.querySelectorAll('[data-whatsapp-contact]').forEach((button) => {
    button.addEventListener('click', () => {
      abrirPedidoWhatsApp(button.dataset.whatsappContact);
    });
  });

  // Modal de Detalhes
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay') || e.target.closest('.modal-close')) {
      fecharModalDetalhes();
    }
  });
}

// Renderizar Chips de Marcas
function renderizarMarcas() {
  const container = document.getElementById('brandsFilterContainer');
  const marcas = ['todas', ...new Set(AppState.produtos.map(p => p.marca))];

  container.innerHTML = marcas.map(marca => `
    <button class="brand-chip ${AppState.filtroMarca === marca ? 'active' : ''}" data-marca="${marca}">
      ${marca === 'todas' ? 'Todas as Marcas' : marca}
    </button>
  `).join('');

  container.querySelectorAll('.brand-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.brand-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      AppState.filtroMarca = chip.dataset.marca;
      renderizarProdutos();
    });
  });
}

// Filtragem e Renderização dos Produtos
function getProdutosFiltrados() {
  return AppState.produtos.filter(p => {
    // Filtro Categoria
    if (AppState.filtroCategoria === 'destaques' && !p.destaque) return false;
    if (AppState.filtroCategoria === 'feminino' && p.categoria !== 'feminino') return false;
    if (AppState.filtroCategoria === 'masculino' && p.categoria !== 'masculino') return false;
    if (AppState.filtroCategoria === 'unissex' && p.categoria !== 'unissex') return false;

    // Filtro Marca
    if (AppState.filtroMarca !== 'todas' && p.marca !== AppState.filtroMarca) return false;

    // Busca Texto
    if (AppState.buscaTexto) {
      const termo = AppState.buscaTexto;
      const matchNome = p.nome.toLowerCase().includes(termo);
      const matchMarca = p.marca.toLowerCase().includes(termo);
      const matchInsp = (p.inspiracao || '').toLowerCase().includes(termo);
      const matchNotas = p.notas.some(n => n.toLowerCase().includes(termo));
      if (!matchNome && !matchMarca && !matchInsp && !matchNotas) return false;
    }

    return true;
  });
}

function renderizarProdutos() {
  const grid = document.getElementById('perfumesGrid');
  const countEl = document.getElementById('visibleCount');
  const filtrados = getProdutosFiltrados();

  countEl.textContent = `${filtrados.length} perfumes encontrados`;

  if (filtrados.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 40px; margin-bottom: 12px;">🔍</p>
        <h3 style="color: var(--brand-navy); margin-bottom: 6px;">Nenhum perfume encontrado</h3>
        <p>Tente buscar por outro nome, marca ou nota olfativa.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtrados.map(p => `
    <div class="perfume-card" data-id="${p.id}">
      <div class="card-image-box" onclick="abrirModalDetalhes(${p.id})">
        <img class="card-image" src="${p.imagem}" alt="${p.nome}" loading="lazy" />
      </div>

      <div class="card-content">
        <h3 class="perfume-name" onclick="abrirModalDetalhes(${p.id})">${p.nome}</h3>
        <div class="perfume-brand">${p.marca}</div>
      </div>
    </div>
  `).join('');
}

// Preparar a mensagem para pedir um produto pelo WhatsApp
function pedirProdutoWhatsApp(id) {
  const produto = AppState.produtos.find(item => item.id === id);
  if (!produto) return;

  const texto = `Olá! Vi no catálogo o perfume *${produto.nome}* (${produto.volume} - ${produto.marca}).\nGostaria de consultar o valor e a disponibilidade para pronta entrega!`;
  abrirSeletorWhatsApp(texto);
}

function abrirSeletorWhatsApp(mensagem) {
  AppState.mensagemWhatsAppPendente = mensagem;
  document.getElementById('whatsappContactOverlay').classList.add('open');
}

function fecharSeletorWhatsApp() {
  document.getElementById('whatsappContactOverlay').classList.remove('open');
  AppState.mensagemWhatsAppPendente = '';
}

function abrirPedidoWhatsApp(telefone) {
  const contatoValido = CONTATOS_WHATSAPP.some(contato => contato.telefone === telefone);
  if (!contatoValido || !AppState.mensagemWhatsAppPendente) return;

  const link = `https://wa.me/${telefone}?text=${encodeURIComponent(AppState.mensagemWhatsAppPendente)}`;
  fecharSeletorWhatsApp();
  window.open(link, '_blank', 'noopener');
}

// Copiar Texto de Divulgação Formatado para o Vendedor
function copiarTextoZap(id) {
  const p = AppState.produtos.find(prod => prod.id === id);
  if (!p) return;

  const texto =
    `✨ *${p.nome.toUpperCase()}* - ${p.marca} (${p.volume})
${p.inspiracao ? `💎 *Inspiração:* ${p.inspiracao}\n` : ''}🌸 *Família Olfativa:* ${p.notas.join(' • ')}
🌟 *Fixação:* Eau de Parfum de Altíssima Duração
📦 *100% Original e Lacrado!* Pronta Entrega.
💬 *Consulte valores e disponibilidade comigo no WhatsApp!*`;

  navigator.clipboard.writeText(texto).then(() => {
    mostrarToast(`📋 Texto do ${p.nome} copiado para colar no Zap!`);
  }).catch(() => {
    mostrarToast('❌ Não foi possível copiar.');
  });
}

// Gerenciamento da Sacola / Carrinho
function adicionarAoCarrinho(id) {
  const produto = AppState.produtos.find(p => p.id === id);
  if (!produto) return;

  const itemExistente = AppState.carrinho.find(item => item.id === id);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    AppState.carrinho.push({
      id: produto.id,
      nome: produto.nome,
      marca: produto.marca,
      volume: produto.volume,
      imagem: produto.imagem,
      quantidade: 1
    });
  }

  salvarCarrinho();
  mostrarToast(`🛍️ ${produto.nome} adicionado à sacola!`);
}

function alterarQtdCarrinho(id, delta) {
  const item = AppState.carrinho.find(i => i.id === id);
  if (!item) return;

  item.quantidade += delta;
  if (item.quantidade <= 0) {
    AppState.carrinho = AppState.carrinho.filter(i => i.id !== id);
  }

  salvarCarrinho();
  renderizarItensCarrinho();
}

function removerDoCarrinho(id) {
  AppState.carrinho = AppState.carrinho.filter(i => i.id !== id);
  salvarCarrinho();
  renderizarItensCarrinho();
}

function atualizarContadorCarrinho() {
  const totalItens = AppState.carrinho.reduce((acc, cur) => acc + cur.quantidade, 0);
  document.getElementById('navCartCount').textContent = totalItens;
  document.getElementById('floatingCartCount').textContent = totalItens;

  const floatingBtn = document.getElementById('floatingCartBtn');
  if (totalItens > 0) {
    floatingBtn.style.display = 'flex';
  } else {
    floatingBtn.style.display = 'none';
  }
}

function renderizarItensCarrinho() {
  const container = document.getElementById('cartDrawerItems');
  const totalValEl = document.getElementById('cartTotalValue');

  if (AppState.carrinho.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-msg">
        <div class="empty-cart-icon">🛍️</div>
        <h4>Sua sacola está vazia</h4>
        <p>Adicione perfumes do catálogo para fechar o pedido de uma vez só!</p>
      </div>
    `;
    totalValEl.textContent = '0 perfumes';
    return;
  }

  container.innerHTML = AppState.carrinho.map(item => {
    return `
      <div class="cart-item">
        <img src="${item.imagem}" class="cart-item-img" alt="${item.nome}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nome}</div>
          <div class="cart-item-desc" style="font-size: 12px; color: var(--gold-primary);">${item.volume} • ${item.marca}</div>
        </div>
        <div class="cart-item-qty">
          <button class="btn-qty" onclick="alterarQtdCarrinho(${item.id}, -1)">-</button>
          <span class="cart-item-count">${item.quantidade}</span>
          <button class="btn-qty" onclick="alterarQtdCarrinho(${item.id}, 1)">+</button>
        </div>
        <button class="btn-remove-item" onclick="removerDoCarrinho(${item.id})">🗑️</button>
      </div>
    `;
  }).join('');

  const totalItens = AppState.carrinho.reduce((acc, cur) => acc + cur.quantidade, 0);
  totalValEl.textContent = totalItens === 1 ? '1 perfume' : `${totalItens} perfumes`;
}

// Fechamento de Pedido Completo via WhatsApp
function finalizarPedidoWhatsApp() {
  if (AppState.carrinho.length === 0) {
    mostrarToast('⚠️ Adicione itens na sacola primeiro!');
    return;
  }

  let totalItens = 0;

  let mensagem = `🛍️ *CONSULTA DE PERFUMES - PERFUMARIA DO SATURNO*\n`;
  mensagem += `----------------------------------------\n`;

  AppState.carrinho.forEach((item) => {
    totalItens += item.quantidade;
    mensagem += `*${item.quantidade}x* ${item.nome} (${item.volume} - ${item.marca})\n`;
  });

  mensagem += `----------------------------------------\n`;
  mensagem += `📦 *Total Selecionado:* ${totalItens} perfumes\n\n`;
  mensagem += `Olá! Gostaria de consultar os valores e prazos de entrega para os perfumes acima. Estão disponíveis?`;

  abrirSeletorWhatsApp(mensagem);
}

// Modal de Detalhes do Perfume
function abrirModalDetalhes(id) {
  const p = AppState.produtos.find(prod => prod.id === id);
  if (!p) return;

  const content = document.getElementById('modalDetailsBody');
  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-wrap">
        <img src="${p.imagem}" class="modal-img" alt="${p.nome}" />
      </div>
      <div class="modal-info">
        <div class="modal-brand">${p.marca} • ${p.concentracao} (${p.volume}) • ${p.genero}${p.destaque ? ' • Mais vendido' : ''}</div>
        <h2 class="modal-title">${p.nome}</h2>
        
        ${p.inspiracao ? `
          <div class="perfume-insp" style="margin-bottom: 14px;">
            <span>✨ Inspiração:</span>
            <strong>${p.inspiracao}</strong>
          </div>
        ` : ''}

        <p class="modal-desc">${p.descricao}</p>

        <div class="modal-notes-box">
          <div class="modal-notes-title">Pirâmide Olfativa / Principais Notas:</div>
          <div class="notes-chips">
            ${p.notas.map(n => `<span class="note-tag" style="padding: 4px 10px; font-size: 12px;">🌿 ${n}</span>`).join('')}
          </div>
        </div>

        <div class="card-actions" style="margin-top: auto;">
          <button class="btn-whatsapp-order" type="button" onclick="pedirProdutoWhatsApp(${p.id})">
            📱 Pedir Agora no WhatsApp
          </button>
          <button class="btn-share-card-action" onclick="gerarECompartilharCard(${p.id})">
            📸 Compartilhar Imagem do Perfume
          </button>
          <button class="btn-sub add-to-cart" style="padding: 11px;" onclick="adicionarAoCarrinho(${p.id})">
            🛍️ Adicionar à Minha Sacola
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
}

function fecharModalDetalhes() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// Modal de Configuração do Número de WhatsApp
function abrirModalConfigZap() {
  const atual = AppState.numeroWhatsApp;
  const novo = prompt(
    '📱 Digite o seu número de WhatsApp com DDD (somente números):\nExemplo para São Paulo: 5511999998888\nExemplo para Rio: 5521999998888',
    atual
  );

  if (novo !== null && novo.trim() !== '') {
    const foneLimpo = novo.replace(/\D/g, '');
    if (foneLimpo.length >= 10) {
      AppState.numeroWhatsApp = foneLimpo;
      localStorage.setItem('perfumes_whatsapp_numero', foneLimpo);
      renderizarProdutos();
      mostrarToast(`✅ WhatsApp atualizado para: ${foneLimpo}`);
    } else {
      alert('Número inválido. Certifique-se de incluir DDD e número completo.');
    }
  }
}

// Sistema de Notificações Toast
function mostrarToast(mensagem) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = mensagem;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ==========================================
// GERADOR DE CARD DE IMAGEM PARA WHATSAPP
// ==========================================

// Formatar Telefone para Exibição
function formatarTelefone(tel) {
  const digits = (tel || '').replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('55')) {
    return `+55 (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  } else if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return tel || '';
}

// Desenhar Retângulo Arredondado
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Gerar e Abrir Card de Compartilhamento
let currentCardBlob = null;
let currentCardFileName = '';
let currentCardProduto = null;

function gerarECompartilharCard(id) {
  const p = AppState.produtos.find(prod => prod.id === id);
  if (!p) return;

  currentCardProduto = p;
  mostrarToast('🎨 Gerando imagem do perfume...');

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = p.imagem;

  img.onload = () => {
    // 1. Fundo com Gradiente de Luxo
    const grad = ctx.createLinearGradient(0, 0, 0, 1350);
    grad.addColorStop(0, '#fffefa');
    grad.addColorStop(0.55, '#f8f5ee');
    grad.addColorStop(1, '#eee7d9');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1350);

    // 2. Moldura Dourada Dupla
    ctx.strokeStyle = 'rgba(183, 131, 53, 0.75)';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, 1008, 1278);

    ctx.strokeStyle = 'rgba(183, 131, 53, 0.26)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(48, 48, 984, 1254);

    // 3. Topo / Cabeçalho
    ctx.textAlign = 'center';
    ctx.font = '700 34px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#18243a';
    ctx.fillText('PERFUMARIA DO SATURNO', 540, 92);

    ctx.font = 'italic 600 22px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#b78335';
    ctx.fillText('fragrâncias de outro mundo', 540, 124);

    // 4. Glow Dourado de Fundo para o Produto
    const glow = ctx.createRadialGradient(540, 460, 40, 540, 460, 360);
    glow.addColorStop(0, 'rgba(183, 131, 53, 0.12)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(100, 100, 880, 720);

    // 5. Caixa com Fundo Branco Suave para a Foto
    const boxW = 620;
    const boxH = 620;
    const boxX = 230;
    const boxY = 160;

    ctx.save();
    roundRect(ctx, boxX, boxY, boxW, boxH, 26);
    ctx.fillStyle = '#fffefa';
    ctx.fill();
    ctx.clip();

    // Desenhar imagem centralizada
    const aspect = img.width / img.height;
    let drawW = boxW;
    let drawH = boxH;
    let drawX = boxX;
    let drawY = boxY;

    if (aspect > 1) {
      drawH = boxW / aspect;
      drawY = boxY + (boxH - drawH) / 2;
    } else {
      drawW = boxH * aspect;
      drawX = boxX + (boxW - drawW) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    // Borda Dourada ao redor da Imagem
    ctx.strokeStyle = 'rgba(183, 131, 53, 0.65)';
    ctx.lineWidth = 3;
    roundRect(ctx, boxX, boxY, boxW, boxH, 26);
    ctx.stroke();

    // 6. Marca, Concentração e Volume
    ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#b78335';
    ctx.fillText(`${p.marca.toUpperCase()} • ${p.concentracao.toUpperCase()} (${p.volume})`, 540, 825);

    // 7. Nome do Perfume
    ctx.font = '800 46px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#18243a';
    ctx.fillText(p.nome, 540, 878);

    // 8. Selo de Inspiração Olfativa
    let nextY = 925;
    if (p.inspiracao) {
      const inspText = `✨ Inspiração: ${p.inspiracao}`;
      ctx.font = '600 23px "Plus Jakarta Sans", sans-serif';
      const textWidth = ctx.measureText(inspText).width;
      const pillW = textWidth + 48;
      const pillH = 44;
      const pillX = 540 - pillW / 2;
      const pillY = 905;

      ctx.fillStyle = 'rgba(183, 131, 53, 0.1)';
      roundRect(ctx, pillX, pillY, pillW, pillH, 22);
      ctx.fill();

      ctx.strokeStyle = '#b78335';
      ctx.lineWidth = 1.5;
      roundRect(ctx, pillX, pillY, pillW, pillH, 22);
      ctx.stroke();

      ctx.fillStyle = '#18243a';
      ctx.fillText(inspText, 540, pillY + 30);
      nextY = 985;
    }

    // 9. Principais Notas
    const notasStr = `Notas: ${p.notas.slice(0, 4).join(' • ')}`;
    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#586477';
    ctx.fillText(notasStr, 540, nextY);

    // 10. Box de Destaque / Chamada de Contato
    const callBoxW = 620;
    const callBoxH = 110;
    const callBoxX = (1080 - callBoxW) / 2;
    const callBoxY = 1035;

    ctx.fillStyle = '#f1eadc';
    roundRect(ctx, callBoxX, callBoxY, callBoxW, callBoxH, 20);
    ctx.fill();

    ctx.strokeStyle = '#b78335';
    ctx.lineWidth = 2;
    roundRect(ctx, callBoxX, callBoxY, callBoxW, callBoxH, 20);
    ctx.stroke();

    ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#8d6427';
    ctx.fillText('✨ FRAGRÂNCIA IMPORTADA ORIGINAL • ALTA FIXAÇÃO', 540, callBoxY + 42);

    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#18243a';
    ctx.fillText('CONSULTE VALORES & PRONTA ENTREGA', 540, callBoxY + 82);

    // 11. Rodapé / Contato WhatsApp
    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#18243a';
    CONTATOS_WHATSAPP.forEach((contato, index) => {
      const telefoneFormatado = formatarTelefone(contato.telefone);
      ctx.fillText(`💬 ${contato.nome}: ${telefoneFormatado}`, 540, 1205 + index * 34);
    });

    ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#586477';
    ctx.fillText('Envio Imediato • Aceitamos PIX e Cartão • Lacrado', 540, 1285);

    // 12. Salvar Dados e Abrir Modal de Compartilhamento
    const dataUrl = canvas.toDataURL('image/png');
    document.getElementById('cardPreviewImg').src = dataUrl;

    currentCardFileName = `${p.nome.replace(/[^a-zA-Z0-9]/g, '_')}_Card.png`;

    canvas.toBlob(blob => {
      currentCardBlob = blob;
      abrirModalCardShare();
    }, 'image/png');
  };

  img.onerror = () => {
    mostrarToast('❌ Erro ao carregar imagem do perfume.');
  };
}

// Abrir Modal de Compartilhamento
function abrirModalCardShare() {
  const modal = document.getElementById('cardShareModalOverlay');
  if (modal) {
    modal.classList.add('open');
  }

  // Configurar Botões do Modal
  const btnShareNative = document.getElementById('btnShareNative');
  const btnDownloadCardImage = document.getElementById('btnDownloadCardImage');
  const btnCopyCardImage = document.getElementById('btnCopyCardImage');
  const btnCopyCardText = document.getElementById('btnCopyCardText');

  // 1. Compartilhar / Enviar no WhatsApp
  btnShareNative.onclick = async () => {
    if (!currentCardBlob || !currentCardProduto) return;

    const file = new File([currentCardBlob], currentCardFileName, { type: 'image/png' });
    const p = currentCardProduto;
    const textoZap = `✨ *${p.nome.toUpperCase()}* (${p.volume} - ${p.marca})\n` +
      `${p.inspiracao ? `💎 Inspiração: ${p.inspiracao}\n` : ''}` +
      `📦 100% Original e Lacrado a Pronta Entrega.\n` +
      `👉 Chame no WhatsApp para consultar valores e disponibilidade!`;

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `${p.nome} - Perfumaria Árabe`,
          text: textoZap
        });
        mostrarToast('✅ Compartilhado com sucesso!');
        return;
      } catch (err) {
        console.log('Compartilhamento cancelado ou não suportado:', err);
      }
    }

    // Fallback: Copia a imagem para o clipboard e abre o WhatsApp
    await copiarCardParaClipboard();
    const fone = AppState.numeroWhatsApp.replace(/\D/g, '');
    const linkZap = `https://wa.me/${fone}?text=${encodeURIComponent(textoZap)}`;
    window.open(linkZap, '_blank');
    mostrarToast('📋 Imagem copiada! Pressione Ctrl+V no WhatsApp.');
  };

  // 2. Baixar Imagem PNG
  btnDownloadCardImage.onclick = () => {
    if (!currentCardBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(currentCardBlob);
    a.download = currentCardFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    mostrarToast('💾 Imagem baixada com sucesso!');
  };

  // 3. Copiar Imagem para Área de Transferência
  btnCopyCardImage.onclick = async () => {
    await copiarCardParaClipboard();
  };

  // 4. Copiar Texto
  btnCopyCardText.onclick = () => {
    if (currentCardProduto) {
      copiarTextoZap(currentCardProduto.id);
    }
  };
}

// Fechar Modal de Compartilhamento
function fecharModalCardShare() {
  const modal = document.getElementById('cardShareModalOverlay');
  if (modal) {
    modal.classList.remove('open');
  }
}

// Copiar Imagem do Card para o Clipboard (Ctrl+V)
async function copiarCardParaClipboard() {
  if (!currentCardBlob) return;

  try {
    const item = new ClipboardItem({ 'image/png': currentCardBlob });
    await navigator.clipboard.write([item]);
    mostrarToast('📋 Imagem copiada! Pressione Ctrl+V no WhatsApp.');
  } catch (err) {
    console.warn('Erro ao copiar imagem diretamente para clipboard:', err);
    // Fallback: Baixa a imagem
    const a = document.createElement('a');
    a.href = URL.createObjectURL(currentCardBlob);
    a.download = currentCardFileName;
    a.click();
    mostrarToast('💾 Imagem salva no seu dispositivo!');
  }
}

// Fechar Modal ao clicar fora
document.addEventListener('DOMContentLoaded', () => {
  const shareOverlay = document.getElementById('cardShareModalOverlay');
  if (shareOverlay) {
    shareOverlay.addEventListener('click', (e) => {
      if (e.target === shareOverlay) {
        fecharModalCardShare();
      }
    });
  }
});
