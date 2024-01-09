document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid-container');

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

        console.log(row);
        console.log(col);


        // Example: Perform DFS from the clicked node
        // performDFS(row, col);
    }

    function performDFS(row, col) {
        // Implement your DFS algorithm here
        console.log('output answers here maybe')
    }
});







// for OUTPUT
document.addEventListener('DOMContentLoaded', function () {
    // Sample list of words
    const words = ['word1', 'word2', 'word3', 'word4', 'etc'];

    // Get the output container
    const outputContainer = document.getElementById('output-container');

    // Display the list of words
    words.forEach(word => {
        const wordListItem = document.createElement('div');
        wordListItem.className = 'word-list-item';
        wordListItem.textContent = word;
        outputContainer.appendChild(wordListItem);
    });
});
