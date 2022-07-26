import React from "react";
import { useFieldArray } from "react-hook-form";

export default ({ nestIndex, control, register }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `test[${nestIndex}].answers`
    });

    return (
        <div>
            {fields.map((item, k) => {
                return (
                    <div key={item.id} style={{ marginLeft: 20 }}>
                        <input
                            {...register(`test[${nestIndex}].answers[${k}].field`, {"point" : 1}, )}
                            style={{ marginRight: "25px" }}
                        />
                        {/* <button type="button" onClick={() => remove(k)}>
                            Delete Nested
                        </button> */}
                    </div>
                );
            })}

            <a  class="green"
                type="button"
                onClick={() =>
                    append({
                        field: "Answer",
                        point: 0
                    })
                }
            >
                Add answer
            </a>

            <hr />
        </div>
    );
};
