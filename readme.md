voter-server
===================
# Server Side code for voter app

The app will take in a list of entries and start the voting process. Users can vote through the client side of the application. Vote will occur in pairs for a number of entries and eventually a winning entry will be chosen

I have developed the app o learn React, Redux, Webpack and related tools by following this awesome article on [Fullstack Redux](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)

----------


scripts
-------------

You can run `npm` to run all the test as well as the server commands. 

**Running Tests:**

Run all unit test with `npm run test` command. 

What it will do is it will recursively look through the files to find all the tests  and run them. 

The test framework is [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) assertation library is used. As the app uses immutable objects the `chai-immutable` plugin is also used. 