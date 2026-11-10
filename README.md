# 🏺 Catálogo Digital de Perfumes Árabes VIP (Vendas via WhatsApp)

Catálogo web interativo, responsivo e *mobile-first*, desenvolvido sob medida para apresentação, divulgação e fechamento de pedidos de **perfumes árabes** diretamente pelo **WhatsApp**.

---

## 📋 Sumário
1. [Visão Geral](#-visão-geral)
2. [Últimas Atualizações & Novas Funcionalidades](#-últimas-atualizações--novas-funcionalidades)
3. [Recursos Principais do Catálogo](#-recursos-principais-do-catálogo)
4. [Lista Completa dos 43 Perfumes Catalogados](#-lista-completa-dos-43-perfumes-catalogados)
5. [Estrutura de Arquivos do Projeto](#-estrutura-de-arquivos-do-projeto)
6. [Guia de Uso Passo a Passo](#-guia-de-uso-passo-a-passo)
7. [Como Hospedar Gratuitamente na Web](#-como-hospedar-gratuitamente-na-web)
8. [Autor e Desenvolvedor](#-autor-e-desenvolvedor)

---

## 🌟 Visão Geral

O projeto transforma o acervo de fotos da pasta `fotos/` em uma vitrine digital completa. Os clientes podem navegar pelos perfumes, filtrar por categoria ou marca, pesquisar por inspirações famosas (*ex: Delina, Sauvage Elixir, Baccarat Rouge, Ultra Male*), adicionar produtos à sacola e fechar pedidos com mensagem formatada direto no WhatsApp do vendedor.

---

## 🚀 Últimas Atualizações & Novas Funcionalidades

### 📸 1. Gerador de Card de Imagem com Preço e Informações (Atualização Recente)
Ao clicar em qualquer perfume para abrir os detalhes:
- Foi adicionado o botão destacado: **`📸 Compartilhar Imagem com Preço`**.
- O sistema renderiza instantaneamente em Canvas um **Card Promocional em Alta Definição (1080 x 1350 px)** contendo:
  - Foto nítida do perfume com moldura dourada e iluminação de estúdio;
  - Marca, concentração e volumetria (*ex: LATTAFA • EAU DE PARFUM 100ML*);
  - Nome do perfume em tipografia elegante;
  - Selo dourado com a **Inspiração Olfativa de Grife** (*ex: Jean Paul Gaultier - Ultra Male*);
  - Principais notas olfativas da fragrância;
  - Chamada elegante para consulta de valores e pronta entrega;
  - Rodapé com o seu **WhatsApp de Contato** e selos de garantia (*100% Original e Pronta Entrega*).

### 📲 2. Modos de Compartilhamento do Card:
- **Compartilhar / Enviar no WhatsApp**: No celular, aciona o compartilhamento nativo já com a imagem anexada para enviar em conversas ou no **Status do WhatsApp**.
- **📋 Copiar Imagem (Ctrl+V)**: Copia a imagem diretamente para a área de transferência. Basta abrir o WhatsApp Web no computador e pressionar **`Ctrl + V`** para colar a foto com as informações.
- **💾 Baixar Imagem (PNG)**: Faz o download do arquivo de imagem (*ex: `Ramz_Lattafa_Silver_Card.png`*).
- **📝 Copiar Texto de Apoio**: Copia a legenda de vendas com emojis correspondente ao perfume.

### ⚙️ 3. Configurador de WhatsApp Integrado
- Botão **`📱 Meu WhatsApp`** no topo da página: permite ao vendedor cadastrar ou alterar seu número com DDD a qualquer momento (*ex: `5511999998888`*).
- O número fica salvo no `localStorage` do navegador para uso no compartilhamento. Os cards gerados exibem os contatos de Amélia (+55 (11) 96903-6139) e Nathaniel (+55 (11) 99736-9986); ao pedir um perfume ou consultar a sacola, o cliente escolhe um dos dois.

### 🛍️ 4. Sacola de Seleção de Perfumes (Carrinho Flutuante)
- O cliente pode escolher 2, 3 ou mais perfumes e clicar em **`Adicionar à Sacola`**.
- Gaveta lateral (*Drawer*) com controle de quantidade (+ / -) e botão para disparar a lista completa para consulta no WhatsApp.

---

## 🎯 Recursos Principais do Catálogo

* **Identificação Completa das Fotos**: Todos os 43 produtos contêm nomes reais, marcas, famílias olfativas e contratipos/inspirações de nicho.
* **Busca Inteligente em Tempo Real**: Digite qualquer termo (nome, marca, nota olfativa ou perfume de grife como *Delina*, *Sauvage*, *Baccarat*, *Morango*, *Baunilha*).
* **Filtros Rápidos**:
  * 🔥 *Todos (43)*
  * ⭐ *Mais Vendidos*
  * 🌸 *Femininos*
  * 👑 *Masculinos*
  * ✨ *Compartilháveis (Unissex)*
  * Filtro por Marcas (*Lattafa, Al Wataniah, Maison Alhambra, Le Chameau, Sea Blue, French Avenue*).
* **Zero Dependências Pesadas**: Feito em HTML5, CSS3 moderno e Vanilla JavaScript puro. Abre instantaneamente em qualquer computador ou smartphone sem precisar de servidor.

---

## 📦 Lista Completa dos 43 Perfumes Catalogados

| ID | Nome do Perfume | Marca | Volumetria | Gênero | Inspiração Olfativa / Destaque |
|:---:|:---|:---|:---:|:---:|:---|
| **01** | Durrat Al Aroos | Al Wataniah | 85ml EDP | Feminino | Doce aveludado / "Cheiro de Noiva Árabe" |
| **02** | Ramz Lattafa (Silver) | Lattafa | 100ml EDP | Masculino | Jean Paul Gaultier - Ultra Male |
| **03** | Ajayeb Dubai Portrait | Lattafa | 100ml EDP | Unissex | Manga suculenta com Osmanthus e Oud |
| **04** | Musamam White Intense | Lattafa Pride | 100ml EDP | Unissex | Perfumaria de nicho com cobra dourada escultural |
| **05** | Watani | Al Wataniah | 100ml EDP | Feminino | Floral frutado doce em frasco rendado |
| **06** | Pure Aruba (Kings & Queens) | Amaran | 100ml EDP | Unissex | Xerjoff - Erba Pura |
| **07** | Jasoor | Lattafa | 100ml EDP | Masculino | Valentino Born in Roma Coral Fantasy |
| **08** | Ameerati | Al Wataniah | 100ml EDP | Unissex | Cítrico verde nobre ("Minha Princesa") |
| **09** | Nawal Alexandrite | Al Wataniah | 100ml EDP | Feminino | Floral aveludado com framboesa e âmbar |
| **10** | Yara (Pink Tradicional) | Lattafa | 100ml EDP | Feminino | Milkshake de morango com baunilha (Viral TikTok) |
| **11** | Yara Elixir | Lattafa | 100ml EDP | Feminino | Versão densa e noturna com groselha e caramelo |
| **12** | Yara Candy | Lattafa | 100ml EDP | Feminino | Balas finas frutadas e marshmallow |
| **13** | Yara Moi (Branco) | Lattafa | 100ml EDP | Feminino | Caramelo dourado com pêssego maduro |
| **14** | Yara Tous (Amarelo) | Lattafa | 100ml EDP | Feminino | Manga tropical, coco e maracujá |
| **15** | Amante | Thoq Al Hawamer | 100ml EDP | Unissex | Frasco vinho com medalhão de cavalo árabe |
| **16** | Sultan Al Lail | Al Wataniah | 100ml EDP | Masculino | Dolce & Gabbana - K EDP ("Rei da Noite") |
| **17** | Shagaf Al Ward Gardenia | Al Wataniah | 100ml EDP | Feminino | Gardênia e flores brancas em frasco lilás |
| **18** | Shagaf Al Ward | Al Wataniah | 100ml EDP | Feminino | Kilian - Good Girl Gone Bad |
| **19** | Sabah Al Ward (Bordô) | Al Wataniah | 100ml EDP | Feminino | Cacau fino, pimenta rosa e baunilha bourbon |
| **20** | Sabah Al Ward Sugar | Al Wataniah | 100ml EDP | Feminino | Açúcar cristal, frutas vermelhas e algodão doce |
| **21** | Sabah Al Ward Delilah | Al Wataniah | 100ml EDP | Feminino | Floral aveludado misterioso em frasco roxo |
| **22** | Sabah Al Ward Garden of Eden | Al Wataniah | 100ml EDP | Feminino | Flores exóticas e folhas verdes tropicais |
| **23** | Asad (Preto Tradicional) | Lattafa | 100ml EDP | Masculino | Dior - Sauvage Elixir |
| **24** | Asad Bourbon | Lattafa | 100ml EDP | Masculino | Baunilha bourbon licorosa com tabaco |
| **25** | Asad Zanzibar | Lattafa | 100ml EDP | Masculino | Água de coco, sal marinho, lavanda e incenso |
| **26** | Asad Elixir | Lattafa | 100ml EDP | Masculino | Versão densa, amadeirada e noturna |
| **27** | Al Noble Ameer (Preto) | Lattafa | 100ml EDP | Unissex | Cabeça de cervo / Maçã, alecrim e oud nobre |
| **28** | Al Noble Wazeer (Marrom) | Lattafa | 100ml EDP | Unissex | Menta fresca com chocolate e caramelo |
| **29** | Al Noble Safeer (Verde) | Lattafa | 100ml EDP | Unissex | Frasco verde aveludado herbal nobre |
| **30** | Indomable | Sea Blue Paris | 100ml EDT | Masculino | Projétil dourado com tigre esculpido |
| **31** | Virtus X | Sea Blue Paris | 100ml EDT | Masculino | Bala prateada com águia triunfante |
| **32** | Thahaani | Al Wataniah | 100ml EDP | Unissex | Azul marinho e dourado com rosas e pêssego |
| **33** | Arabia Hamad | Le Chameau | 100ml EDP | Masculino | Frasco azul com camelo prateado na cúpula |
| **34** | Arabia The Beauty | Le Chameau | 100ml EDP | Feminino | Frasco verde esmeralda com camelo dourado |
| **35** | Afeef | Lattafa Pride | 100ml EDP | Feminino | Obra de arte com pavões dourados cravejados |
| **36** | La Rouge Baroque | Maison Alhambra | 100ml EDP | Unissex | Maison Francis Kurkdjian - Baccarat Rouge 540 |
| **37** | Attar Al Wesal | Al Wataniah | 100ml EDP | Masculino | JPG Ultra Male / Armani Code Profumo |
| **38** | Fakhar Black (Men) | Lattafa Pride | 100ml EDP | Masculino | Yves Saint Laurent - Y Eau de Parfum |
| **39** | Eqaab | Al Wataniah | 100ml EDP | Masculino | Escultura de águia com frescor oceânico |
| **40** | Shahd | Lattafa | 100ml EDP | Feminino | Narciso Rodriguez - Rouge / Poudrée |
| **41** | Fakhar White (Woman) | Lattafa Pride | 100ml EDP | Feminino | Givenchy - L'Interdit |
| **42** | Delilah Pour Femme | Maison Alhambra | 100ml EDP | Feminino | Parfums de Marly - Delina |
| **43** | Basir | French Avenue | 100ml EDP | Unissex | Apresentação em estojo rígido forrado de luxo |

---

## 📁 Estrutura de Arquivos do Projeto

```text
catalogo/
├── fotos/                           # Pasta com as fotos dos perfumes (.webp e .jpg)
│   ├── 01.webp ... 42.webp
│   └── 19_sugar.webp
├── index.html                       # Página principal do catálogo
├── styles.css                       # Estilização visual de luxo (dark/gold)
├── app.js                           # Lógica interativa, gerador de card canvas e carrinho
├── produtos.js                      # Base de dados estruturada dos 43 perfumes
├── CATALOGO_WHATSAPP.md             # Guia de vendas e mensagens prontas para WhatsApp
├── catalogo_zap.txt                 # Cardápio em texto puro para copiar e colar rápido
└── README.md                        # Documentação completa do projeto
```

---

## 📖 Guia de Uso Passo a Passo

### 1. Como Abrir o Catálogo no Computador
- Dê um duplo clique no arquivo [`index.html`](file:///c:/Users/pathe/Desktop/PERFUMES/catalogo/index.html).
- O catálogo abrirá imediatamente no seu navegador padrão (*Google Chrome, Microsoft Edge, etc.*).

### 2. Configurar o seu Número de WhatsApp
1. No topo da página, clique no botão **`📱 Meu WhatsApp`** para configurar seu número usado no compartilhamento.
2. Digite o número com o código do país (55) e o DDD.  
   *Exemplo:* `5511999998888`
3. Clique em **OK**. Os cards gerados continuam exibindo os dois contatos para pedidos: Amélia ou Nathaniel.

### 3. Como Gerar e Compartilhar a Imagem de Divulgação
1. Clique no perfume desejado para abrir a janela de detalhes (ou clique em **`📸 Card`** direto na vitrine).
2. Clique no botão **`📸 Compartilhar Imagem do Perfume`**.
3. O card em alta resolução será montado na hora com foto, notas, inspiração e contato!
4. Escolha entre:
   - **`Copiar Imagem (Ctrl+V)`**: abra o WhatsApp Web e dê Ctrl+V para colar na conversa;
   - **`Baixar Imagem (PNG)`**: salve no celular/PC para postar nos Status;
   - **`Enviar no WhatsApp`**: envie direto com legenda de apoio.

---

## 🌐 Como Hospedar Gratuitamente na Web (Link na Bio)

Se quiser enviar um link na internet para seus clientes acessarem pelo celular ou colocar na bio do Instagram:

1. Acesse **[Netlify Drop](https://app.netlify.com/drop)** (100% gratuito);
2. Arraste a pasta inteira `catalogo` para dentro do site;
3. Em 10 segundos você terá um link online (*ex: `meucatalogoarabe.netlify.app`*) para compartilhar com qualquer pessoa!

---

## 👨‍💻 Autor e Desenvolvedor

Projeto desenvolvido com excelência por **Matheus Saturno**:

* 🐙 **GitHub:** [@MatheusSaturno](https://github.com/MatheusSaturno)
* 🔗 **Perfil:** [https://github.com/MatheusSaturno](https://github.com/MatheusSaturno)
* 🚀 **Foco:** Aplicações web modernas, vitrines interativas e automação comercial para WhatsApp.
