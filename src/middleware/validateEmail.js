
// function validateEmail(req, res, next) {
//     const email = req.body.email;
//     let isEmailValid;
//     if (email){
//         isEmailValid = checkEmail(email)
//     }
//     if(isEmailValid == false){
//         return res.status(400).send({ message: "Must be a valid email address" })
//     }
//     next()
//     return isEmailValid
// }

// function checkEmail(email) {
//     var re = /\S+@\S+\.\S+/;
//     return re.test(email);
// }


// export default validateEmail