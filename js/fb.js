var myfb = {};

myfb.access_token ="";
myfb.friends = [];
myfb.list = {};
myfb.fbToken = {};

function get_request(url, SuccessCallback){
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open('GET', url, true);		
	xmlHttp.send(null);
	
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
			state_change(SuccessCallback);
		}
	}
}

function state_change(SuccessCallback){
	if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			response_data = eval('('+xmlHttp.responseText+')');
			SuccessCallback(response_data);
		}
	}
}

myfb.getFriends = function(callback){

	var q = "select uid, name from user where is_app_user = 1 and uid in (SELECT uid1 FROM friend WHERE uid2 = me())";
	var url = "https://graph.facebook.com/me/fql?q="+q+"&access_token="+myfb.access_token;
	var friends = {};
	get_request(url, function(response){
		//myfb.friends=response.data;
		try{
			myfb.list[myfb.access_token] = response.data;
			
			//myfb.f = myfb.f.concat(response.data);
			myfb.friends = [];
				
			for(var n in myfb.list)
				myfb.friends = myfb.friends.concat(myfb.list[n]);
				
			for(var n in myfb.friends)
				alert('frd:'+JSON.stringify(myfb.friends[n]));
				
		}
		catch(e){
		alert('err:'+e);
		}
		callback();
	});

}

var tools = {};
tools.checkEmpty = function(obj){
	for(var i in obj){return false;}
	return true;
}
tools.getFriends = function(data){

////////////////////////////////////////////////////////
//Set Multiple users' access token
//	if(!(data.uid in myfb.access_token)){
//		alert('no token');
//		myfb.access_token['data.uid'] = data.fbToken;
//	}
///////////////////////////////////////////////////////
// Single user only!!!!
	//if(!myfb.access_token){
	//	alert('no token');
		myfb.access_token = data.fbToken;
	//}


///////////////////////////////////////////////
// Get multiple user friend
//	myfb.getFriends(
//
//		
//	});
	
// Single user onlt!!!	

	myfb.getFriends(
		function(){
			alert('callback');
			try{
			/*
			for(var key in myfb.friends){
					if(myfb.friends[key].uid in data.users)
						userList.updateFriends(myfb.friends[key]);		
						//list.push(myfb.friends[key]);
			}
			*/
			
			for(var key in myfb.friends){
				if(myfb.friends[key].uid in data.users)
					userList.updateFriends(myfb.friends[key]);					
			}
			
			alert('ok');

			}
			catch(e){
				alert('err:'+e);
			}
			//userList.updateFriends(list);
		});
}

tools.checkFriends = function(id){
	for(var key in myfb.friends){
		if(myfb.friends[key].uid == id)
			return true;
	}
	return false;
}