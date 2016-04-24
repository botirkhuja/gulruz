function navig(){
	$.getJSON("navi.json",{}, function( data ){ 
	 	var out = "";
	    for (var i =0; i < data.length; i++) {
	    	out += '<li><a href="' + data[i].url + '">' + data[i].display + '</a></li>'
	    };
	    document.getElementById('nav').innerHTML = out; 
	});
}
