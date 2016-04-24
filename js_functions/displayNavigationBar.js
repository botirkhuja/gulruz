
	var xmlhttp = new XMLHttpRequest();
      var url = "navi.json";

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var mArray = JSON.parse(xmlhttp.responseText);
          dispNaviBar(mArray)
        };
      }

      xmlhttp.open("GET", url, true);
      xmlhttp.send();
