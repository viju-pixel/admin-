const Validation = (values) => {
    let errors ={}

    if(!values.email){
        errors.email = "Email is required"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if(!values.password){
        errors.password = "Password is required"
    }
    else if (values.password.length < 5){
        errors.password = "Password must be at least 5 characters"
    }
    return errors;
}
export default Validation;




