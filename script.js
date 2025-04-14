function adicionarItem() {
    const input = document.getElementById('inputText');
    const lista = document.getElementById('lista');
    const texto = input.value.trim();

    if (texto !== '') {
        const item = document.createElement('li');
        item.textContent = texto;
        lista.appendChild(item);
        input.value = '';
    }
}
