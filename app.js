const app = require('express'),
    ATEM = require('applest-atem'),
    atem = new ATEM(),
    net = require('net'),
    atemIPAddress = '192.168.10.240';
var videohubIPAddress = '192.168.10.150'
    // videohub = new Videohub({ host: videohubIPAddress, port: '9990' });

// ATEM CONNECTION
atem.connect(atemIPAddress);

atem.on('connect', function() {
    console.log("Connected to ATEM @" + atemIPAddress)
});
atem.on('stateChanged', function() {})

function generateAtemOutputListWithSourceNames() {
    let atemListOfOutputs = atem.state.video.auxs
    let atemListOfSources = atem.state.channels
    var atemOutputsAndSourcesArray = {}
    Object.keys(atemListOfOutputs).forEach((output) => {
        let outputSourceNameInAtem = atemListOfSources[atemListOfOutputs[output]].name
        atemOutputsAndSourcesArray[output] = (outputSourceNameInAtem)
    })
    return atemOutputsAndSourcesArray
}

atem.on('disconnect', function() {
    console.log("No ATEM currently connected!")
})

// var atemOutputsList = generateAtemOutputListWithSourceNames()
// newLabelFromAtem = atemOutputsList[20]

// VIDEOHUB CONNECTION
var videohub = new net.Socket();
var videohubInputIndex = 18,
    videohubInputNumber = videohubInputIndex + 1;
var newLabelFromAtem = ' CamTEST'

videohub.connect(9990, videohubIPAddress, function() {
    console.log('Connected to the Videohub @' + videohubIPAddress);
    writeLabelToVideohub(videohubInputIndex, videohubInputNumber, newLabelFromAtem)
});
const listOfLinkedAtemOutputsVideohubInputs = { 19: 17, 20: 18, 21: 19, 22: 20, 23: 21, 24: 22 }


function writeLabelToVideohub(videohubInputIndex, videohubInputNumber, newLabelFromAtem) {
    videohub.write('INPUT LABELS:')
    videohub.write('\n')
    videohub.write(videohubInputIndex + ' ' + videohubInputNumber + newLabelFromAtem)
    videohub.write('\n')
    videohub.write('\n')
        // videohub.destroy()
}
var dataArray = []

videohub.on('data', function(data) {
    dataArray.push(data.toString())
    console.log('' + data)
});

videohub.on('close', function() {
    console.log('Videohub Connection closed');
});