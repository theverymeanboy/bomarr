import { describe , it }  from 'mocha' ;
const assert = require ( 'chai' ).assert;

import Util from '../src/util';

describe ( 'Util' , () => {
	describe ( '.validateUrl' , () => {
		it ( 'should return a valid full url, with trailing slash if applicable.' , () => {
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '/' ) , 'http://www.dvcresalemarket.com/' );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '/test' ) , 'http://www.dvcresalemarket.com/test/' );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '//www.dvcresalemarket.com/test23' ) , 'http://www.dvcresalemarket.com/test23/' );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '/test23?helloworld' ) , 'http://www.dvcresalemarket.com/test23/?helloworld' );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '/test23/?helloworld' ) , 'http://www.dvcresalemarket.com/test23/?helloworld' );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '/test23.php' ) , 'http://www.dvcresalemarket.com/test23.php' );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '/test23.php?helloworld' ) , 'http://www.dvcresalemarket.com/test23.php?helloworld' );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , 'http://www.dvcresalemarket.com' ) , 'http://www.dvcresalemarket.com/' );
			assert.equal ( Util.validateUrl ( 'https://www.dvcresalemarket.com' , '/' ) , 'https://www.dvcresalemarket.com/' );
			assert.equal ( Util.validateUrl ( 'https://www.dvcresalemarket.com' , '/test' ) , 'https://www.dvcresalemarket.com/test/' );
			assert.equal ( Util.validateUrl ( 'https://www.dvcresalemarket.com' , '//www.dvcresalemarket.com/test23' ) , 'https://www.dvcresalemarket.com/test23/' );
			assert.equal ( Util.validateUrl ( 'https://www.dvcresalemarket.com' , '/test23?helloworld' ) , 'https://www.dvcresalemarket.com/test23/?helloworld' );
			assert.equal ( Util.validateUrl ( 'https://www.dvcresalemarket.com' , '/test23/?helloworld' ) , 'https://www.dvcresalemarket.com/test23/?helloworld' );
			assert.equal ( Util.validateUrl ( 'https://www.dvcresalemarket.com' , '/test23.php' ) , 'https://www.dvcresalemarket.com/test23.php' );
			assert.equal ( Util.validateUrl ( 'https://www.dvcresalemarket.com' , '/test23.php?helloworld' ) , 'https://www.dvcresalemarket.com/test23.php?helloworld' );
			assert.equal ( Util.validateUrl ( 'https://www.dvcresalemarket.com' , 'https://www.dvcresalemarket.com' ) , 'https://www.dvcresalemarket.com/' );
		} );
		
		it ( 'should return false if url is from another domain.' , () => {
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '//test.com/test' ) , false );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , 'http://test.com/test23' ) , false );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , 'https://test.com/test24' ) , false );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' , '#' ) , false );
			assert.equal ( Util.validateUrl ( 'http://www.dvcresalemarket.com' ) , false );
		} );
	} );
	
	describe ( '.pageIndex' , () => {
		const pages = [ {
			url : '/'
		} ];
		
		it ( 'should return the index of a page if it exists, or -1 if it does not' , () => {
			assert.isAtLeast ( Util.pageIndex ( pages , '/' ) , 0 );
			assert.equal ( Util.pageIndex ( pages , '/test' ) , - 1 );
		} );
	} );
	
	describe ( '.pageExists' , () => {
		const pages = [ {
			url : '/'
		} ];
		
		it ( 'should return the page if it exists, or false if it does not' , () => {
			assert.equal ( Util.pageExists ( pages , '/' ) , true );
			assert.equal ( Util.pageExists ( pages , '/test' ) , false );
		} );
	} );
} );