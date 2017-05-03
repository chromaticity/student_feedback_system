/* 
   I decided to put all of the socket io events and the 
   chart.js stuff in here, since I thought it would be the
   most convenient
*/

// establish connection
var socket = io.connect('http://35.185.194.153');

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
    socket.emit('my other event', { status: 'Thumbs Up counter initiated.' });
  });

  // retrieve socket calls for speak slower
  socket.on('speakslower_sent', function (data) {
    speech_chart.data.datasets[0].data[0] = data.speakslower;
    speech_chart.update();
    socket.emit('my other event', { status: 'Speak Slower counter initiated.' });
  });
  
  // retrieve socket calls for speakfaster
  socket.on('speakfaster_sent', function (data) {
    speech_chart.data.datasets[0].data[1] = data.speakfaster;
    speech_chart.update();
    socket.emit('my other event', { status: 'Speak Faster counter initiated.' });
  });

  // retrieve socket calls for speaklouder - bar doesnt make sense so we'll try flash messages
  socket.on('speaklouder_sent', function (data) {
    document.getElementById("speak_up").innerHTML = '<h1 id="su_text" class="animated bounce" style="color: red;">Speak Up!</h1>';
    var el = document.getElementById("su_text");
    el.className += " fadeOut"; 
    socket.emit('my other event', { status: 'Speak Louder counter initiated.' });
  });


/* All of the graphs go here.*/

// thumbs up and thumbs down chart
var thumbs_ctx = document.getElementById("thumbs");
var thumbs_chart = new Chart(thumbs_ctx, {
    type: 'bar',
    data: {
        labels: ["Thumbs Up", "Thumbs Down"],
        datasets: [{
            label: '# of Votes',
            data: [0, 0],
            backgroundColor: [
                'rgba(0, 222, 44, 0.4)',
                'rgba(222, 15, 0, 0.4)',
            ],
            borderColor: [
                'rgba(0, 154, 10, 1)',
                'rgba(195,15,15,1)',
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

// bar chart for speaking fast or slow
var speech_ctx = document.getElementById("speech");
var speech_chart = new Chart(speech_ctx, {
    type: 'bar',
    data: {
        labels: ["Speak Slower", "Speak Faster"],
        datasets: [{
            label: '# of Votes',
            data: [0, 0],
            backgroundColor: [
                'rgba(1, 10, 255, 0.4)',
                'rgba(222, 15, 0, 0.4)',
            ],
            borderColor: [
                'rgba(1, 10, 255, 1)',
                'rgba(195,15,15,1)',
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
