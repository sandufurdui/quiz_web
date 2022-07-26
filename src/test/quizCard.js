import React, { Component, useState, useEffect } from 'react'
import "../style/quiz_card.css"
import { getDatabase, ref, set, child, get } from "firebase/database";
import quiz_photo from "../style/img/image.jpg"
import quiz from './quiz';
import StartQuiz from "./startQuiz"

export class quizCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: [],
            id: this.props.id,
            title: "",
            description: "",
            dificulty: 0,
            numberOfQuestions: 0,
            display: false,
            done: false,
            views: 0,
            com_num: 0,
            quiz_photo: quiz_photo,
            author_photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        };
    }

    getData = async () => {
        try {
            const dbRef = ref(getDatabase());
            await get(child(dbRef, 'quizes/' + this.state.id + "/questions")).then((snapshot) => {
                if (snapshot.exists()) {
                    const length = snapshot.size;
                    this.setState({
                        numberOfQuestions: length
                    })
                } else {
                    // console.log("No data available");
                }
            }).catch((error) => {
                console.log(error);
            })
            await get(child(dbRef, 'quizes/' + this.state.id)).then((snapshot) => {
                if (snapshot.exists()) {
                    const dd = snapshot.val()
                    this.setState({
                        quiz: dd,
                        title: this.state.quiz.title
                    })
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.log(error);
            })
        } catch (e) {
            console.log(e)
        }
        this.setState({
            title: this.state.quiz.title,
            description: this.state.quiz.description,
            display: this.state.quiz.display,
            done: true,
            com_num: this.state.quiz.comments_num,
            views: this.state.quiz.views
        })
    }


    componentDidMount = async () => {
        this.getData()
    }

    render() {
        return (
            <>
                {this.state.done && this.state.display ?
                    <div className="container">
                        <img src={quiz_photo} className="card_quiz_photo" />
                        <div className="container_info">
                            <span><i className="fas fa-eye"></i>{this.state.views}</span>
                            <span><i className="fas fa-comment-alt"></i>{this.state.com_num}</span>
                            <span><i className="fas fa-clock"></i>21m</span>
                            <span><i className="fas fa-question"></i>{this.state.numberOfQuestions}</span>
                        </div>
                        <div className="container_profile">
                            <img
                                src={this.state.author_photo}
                                alt="author"
                            />
                            <div>
                                <h2 className="capital">{this.state.title}</h2>
                                <p>by <b className="capital">this.author</b></p>
                            </div>
                            <div>
                                <StartQuiz id={this.state.id} quiz={this.state.quiz} length={this.state.numberOfQuestions} title={this.state.quiz.title} description={this.state.description} />
                            </div>
                        </div>
                    </div> :
                    null
                }
            </>
        )
    }
}

export default quizCard