# GateWays-Control
 Simple web application to solve the problem proposed in the Aleph Engineers knowledge test.

 Design Madded using React-styled plugin 
 Front End handled with react and react-hokes 
 Back End managed with firebase and API REST Functions

 INSTALLATION

 1- Merge this repo or download code
 2- Go to gw-controll folder
 3- Run "NPM install" within a terminal
 
 
 ACTIONS

 * "NPM start" Run the App in development mode
 * "NPM test" Run the App test Interface


 
 DEVELOPER LEGEND
 
 Authentication 

 1-To handle the authentication system of the web App it's been used Firebase-Auth.
   Taking advantages on it's hokes.
 2-In order to manage the users access level it's been used Firebase-firestore to implement 
   a simple user Rol interface.

API REST

The API madded for this test can it is a jason format based, and it can be consumed from
https://us-central1-alvaro-test-12fba.cloudfunctions.net/gwcontrol/api/ + {Function method} + "/" + parameter 
if is required.

Gateways Methods

*newgateway    --"creates a new GateWay under a specific user"; takes json data  {UserUID "string",
                  Name "string, IPV4 "string} and awaits no parameters.Returns nothing.
*getgateway    --"Gets the data from a single GateWay"; takes no data and awaits a gateway_id string parameter.
                  Returns {UserUID "string", Name "string", IPV4 "string"} in jason format.
*getgateways   --"Gets a list of GateWays for the specific user"; takes no data and awaits a user_id string
                  parameter. Returns [{ID "string", Name "string", IPV4 "string"}] in json format.
*deletegateway --"Delete the specific GateWay"; takes no data and a awaits a gateway_id string parameter.
                  Return nothing.
*updategateway --"Updates the single GateWay data"; takes json data {Name "string", IPV4 "string"} and awaits
                  a gateway_id string parameter. Return nothing.
*getallgateways--"Gets a list with all the GateWays in de Data Base"; takes no data and awaits no parameter.
                  Return [{Id "string", UserUID "string", Name "string", IPV4 "string"}] in json format.

Peripheral Methods

*newPeripheral   --"creates a new Peripheral under a specific GateWay"; takes json data  {Vendor "string",
                    Status "string" } and awaits a gateway_id string parameters.Returns nothing.
*getperipheral   --"Gets the data from a single Peripheral"; takes no data and awaits a gateway_id + "-" +
                    peripheral_id string parameter. Return {Vendor "string", CreateDate "string", Status "string"}
                    in json format.
*getperipherals  --"Gets a list of peripherals for the given GateWay"; takes no data and awaits a gateway_id
                    string parameter. Return [{Id "string, Vendor "string", CreateDate "string", status}] in 
                    json format.
*updateperipheral--"Updates the single peripheral data; takes json data {Vendor "string", Status "string"} and
                    awaits a gateway_id + "-" + peripheral_id string parameter. Return Nothing.
*deleteperipheral--"Deleted the specific peripheral"; takes no data and awaits a gateway_id + "-" + 
                    peripheral_id string parameter. Return Nothing.

ANNOTATIONS
It is recommended the use of Firebase Hokes for the backend system, instead an API REST jason like it is 
expected for the test development. Since it is a React front Web App there is no need of consuming an API.
Firebase are simples, faster and with a improved security.

