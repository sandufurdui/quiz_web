import React from 'react'
// import {store, useGlobalState} from 'state-pool';

const Question = ({ question, answers, index, onAnswerSelected, onSubmit }) => {
  return (
    <div >
      <h2 className="question-name">{question.name}</h2>
      <div className="main-quiz-ul">
        {question.answers.map((answer, i) =>
          <div key={`${index}-${i}`}>
            <li className="option-li">
              <input required className="radio-input"
                type="radio"
                name={`question_${index}`}
                id={`question_${index}_answer_${i}`}
                defaultChecked={false}
                value={i}
                onChange={onAnswerSelected}
              />
              {' '}

              <label htmlFor={`question_${index}_answer_${i}`}>{answer.field}</label>
              <div className="check"><div className="inside"></div>
              </div>
            </li>
          </div>
        )}
      </div>
      <button className="start-quiz" onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default Question