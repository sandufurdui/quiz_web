import React, { Component } from 'react'
// import "../style/main.css"
// import "../style/quiz.css"
import { getDatabase, ref, child, get } from "firebase/database";
import Question from './question'
import arrayShuffle from 'array-shuffle';

export class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: { },
      index: 0,
      answers: [],
      shuffledA: [],
      id: this.props.id,
      count: 0
    }
  }
  

  componentDidMount() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'quizes/' + this.state.id)).then((snapshot) => {
      if (snapshot.exists()) {
        const dd = snapshot.val()
        // const shuffledAnsw = handleShuffle()
        this.setState({
          quiz: dd,
        })
        // console.log(this.state.quiz)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  
  handleSubmit() {
    if (this.state.index < this.state.quiz.questions.length) {
      this.setState({ 'index': this.state.index + 1 })
    } else {
      let score = this.state.score || 0
      this.state.answers.map((answer, i) => (
        score = score + this.state.quiz.questions[i].answers[answer].point
      ))
      this.setState({ 'score': score })
    }
  }

  handleAnswerSelected(event) {
    let list = [...this.state.answers.slice(0, this.state.index),
    parseInt(event.target.value),
    ...this.state.answers.slice(this.state.index + 1)]
    this.setState({
      'answers': list
    })
  }

  render() {
    const {
      quiz, index
    } = this.state
    let completed = (quiz.questions && (index === quiz.questions.length)) ? true : false
    let numberOfQuestions = quiz.questions ? quiz.questions.length : 0
    let score = 0
    if (completed) {
      this.state.answers.map((answer, i) => (
        score = score + this.state.quiz.questions[i].answers[answer].point
      ))
    }
    

    return (
      <div>
        {/* <h1>{quiz.title}{quiz.id}</h1> */}
        {completed ?
          <div><br /><h1>{this.state.quiz.title}</h1><br /><br />
            <h2>Quiz is finished!</h2><br />
            Your score is {score} out of {this.state.quiz.questions.length}
          </div>
          :
          <div>
            <h2>Question {index + 1} of {numberOfQuestions}</h2>
            {quiz.questions && index < numberOfQuestions ?
              <Question
                question={quiz.questions[index]}
                // answers={this.state.shuffledA}
                index={index}
                onAnswerSelected={(event) => this.handleAnswerSelected(event)}
                onSubmit={() => this.handleSubmit()}

              // = {this.setToFalse()}
              // changeState ={() => this.shuffleFunc()}
              />
              : ''}
          </div>
        }
      </div>
    )
  }
}

export default Quiz