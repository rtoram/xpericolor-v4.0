// Atualizado: Função renderPalette
function renderPalette(colors, container) {
    container.innerHTML = '';
    colors.forEach(rgb => {
        const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

        const block = document.createElement('div');
        block.className = 'color-block';
        block.style.backgroundColor = hex;

        const colorCode = document.createElement('div');
        colorCode.className = 'color-code';
        colorCode.textContent = hex;

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copiar';
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(hex).then(() => alert(`Código ${hex} copiado!`));
        });

        block.appendChild(colorCode);
        block.appendChild(copyButton);
        container.appendChild(block);
    });
}

// Atualizado: Função de Impressão
function prepareImageAndPalette(image, palette) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height + 60; // Ajuste para paletas

    ctx.drawImage(image, 0, 0);

    palette.forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.fillRect(index * 50, image.height, 50, 50);
    });

    return canvas;
}

document.getElementById('download').addEventListener('click', () => {
    const image = document.querySelector('#image-preview img');
    const palette = history.extract[history.extract.length - 1];
    const canvas = prepareImageAndPalette(image, palette.map(rgbToHex));

    const link = document.createElement('a');
    link.download = 'palette.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
});

// Correção: Botões de refazer/desfazer
document.getElementById('undo').addEventListener('click', () => {
    if (history[currentTab].length > 1) {
        redoStack[currentTab].push(history[currentTab].pop());
        renderPalette(history[currentTab][history[currentTab].length - 1], colorPalette);
    }
});

document.getElementById('redo').addEventListener('click', () => {
    if (redoStack[currentTab].length > 0) {
        const restoredColors = redoStack[currentTab].pop();
        history[currentTab].push(restoredColors);
        renderPalette(restoredColors, colorPalette);
    }
});
