debugger;
function loadRubyMine() {
  var axel = Math.random() + "";
  var num = axel * 1000000000000000000;
  var s = '<A HREF="http://ad.doubleclick.net/ddm/jump/N3643.1922313RAILSONMAUI1/B8257337.116550223;sz=260x87;ord='
    + num + '?"><IMG SRC="http://ad.doubleclick.net/ddm/ad/N3643.1922313RAILSONMAUI1/B8257337.116550223;sz=260x87;ord='
    + num + '?" BORDER=0 WIDTH=260 HEIGHT=87 ALT="RubyMine!"></A>';

  var node = document.createElement("DIV");                 // Create a <li> node
  node.innerHTML = s;
  document.getElementById("rubymine-tag").appendChild(node);     // Append <li> to <ul> with id="myList"
}
window.onload = loadRubyMine;
