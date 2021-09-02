import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import QuestionBox from './components/QuestionBox'
import quizService from './OfflineAPI/quizService'
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap'
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";


class Quizbee extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        questionBank: [],
        score: 0,
        responses: 0,
        showModal: true,
    };

    setShowModal = () => {
        this.setState({
            showModal: false
        })

    }

    getQuestions = () => {
        quizService().then((question) => {
            this.setState({
                questionBank: question
            })
        })
    }

    computeAnswer = (answer, correctAnswer) => {
        if (answer == correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        })
    }

    playAgain = () => {

        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        })
    }

    componentDidMount() {
        this.getQuestions();
    }



    render() {

        return (

            <>
                <Container className="mt-5 mb-5">
                    {this.state.showModal &&
                        <Card>
                            <Card.Body>
                                <Card.Header>
                                    <Card.Title>
                                        <Row>
                                            <Col xs={6} md={10}><h1> <BsFillQuestionCircleFill /> &nbsp; Quiz starts here</h1></Col>
                                            <Col xs={6} md={2} className="mt-2"><Button variant="outline-primary" onClick={this.playAgain}>New questions</Button></Col>
                                        </Row>
                                    </Card.Title>
                                </Card.Header>

                                <Card.Text>
                                    {this.state.questionBank.length > 0 &&
                                        this.state.responses < 5 &&
                                        this.state.questionBank.map(({
                                            question, answers, correct, questionId }) => (
                                            <QuestionBox
                                                question={question}
                                                options={answers}
                                                key={questionId}
                                                selected={(answer) => this.computeAnswer(answer, correct)}
                                            />
                                        ))
                                    }

                                    {this.state.responses == 5 && this.state.showModal ?
                                        (
                                            <Modal show={true}>
                                                <Modal.Header>Result</Modal.Header>
                                                <Modal.Body><h5>you scored {this.state.score} / 5 correct answers</h5></Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="outline-primary" onClick={this.playAgain}>Play again!</Button>
                                                    <Button variant="outline-warning" onClick={this.setShowModal}>Cancel</Button>
                                                </Modal.Footer>
                                            </Modal>)
                                        : null}

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                    {!this.state.showModal &&
                        <div className="text-center m-5">
                            <h2>Thank you for attending!  < AiFillCheckCircle /></h2>
                        </div>
                    }
                </Container>
            </>
        );
    }
}

ReactDOM.render(<Quizbee />, document.getElementById("root"));
