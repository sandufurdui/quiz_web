import React, { useState } from 'react'

function AddRemoveAnswerInputField() {
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
        <div>
            {answersList.map((x, i) => {
                return (
                    <div className="">
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
            })}
            <div style={{ marginTop: 20, marginBottom: 20 }}>{JSON.stringify(answersList)}</div>
        </div>
    );
}
export default AddRemoveAnswerInputField