var app = module.exports = {};


app.SpecificTubeLine = function(body){
  // var tubeStops =[];
  // tubeStops.push(JSON.parse(body)[1].commonName)
  console.log('2>>>>>>>>',JSON.parse(body).map(onlyGetTubeStops));
};

function onlyGetTubeStops(value){
    var obj= {
      tube: value.commonName,
      lng: value.lon,
      lat: value.lat
    };
    return obj;
  }
