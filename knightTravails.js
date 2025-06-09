export class chessBoard {

    //Create a chessboard with a defined size. 8 by default
    constructor(size) {
        this.size = size;
        //Array of all the possible moves the knight can make
        this.knightmoves = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
        //Create a graph for all moves that can be made from each position on the board.
        this.board = this.buildGraph();
    }

    // Creates a string of the array containing coordinates.
    toKey([x, y]) {
        return `${x},${y}`;
    }

    // Check if a position is valid
    isValid(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    // Constructs a graph for each valid position on the board.
    buildGraph() {
        const graph = {};
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const key = this.toKey([x, y]);
                graph[key] = [];

                for (const [dx, dy] of this.knightmoves) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (this.isValid(nx, ny)) {
                        graph[key].push([nx, ny]);
                    }
                }
            }
        }
        return graph;
    }

    validateInput(startKey, endKey){
    
        if (!(startKey in this.board) || !(endKey in this.board))
            throw new Error("Invalid position(s).");

        if (startKey === endKey) {
            console.log("The Knight is already at the target location.");
            return 0;
        }
        return 1;

    }
    // Main function
    knightMoves(start, end) {

        // Turn into keys
        const startKey = this.toKey(start);
        const endKey = this.toKey(end);

        //Feedback to see request.
        console.log(`Knight moves from ${startKey} to ${endKey}`);
        
        //validate the Input.
        if(this.validateInput(startKey,endKey)==0){
            return;
        }

        //Create a Set for visited nodes 
        const visited = new Set([startKey]);
        //Create a queue with a position and an array of the path taken.
        const queue = [{ pos: start, path: [start] }];


        while (queue.length > 0) { 
            const { pos, path } = queue.shift(); //Remove first element from the queue. levelOrder approach
            for (const next of this.board[this.toKey(pos)]) { //Check for each edge of that node
                const nextKey = this.toKey(next);
                if (visited.has(nextKey)) continue; //if already visited -> skip
                visited.add(nextKey); //Add to visited for future visits.

                if (nextKey === endKey) { //Path found
                    const shortestPath = [...path, next]; 
                    console.log(`You made it in ${shortestPath.length - 1} moves! Here's your path:`); 
                    console.log(shortestPath);
                    return shortestPath;
                }

                queue.push({ pos: next, path: [...path, next] }); // Path not found, add node to queue.
            }
        }

        return null;
    }
}
