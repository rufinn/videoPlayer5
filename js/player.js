var Player =
{
    plugin : null,
    state : -1,
    originalSource : null,

    STOPPED : 0,
    PLAYING : 1,
    PAUSED : 2,  
}

Player.init = function()
{
var success = true;
    alert("success vale :  " + success);    
    this.state = this.STOPPED;
    
    this.plugin = document.getElementById("pluginPlayer");
    
    if (!this.plugin)
    {
          alert("success vale this.plugin :  " + success);    
         success = false;
    }
    
    alert("success vale :  " + success);    
    
    this.setFullWindow();
    
    alert("success vale :  " + success);    
    
	
    this.plugin.OnCurrentPlayTime = 'Player.setCurTime';
    this.plugin.OnStreamInfoReady = 'Player.setTotalTime';
    this.plugin.OnBufferingStart = 'Player.onBufferingStart';
    this.plugin.OnBufferingProgress = 'Player.onBufferingProgress';
    this.plugin.OnBufferingComplete = 'Player.onBufferingComplete';           
            
    alert("success vale :  " + success);       
	
    return success;
}




Player.deinit = function()
{
      alert("Player deinit !!! " );       
      
      if (this.plugin)
      {
            this.plugin.Stop();
      }
}

Player.setFullWindow = function()
{
	var size = sf.env.getScreenSize();
    //this.plugin.SetDisplayArea(0, 0, size.width, size.height);
    this.plugin.SetDisplayArea(0, 0, size.width, size.height);
}

Player.setPartWindow = function()
{
	var size = sf.env.getScreenSize();
    this.plugin.SetDisplayArea(0, 0, size.width*0.8, size.height*0.8);
}

Player.setVideoURL = function(url)
{	
	(url)?this.url=url:this.url='http://video.ted.com/talk/podcast/2012X/None/LisaKristine_2012X.mp4';
    //this.url = "http://video.ted.com/talk/podcast/2012X/None/LisaKristine_2012X.mp4";
    alert("URL = " + this.url);
}

Player.playVideo = function()
{
	alert('playVideo');
    if (this.url == null)
    {
        alert("No videos to play");
    }
    else
    {
        this.state = this.PLAYING;
        this.plugin.Play( this.url );
        alert("Playing...");
    }
}

Player.stopVideo = function(){
	this.state = this.STOPPED;
	this.plugin.Stop();
	alert("Stop...");
}
Player.pauseVideo = function(){
	this.state = this.PAUSED;
	this.plugin.Pause();
}
Player.resumeVideo = function(){
	this.state = this.PLAY;
	this.plugin.Resume();
}
Player.forwardVideo = function(){
	this.plugin.JumpForward(10);
}
Player.backwardVideo = function(){
	this.plugin.JumpBackward(10);
}

// Global functions called directly by the player 
startDrawLoading = function() { alert("startDrawLoading"); }

endDrawLoading = function() { alert("endDrawLoading"); }

getBandwidth = function(bandwidth) { alert("getBandwidth " + bandwidth); }

onDecoderReady = function() { alert("onDecoderReady"); }

onRenderError = function() { alert("onRenderError"); }

popupNetworkErr = function() { alert("popupNetworkErr"); }

setCurTime = function(time) { alert("setCurTime " + time); }

setTottalTime = function(time) { alert("setTottalTime " + time); }

stopPlayer = function() { alert("stopPlayer"); }

setTottalBuffer = function(buffer) { alert("setTottalBuffer " + buffer); }

setCurBuffer = function(buffer) { alert("setCurBuffer " + buffer); }

onServerError = function() { alert("onServerError"); }


// Global functions called directly by the player 
/*
Player.onBufferingStart = function()
{
    Display.status("Buffering...");
}

Player.onBufferingProgress = function(percent)
{
    Display.status("Buffering:" + percent + "%");
}

Player.onBufferingComplete = function()
{
    Display.status("Play");
}

Player.setCurTime = function(time)
{
    Display.setTime(time);
}

Player.setTotalTime = function()
{
    Display.setTotalTime(Player.plugin.GetDuration());
}

onServerError = function()
{
    Display.status("Server Error!");
}

onNetworkDisconnected = function()
{
    Display.status("Network Error!");
}
*/
getBandwidth = function(bandwidth) { alert("getBandwidth " + bandwidth); }

onDecoderReady = function() { alert("onDecoderReady"); }

onRenderError = function() { alert("onRenderError"); }

stopPlayer = function()
{
    Player.stopVideo();
}


setTottalBuffer = function(buffer) { alert("setTottalBuffer " + buffer); }