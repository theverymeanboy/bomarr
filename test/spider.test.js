import { describe , it }  from 'mocha' ;
const assert = require ( 'chai' ).assert;

import Spider , { initialState } from '../src/spider';

describe ( 'Spider' , () => {
	describe ( '()' , () => {
		it ( 'should return a spider with the correct initial state' , () => {
			const state   = Object.assign ( {} , initialState , { delay : 10 , domain : 'http://test.com' } );
			const crawler = new Spider ( { delay : 10 , domain : 'http://test.com' } );
			
			assert.deepEqual ( crawler.state , state );
		} );
	} );
	
	describe ( '.start()' , () => {
		it ( 'should return true if spider is not already running' , () => {
			const crawler = new Spider ( { delay : 10 , domain : 'http://hexadite.dev' } );
			
			assert.equal ( crawler.start () , true );
			assert.equal ( crawler.start () , false );
		} );
	} );
	
	describe ( '.finishCrawl()' , () => {
		it ( 'should return undefined' , () => {
			const crawler = new Spider ( { delay : 10 , domain : 'http://hexadite.dev' } );
			assert.isUndefined ( crawler.finishCrawl () );
		} );
	} );
	
	describe ( '.getNextPage()' , () => {
		it ( 'should return undefined' , () => {
			const crawler = new Spider ( { delay : 10 , domain : 'http://hexadite.dev' } );
			assert.isUndefined ( crawler.getNextPage () );
		} );
	} );
	
	describe ( '.getPage()' , () => {
		it ( 'should return undefined' , () => {
			const crawler = new Spider ( { delay : 10 , domain : 'http://hexadite.dev' } );
			crawler.addPage ( '/' );
			assert.isUndefined ( crawler.getPage ( crawler.state.pages[ 0 ] ) );
		} );
	} );
	
	describe ( '.processPage()' , () => {
		it ( 'should return undefined' , () => {
			const crawler = new Spider ( { delay : 10 , domain : 'http://hexadite.dev' } );
			assert.isUndefined ( crawler.processPage ( { text : '' } , '/' ) );
			assert.isUndefined ( crawler.processPage ( null , '/' ) );
		} );
	} );
} );