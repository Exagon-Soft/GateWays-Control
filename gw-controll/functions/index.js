const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const gwcontrol = express();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

//* Sending the assigned User access rol to the DB *//
const createUserRole = (newUser, userUID) => {
  return admin
      .firestore()
      .collection("users")
      .doc(userUID)
      .set(newUser)
      .then((doc) => {});
};

//* Fires when a new user is authenticated to the System*//
exports.userCrated = functions.auth.user().onCreate((user) => {
  try {
    const newUser = {
      Rol: "User",
      CreateDate: admin.firestore.FieldValue.serverTimestamp(),
    };
    createUserRole(newUser, user.uid);
  } catch (error) {
    return error;
  }
});

gwcontrol.use(require("./routes/gateways.routes"));
gwcontrol.use(require("./routes/peripherals.routes"));
gwcontrol.use(cors({ origin: true }));


exports.gwcontrol = functions.https.onRequest(gwcontrol);
