const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  student_emails: [
    {
      email:{
        type:String, 
        required:true
      }
    }
],

  assignments: [
    {
      questionNumber: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      solutions: [
        {
          roll_no: {
            type: Number,
            required: true,
          },
          fname: {
            type: String,
            required: true,
          },
          solution: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const userClass = mongoose.model("CLASS", userSchema);
module.exports = userClass;
