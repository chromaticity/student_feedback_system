// all of the socket.io events needed to retrieve the votes in real time
// establish connection
  var socket = io.connect('http://localhost:8080');
//   retrieve socket calls for thumbs down
  socket.on('thumbsdown_sent', function (data) {
	document.getElementById("thumbsdown").innerHTML = data.thumbsdown;
    socket.emit('my other event', { status: 'Thumbs Down counter initiated.' });
  });

// retrieve socket calls for thumbs up
  socket.on('thumbsup_sent', function (data) {
	document.getElementById("thumbsup").innerHTML = data.thumbsup;
    socket.emit('my other event', { status: 'Thumbs Up counter initiated.' });
  });

  // retrieve socket calls for speaklouder
  socket.on('speaklouder_sent', function (data) {
	document.getElementById("speak_louder").innerHTML = data.speaklouder;
    socket.emit('my other event', { status: 'Speak Louder counter initiated.' });
  });

 // retrieve socket calls for speak slower
  socket.on('speakslower_sent', function (data) {
	document.getElementById("speak_slower").innerHTML = data.speakslower;
    socket.emit('my other event', { status: 'Speak Slower counter initiated.' });
  });
  
  // retrieve socket calls for speakfaster
  socket.on('speakfaster_sent', function (data) {
	document.getElementById("speak_faster").innerHTML = data.speakfaster;
    socket.emit('my other event', { status: 'Speak Faster counter initiated.' });
  });