var getUserMedia = require('get-user-media-promise');
var MicrophoneStream = require('microphone-stream');


var exported = {}

function convertFloat32ToInt16(buffer) {
  var l = buffer.length;
  var buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l])*0x7FFF;
  }
  return buf.buffer;
}


exported.turnOn = function() {

  var onSocketOpen = () => console.log('[STREAM SOCKET] connected');

  var socket = new WebSocket('wss://rpa-channel.intg.ws.189544.xyz:7777');
  socket.onopen = this.onSocketOpen;

  exported.socket = socket;

  exported.micStream = new MicrophoneStream();
  // note: for iOS Safari, the constructor must be called in response to a tap, or else the AudioContext will remain
  // suspended and will not provide any audio data.
  var micStream = exported.micStream;

  getUserMedia({ video: false, audio: true })
    .then(function(stream) {
      micStream.setStream(stream);
    }).catch(function(error) {
      console.log(error);
    });


  // get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
  micStream.on('data', function(chunk) {
    // Optionally convert the Buffer back into a Float32Array
    // (This actually just creates a new DataView - the underlying audio data is not copied or modified.)
    var raw = MicrophoneStream.toRaw(chunk)
    //...

    const ConversionFactor = 2 ** (16 - 1) - 1; // 32767

    const floatSamples = raw;

    if (socket && socket.readyState === socket.OPEN) {
        socket.send(convertFloat32ToInt16(raw));
    }
    // note: if you set options.objectMode=true, the `data` event will output AudioBuffers instead of Buffers
   });

  // or pipe it to another stream
  //micStream.pipe(socket);

  // It also emits a format event with various details (frequency, channels, etc)
  micStream.on('format', function(format) {
    console.log(format);
  });

}

exported.turnOff = function() {
    console.log("Stopping mic");
    exported.micStream.stop();
    exported.socket.close();
}

module.exports = exported;