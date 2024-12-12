export default function TF({question, answers}: {question:any, answers:[any]}) {


    return (
        <div>
            <div className="pb-5">
            <span className="float-end me-5 p-2 border">{question.point} pts</span>
            <span><h4>{question.questionText}</h4></span>
        </div>
            <hr />
            {answers.map( (a:any, i:number) =>(
                <div>
                    <input id={a._id} type="radio" className="form-check mt-3 me-3 d-inline" name={question._id}
                    onChange={() => {}}/>
                    <label htmlFor="a._id">{i + 1}. {a.answerText}</label>
                </div>
            )
            )}
    
            {/* save user inputs also ; upload user response after every change lowkey */}

            
            </div>
    )
    }