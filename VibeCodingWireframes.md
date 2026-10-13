# Wireframes de baixa fidelidade

Layouts textuais do protótipo, baseados no [PRD](./VibeCodingPRD.md). A navegação permanece em um menu lateral, conforme definido no PRD. Os exemplos usam frutas e preços fictícios em reais do conjunto de demonstração.

## 1. Products

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Products                                     |
|----------------------|----------------------------------------------|
| > Products           | 🍎 Maçã       R$ 8,90/kg   Qtd [- 1 +] [Add] |
|   ProductDetails     | 🍌 Banana     R$ 6,50/kg   Qtd [- 1 +] [Add] |
|   ShoppingCart       | 🍊 Laranja    R$ 5,90/kg   Qtd [- 1 +] [Add] |
|   Checkout           | 🍓 Morango    R$12,90/caixa Qtd [- 1 +] [Add]|
|                      | ... (mais frutas; 10 no total)                |
+----------------------+----------------------------------------------+
```

Selecionar o nome, emoji ou ação **Details** de um produto abre ProductDetails. **Add** adiciona ao carrinho a quantidade escolhida, sem sair do catálogo.

## 2. ProductDetails

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | ProductDetails                               |
|----------------------|----------------------------------------------|
|   Products           | 🍓 Morango                                   |
| > ProductDetails     | Morangos frescos, aromáticos e doces.        |
|   ShoppingCart       | Preço: R$ 12,90/caixa                        |
|   Checkout           |                                              |
|                      | [Back to Products]                          |
+----------------------+----------------------------------------------+
```

O botão **Back to Products** retorna ao catálogo. Se nenhum produto válido estiver selecionado, mostrar uma mensagem e manter disponível a ação para voltar ao catálogo.

## 3. ShoppingCart

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | ShoppingCart                                 |
|----------------------|----------------------------------------------|
|   Products           | Itens do carrinho:                           |
|   ProductDetails     | 🍎 Maçã  Qtd [- 2 +]  R$ 17,80  [Remove]     |
| > ShoppingCart (2)   | 🍌 Banana Qtd [- 1 +] R$  6,50  [Remove]     |
|   Checkout           | ------------------------------------------   |
|                      | Subtotal:                         R$ 24,30   |
|                      | [Continue Shopping] [Proceed to Checkout]   |
+----------------------+----------------------------------------------+
```

As quantidades atualizam os subtotais e o total imediatamente. **Remove** exclui o item. Se o carrinho estiver vazio, mostrar a mensagem “Seu carrinho está vazio” e a ação **Ver Products**.

## 4. Checkout

```text
+----------------------+----------------------------------------------+
| FRUIT SHOP           | Checkout                                     |
|----------------------|----------------------------------------------|
|   Products           | Resumo do pedido:                            |
|   ProductDetails     | 🍎 Maçã   x2   R$ 17,80                      |
|   ShoppingCart (2)   | 🍌 Banana x1   R$  6,50                      |
| > Checkout           | ------------------------------------------   |
|                      | Total:                            R$ 24,30   |
|                      | [Process Order]                              |
+----------------------+----------------------------------------------+
```

**Process Order** mostra uma confirmação fictícia e limpa o carrinho. Não há cobrança nem envio real do pedido. Se o carrinho estiver vazio, informar que não há itens para processar e oferecer um retorno a Products.

## 5. Menu lateral

O menu oferece navegação direta entre as quatro páginas e destaca a página atual.

### Expandido

```text
+----------------------+
| FRUIT SHOP           |
| > Products           |
|   ProductDetails     |
|   ShoppingCart   (2) |
|   Checkout           |
+----------------------+
```

### Recolhido — largura abaixo de 300 px

```text
+------+
| FS   |
| [P]  |
| [D]  |
| [SC] |
| [CO] |
+------+
```

Os rótulos curtos correspondem a Products, ProductDetails, ShoppingCart e Checkout. Manter nomes acessíveis (`aria-label`) e dicas com o nome completo para identificar os itens; destacar visualmente a página atual. A navegação deve continuar funcional no modo recolhido.
