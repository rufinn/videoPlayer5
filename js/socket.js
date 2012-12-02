var socket = null;

socket = io.connect('http://137.189.97.35:39930');
socket.on('connect', function(){
	alert('html connect');

	socket.on('updateLink', function(data){
		Main.updateVideo(data.videoUrl, data.newVid);
		userList.init();
	});
	socket.on('chat tv', function(data){
		var html = [];
		html.push(document.getElementById('chat_output').innerHTML);
		html.push('<div class="chat">');
		html.push(data.name,":<br/>",data.msg,"<br/></div>");
		document.getElementById('chat_output').innerHTML = html.join('');
	});
	socket.on('tv control', function(data){
		switch(data.control){
			case 1:
				alert('play');
				Player.playVideo();
				break;
			case 2:
				alert('stop');
				Player.stopVideo();
				break;
			case 3:
				alert('pause');
				Player.pauseVideo();
				break;
			case 4:
				alert('resume');
				Player.resumeVideo();
				break;
			case 5:
				alert('ff');
				Player.forwardVideo();
				break;
			case 6:
				alert('rw');
				Player.backwardVideo();
				break;
			case 7:
				var chat = document.getElementById('chatcol');
				var col = document.getElementById('widgetcol');
				// Show chat
				if(chat.style.display == "block"){
					alert('block');
					chat.style.display = "none";
					col.style.background = 'rgba(0,0,0,0)';
				}
				// Hide chat
				else if(chat.style.display == "none"){
					alert('none');
					chat.style.display = 'block';
					col.style.background = 'rgba(0,0,0,0.5)';
				}
				alert('fail');
				break;
			case 8:
				var u = document.getElementById('usercol');
				var col = document.getElementById('widgetcol');
				// Show chat
				if(u.style.display == "block"){
					alert('block');
					u.style.display = "none";
					col.style.background = 'rgba(0,0,0,0)';
				}
				// Hide chat
				else if(u.style.display == "none"){
					alert('none');
					u.style.display = 'block';
					col.style.background = 'rgba(0,0,0,0.5)';
				}
				alert('fail');
				break;				
			default:
				alert('unknown control');
				break;
	
		}
	});
	
	socket.on('updateTV', function(data){
	
		switch(data.event){
		case 'login':

			if((data.token) && (Main.tv_token == data.token)){
				//user connecting tv login
				if(!myfb.fbToken[data.userid]){
					myfb.fbToken[data.userid] = data.fbToken;
				}
				userList.addUser(data);
				tools.getFriends(data);
				alert('tools');
			}
			else if(userList.checkVid(data.curVid)){
				if(tools.checkFriends(data.userid)){
					userList.addUser(data);
					alert('userList');
				}
			}
			
			break;
		case 'logout':
			if(userList.checkVid(data.curVid)){
				if(data.userid){
				try{
					delete myfb.fbToken[data.userid];
					delete myfb.list[myfb.fbToken[data.userid]];
					//delete myfb.list[data.fbToken];
					}
					catch(e){
						alert(e);
					}
				}
				userList.removeUser(data);
			}
			break;
		case 'setVideo':
			//receiver
			if((userList.checkVid(data.oldVid))){
				userList.removeUser(data);
			}
			else if((userList.checkVid(data.newVid))){
				userList.addUser(data);
			}
			break;
		
		default: 
			break;
		}
	
	});
	
});


/*
function updateUser(data){
	alert('updateUser:'+data.event);
	
	var userNode = document.getElementById('users_output');
	//var node = document.getElementById(data.name);
	if(data.event == 'login'){
		addUser();
	}
	else{
		removeUser();
	}
	
	function addUser(){
		//var userNode = document.getElementById('users_output');
		var div = document.createElement('div');
		var name = document.createTextNode(data.userName);
		div.appendChild(name);
		div.setAttribute('id', data.userid);
		userNode.appendChild(div);
	};
	
	function removeUser(){
		var node = document.getElementById(data.userid);
		userNode.removeChild(node);
	};
	
}
*/