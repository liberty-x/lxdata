var app = module.exports = {};

app.SpecificTubeLine = function (body){
  var all = JSON.parse(body).map(app.onlyGetTubeStops);
  return all;
};

app.onlyGetTubeStops = function (value){
    return {
      tube: value.commonName,
      lng: value.lon,
      lat: value.lat
    };
};
