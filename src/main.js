import './style.css';
import Knight from './knigthTravails';

const view = (
    function(){
        
        function chooseSquare(square){
            square.classList.add('chosen')
        }

        function deactivateSquare(square){
            square.classList.add('inactive')
        }

        function resetSquare(square){
            square.classList.remove('inactive');
            square.classList.remove('chosen');
        }

        return { chooseSquare, deactivateSquare, resetSquare }
    }
 )()

 const controller = (
    function(){
        const squares = document.querySelectorAll('.square');
        const resetButton = document.querySelector('button')
        let clickCount = 0;
        let start;
        let end;

        function squareOnClick(pointer){
            const square = pointer.target;
            view.chooseSquare(square);
            if(clickCount === 1){
                // After second click, stop square selection
                squares.forEach(square => {
                    square.removeEventListener('click', squareOnClick)
                    view.deactivateSquare(square)
                })
                // Run knights travails
                view.renderPath()
            } else {
            // Prevent double click
            square.removeEventListener('click', squareOnClick)
            clickCount++
            }
        }

        function restart(){
            squares.forEach(square => {
                view.resetSquare(square)
                square.addEventListener('click', squareOnClick)
                clickCount = 0;
                start = undefined;
                end = undefined;
            }
            )
        }

        squares.forEach(square => square.addEventListener('click', squareOnClick))

        resetButton.addEventListener('click', restart)

    }
 )(); 


