/**
* Doubleclick version. 
*/
function loadRubyMine() {
  var axel = Math.random() + "";
  var num = axel * 1000000000000000000;
  var s = '<A HREF="http://ad.doubleclick.net/ddm/jump/N3643.1922313RAILSONMAUI1/B8257337.116550223;sz=260x87;ord='
      + num + '?"><IMG id="rubymine-tag-image" SRC="http://ad.doubleclick.net/ddm/ad/N3643.1922313RAILSONMAUI1/B8257337.116550223;sz=260x87;ord='
      + num + '?" BORDER=0 WIDTH=260 HEIGHT=87 ALT="RubyMine!"></A>';

  var node = document.createElement("DIV");                 // Create a <li> node
  node.innerHTML = s;
  document.getElementById("rubymine-tag").appendChild(node);     // Append <li> to <ul> with id="myList"
}

/**
Loads a local image and goes straight to the RubyMine website.
*/
function loadRubyMineLocal() {
  var axel = Math.random() + "";
  var num = axel * 1000000000000000000;
  var s = '<A HREF="https://www.jetbrains.com/ruby/"><IMG SRC="/images/rubymine-banner.png" BORDER=0 WIDTH=260 HEIGHT=87 ALT="RubyMine!"></A>';

  var node = document.createElement("DIV");                 // Create a <li> node
  node.innerHTML = s;
  document.getElementById("rubymine-tag").appendChild(node);     // Append <li> to <ul> with id="myList"
}

// http://qnimate.com/how-to-detect-if-adblock-is-present-or-not/
function detect()
{
  //create a iframe. Append the iframe to the body. And then after 100ms check if their offsetHeight, display or visibility is set such a way that user cannot see them.
  //In the URL use the words specific to advertising so that Adblock can do string matching.
  var iframe = document.createElement("iframe");
  iframe.height = "1px";
  iframe.width = "1px";
  iframe.id = "ads-text-iframe";
  iframe.src = "http://domain.com/ads.html";
  
  document.body.appendChild(iframe);
  
  setTimeout(function() {
    var iframe = document.getElementById("ads-text-iframe");
    if(iframe.style.display == "none" || iframe.style.display == "hidden" || iframe.style.visibility == "hidden" || iframe.offsetHeight == 0)
    {
      console.log("Loading has adblock version");
      loadRubyMineLocal();
    } else {
      console.log("Loading regular version");
      loadRubyMine();
    }
    iframe.remove();
  }, 100);
}


// Run after all the page elements have loaded
window.onload = function(){ 
  detect();
}; 
