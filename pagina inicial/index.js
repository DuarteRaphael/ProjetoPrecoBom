// Dados dos produtos
const produtos = [
  {
    id: 1,
    nome: 'Arroz Branco 5kg',
    categoria: 'mercado',
    precos: [
      { mercado: 'Guanabara', preco: 24.90 },
      { mercado: 'Extra', preco: 26.50 },
      { mercado: 'Pão de Açúcar', preco: 27.90 }
    ],
    imagem: '🍚'
  },
  {
    id: 2,
    nome: 'Feijão Preto 1kg',
    categoria: 'mercado',
    precos: [
      { mercado: 'Guanabara', preco: 8.90 },
      { mercado: 'Extra', preco: 9.20 },
      { mercado: 'Pão de Açúcar', preco: 9.50 }
    ],
    imagem: '🫘'
  },
  {
    id: 3,
    nome: 'Óleo de Soja 900ml',
    categoria: 'mercado',
    precos: [
      { mercado: 'Guanabara', preco: 7.50 },
      { mercado: 'Extra', preco: 7.80 },
      { mercado: 'Pão de Açúcar', preco: 8.20 }
    ],
    imagem: '🫗'
  },
  {
    id: 4,
    nome: 'Açúcar Cristal 1kg',
    categoria: 'mercado',
    precos: [
      { mercado: 'Guanabara', preco: 4.20 },
      { mercado: 'Extra', preco: 4.50 },
      { mercado: 'Pão de Açúcar', preco: 4.80 }
    ],
    imagem: '🍬'
  },
  {
    id: 5,
    nome: 'Café em Pó 500g',
    categoria: 'mercado',
    precos: [
      { mercado: 'Guanabara', preco: 15.90 },
      { mercado: 'Extra', preco: 16.50 },
      { mercado: 'Pão de Açúcar', preco: 17.20 }
    ],
    imagem: '☕'
  },
  {
    id: 6,
    nome: 'Leite Integral 1L',
    categoria: 'mercado',
    precos: [
      { mercado: 'Guanabara', preco: 5.50 },
      { mercado: 'Extra', preco: 5.80 },
      { mercado: 'Pão de Açúcar', preco: 6.00 }
    ],
    imagem: '🥛'
  },
  {
    id: 7,
    nome: 'Detergente Líquido',
    categoria: 'limpeza',
    precos: [
      { mercado: 'Guanabara', preco: 2.90 },
      { mercado: 'Extra', preco: 3.10 },
      { mercado: 'Pão de Açúcar', preco: 3.30 }
    ],
    imagem: '🧴'
  },
  {
    id: 8,
    nome: 'Sabão em Pó 1kg',
    categoria: 'limpeza',
    precos: [
      { mercado: 'Guanabara', preco: 12.90 },
      { mercado: 'Extra', preco: 13.50 },
      { mercado: 'Pão de Açúcar', preco: 14.20 }
    ],
    imagem: '🧼'
  },
  {
    id: 9,
    nome: 'Água Sanitária 1L',
    categoria: 'limpeza',
    precos: [
      { mercado: 'Guanabara', preco: 3.50 },
      { mercado: 'Extra', preco: 3.80 },
      { mercado: 'Pão de Açúcar', preco: 4.00 }
    ],
    imagem: '🧽'
  },
  {
    id: 10,
    nome: 'Papel Higiênico 12un',
    categoria: 'limpeza',
    precos: [
      { mercado: 'Guanabara', preco: 18.90 },
      { mercado: 'Extra', preco: 19.50 },
      { mercado: 'Pão de Açúcar', preco: 20.20 }
    ],
    imagem: '🧻'
  }
];

// Estado da aplicação
let state = {
  searchTerm: '',
  selectedCategory: 'todos',
  favorites: []
};

// Elementos do DOM
const searchInput = document.getElementById('searchInput');
const cepInput = document.getElementById('cepInput');
const btnBuscarCep = document.getElementById('btnBuscarCep');
const localizacao = document.getElementById('localizacao');
const productList = document.getElementById('productList');
const noProducts = document.getElementById('noProducts');
const categoryButtons = document.querySelectorAll('.category-btn');
const favoritesCount = document.getElementById('favoritesCount');

// Função para alternar favorito
function toggleFavorite(productId) {
  const index = state.favorites.indexOf(productId);
  if (index > -1) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push(productId);
  }
  updateFavoritesCount();
  renderProducts();
}

// Atualizar contador de favoritos
function updateFavoritesCount() {
  if (state.favorites.length > 0) {
    favoritesCount.textContent = state.favorites.length;
    favoritesCount.style.display = 'inline-block';
  } else {
    favoritesCount.style.display = 'none';
  }
}

// Buscar CEP
async function buscarCep() {
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length !== 8) {
    localizacao.textContent = 'CEP inválido. Digite um CEP válido.';
    return;
  }

  try {
    localizacao.textContent = 'Buscando localização...';

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      localizacao.textContent = 'CEP não encontrado.';
      return;
    }

    const estado = data.uf;
    const cidade = data.localidade;
    const bairro = data.bairro;

    const endereco = `${bairro}, ${cidade} - ${estado}`;

    // Atualiza texto
    localizacao.textContent = `📍 Mercados próximos a ${endereco}`;

    // Link do Google Maps
    const linkMaps = `https://www.google.com/maps/search/mercados+em+${encodeURIComponent(endereco)}`;

    // Verifica se o botão já existe
    let link = document.getElementById('linkMaps');

    if (!link) {
      link = document.createElement('a');
      link.id = 'linkMaps';
      link.target = '_blank';

      // Estilo de botão
      link.style.display = 'inline-block';
      link.style.marginTop = '10px';
      link.style.padding = '10px 15px';
      link.style.backgroundColor = '#4285F4';
      link.style.color = '#fff';
      link.style.textDecoration = 'none';
      link.style.borderRadius = '6px';
      link.style.fontWeight = 'bold';

      // Adiciona abaixo da localização
      localizacao.appendChild(link);
    }

    link.href = linkMaps;
    link.textContent = '📍 Ver mercados no Google Maps';

  } catch (error) {
    localizacao.textContent = 'Erro ao buscar o CEP.';
    console.error(error);
  }
}

// Criar card de produto
function createProductCard(product, index) {
  const isFavorite = state.favorites.includes(product.id);
  
  // Encontrar melhor preço
  const melhorPreco = product.precos.reduce((min, p) => p.preco < min.preco ? p : min);
  const economiaMax = Math.max(...product.precos.map(p => p.preco)) - melhorPreco.preco;
  
  // Gradientes rotativos
  const gradientClass = `gradient-${(index % 6) + 1}`;
  
  // Ordenar preços
  const precosSorted = [...product.precos].sort((a, b) => a.preco - b.preco);
  
  const card = document.createElement('div');
  card.className = 'product-card';
  card.style.animationDelay = `${index * 100}ms`;
  
  card.innerHTML = `
    <div class="product-header ${gradientClass}">
      <button class="favorite-btn" onclick="toggleFavorite(${product.id})">
        ${isFavorite ? '❤️' : '🤍'}
      </button>
      <div class="product-emoji">${product.imagem}</div>
      <div class="product-name">${product.nome}</div>
    </div>
    <div class="product-body">
      <div class="product-best-price">
        <span class="price-value">R$ ${melhorPreco.preco.toFixed(2)}</span>
        <span class="best-price-label">✓ Melhor preço</span>
      </div>
      <p class="best-price-store">${melhorPreco.mercado}</p>
      ${economiaMax > 0 ? `<p class="savings">💰 Economize até R$ ${economiaMax.toFixed(2)}</p>` : ''}
      
      <div class="price-comparison">
        ${precosSorted.map((preco, idx) => `
          <div class="price-item ${idx === 0 ? 'best' : ''}">
            <span class="price-store">${preco.mercado}</span>
            <span class="price-amount">R$ ${preco.preco.toFixed(2)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  return card;
}

// Filtrar produtos
function filterProducts() {
  return produtos.filter(product => {
    const matchesSearch = product.nome.toLowerCase().includes(state.searchTerm.toLowerCase());
    const matchesCategory =
      state.selectedCategory === 'todos' ? true :
      state.selectedCategory === 'favoritos' ? state.favorites.includes(product.id) :
      product.categoria === state.selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

// Renderizar produtos
function renderProducts() {
  const filteredProducts = filterProducts();
  
  productList.innerHTML = '';
  
  if (filteredProducts.length === 0) {
    noProducts.style.display = 'block';
    return;
  }
  
  noProducts.style.display = 'none';
  
  filteredProducts.forEach((product, index) => {
    const card = createProductCard(product, index);
    productList.appendChild(card);
  });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  state.searchTerm = e.target.value;
  renderProducts();
});

btnBuscarCep.addEventListener('click', buscarCep);

cepInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    buscarCep();
  }
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    state.selectedCategory = button.dataset.category;
    renderProducts();
  });
});

// Inicializar
renderProducts();
updateFavoritesCount();