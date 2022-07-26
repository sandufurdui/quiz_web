import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AddRemoveInputField from "./addQuestionInput"
import { getDatabase, ref, set, child, get } from "firebase/database";
import arrayShuffle from 'array-shuffle';
import FieldArray from "./fieldArray";

var questionsList = []
var answersList = []
const schema = yup.object({
    // title: yup.string().required().max(50),
    // description: yup.string().required().max(100),
    // category: yup.string().required(),
    // difficulty: yup.number().positive().integer().required().min(0).max(10),
}).required();

function AddQuizCard() {
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const [normalList, setNormalList] = useState([{ questions: [questionsList] }])
    const [displayAdd, setDisplayAdd] = useState(0);
    const [quizId, setQuizId] = useState("");

    const addQuiz = () => {
        setDisplayAdd(true)
        get(child(dbRef, `quizes/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const Qsize = snapshot.size + 1
                //   console.log(snapshot.size);
                setQuizId(snapshot.size)
                // console.log(snapshot.size)
                // console.log(quizId)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema)
    // });

    const {
        control,
        register,
        handleSubmit,
        getValues,
        // errors,
        reset,
        setValue,
        // formState: { errors }
    } = useForm({
        // defaultValues
    });
    const onSubmit = (data) => {

        for (var i = 0; i < data.test.length; i++) {
            let original = data.test[i].answers
            let qq = arrayShuffle(original)
            data.test[i].answers = arrayShuffle(original)
        }
        const next = quizId + 1
        // console.log("next "+ next)
        set(ref(db, `quizes/${next}`), {
        // set(ref(db, `quizes/1`), {
            display: true,
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            questions: data.test
        });
        alert('submited!')

    }
    return (
        <div>
            <div className="">
                <div className="">
                    <button className="" onClick={() => addQuiz()} >
                        +
                    </button>
                </div>
            </div>
            {
                displayAdd ?
                    <div className="">

                        <div id="demo-modal" className="">
                            {/* <form onSubmit={handleSubmit}> */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="">
                                    <FieldArray
                                        {...{
                                            control, register,
                                            // defaultValues,
                                            getValues, setValue, 
                                            // errors
                                        }}
                                    />

                                    <button type="button" onClick={() => reset(
                                        // defaultValues
                                    )}>
                                        Reset
                                    </button>

                                    <input type="submit" />
                                    <button className="" onClick={() => setDisplayAdd(false)}>&times;</button>
                                </div>
                            </form>
                        </div>


                    </div>
                    :
                    null
            }
        </div >
    )
}

export default AddQuizCard