var express = require("express");
let Contacts = require("../models/contacts.model");
let contactDisplay = require("../models/contactDisplay");
var router = express.Router();


/* GET users listing. */
router.route("/").get((req, res) => {
  Contacts.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const currentStatus = req.body.currentStatus;
  const contacts = req.body.contacts;
  const newUser = new Contacts({ username, currentStatus, contacts });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Contacts.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Contacts.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Contacts.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.currentStatus = req.body.currentStatus;
      user.contacts = req.body.contacts;

      user
        .save()
        .then(() => res.json("User details updated"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/dfs/:id").post((req, res) => {
  // popup.alert({
  //   content: "A close contact has been infected."
  // });
  Contacts.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.currentStatus = req.body.currentStatus;
      user.contacts = req.body.contacts;

      var mainObj = contactDisplay();
      mainObj.name = user.username;
      mainObj.gProps.className = user.currentStatus;

      var stack = user.contacts;
      var allInfo = "";
      var newUser = "";
      var count = 0;
      Contacts.find()
        .then(users => {
          allInfo = users;
          while (stack.length != 0) {
            count += 1;
            var parentObj = contactDisplay();
            parent = stack.pop();

            parentInfo = allInfo.find(user => user.username == parent);
            if (parentInfo) {
              parentObj.name = parentInfo.username;
              parentObj.gProps.className = parentInfo.currentStatus;
              for (var i = 0; i < parentInfo.contacts.length; i++) {
                var tempObj = contactDisplay();
                childInfo = allInfo.find(
                  user => user.username == parentInfo.contacts[i]
                );
                if (childInfo) {
                  tempObj.name = childInfo.username;
                  tempObj.gProps.className = childInfo.currentStatus;
                  for (var i = 0; i < childInfo.contacts.length; i++) {
                    var lastObj = contactDisplay();
                    lastInfo = allInfo.find(
                      user => user.username == childInfo.contacts[i]
                    );
                    if (lastInfo) {
                      lastObj.name = lastInfo.username;
                      lastObj.gProps.className = lastInfo.currentStatus;
                    } else {
                      lastObj.name = childInfo.contacts[i];
                      lastObj.gProps.className = "Normal";
                    }
                    tempObj.children.push(lastObj);
                  }
                } else {
                  tempObj.name = parentInfo.contacts[i];
                  tempObj.gProps.className = "Normal";
                }
                parentObj.children.push(tempObj);
              }
            } else {
              parentObj.name = parent;
              parentObj.gProps.className = "Normal";
            }
            mainObj.children.push(parentObj);
          }
        })
        .catch(err => res.status(400).json("Error: " + err));

      user
        .save()
        .then(() => res.json(mainObj))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
