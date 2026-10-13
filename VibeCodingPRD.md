# PRD — Protótipo de loja de frutas

## 1. Visão geral e propósito

Criar um protótipo estático de uma loja online de frutas. O usuário poderá explorar produtos, consultar detalhes, montar um carrinho e simular a conclusão de um pedido.

O objetivo é demonstrar o fluxo básico de compra, não realizar vendas reais.

## 2. Público-alvo e contexto de uso

O público-alvo são pessoas interessadas em comprar frutas online. O protótipo deve ser utilizável em computadores e em telas pequenas de celulares.

## 3. Escopo do protótipo

### Incluído

- Catálogo demonstrativo com 10 frutas.
- Páginas Products, ProductDetails, ShoppingCart e Checkout.
- Navegação entre as páginas por um menu lateral.
- Seleção e edição de quantidades no catálogo e no carrinho.
- Cálculo dos subtotais e do total.
- Confirmação fictícia ao processar um pedido.
- Layout que se adapta a telas grandes e pequenas e estilo visual básico.

### Fora do escopo

- Backend, banco de dados e autenticação.
- Pagamentos reais ou processamento efetivo de pedidos.
- Estoque, entrega, descontos ou integração com serviços externos.

## 4. Casos de uso e fluxos principais

1. O usuário visualiza a lista de frutas e escolhe uma quantidade para adicionar ao carrinho.
2. O usuário abre os detalhes de uma fruta e retorna ao catálogo.
3. O usuário consulta o carrinho, altera quantidades ou remove itens.
4. O usuário revisa o pedido no Checkout e seleciona **Process Order**.
5. O protótipo exibe uma confirmação fictícia e limpa o carrinho.

## 5. Páginas e navegação

O menu lateral deve permitir navegar entre as quatro páginas:

- **Products:** catálogo de frutas.
- **ProductDetails:** detalhes do produto selecionado.
- **ShoppingCart:** itens escolhidos e respectivos valores.
- **Checkout:** resumo final e ação para processar o pedido.

A navegação deve funcionar inteiramente no cliente. Para simplificar o protótipo, as páginas podem ser implementadas como telas de uma aplicação de página única, com rotas por hash, como `#/products` e `#/cart`.

A página ProductDetails deve apresentar o produto selecionado a partir de Products. Se não houver um produto selecionado ou o identificador não existir, deve exibir uma mensagem clara e uma ação para voltar ao catálogo.

Em larguras abaixo de **300 px**, o menu lateral deve se recolher e mostrar abreviações de uma ou duas letras. As opções devem continuar identificáveis e acessíveis, por exemplo, com rótulos acessíveis e dicas de texto.

## 6. Requisitos funcionais

### Products

- Mostrar nome, preço por unidade, emoji e um controle de quantidade para cada produto.
- Permitir adicionar ao carrinho a quantidade selecionada.
- A quantidade deve ser um número inteiro igual ou maior que 1.
- Se o produto já estiver no carrinho, adicionar à quantidade existente.

### ProductDetails

- Mostrar nome, descrição, preço por unidade e emoji do produto selecionado.
- Oferecer uma ação para retornar a Products.

### ShoppingCart

- Mostrar cada produto adicionado, sua quantidade e o subtotal da linha.
- Permitir atualizar a quantidade ou remover um produto.
- Calcular os valores usando preço unitário × quantidade.
- Mostrar uma mensagem e uma ação para voltar ao catálogo quando o carrinho estiver vazio.

### Checkout

- Mostrar nome, quantidade e subtotal de cada produto, além do total do pedido.
- Exibir a ação **Process Order**.
- Se o carrinho estiver vazio, informar que não há itens para processar e oferecer uma forma de voltar a Products.
- Ao processar um pedido com itens, exibir uma confirmação fictícia, sem efetuar pagamento, e esvaziar o carrinho.

## 7. Dados de demonstração

Usar um conjunto de dados estático com os campos: identificador, nome, descrição, preço por unidade, unidade e emoji. Os preços são valores fictícios em reais (R$).

| ID | Produto | Descrição | Preço por unidade | Emoji |
|---|---|---|---:|:---:|
| 1 | Maçã | Maçã fresca, crocante e levemente adocicada. | R$ 8,90/kg | 🍎 |
| 2 | Banana | Banana madura, macia e naturalmente doce. | R$ 6,50/kg | 🍌 |
| 3 | Laranja | Laranja suculenta, ideal para comer ou fazer suco. | R$ 5,90/kg | 🍊 |
| 4 | Morango | Morangos frescos, aromáticos e doces. | R$ 12,90/caixa | 🍓 |
| 5 | Uva | Uvas doces, sem sementes. | R$ 10,90/caixa | 🍇 |
| 6 | Abacaxi | Abacaxi doce e suculento, vendido por unidade. | R$ 7,50/unidade | 🍍 |
| 7 | Manga | Manga madura, macia e perfumada. | R$ 4,90/unidade | 🥭 |
| 8 | Melancia | Melancia refrescante, vendida por unidade. | R$ 9,90/unidade | 🍉 |
| 9 | Pera | Pera fresca, de sabor suave e textura macia. | R$ 8,20/kg | 🍐 |
| 10 | Limão | Limão fresco, de sabor cítrico e aromático. | R$ 4,50/kg | 🍋 |

O protótipo não precisa converter unidades. A quantidade representa unidades da oferta exibida; portanto, para produtos vendidos por kg, caixas ou unidade, o subtotal é o preço da oferta multiplicado pela quantidade selecionada.

## 8. Requisitos de interface e estilo

- Usar um menu de navegação à esquerda em telas com espaço suficiente.
- Adaptar a apresentação para telas menores; o protótipo não precisa ter acabamento visual totalmente polido.
- Abaixo de 300 px, recolher o menu e mostrar as abreviações definidas.
- Apresentar os produtos em cartões ou linhas legíveis, com emojis, nomes, preços e controles de quantidade.
- Usar estilo simples e visualmente agradável, com hierarquia clara entre títulos, informações e ações.
- Não depender de imagens externas: os emojis representam os produtos.

## 9. Requisitos técnicos

- Implementar como aplicação web estática, executada no navegador.
- Usar HTML, CSS e JavaScript no cliente, sem backend ou integração externa.
- Preferir JavaScript puro, sem frameworks ou dependências, salvo se necessário.
- Manter os dados das frutas em uma estrutura estática no código.
- Manter o carrinho no cliente usando `localStorage`, para preservar os itens entre mudanças de página e recarregamentos.
- Incluir instruções simples de execução, como abrir `index.html` em um navegador.

## 10. Estados, erros e validações

- Impedir quantidades menores que 1 ou inválidas.
- Exibir estados vazios para carrinho e checkout.
- Tratar identificadores de produto ausentes ou inválidos em ProductDetails.
- Atualizar subtotais e total sempre que o carrinho mudar.
- Após processar um pedido demonstrativo, mostrar confirmação e limpar o carrinho.

## 11. Critérios de aceitação

- É possível navegar entre as quatro páginas pelo menu.
- Products exibe os 10 produtos com nome, preço, emoji e controle de quantidade.
- É possível abrir os detalhes de um produto e voltar ao catálogo.
- É possível adicionar produtos ao carrinho, alterar quantidades e remover itens.
- Os subtotais e o total são recalculados corretamente.
- O Checkout mostra o resumo do pedido e oferece **Process Order**.
- Ao processar o pedido, o usuário recebe uma confirmação fictícia e o carrinho é esvaziado.
- O layout se adapta a telas grandes e pequenas; abaixo de 300 px, o menu mostra as abreviações e mantém a navegação utilizável.

## 12. Restrições, prioridades e orientação de implementação

**Essencial:** navegação, catálogo com 10 frutas, detalhes, operações do carrinho, cálculo de valores e confirmação demonstrativa do pedido.

**Opcional:** refinamentos visuais além do estilo básico e pequenos detalhes de animação.

Manter o protótipo simples e focado no fluxo principal de compra. Evitar qualquer funcionalidade que sugira pagamento real, autenticação ou envio efetivo de pedidos. Implementar primeiro o fluxo completo de navegação e compra demonstrativa e explicar como executar e testar o protótipo.
