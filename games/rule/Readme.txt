So, best way to actually run this game is to stick it on a webserver, but that's not always possible

if you have python 3 installed you can open a command prompt, navigate to this folder (unzipped), and run:

python -m http.server

then open a web browser and type the URL as

localhost:8000


if you have python 2, use python -m SimpleHTTPServer instead