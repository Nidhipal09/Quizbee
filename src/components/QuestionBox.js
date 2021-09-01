import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

const QuestionBox = ({ question, options, selected }) => {
    const [answer, setAnswer] = useState(options)
    const borderColor = ["primary" , "danger" , "info", "success" , "warning" ]
    var randomItem = borderColor[Math.floor(Math.random()*borderColor.length)];

    return (
        <Card border={randomItem} className="mb-3 border-top-0 border-end-0 border-bottom-0 border-5 shadow-sm w-60">
            <Card.Body>
                <Card.Title>
                    <h5>{question}</h5>
                </Card.Title>
                <Card.Text>
                    {answer.map((text, index) => (
                        <button type="button" className="btn btn-primary m-1" key={index} onClick={() => {
                            setAnswer([text]);
                            selected(text);
                        }}>
                            {text}
                        </button>
                    ))}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default QuestionBox;