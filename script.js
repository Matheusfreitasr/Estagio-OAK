document.addEventListener('DOMContentLoaded', () => {
    const formSection = document.getElementById('form-section');
    const listSection = document.getElementById('list-section');
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const newProductBtn = document.getElementById('new-product-btn');
    const viewListBtn = document.getElementById('view-list-btn');
  
    let products = [];

    // Função para mostrar a listagem
    const showList = () => {
        formSection.style.display = 'none';
        listSection.style.display = 'block';
        renderProductList();
    };

    // Função para mostrar o formulário
    const showForm = () => {
        formSection.style.display = 'block';
        listSection.style.display = 'none';
    };

    // Salvar produtos no localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    // Carregar produtos do localStorage
    const loadFromLocalStorage = () => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            products = JSON.parse(storedProducts);
            renderProductList();
        }
    };

    // Renderiza a lista de produtos
    const renderProductList = () => {
        productList.innerHTML = '';

        // Ordena os produtos pelo valor
        const sortedProducts = products.sort((a, b) => a.value - b.value);

        sortedProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>R$ ${product.value.toFixed(2)}</td>
                <td style="color: ${product.available === 'sim' ? 'green' : 'red'};">
                    ${product.available === 'sim' ? 'Disponível' : 'Não tem mais estoque'}
                </td>
                <td>${product.description}</td> <!-- Adicionando a descrição do produto -->
            `;
            productList.appendChild(row);
        });
    };

    // Evento de cadastro
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('product-name').value;
        const value = parseFloat(document.getElementById('product-value').value);
        const available = document.getElementById('product-available').value;
        const description = document.getElementById('product-description').value;
        

        // Validação adicional
        if (!name || !description || !available) {
            alert('Por favor, preencha todos os campos.');
            return;
          }
    
          if (isNaN(value) || value <= 0) {
            alert('Por favor, insira um valor válido para o produto.');
            return;
          }
    
          if (products.some(product => product.name === name)) {
            alert('Produto já cadastrado!');
            return;
          }
        
          const newProduct = { name, description, value, available };
          products.push(newProduct);
          products.sort((a, b) => a.value - b.value); // Ordena imediatamente
        
          productForm.reset();
          alert('Produto cadastrado com sucesso!');
          saveToLocalStorage();
          showList();
        });

    // Botão para mostrar a lista de produtos
    newProductBtn.addEventListener('click', showList);

    // Botão para voltar ao formulário
    viewListBtn.addEventListener('click', showForm);

    // Carregar produtos salvos ao iniciar
    loadFromLocalStorage();
});
