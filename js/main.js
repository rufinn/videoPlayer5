var Main = {};

var widgetAPI = new Common.API.Widget();		// Creates Common module
var tvKey = new Common.API.TVKeyValue();
	
Main.getTvToken = function(){
	var data = {curVid: Main.vid};
	socket.emit('createRoom', data, 
		function(resObj){
			document.getElementById('tvToken').innerHTML = resObj;
			Main.tv_token = resObj;
			var qr = ['<img src="', 'https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=http://personal.ie.cuhk.edu.hk/~tnf009/iefyp_2/connect_qr.php?token=', resObj, '&choe=UTF-8&chld=L|2', '"/>']
			//var qr = ['<img src="', 'https://chart.googleapis.com/chart?cht=qr&chs=100x100&chl=http://personal.ie.cuhk.edu.hk/~tnf009/iefyp_2&choe=UTF-8&chld=L|2', '"/>']			
			document.getElementById('tvToken_qr').innerHTML = qr.join('');
	});
}

Main.onLoad = function(){ 			// called by 's onload event
	Main.vid = 'default'; 
	Main.enablekeys();
	Player.init();
	Player.setVideoURL();
	Player.playVideo();
	Main.getTvToken();
}

Main.enablekeys = function(){
	document.getElementById("anchor").focus();
}
Main.updateVideo = function(url, id){
	//Player.init();
	Player.stopVideo();
	Player.setVideoURL(url);
	Player.playVideo();
	Main.vid = id;
}

Main.keyDown = function(){			// Key handler
    var keyCode = event.keyCode;
    alert("Main Key code : " + keyCode);
    
    switch (keyCode) {
        case tvKey.KEY_LEFT:
			alert('left');
			Player.playVideo();
            break;
        case tvKey.KEY_RIGHT:
            alert("right");
			Player.stopVideo();
            break;
        case tvKey.KEY_UP:
            alert("up");
			Player.forwardVideo();
            break;
        case tvKey.KEY_DOWN:
            alert("down");
			Player.backwardVideo();
            break;
        case tvKey.KEY_ENTER:
            alert("enter");
            break;
    }
}

