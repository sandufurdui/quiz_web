import React from "react";
import { useFieldArray } from "react-hook-form";
// import { ErrorMessage } from '@hookform/error-message';
import NestedArray from "./nestetdFieldArray";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues }) {
    const { fields, append, remove, prepend, 
        // errors 
    } = useFieldArray({
        control,
        name: "test"
    });

    renderCount++;

    return (
        <>
            <h1>Add New Quiz</h1>
            <p>Please fill all the fields bellow in order to add new quiz<br />
                <b className=''>
                    Note that regardless the order of answers you input, they will be showed in random order
                </b>
            </p><br />
            <label><h4>Give the quiz a title</h4></label>
            <input {...register("title", { required: true, maxLength: 30 })} />
            {/* <ErrorMessage errors={errors} name="title" /> */}
      
            {/* <p className='warning'>{errors.title?.message}</p> */}
            {/* <input {...register("firstName")} /> */}
            {/* <p className='warning'>{errors.firstName?.message}</p> */}
            <br />
            <label><h4>Add some description</h4></label>
            <input {...register("description", { required: true, maxLength: 150 })} />
            {/* <p className='warning'>{errors.description?.message}</p><br /> */}
            <label><h4>Select a category for it</h4></label>
            {/* <input {...register("category", { required: true, maxLength: 20 })} />
             */}
            <select 
                {...register('category', { required: "select one option" })}>
                <option value="">Select</option>
                <option value="art and literature">Art and Literature</option>
                <option value="general knowledge">General Knowledge</option>
                <option value="geography">Geography</option>
                <option value="history">History</option>
                <option value="music">Music</option>
                <option value="science and nature">Science and Nature</option>
                <option value="sport">Sport</option>
                <option value="tv and films">TV and Films</option>
                <option value="art and literature">Art and Literature</option>
                <option value="trivia">Trivia</option>
                <option value="other">Other</option>
            </select>
            {/* {errors.func && <p style={{ color: 'red' }}> {errors.func.message}</p>} */}
            {/* <input type="text" id="fname" name="fname" /> */}

            {/* <p className='warning'>{errors.category?.message}</p><br /> */}
            <h4>Difficulty
                <div className="">   &#8505;
                    <span className="">
                        One difficulty point is added for each 10 questions <br />
                        E.g. Quiz with 21 questions will have 2 difficulty points, 29 questions will still have 2 difficulty points, but 30- 3 difficulty points
                    </span>
                </div>
            </h4>
            <input label="difficulty" type="number" {...register("difficulty", { min: 0, max: 10 })} />
            {/* <p className='warning'>{errors.difficulty?.message}</p><br /> */}
            <h4>Enter quiz questions and answers</h4><br />
            {fields.map((item, index) => {
                return (
                    <div key={item.id}>
                        <input
                            name={`test[${index}].name`}
                            {...register(`test[${index}].name`, { required: true, maxLength:150 })}
                            defaultValue={item.name}
                        />
                        <button className="" type="button" onClick={() => remove(index)}>
                            Delete question
                        </button>
                        <NestedArray nestIndex={index} {...{ control, register }} />
                    </div>
                );
            })}

            <section>
                <a class=""
                    type="button"
                    onClick={() => {
                        setValue("test", [
                            ...getValues().test,
                            {
                                name: "Question",
                                answers: [{
                                    field: "Answer(correct one)",
                                    point: 1
                                }]
                            }
                        ]);
                    }}
                >
                    Add questions
                </a>
            </section>

            {/* <span className="counter">Render Count: {renderCount}</span> */}
        </>
    );
}
