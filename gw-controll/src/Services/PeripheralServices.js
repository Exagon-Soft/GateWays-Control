import axios from "axios";

const baseAPIUrl =
  "https://us-central1-alvaro-test-12fba.cloudfunctions.net/gwcontrol";

  export class PeripheralServices {
    //**Create a Peripheral for the specific GateWay */
    async createPeripheral(gateWay_id, peripheral) {
      try {
        const response = await axios.post(
          baseAPIUrl + "/api/newPeripheral/" + gateWay_id,
          peripheral
        );
        return response;
      } catch (error) {
        return error;
      }
    }

    //**Get a list of Peripherals for the specific GateWay */
    async getPeripherals(gateWay_id) {
      try {
        const response = await axios.get(
          baseAPIUrl + "/api/getperipherals/" + gateWay_id
        );
        return response;
      } catch (error) {
        return error;
      }
    }

    //**Get a single Peripheral for the specific GateWay */
    async getPeripheral(gateWay_id, peripheral_id) {
      try {
        const response = await axios.get(
          baseAPIUrl + "/api/getperipheral/" + gateWay_id + "-" + peripheral_id
        );
        return response;
      } catch (error) {
        return error;
      }
    }

    //**Update the values of a single Peripheral */
    async updatePeripheral(gateWay_id, peripheral_id, newValues){
        try {
            const response = await axios.put(
                baseAPIUrl + "/api/updateperipheral/" + gateWay_id + "-" + peripheral_id,
                newValues
              );
              return response;
        } catch (error) {
            return error;
        }
    }

    //**Delete a specific peripheral and it's data */
    async deletePeripheral(gateWay_id, peripheral_id){
        try {
            const response = await axios.delete(
                baseAPIUrl + "/api/deleteperipheral/" + gateWay_id + "-" + peripheral_id
              );
              return response;
        } catch (error) {
            return error;
        }
    }
  }