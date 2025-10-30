window.onload = function() {
    const image1 = document.getElementById('img1');
    const image2 = document.getElementById('img2');
    const image3 = document.getElementById('img3');
    const basketDiv = document.getElementById('basket');
    const basketStat = document.getElementById('basketstat');
    const changeTextColorButton = document.getElementById('chtext');
    const changeBackgroundColorButton = document.getElementById('bccol');
    const textParagraph = document.getElementById('text1');
    const bodyElement = document.getElementById('bd');

    const colorModal = document.getElementById('colorModal');
    const colorInput = document.getElementById('colorInput');
    const applyBtn = document.getElementById('applyBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    let currentTarget = null; 

    function updateBasketStatus() {
        const flowerCount = basketDiv.querySelectorAll('img').length; 
        basketStat.textContent = `The flower basket currently contains ${flowerCount} flowers.`;
    }

    function addFlowerToBasket(event) {
        const originalImage = event.target;
        const newFlower = originalImage.cloneNode(true);

        newFlower.removeAttribute('id');
        newFlower.addEventListener('click', removeFlowerFromBasket);

        basketDiv.appendChild(newFlower);

        updateBasketStatus();
    }

    function removeFlowerFromBasket(event) {
        if (event.target.tagName === 'IMG') {
            event.target.remove();
            updateBasketStatus();
        }
    }

    function showColorPicker(target) {
        currentTarget = target; 
        colorInput.value = '';
        colorModal.style.display = 'flex';
        colorInput.focus();
    }

    function hideColorPicker() {
        colorModal.style.display = 'none';
        colorInput.value = '';
        currentTarget = null;
    }

    function applyColor() {
        const color = colorInput.value.trim();
        
        if (color) {
            if (currentTarget === 'text') {
                textParagraph.style.color = color;
            } else if (currentTarget === 'background') {
                bodyElement.style.backgroundColor = color;
            }
        }
        hideColorPicker();
    }

    image1.addEventListener('click', addFlowerToBasket);
    image2.addEventListener('click', addFlowerToBasket);
    image3.addEventListener('click', addFlowerToBasket);

    changeTextColorButton.addEventListener('click', () => showColorPicker('text'));
    changeBackgroundColorButton.addEventListener('click', () => showColorPicker('background'));
    
    cancelBtn.addEventListener('click', hideColorPicker);
    applyBtn.addEventListener('click', applyColor);
    
    colorInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyColor();
        }
    });

    updateBasketStatus(); 
};
