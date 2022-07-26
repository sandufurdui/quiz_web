import { React, useState } from 'react'
import Quiz from "./quiz"
// import "../style/quiz.less"

function StartQuiz(props) {
    const [displayModal, setDisplayModal] = useState(false)
    const [displayQuiz, setDisplayQuiz] = useState(false)
    const hideModal = () => setDisplayModal(false)
    const showModal = () => setDisplayModal(true)
    const hideQuiz = () => setDisplayQuiz(false)
    const showQuiz = () => setDisplayQuiz(true)
    const startQuiz = () => {
        hideModal();
        showQuiz();
    }
    const hideModals = () => {
        hideModal();
        hideQuiz();
    }
    return (
        <>
            <button
                className="fas fa-play play"
                onClick={showModal}
            >
            </button>
            {
                displayModal ?
                    <div className="modal_background">
                        <div className="modal">
                            <button class="close_modal" onClick={hideModal}>&times;</button>
                            <h2 className="quiz_title">props.title</h2>
                            <p className="quiz_description">props.description</p>
                            <b className="warning">Please note that if you don't select any answer, your final score will be 0 by default</b>
                            <div className="modal_footer">
                                <button className="classic_button " onClick={startQuiz}>Start Quiz</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                displayQuiz ?
                    <div className="modal_background">
                        <div className="modal">
                            <Quiz id={props.id} />
                            <button class="close_modal" onClick={hideModals}>&times;</button>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default StartQuiz