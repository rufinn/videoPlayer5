var userList = {};

userList.init = function(){
	var userNode = document.getElementById('users_output');
	if(userNode.innerHTML){
		userNode.innerHTML = "";
	}
};

userList.updateFriends = function(data){
	userList.addUser2(data);
}

userList.addUser2 = function(data){
	 var userNode = document.getElementById('users_output');
	 
	 var node = document.getElementById(data.uid);
	 if((userNode)&&(!node)){
		 var div = document.createElement('div');
		 var img = document.createElement('img');
		 var name = document.createTextNode(data.name);
		 var img_src = [];
		 img_src.push('http://graph.facebook.com/', data.uid, '/picture?type=square');
		 img.setAttribute('src', img_src.join(''));
		 div.appendChild(img);
		 div.appendChild(name);
		 div.setAttribute('id', data.uid);
		 userNode.appendChild(div);
	}
};

userList.checkVid = function(vid){
	if(Main.vid == vid){return true;} //Need update
	return false;
};

userList.addUser = function(data){
	var userNode = document.getElementById('users_output');
	var node = document.getElementById(data.userid);
	if((userNode)&&(!node)){
		var div = document.createElement('div');
		var name = document.createTextNode(data.userName);
		var img = document.createElement('img');
		var img_src = [];
		img_src.push('http://graph.facebook.com/', data.userid, '/picture?type=square');
		img.setAttribute('src', img_src.join(''));
		div.appendChild(img);
		
		div.appendChild(name);
		div.setAttribute('id', data.userid);
		userNode.appendChild(div);
		
		alert(img_src);
	}
};

userList.removeUser = function(data){
	var userNode = document.getElementById('users_output');
	var node = document.getElementById(data.userid);
	if((userNode)&&(node)){
		userNode.removeChild(node);
	}
};