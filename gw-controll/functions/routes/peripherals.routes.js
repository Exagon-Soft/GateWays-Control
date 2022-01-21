const { Router } = require("express");
const cors = require("cors");
const router = Router();
router.use(cors({ origin: true }));

const admin = require("firebase-admin");
const firestoreDB = admin.firestore();

function RandomNumericID() {
  var digit1 = Math.round(Math.random() * 10);
  var digit2 = Math.round(Math.random() * 10);
  var digit3 = Math.round(Math.random() * 10);
  var digit4 = Math.round(Math.random() * 10);
  var digit5 = Math.round(Math.random() * 10);

  return (
    digit1.toString() +
    digit2.toString() +
    digit3.toString() +
    digit4.toString() +
    digit5.toString()
  );
}

//* Add a Peripheral for the specific GateWay  */
router.post("/api/newPeripheral/:gateway_id", async (req, res) => {
    try {
      const docRef = await firestoreDB
        .collection("gateways")
        .doc(req.params.gateway_id)
        .collection("Peripherals")
        .doc(RandomNumericID())
        .create({
          Vendor: req.body.Vendor,
          CreateAt: new Date(),
          Status: req.body.Status,
        });
      return res.status(200).json(docRef.writeTime);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

//* Gets an specific Peripheral for the given GateWay  */
router.get("/api/getperipheral/:parameters", async (req, res) => {
  try {
    const separator = "-";
    const gateway_id = req.params.parameters.split(separator)[0];
    const peripheral_id = req.params.parameters.split(separator)[1];
    const doc = await firestoreDB
      .collection("gateways")
      .doc(gateway_id)
      .collection("Peripherals")
      .doc(peripheral_id)
      .get();
    const response = {
      Vendor: doc.data().Vendor,
      CreateAt: doc.data().CreateAt,
      Status: doc.data().Status,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* Gets a list of Peripheral for the given user  */
router.get("/api/getperipherals/:gateway_ID", async (req, res) => {
  try {
    const peripheralsQuery = await firestoreDB
      .collection("gateways")
      .doc(req.params.gateway_ID)
      .collection("Peripherals")
      .get();
    if (peripheralsQuery.docs.length > 0) {
      const response = peripheralsQuery.docs.map((peri) => ({
        ID: peri.id,
        Vendor: peri.data().Vendor,
        CreateAt: peri.data().CreateAt,
        Status: peri.data().Status,
      }));
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* Updates an specific Peripheral for the given user  */
router.put("/api/updateperipheral/:parameters", async (req, res) => {
    try {
        const separator = "-";
    const gateway_id = req.params.parameters.split(separator)[0];
    const peripheral_id = req.params.parameters.split(separator)[1];
      const doc = firestoreDB
        .collection("gateways")
        .doc(gateway_id)
        .collection("Peripherals")
        .doc(peripheral_id);
      await doc.update({
        Vendor: req.body.Vendor,
        Status: req.body.Status,
      });
  
      return res.status(200).json("");
    } catch (error) {
      return res.status(500).json(error);
    }
  });

//* Delete an specific Peripheral for the given GateWay  */
router.delete(
  "/api/deleteperipheral/:parameters",
  async (req, res) => {
    try {
      const separator = "-";
      const gateway_id = req.params.parameters.split(separator)[0];
      const peripheral_id = req.params.parameters.split(separator)[1];
      const doc = firestoreDB
        .collection("gateways")
        .doc(gateway_id)
        .collection("Peripherals")
        .doc(peripheral_id);
      await doc.delete();

      return res.status(200).json("");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

module.exports = router;