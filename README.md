# AtemVideohubNameExchange

Dynamically connect ATEM outputs to Videohub inputs.
For use with Blackmagic Design ATEM mixers and Smart Videohub routers.

Currently only tested using a Blackmagic ATEM Constellation 8k and a Smart Videohub 12G 40 x 40.

## Uses Node.js 'net' module for TCP connection with Videohub and 'applest-atem' for connection with ATEM

## Current version: 0.0.1

## Not ready for production!

ATEM listener and parser for outputnames, generateAtemOutputListWithSourceNames(), is ready
Function for changing Videohub inputlabels, writeLabelToVideohub(), is in place.
Videohub connection is made, parsing of data from videohub not yet in place.

## Expected functionality for v1.0.0

Assign which ATEM Outputs (or auxs) are connected to which input of the videohub.
Update input labels for Videohub based on the name of the currently routed output from the ATEM

## Expected functionality for v1.1.0

Automatically update output names on changes from the ATEM. Constant connection with the ATEM is required for this feature.