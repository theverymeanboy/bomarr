bomarr
================
### A simple NodeJS web crawler

A simple web spider that will crawl all of the available pages for a given domain.


Installation
------------

Install with `npm`:

``` bash
$ npm install bomarr
```

or `yarn`:

``` bash
$ yarn add bomarr
```


Example
-------

``` js
var Spider = require('bomarr');

var options = {
  "domain": "", // domain to be crawled.  Should include protocol, but no trailing slash.  i.e. https://github.com
  "delay": 10000, // delay between page crawls in miliseconds.  Default is 10 seconds.
  "proxy": "", // IP of proxy if you should need it.  Under the hood, it uses: https://github.com/TooTallNate/superagent-proxy
}

//Initiate spider and start crawling
var spider = new Spider(options);
spider.start();

//Listen for page added to internal list of pages ready to be crawled.
spider.on('page-added', function(page){
  //returns url of page.
});


//Listen for page crawled and its contents added to internal list.
spider.on('crawl-page', function(page){
  //returns crawled page.
});

//Listen for crawl completes.
spider.on('crawl-finish', function(pages){
  //returns list of pages.
});
```


License
-------

(The MIT License)

Copyright (c) 2017 Joe Cruz &lt;joecruz.tvmb@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.