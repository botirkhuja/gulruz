function loadDoc(url, functionToBeExecuted) {
      var xhttp;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          functionToBeExecuted(xhttp);
        };
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    };

    function loadCategoryContent(xhttp){
      document.getElementById("p2").innerHTML = xhttp.responseText;
    };