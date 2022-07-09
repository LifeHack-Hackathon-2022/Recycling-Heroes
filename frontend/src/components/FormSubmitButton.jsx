function FormSubmitButton() {

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
        </div>
    </form>
  )
}

export default FormSubmitButton