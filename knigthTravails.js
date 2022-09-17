class GameBoardMoves{
    static #adjacencyList = this.#buildAdjacencyList();

    static get adjacencyList() {
        return this.#adjacencyList;
    }

    static #buildAdjacencyList(){
        // empty 2d list of size 8 x 8
    // It will hold all possible moves in each square
        const emtpyArray = [...Array(8)].map(_=>Array(8).fill(0)) ;
        // Builds list with possible moves for each square
        // They can be accessed like this: this.#adjacencyList[0][0]
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                emtpyArray[i][j] = this.#buildList([i, j])
            }
        }
        return emtpyArray
    }

    static #buildList(position){
        const optionsArray = [];
        [1, 2].forEach((num) => {
            const other = num === 1 ? 2 : 1;

                optionsArray.push(
                [
                position[0] + num,
                position[1] + other
                ]
                );

            optionsArray.push(
                [
                position[0] - num,
                position[1] - other
                ]
                );

            optionsArray.push(
                [
                position[0] - num,
                position[1] + other
                ]
                );

            optionsArray.push(
                [
                position[0] + num,
                position[1] - other
                ]
                );
        }); 

         //filter out of bound moves
         const filteredArray = optionsArray.filter((move) =>{
            return !move.some(number => number < 0 || number > 7)
        });
        return filteredArray;
    }

   
    
    
}

class Knight{
	currentPosition;

	constructor(start){
		this.start = start;
		this.currentPosition = start;
	}

	getBoardList(){
		const list = GameBoardMoves.adjacencyList;
        return list
	}

    getShortestPath(){
        // Implement breadth first search on this.#tree
        return this.getBoardList()
	}
}

function knightMoves(start, end){
	const knight = new Knight(start);
	return knight.getShortestPath()
}

console.log(knightMoves([0, 0], [1, 2]));//[[0,0],[1,2]]
// console.log(knightMoves([3, 3], [4, 3]); // [3,3] [4,5] [2,4] [4,3]
