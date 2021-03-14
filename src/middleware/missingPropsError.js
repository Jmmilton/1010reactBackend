// function checkMissingProps(res, prop){
//   if(prop.length > 0){
//     return res.status(400).send({ message: "validation error", invalid: prop })
//   }
// } 

// function missingPropsError (req, res, next) {

//   if (req.body && req.path == "/contact_form/entries") {
//     const { name, email, phoneNumber, content } = req.body;
//     const requiredProps = ['name', 'email', 'phoneNumber', 'content']
//       const missingProps = []
//       requiredProps.forEach(prop => {
//           if (req.body[prop] == undefined || req.body[prop] == '') {
//               missingProps.push(prop)
//           }
//       })

//       checkMissingProps(res, missingProps)
//   }

//   if (req.body && req.path == "/users") {
//     const { name, email, password } = req.body;
//     const requiredProps = ['name', 'email', 'password']
//     const missingProps = []
//     requiredProps.forEach(prop => {
//         if (req.body[prop] == undefined || req.body[prop] == '') {
//             missingProps.push(prop)
//         }
//     })

//     checkMissingProps(res, missingProps)

//     if(req.body.password){
//       if(req.body.password.length < 8){
//         return res.status(400).send({ message: "Password must be minimum 8 characters" })
//       }
//     }
// }

// if (req.body && req.path == "/auth") {
//   const { username, password } = req.body;
//   const requiredProps = ['username', 'password']
//   const missingProps = []
//   requiredProps.forEach(prop => {
//       if (req.body[prop] == undefined || req.body[prop] == '') {
//           missingProps.push(prop)
//       }
//   })

//   checkMissingProps(res, missingProps)

//   if(req.body.password){
//     if(req.body.password.length < 8){
//       return res.status(400).send({ message: "Password must be minimum 8 characters" })
//     }
//   }
// }

// if (req.body && req.path == "/contact_form/entries/:id") {
//   const { id, name, email, phoneNumber, content } = req.body;
//     const requiredProps = ['id', 'name', 'email', 'phoneNumber', 'content']
//       const missingProps = []
//       requiredProps.forEach(prop => {
//           if (req.body[prop] == undefined || req.body[prop] == '') {
//               missingProps.push(prop)
//           }
//       })
//       checkMissingProps(res, missingProps)
      
//       if (!req.body.id) {
//         return res.status(400).send({ message: `entry ${missingProps} not found` })
//       }
//   }
//   next()
// }


// export default missingPropsError;