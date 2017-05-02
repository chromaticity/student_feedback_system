/* 
   I decided to put all of the socket io events and the 
   chart.js stuff in here, since I thought it would be the
   most convenient
*/

// establish connection
var socket = io.connect('http://localhost:8080');

// retrieve socket calls for thumbs down and update chart js data.
  socket.on('thumbsdown_sent', function (data) {
    thumbs_chart.data.datasets[0].data[1] = data.thumbsdown;
    thumbs_chart.update();
    socket.emit('my other event', { status: 'Thumbs Down counter initiated.' });
  });

// retrieve socket calls for thumbs up
  socket.on('thumbsup_sent', function (data) {
    thumbs_chart.data.datasets[0].data[0] = data.thumbsup;
    thumbs_chart.update();
    thumbsup = data.thumbsup;
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



/* All of the graphs go here.*/
var ctx = document.getElementById("thumbs");
var thumbs_chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Thumbs Up", "Thumbs Down"],
        datasets: [{
            label: '# of Votes',
            data: [0, 0],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});