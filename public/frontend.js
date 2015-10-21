var request = new XMLHttpRequest ();
var lineInput = document.getElementById("userLine").value;
console.log(lineInput);

function getLineData (lineInput) {
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status === 200) {
      console.log(request.responseText);
    }
  };
  request.open("POST", '/apirequest');
  request.send(lineInput);
  console.log('GETDATA FUNCTION >>>>>>>',lineInput);
}

document.getElementById("userForm").addEventListener("submit", function (e){
  e.preventDefault();
  var lineInput = document.getElementById("userLine").value;
  getLineData(lineInput);
  console.log(lineInput);
});
