document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid-container');
    const wordFinderForm = document.getElementById('word-finder-form');
    const outputContainer = document.getElementById('output-container');

    // Create a 5x5 grid
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const node = document.createElement('div');
            node.className = 'grid-node';
            node.setAttribute('data-row', row);
            node.setAttribute('data-col', col);

            // Add a click event listener to handle node clicks
            node.addEventListener('click', handleNodeClick);

            gridContainer.appendChild(node);
        }
    }

    function handleNodeClick(event) {
        const clickedNode = event.target;
        const row = clickedNode.getAttribute('data-row');
        const col = clickedNode.getAttribute('data-col');

        // Here, you can implement logic to edit the content of the clicked node
        const newLetter = prompt('Enter a letter:');
        if (newLetter) {
            clickedNode.textContent = newLetter;
        }
    }

    wordFinderForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission behavior

        // Process the entered letters and initiate DFS
        const gridLetters = Array.from(document.querySelectorAll('.grid-node')).map(node => node.textContent.trim());
        const flattenedGrid = gridLetters.join('');

        // Perform DFS with the flattenedGrid
        performDFS(flattenedGrid);
    });

    function performDFS(grid) {
        // Implement your DFS algorithm here
        console.log('Performing DFS with grid:', grid);

        // Example: Display a list of words in the output container
        const words = findWords(grid);
        displayWords(words);
    }

    function findWords(grid) {
        // Placeholder function to simulate finding words based on the grid
        const words = ['word1', 'word2', 'word3', 'word4', 'etc'];
        return words;
    }

    function displayWords(words) {
        // Clear previous content in the output container
        outputContainer.innerHTML = '';

        // Display the list of words
        words.forEach(word => {
            const wordListItem = document.createElement('div');
            wordListItem.className = 'word-list-item';
            wordListItem.textContent = word;
            outputContainer.appendChild(wordListItem);
        });
    }
});
