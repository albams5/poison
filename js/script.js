document.addEventListener('DOMContentLoaded', function() {
    const url = '../data/MOCK_DATA.json';

    let currentIndex = 0;
    const itemsPerPage = 12;
    let data = [];

    async function loadJson() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            data = await response.json();
            displayItems();
        } catch (error) {
            console.error('Error al cargar el JSON:', error);
        }
    }

    function displayItems() {
        const cardContainer = document.getElementById('card-container');
        
        const nextIndex = currentIndex + itemsPerPage;
        const itemsToDisplay = data.slice(currentIndex, nextIndex);

        itemsToDisplay.forEach(item => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const cardHeader = document.createElement('span');
            cardHeader.classList.add('card-header');

            const img = document.createElement('img');
            img.classList.add('card-img');
            img.src = item.img || 'assets/4f0b82c6ad5439fb927fee13e0b53d4e.jpg';

            const title = document.createElement('h4');
            title.classList.add('card-title');
            title.textContent = item.name

            cardHeader.appendChild(img);
            cardHeader.appendChild(title);

            const text = document.createElement('p');
            text.classList.add('card-text');
            text.textContent = item.desc

            const button = document.createElement('button');
            button.classList.add('card-button');
            button.innerHTML = 'Details <img src="../assets/arrow.png" alt="Arrow" />';

            cardDiv.appendChild(cardHeader);
            cardDiv.appendChild(text);
            cardDiv.appendChild(button);

            cardContainer.appendChild(cardDiv);
        });

        currentIndex = nextIndex;

        const loadMoreButton = document.getElementById('load-more-button');
        cardContainer.appendChild(loadMoreButton);
        loadMoreButton.style.display = 'block';

        if (currentIndex >= data.length) {
            document.getElementById('load-more-button').style.display = 'none';
        }
    }

    document.getElementById('load-more-button').addEventListener('click', displayItems);

    loadJson();
});