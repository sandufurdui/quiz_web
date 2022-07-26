import React, { useState } from 'react'
import AddRemoveAnswerInputField from './addAnswerInput'

function AddRemoveInputField() {
    var qqqq = []
    const [questionsList, setQuestionsList] = useState([{ question: "" }]);
    // handle input change
    const handleInputChangeQ = (e, index) => {
        const { name, value } = e.target;
        const list = [...questionsList];
        list[index][name] = value;
        setQuestionsList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClickQ = index => {
        const list = [...questionsList];
        list.splice(index, 1);
        setQuestionsList(list);
    };

    // handle click event of the Add button
    const handleAddClickQ = () => {
        setQuestionsList([...questionsList, { question: "" }]);
    };

    const [answersList, setAnswersList] = useState([{ answer: "", point: 1 }]);

    // handle input change
    const handleInputChangeA = (e, index) => {
        const { name, value } = e.target;
        const list = [...answersList];
        list[index][name] = value;
        setAnswersList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClickA = index => {
        const list = [...answersList];
        list.splice(index, 1);
        setAnswersList(list);
    };

    // handle click event of the Add button
    const handleAddClickA = () => {
        setAnswersList([...answersList, { answer: "", point: 0 }]);
    };

    return (
        <div >
            {questionsList.map((qq, i) => {
                return (
                    <div className="">
                        <input
                            name="question"
                            placeholder="Question"
                            value={qq.question}
                            onChange={e => handleInputChangeQ(e, i)}
                        />

                        <div >
                            {questionsList.length !== 1 && <a className="margin-left-10 red" onClick={() => handleRemoveClickQ(i)}>Remove question</a>}
                            {questionsList.length - 1 === i && <a className="margin-left-10 green" onClick={handleAddClickQ}>Add question</a>}
                        </div>
                        {/* {
                            answersList.map((x, i) => {
                                return (
                                    <div className="box">
                                        <input
                                            name="answer"
                                            placeholder="answer"
                                            value={x.answer}
                                            onChange={e => handleInputChangeA(e, i)}
                                        />
                                        <div className="">
                                            {answersList.length !== 1 && <a
                                                className="margin-left-10 red"
                                                onClick={() => handleRemoveClickA(i)}>Remove answer</a>}
                                            {answersList.length - 1 === i && <a className="margin-left-10 green" onClick={handleAddClickA}>Add answer</a>}
                                        </div>
                                    </div>
                                );
                            })} */}
                        <div style={{ marginTop: 20, marginBottom: 20 }}>{JSON.stringify(answersList)}</div>
                    </div>
                );
            },
            // qqqq = [questionsList + answersList]
            
            )
        }
            <div style={{ marginTop: 20, marginBottom: 20 }}>{JSON.stringify(qqqq)}</div>
            <a onClick={console.log(JSON.stringify(questionsList + answersList))}>fdfdfdfdfdfd</a>
        </div>
    );
}

export default AddRemoveInputField