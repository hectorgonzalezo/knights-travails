class GameBoardMoves {
  static #adjacencyList = this.#buildAdjacencyList();

  static get adjacencyList() {
    return this.#adjacencyList;
  }

  static #buildAdjacencyList() {
    // empty 2d list of size 8 x 8
    // It will hold all possible moves in each square
    const adjacencyArray = [...Array(8)].map((_) => Array(8).fill(0));
    // Builds list with possible moves for each square
    // They can be accessed like this: this.#adjacencyList[0][0]
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        adjacencyArray[i][j] = this.#buildList([i, j]);
      }
    }
    return adjacencyArray;
  }

  static #buildList(position) {
    const optionsArray = [];
    [1, 2].forEach((num) => {
      const other = num === 1 ? 2 : 1;

      optionsArray.push([position[0] + num, position[1] + other]);

      optionsArray.push([position[0] - num, position[1] - other]);

      optionsArray.push([position[0] - num, position[1] + other]);

      optionsArray.push([position[0] + num, position[1] - other]);
    });

    // . filter out of bound moves
    const filteredArray = optionsArray.filter((move) => {
      return !move.some((number) => number < 0 || number > 7);
    });
    return filteredArray;
  }
}

class Knight {
  currentPosition;

  #queue = [];

  #tree = {};

  // Prints and returns the shortest path between start and end;
  static moves(start, end) {
    const knight = new Knight(start);
    const shortestPath = knight.getShortestPath(end);
    knight.prettyPrint(shortestPath);
    return shortestPath;
  }

  constructor(start) {
    this.start = start;
    this.currentPosition = start;
    this.#queue[0] = [this.start];
    this.#tree.root = this.start;
  }

  getShortestPath(end) {
    if (end === undefined) {
      throw new Error("No end provided in getShortestPath()");
    }
    const currentPath = this.#queue[0];
    const currentMove = currentPath[this.#queue[0].length - 1];

    // Breadth-first search
    // Base case, if element to be searched is end, return it
    if (currentMove.toString() === end.toString()) {
      return currentPath;
    }

    // build an array for every case
    const availableMoves =
      GameBoardMoves.adjacencyList[currentMove[0]][currentMove[1]];

    // En#queue children
    availableMoves.forEach((move) => {
      // keep track of the path so far for each branch
      const copyOfParentPath = [...currentPath];
      copyOfParentPath.push(move);
      this.#queue.push(copyOfParentPath);
    });

    // Dequeue currentMove
    this.#queue.shift();

    // Recursively search #queue
    const endMove = this.getShortestPath(end);

    return endMove;
  }

  prettyPrint(path) {
    let pathString = `You made it in ${path.length} moves!  Here's your path: \n`;
    path.forEach((move) => {
      pathString += `[${move[0]}, ${move[1]}]\n`;
    });
    console.log(pathString);
  }
}

// Knight.moves([0, 0], [1, 2]); //[[0,0],[1,2]]
// Knight.moves([3, 3], [4, 3]); // [3,3] [4,5] [2,4] [4,3]
// Knight.moves([0, 4], [7, 7])

export default Knight;
