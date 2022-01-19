import axios from "axios";

const baseAPIUrl =
  "https://us-central1-alvaro-test-12fba.cloudfunctions.net/gwcontrol";

export class GateWayService {
  //**Create a new gateway under the User account */
  async createGateway(gateway) {
    try {
      console.log("entrando en el evento del servicio");
      const response = await axios.post(
        baseAPIUrl + "/api/newGateWay",
        gateway
      );
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }

  //**Read the data from the given GateWay */
  async getGateWay(gateWay_id) {
    try {
      const response = await axios.get(
        baseAPIUrl + "/api/getgateway/" + gateWay_id
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //**Read the data from all the GateWays of the given User */
  async getGateWays(user_id) {
    try {
      const response = await axios.get(
        baseAPIUrl + "/api/getgateways/" + user_id
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //**Read the data from all the GateWays (Admin only) */
  async getAllGateWays() {
    try {
      const response = await axios.get(baseAPIUrl + "/api/getallgateways");
      return response;
    } catch (error) {
      return error;
    }
  }

  //**Update the data from the given GateWays */
  async updateGateWay(gateWay_id, newValues) {
    try {
      const response = await axios.put(
        baseAPIUrl + "/api/updategateway/" + gateWay_id,
        newValues
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  //**Delete the given GateWay */
  async deleteGateWay(gateWay_id) {
    try {
      const response = axios.delete(
        baseAPIUrl + "/api/deletegateway/" + gateWay_id
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}
