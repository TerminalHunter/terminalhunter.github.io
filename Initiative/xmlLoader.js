//helper functions

function loadXMLDoc(filename)
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // ew, code for IE5 and IE6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",filename,false);
xhttp.send();
return xhttp.responseXML;
}

function loadXMLString(txt) 
{
if (window.DOMParser)
  {
  parser=new DOMParser();
  xmlDoc=parser.parseFromString(txt,"text/xml");
  }
else // ew, code for IE
  {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async=false;
  xmlDoc.loadXML(txt); 
  }
return xmlDoc;
}


// --- LOAD MARKERS FROM XML ---

xmlDoc = loadXMLDoc("http://terminalhunter.github.io/Initiative/markers.xml");
console.log("it gets this far");
var title = xmlDoc.getElementsByTagName("title");
console.log(title[0].childNodes[0].nodeValue);
