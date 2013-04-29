Tad's NodeFlickrToy

INSTRUCTIONS: To build: Windows: just run jake from command line.  If you're not on windows, you'll need to create a
bash script to run jake for you.

This is just a super simple web toy / experiment with TDD, javascript and node.js plus whatever node modules I need to
make everything work.

Eventually this will be a really simple single page web app that will grab recent flickr photos and then create a
web page showing each of the pics with links back to the original flickr photo page.

I'm attempting to do this at strictly TDD as possible.

I have a similar version of this on github that's written in Asp.Net MVC and c#.

UPDATE: April 28, 2013 - server side code is complete for phase one as server is now returning an array of urls
to recent flickr photos.  I've written all of the code so far via pretty strict TDD.  I've also written an integration
test (not via TDD) just to prove to myself that the code can work with actual flickr responses.

Phase One Web Client:
I need to learn more node.js before I can build a web client.  Phase one web client will just show a nice looking page
filled with similar sized recent photos from flickr.
