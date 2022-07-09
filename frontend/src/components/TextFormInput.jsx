import {splitPascalCaseStringWithDelimiter} from '../util/StringUtil'

function TextFormInput({ type, inputName, value, placeholder, onChange }) {
  return (
    <form>
        <div className="form-group">
            <input
                type={type}
                className="form-control"
                id={inputName}
                name={inputName}
                value={value}
                placeholder={
                    !placeholder ? `Enter your ${splitPascalCaseStringWithDelimiter(inputName, " ")}` : `${placeholder}`
                }
                onChange={onChange}
            />
        </div>
    </form>
  )
}

export default TextFormInput