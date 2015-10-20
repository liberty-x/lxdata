var request = new XMLHttpRequest ();

(function () {
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status === 200) {
      console.log(request.responseText);
    }
  };
  request.open("GET", '/apirequest');
  request.send();
}());
