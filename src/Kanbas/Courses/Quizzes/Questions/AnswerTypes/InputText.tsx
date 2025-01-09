export default function InputText({answers} : {answers: []}) {
    return (
        <div>
            {answers.map((answer: any, index: number) => (
                <div className="input-group mb-3">
                    <label htmlFor={answer._id} className="input-group me-3">{index}. </label>
                    <input id={answer._id} type="text" className="form-control w-25" />
                </div>
            ))}
        </div>
    )
}