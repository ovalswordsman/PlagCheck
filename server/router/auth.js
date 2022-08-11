const express = require("express");
const { findOne } = require("../model/userSchema");
require("../db/conn");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../Middleware/Authenticate");
const userClass = require("../model/classSchema");
const { findClass } = require("../model/classSchema");
router.get("/", (req, res) => {
  res.send(`Hello from the auth router`);
});

//using async and await
router.post("/register", async (req, res) => {
  const { name, email, roll_no, password, cpassword, role } = req.body;
  console.log(req.body);

  if (!name || !email || !roll_no || !password || !cpassword || !role) {
    return res.status(422).json({ error: "Please fill the data correctly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists!" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords doesn't match" });
    } else {
      const user = new User({
        name,
        email,
        roll_no,
        password,
        cpassword,
        role,
      });
      await user.save();
      res.status(201).json({ message: "User saved successfully!" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fill the data correctly" });
  }

  try {
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      //Matching the hashed password with the given passsword
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();

      if (!isMatch) {
        res.status(400).json({ error: "Incorrect data" });
      } else {
        //Generating cookie
        return res
          .cookie("jwtoken", token, {
            expires: new Date(Date.now() + 3600000), //After what time to expire
            httpOnly: true,
          })
          .status(200)
          .json({
            message: "Success",
            role: userLogin.role,
            email: userLogin.email,
            roll_no: userLogin.roll_no,
          });
      }
    } else {
      res.status(400).json({ error: "Incorrect data" });
    }
  } catch (err) {
    console.log(err);
  }
});

//MyProfile
router.get("/studenthome", Authenticate, (req, res) => {
  res.send(req.rootUser);
});
router.get("/teacherhome", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

//Logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send();
});

//Creating class
router.post("/registerclass", async (req, res) => {
  const { name, title, code, email } = req.body;
  console.log(req.body);

  if (!name || !title || !code) {
    return res.status(422).json({ error: "Please fill the data correctly" });
  }
  try {
    const classExist = await userClass.findOne({ code: code });
    if (classExist) {
      return res.status(422).json({ error: "Class Code already exists!" });
    } else {
      const user = new userClass({
        name,
        title,
        code,
        email,
      });
      // this.tokens.concat({ token: token });
      const temp = await user.save();
      const tempUser = await User.findOne({ email: email });
      //  const classDeatils = await userClass.find({ email: email });

      await User.findOneAndUpdate(
        { email: email },
        { classes: [...tempUser.classes, { class: code }] }
      );

      // const temp = await userClass.find({ email: email })
      res.status(201).json({ message: "Hello", class: temp });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/joinclass", Authenticate, async (req, res) => {
  const { code, email } = req.body;

  if (!code) {
    return res.status(422).json({ error: "Please fill the data correctly" });
  }
  try {
    // Checking the existence of class
    const classExist = await userClass.findOne({ code: code });
    if (classExist) {
      //finding user who wants to join the class
      const tempUser = await User.findOne({ email: email });

      //if class exist finding whether user has aleready joined it or not
      const alreadyExist = await User.findOne({
        $and: [
          { email: email },
          {
            classes: {
              $elemMatch: { class: code },
            },
          },
        ],
      });
      if (alreadyExist)
        res.status(422).json({ message: "Class already joined" });
      else {
        //if user has not already joined we update the user table with the new class joined
        await User.findOneAndUpdate(
          { email: email },
          { classes: [...tempUser.classes, { class: code }] }
        );

        //updating the user email in class table
        await userClass.findOneAndUpdate(
          { code: code },
          { student_emails: [...classExist.student_emails, { email: email }] }
        );
        return res
          .status(200)
          .json({ message: "Class Joined Successfully!", class: classExist });
      }
    } else {
      res.status(422).json({ message: "Class does not exist" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/teacherhome/classes", Authenticate, (req, res) => {
  userClass.find({ email: req.rootUser.email }, (error, data) => {
    if (error) console.log(error);
    else {
      res.status(200).send({ classList: data });
    }
  });
});

router.get("/studenthome/classes", Authenticate, async (req, res) => {
  try {
    const data = await userClass.find({
      student_emails: {
        $elemMatch: { email: req.rootUser.email },
      },
    });
    res.status(200).send({ classList: data });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

// router.post('/teacherhome/classes/assignment', async (req, res)=>{

// })
router.post("/createassign", async (req, res) => {
  const { questionNumber, question, code } = req.body;
  console.log("221", req.body);

  if (!question || !questionNumber) {
    console.log("214");
    return res.status(422).json({ error: "Please fill the data correctly" });
  }
  try {
    const classCode = await userClass.findOne({ code: code });
    console.log(classCode);
    classCode.assignments.push({
      question: question,
      questionNumber: questionNumber,
    });
    await userClass.findOneAndUpdate(
      { code: code },
      { assignments: classCode.assignments }
    );
    res.status(200).json({
      message: "success",
      assignment: { question: question, questionNumber: questionNumber },
    });
  } catch (err) {
    return res.status(422).json({ error: "error" });
    console.log(err);
  }
});
router.post("/assignmentdetails", Authenticate, (req, res) => {
  userClass.find(
    { code: req.body.code },
    { assignments: 1, _id: 0 },
    (error, data) => {
      if (error) console.log(error);
      else {
        res.status(200).send({ assignmentList: data[0].assignments });
      }
    }
  );
});
router.post("/submitsoln", Authenticate, async (req, res) => {
  const { fname, solution, code, questionNumber } = req.body;
  console.log("221", req.body, req.rootUser);
  let message = "";
  const classCode = await userClass.findOne({ code: code });
  console.log(classCode);
  classCode.assignments.forEach((assignment, i) => {
    if (assignment.questionNumber == questionNumber) {
      assignment.solutions.forEach((solution, j) => {
        if (solution.roll_no == req.rootUser.roll_no)
          message = "Already exists";
      });

      classCode.assignments[i].solutions.push({
        roll_no: req.rootUser.roll_no,
        fname,
        solution,
      });
    }
  });
  if (message != "Already exists") {
    await userClass.findOneAndUpdate(
      { code: code },
      { assignments: classCode.assignments }
    );
    message = "successful";
  }

  res.json({ message });
});
router.post("/solutiondetails", async (req, res) => {
  const { code, questionNumber } = req.body;
  console.log("236", req.body);
  const classCode = await userClass.findOne({ code: code });
  // console.log(classCode);
  // return res.json({message: "successful"})
  classCode.assignments.forEach((assignment, i) => {
    if (assignment.questionNumber == questionNumber) {
      console.log(
        298,
        assignment.solutions,
        assignment.questionNumber == questionNumber
      );
      return res.json({ solutions: assignment.solutions });
    }
  });
});
router.post("/deleteclass", async (req, res) => {
  const { code } = req.body;
  console.log("236", req.body);
  const classCode = await userClass.findOneAndDelete({ code: code });
  res.json({ message: " successfully deleted" });
});
