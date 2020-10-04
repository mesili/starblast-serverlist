# Starblast server list

Demo : [Starblast server list](https://mesili.github.io/starblast-serverlist/)

This is a little sunday project to have a better look at Starblast.io games running on the different servers.  
There is already the [Loveship's shipyard](https://starblast-shipyard.github.io/sectorListing/) that provides a similar thing but I wanted to see the mode name instead of icons, plus there is no icon for modded games. 

## Stack
- React w/ hooks
- Redux w/ thunk
- Sass (just for convenience)

## Data

The data come from the starblast.io website directly, it's the same as used in Loveship's shipyard. 
I have set a 20 seconds fetch interval.

## Styles

I borrowed some styles from the Starblast.io home page to help having a better experience but it's not that much. 

The font is *Play* available on Google fonts. 

## Disclaimer 

It was done in one or two hours on a sunday, and it's not meant to demonstrate clean coding, good use of hooks or anything. 
If you still see something that you can't stand and could be done better feel free to send a PR though :-)
