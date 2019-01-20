const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose.js');
const jwt = require('jsonwebtoken');
const config = require('../config/dev.js');
exports.auth = function(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      error: [
        {
          title: 'Data Missing',
          message: 'Please provide email and password'
        }
      ]
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(422).send({ error: normalizeErrors(err.errors) });
    }

    if (!user) {
      return res.status(422).send({
        error: [
          {
            title: 'Invalid User!',
            message: 'Please User does not exist'
          }
        ]
      });
    }

    if (user.checkingPasswords(password)) {
      //return JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        config.SECRET,
        { expiresIn: '1h' }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        error: [
          {
            title: 'Wrong Data!!',
            message: 'Wrong email and password'
          }
        ]
      });
    }
  });
};
exports.register = (req, res) => {
  const { username, password, email, passwordConfirmation } = req.body;
  //   const username = req.body.username;
  //   const password = req.body.password;
  //   const email = req.body.email;
  //   const passwordConfirmation = req.body.passwordConfirmation;

  if (!email || !password) {
    return res.status(422).send({
      error: [
        {
          title: 'Data Missing',
          message: 'Please provide email and password'
        }
      ]
    });
  }
  if (password != passwordConfirmation) {
    return res.status(422).send({
      error: [
        {
          title: 'Password Not matched',
          message: 'Please write password carefully!!'
        }
      ]
    });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(422).send({ error: normalizeErrors(err.errors) });
    }

    if (existingUser) {
      return res.status(422).send({
        error: [
          {
            title: 'Invalid User',
            message: 'Please choose a different email ID,email already exist'
          }
        ]
      });
    }

    const user = new User({
      username,
      email,
      password
    });
    user.save(err => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json({
        registered: true
      });
    });
  });

  //   res.json({
  //     username,
  //     email
  //   });
};

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, (err, user) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      if (user) {
        res.locals.user = user; //this is the suggested way from express to how to send object to next middleware
        next();
      } else {
        return notAuthorised(res);
      }
    });
  } else {
    return notAuthorised(res);
  }
};
function parseToken(token) {
  //out token is in the format like this
  //bearer kdjfjlskgjldfkjgldfkgjdflkgjldfjfeefjfekflkjgldfkjglkdfjfg
  //thats why we use split and [1] to get the token part only
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorised(res) {
  return res.status(401).send({
    errors: [
      {
        title: 'Not Authorized',
        message: 'You need to login to get access'
      }
    ]
  });
}

// function notAuthorised() {
//   return res.status(422).send({
//     errors: [
//       {
//         title: 'Not Authorized',
//         message: 'You need to login to get access'
//       }
//     ]
//   });
// }
//////////////////////////////for future reference//////////////////////////////

// const User = require('../models/user');

// exports.auth = function(req, res) {};
// exports.register = (req, res) => {
//   const { username, password, email, passwordConfirmation } = req.body;
//   //   const username = req.body.username;
//   //   const password = req.body.password;
//   //   const email = req.body.email;
//   //   const passwordConfirmation = req.body.passwordConfirmation;

//   if (!email || !password) {
//     return res.status(422).send({
//       error: [
//         {
//           title: 'Data Missing',
//           message: 'Please provide email and password'
//         }
//       ]
//     });
//   }
//   if (password != passwordConfirmation) {
//     return res.status(422).send({
//       error: [
//         {
//           title: 'Password Not matched',
//           message: 'Please write password carefully!!'
//         }
//       ]
//     });
//   }

//   User.findOne({ email }, (err, existingUser) => {
//     if (err) {
//       return res.status(422).send({
//         error: [
//           {
//             title: 'Server Error',
//             message: 'Please try after sometime'
//           }
//         ]
//       });
//     }

//     if (existingUser) {
//       return res.status(422).send({
//         error: [
//           {
//             title: 'Invalid User',
//             message: 'Please choose a different email ID,email already exist'
//           }
//         ]
//       });
//     }

//     const user = new User({
//       username,
//       email,
//       password
//     });
//     user.save(err => {
//       if (err) {
//         return res.status(422).send({
//           error: [
//             {
//               title: 'Server Error',
//               message: 'Please try after sometime'
//             }
//           ]
//         });
//       }
//       return res.json({
//         registered: true
//       });
//     });
//   });

//   //   res.json({
//   //     username,
//   //     email
//   //   });
// };
