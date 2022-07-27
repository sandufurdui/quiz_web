import React, { Component, useState, useEffect } from 'react'
import "../style/quiz_card.css"
import { getDatabase, ref, set, child, get } from "firebase/database";
import quiz_photo from "../style/img/image.jpg"
import quiz from './quiz';
import StartQuiz from "./startQuiz"

const styles = {
    card: {
        margin: '15px 10px',
        padding: 0,
        borderRadius: '16px',
    },
    small: {
        gridRowEnd: 'span 26'
    },
    medium: {
        gridRowEnd: 'span 33'
    },
    large: {
        gridRowEnd: 'span 45'
    }
}

export class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quiz: [],
            id: this.props.id,
            title: "Empty title",
            description: "",
            dificulty: 0,
            numberOfQuestions: 0,
            display: false,
            done: false,
            views: 0,
            author: "Default author",
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
                    <div style={{
                        ...styles.card,
                        ...styles[this.props.size]
                    }}>
                        <div className="quiz_card card">
                            <div className="wrapper" style={{ backgroundImage: `url(${quiz_photo})` }}>
                                <div className="header">
                                    <div className="date">
                                        <span className="day">12</span>
                                        <span className="month"> Aug</span>
                                        <span className="year"> 2016</span>
                                    </div>
                                    <ul className="menu-content">
                                        <li><a href="#" className="fa fa-eye"><span>{this.state.views}</span></a></li>
                                        <li><a href="#" className="fas fa-comment-alt"><span>{this.state.com_num}</span></a></li>
                                        <li><a href="#" className="fas fa-question"><span>{this.state.numberOfQuestions}</span></a></li>
                                    </ul>
                                </div>
                                <div className="data">
                                    <div className="content">
                                        <span className="author">by {this.state.author}</span>
                                        <h1 className="title"><a href="#">{this.state.title}</a></h1>
                                        <p className="text">{this.state.description}</p>
                                        {/* <div> */}
                                        {/* <StartQuiz id={this.state.id} quiz={this.state.quiz} length={this.state.numberOfQuestions} title={this.state.quiz.title} description={this.state.description} /> */}
                                        {/* </div> */}
                                        <a href="#" className="button">
                                            read more  {/* <StartQuiz id={this.state.id} quiz={this.state.quiz} length={this.state.numberOfQuestions} title={this.state.quiz.title} description={this.state.description} /> */}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    null
                }
            </>
        )
    }
}

export default Card;