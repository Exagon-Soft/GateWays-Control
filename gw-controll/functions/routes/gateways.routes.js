
const { Router } = require("express");
const cors = require("cors");
const router = Router();
router.use(cors({ origin: true }));

const admin = require("firebase-admin");
const firestoreDB = admin.firestore();


//* Add a GateWay for the specific user  */
router.post("/api/newgateway", async (req, res) => {
  try {
    const docRef = await firestoreDB
      .collection("gateways")
      .doc()
      .create({
        UserUID: req.body.UserUID,
        Name: req.body.Name,
        IPV4: req.body.IPV4,
      });

    return res.status(200).json(docRef.writeTime);
  } catch (error) {
    return res.status(500).json(error);
  }
});
//* Gets an specific GateWay for the specific user  */
router.get("/api/getgateway/:gateway_id", async (req, res) => {
  try {
    const doc = await firestoreDB
      .collection("gateways")
      .doc(req.params.gateway_id)
      .get();
    const response = {
        UserUID: doc.data().UserUID,
        Name: doc.data().Name,
        IPV4: doc.data().IPV4,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* Gets a list of GateWays for the specific user  */
router.get("/api/getgateways/:user_ID", async (req, res) => {
  try {
    const gatewaysQuery = await firestoreDB.collection("gateways").get();
    const userGateways = gatewaysQuery.docs.filter(doc => (doc.data().UserUID === req.params.user_ID));
    const response = userGateways.map(gat => ({
      ID: gat.id,
      Name: gat.data().Name,
      IPV4: gat.data().IPV4,
    }));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* Delete an specific GateWay for the specific user  */
router.delete("/api/deletegateway/:gateway_id", async (req, res) => {

  try {
    const doc = firestoreDB
      .collection("gateways")
      .doc(req.params.gateway_id);
    await doc.delete();
    return res.status(200).json("");
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* Updates an specific GateWay for the specific user  */
router.put("/api/updategateway/:gateway_id", async (req, res) => {
  try {
    const doc = firestoreDB
      .collection("gateways")
      .doc(req.params.gateway_id);
    await doc.update({
      Name: req.body.Name,
      IPV4: req.body.IPV4,
    });

    return res.status(200).json("");
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* Get a list with all the GateWays (Admin only) */
router.get("/api/getallgateways", async (req, res) => {
  try {
    const gatewayCollection = await firestoreDB.collection("gateways").get();
    const response = gatewayCollection.docs.map((doc) => ({
      ID: doc.id,
      UserUID: doc.data().UserUID,
      Name: doc.data().Name,
      IPV4: doc.data().IPV4,
    }));
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    console.log("final: ", error);
    return res.status(500).json(error);
  }
});

module.exports = router;
