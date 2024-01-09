document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid-container');
    const wordFinderForm = document.getElementById('word-finder-form');
    const outputContainer = document.getElementById('output-container');

    // Create a 5x5 grid and graph
    const { grid, graph } = createGridAndGraph();

    function createGridAndGraph() {
        const grid = [];
        const graph = [];

        for (let row = 0; row < 5; row++) {
            const gridRow = [];
            const graphRow = [];

            for (let col = 0; col < 5; col++) {
                const node = document.createElement('div');
                node.className = 'grid-node';
                node.setAttribute('data-row', row);
                node.setAttribute('data-col', col);
                node.addEventListener('click', handleNodeClick);

                gridContainer.appendChild(node);

                gridRow.push({
                    letter: '',
                    node
                });

                graphRow.push({
                    letter: '',
                    neighbors: []
                });
            }

            grid.push(gridRow);
            graph.push(graphRow);
        }

        // Connect nodes horizontally, vertically, and diagonally
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (col < 4) graph[row][col].neighbors.push(graph[row][col + 1]); // Connect horizontally
                if (row < 4) graph[row][col].neighbors.push(graph[row + 1][col]); // Connect vertically
                if (row < 4 && col < 4) graph[row][col].neighbors.push(graph[row + 1][col + 1]); // Connect diagonally (bottom-right)
                if (row > 0 && col < 4) graph[row][col].neighbors.push(graph[row - 1][col + 1]); // Connect diagonally (top-right)
            }
        }

        return { grid, graph };
    }

    function handleNodeClick(event) {
        const clickedNode = event.target;
        const row = clickedNode.getAttribute('data-row');
        const col = clickedNode.getAttribute('data-col');

        // Here, you can implement logic to edit the content of the clicked node
        const newLetter = prompt('Enter a letter:');
        if (newLetter) {
            // Update both the grid and graph with the new letter
            grid[row][col].letter = newLetter;
            graph[row][col].letter = newLetter;
            clickedNode.textContent = newLetter;
        }
    }

    wordFinderForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the default form submission behavior

        // Process the entered letters and initiate DFS
        const gridLetters = grid.flat().map(node => node.letter.trim());
        const flattenedGrid = gridLetters.join('');

        // Perform DFS with the flattenedGrid
        performDFS(graph, flattenedGrid);
    });

    function performDFS(graph, grid) {
        const words = [];
        const visited = new Set();
    
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const node = graph[row][col];
                if (!visited.has(node)) {
                    // Perform DFS starting from each unvisited node
                    dfsHelper(graph, grid, row, col, '', visited, words);
                }
            }
        }
    
        // Display the list of words in the output container
        displayWords(words);
    }
    
    function dfsHelper(graph, grid, row, col, currentPath, visited, words) {
        if (row < 0 || row >= 5 || col < 0 || col >= 5 || visited.has(graph[row][col])) {
            return;
        }
    
        visited.add(graph[row][col]);
    
        const currentLetter = grid[row][col];
        const newPath = currentPath + currentLetter;
    
        // Check if the current path forms a valid word
        if (isWord(newPath)) {
            words.push(newPath);
        }
    
        // Explore neighbors
        for (const neighbor of graph[row][col].neighbors) {
            const newRow = neighbor.row;
            const newCol = neighbor.col;
            dfsHelper(graph, grid, newRow, newCol, newPath, visited, words);
        }
    
        visited.delete(graph[row][col]);
    }
    
    function isWord(path) {
        // Placeholder function to simulate word validation
        // For simplicity, let's assume all paths are valid words
        return path.length >= 3; // Consider a path with at least 3 letters as a valid word
    }

    function findWords(graph, grid) {
        // Placeholder function to simulate finding words based on the graph
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
