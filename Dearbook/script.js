document.addEventListener('DOMContentLoaded', function() {
    // Cadastro de usuário
    if (document.getElementById('formCadastro')) {
        document.getElementById('formCadastro').addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            localStorage.setItem('usuario', JSON.stringify({ nome, email, senha }));

            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'login.html';
        });
    }

    // Autenticação de usuário
    if (document.getElementById('formLogin')) {
        document.getElementById('formLogin').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            const usuario = JSON.parse(localStorage.getItem('usuario'));
            
            if (usuario && usuario.email === email && usuario.senha === senha) {
                alert('Login bem-sucedido!');
                window.location.href = 'produtos.html';
            } else {
                alert('Email ou senha incorretos!');
            }
        });
    }

    // Gerenciamento de produtos
    if (document.getElementById('formProduto')) {
        const formProduto = document.getElementById('formProduto');
        const listaProdutos = document.getElementById('listaProdutos');

        formProduto.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomeProduto = document.getElementById('nomeProduto').value;
            const descricaoProduto = document.getElementById('descricaoProduto').value;

            let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            const id = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;
            produtos.push({ id, nome: nomeProduto, descricao: descricaoProduto });

            localStorage.setItem('produtos', JSON.stringify(produtos));
            formProduto.reset();
            renderProdutos();
        });

        function renderProdutos() {
            listaProdutos.innerHTML = '';
            const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

            produtos.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <th scope="row">${produto.id}</th>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarProduto(${produto.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">Excluir</button>
                    </td>
                `;
                listaProdutos.appendChild(tr);
            });
        }

        window.editarProduto = function(id) {
            const produtos = JSON.parse(localStorage.getItem('produtos'));
            const produto = produtos.find(prod => prod.id === id);

            if (produto) {
                document.getElementById('nomeProduto').value = produto.nome;
                document.getElementById('descricaoProduto').value = produto.descricao;

                formProduto.addEventListener('submit', function(e) {
                    e.preventDefault();
                    produto.nome = document.getElementById('nomeProduto').value;
                    produto.descricao = document.getElementById('descricaoProduto').value;

                    localStorage.setItem('produtos', JSON.stringify(produtos));
                    formProduto.reset();
                    renderProdutos();
                }, { once: true });
            }
        }

        window.excluirProduto = function(id) {
            let produtos = JSON.parse(localStorage.getItem('produtos'));
            produtos = produtos.filter(prod => prod.id !== id);

            localStorage.setItem('produtos', JSON.stringify(produtos));
            renderProdutos();
        }

        renderProdutos();
    }
});
