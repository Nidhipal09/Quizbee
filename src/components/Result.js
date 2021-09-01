import React from 'react'
import { Button } from 'react-bootstrap'


const Result = ({ score, playAgain }) => {
    return (
        <>
            <h2>you scored {score} / 5 correct answers</h2>
            {/* <button type="button" class="btn btn-outline-primary" onClick={playAgain}>Play again!</button> */}
            <Button variant="outline-primary" onClick={playAgain}>Play again!</Button>
       </>
    )

}

export default Result