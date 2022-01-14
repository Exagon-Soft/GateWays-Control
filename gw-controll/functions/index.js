const admin = require("firebase-admin");
const functions = require("firebase-functions");

//* Sending the assigned User access rol to the DB *//
const createUserRole = (newUser, userUID) => {
  return admin
      .firestore()
      .collection("users")
      .doc(userUID)
      .set(newUser)
      .then((doc) => console.log("New User Added"));
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
    console.log(error.message);
  }
});


