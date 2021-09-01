import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import QuestionBox from './components/QuestionBox'
import Result from './components/Result'
import quizService from './OfflineAPI/quizService'

import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap'


class Quizbee extends Component {

    state = {
        questionBank: [],
        score: 0,
        responses: 0
    };

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
            <Container>
                <h1>Quiz starts here</h1>
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

                {this.state.responses == 5 ?
                (<Result score={this.state.score} playAgain={this.playAgain} />)
                : null}
            </Container>
        );
    }
}

ReactDOM.render(<Quizbee />, document.getElementById("root"));
