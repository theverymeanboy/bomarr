import { EventEmitter } from 'events';
import request from 'superagent';
import requestProxy from 'superagent-proxy';
import cheerio from 'cheerio';
requestProxy ( request );

import Util from './util';

export const initialState = {
	domain : '' ,
	pages : [] ,
	started : false ,
	proxy : '' ,
	timer : null ,
	delay : 10000
};

export default class Spider extends EventEmitter {
	constructor ( options ) {
		super ();
		
		this.state = Object.assign ( {} , initialState , options ? options : {} );
	}
	
	start () {
		if ( this.state.started ) {
			return false;
		}
		
		this.emit ( 'crawl-started' );
		
		this.state.started = true;
		this.addPage ( '/' );
		setTimeout ( () => this.getNextPage () , this.state.delay );
		return true;
	};
	
	addPage ( page ) {
		const validatedPage = Util.validateUrl ( this.state.domain , page );
		
		if ( ! validatedPage || Util.pageExists ( this.state.pages , validatedPage ) ) {
			return false;
		}
		
		const newPage = {
			url : validatedPage ,
			processed : false ,
			processing : false ,
			content : ''
		};
		
		this.emit ( 'page-added' , newPage );
		
		this.state.pages = [ ...this.state.pages , newPage ];
	}
	
	getNextPage () {
		const unprocessedPages = this.state.pages.filter ( p => ! p.processed && ! p.processing );
		if ( unprocessedPages.length > 0 ) {
			console.log ( 'crawling' , unprocessedPages[ 0 ].url )
			this.getPage ( unprocessedPages[ 0 ] );
		} else {
			this.finishCrawl ();
		}
	}
	
	getPage ( page ) {
		const pageIndex = Util.pageIndex ( this.state.pages , page.url );
		
		this.state.pages[ pageIndex ].processing = true;
		
		if ( this.state.proxy ) {
			request
				.get ( page.url )
				.proxy ( this.state.proxy )
				.end ( ( err , res ) => this.processPage ( res , page ) );
		} else {
			request
				.get ( page.url )
				.end ( ( err , res ) => this.processPage ( res , page ) );
		}
	}
	
	processPage ( res , page ) {
		if ( ! res ) {
			this.state.timer = setTimeout ( () => this.getNextPage () , this.state.delay );
			return;
		}
		
		const pages        = this.state.pages;
		const nowPageIndex = Util.pageIndex ( pages , page.url );
		const newPage      = {
			url : page.url ,
			processed : true ,
			processing : false ,
			content : res.text
		};
		this.emit ( 'crawl-page' , newPage );
		pages[ nowPageIndex ] = newPage;
		this.state.pages      = pages;
		
		try {
			const $ = cheerio.load ( res.text );
			$ ( 'a' ).each ( ( key , a ) => {
				this.addPage ( $ ( a ).attr ( 'href' ) );
			} );
		} catch ( err ) {
		}
		
		this.state.timer = setTimeout ( () => this.getNextPage () , this.state.delay );
	}
	
	finishCrawl () {
		this.emit ( 'crawl-finished' , this.state.pages );
		this.state.started = false;
	}
}