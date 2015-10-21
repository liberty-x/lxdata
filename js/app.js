var app = module.exports = {};

// don't

app.getGateValues = function(body){
  var stationArray = JSON.parse(body);
  var keyValues = stationArray.map(function(station){

    var stationName = station.commonName;
    var value = station.additionalProperties.reduce(function(value, property){
      if (property.key === "Gates"){
        value = property.value;
      }
      return value;
    }, '');
    return {
      name: stationName,
      value: value
    };
  });
  console.log(keyValues);
};


// sort the array of above values

// slice first 4 off

// map over each station name, return object with
//   {
// label : stationName
// data : function getDataArray(stationName){}
// }





// app.getData = function(body){
//   var gateValues = getGateValues(body);
//   var topThreeGates = gateValues.sort(// something)
//   topThreeGates
// };

// needs doing
// app.getValueForKey(body){
//   var stationArray = JSON.parse(body);
//   var keyValues = stationArray.map(function(station){
//     return station.additionalProperties.reduce(function(value, property){
//       if (property.key === "Gates"){
//         value = property.value;
//       }
//       return value;
//     }, '');
//   });
// }
//
// function fourStationsWithMostGates(body){
//   // JSON.parse
// }
//
//
//
//
// // specific for number of lines
// function getNumberOfLines(){
//
// }
//
//
// // KEYS
// // gates: "Gates"
// // cash machines: "Cash Machines"
// // pay phones: "Payphones"
// // Lines: "lines".length
// // escalators: "Escalators"

// var data = {
//       labels: ["Gates", "Lines", "Pay Phones", "Escalators", "Cash Machines"],
//       datasets: [{
//         label: topStation,
//         data: [gates, lines, payphones, escalators, cashmachines]
//       }, {
//         label: "secondStation",
//         data: [gates, lines, payphones, escalators, cashmachines]
//       }, {
//         label: "thirdStation",
//         data: [gates, lines, payphones, escalators, cashmachines]
//       }, {
//         label: "fourthStation",
//         data: [gates, lines, payphones, escalators, cashmachines]
//       }]
//     };
