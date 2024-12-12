export default function Blank({question, answers}: {question:any, answers:[any]}) {


    return (
        <div>
            <div className="pb-5">
            <span className="float-end me-5 p-2 border">{question.point} pts</span>
            <span><h4>{question.questionText}</h4></span>
        </div>
            <hr />
            {answers.map( (a:any, i:number) =>(
                <div>
                    <span className="me-3">{i + 1}. </span>
                    <input id={a._id} type="text" className="form-control w-50 mb-3 d-inline"
                    onChange={() => {}}/>
                </div>
            )
            )}
    
            {/* save user inputs also ; upload user response after every change lowkey */}
            
            </div>
    )
    }