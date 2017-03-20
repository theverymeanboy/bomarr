export default class Util {
	static validateUrl ( domain , page ) {
		let pageWithDomain = false;
		if ( ! page || page == '#' ) {
			return false;
		}
		page = page.trim ();
		
		if ( page.substring ( 0 , 1 ) == '/' && page.substring ( 0 , 2 ) != '//' ) {
			pageWithDomain = `${domain}${page}`;
		} else if ( page.substring ( 0 , 4 ) == 'http' && page.indexOf ( domain ) >= 0 ) {
			pageWithDomain = page;
		} else if ( page.substring ( 0 , 2 ) == '//' && (`https:${page}`.indexOf ( domain ) == 0 || `http:${page}`.indexOf ( domain ) == 0) ) {
			pageWithDomain = domain.indexOf ( 'https:' ) == 0 ? `https:${page}` : `http:${page}`;
		}
		
		if ( pageWithDomain && pageWithDomain != domain && pageWithDomain.split ( '/' ).reverse ()[ 0 ].indexOf ( '.' ) >= 0 ) {
			return pageWithDomain;
		}
		
		if ( pageWithDomain && pageWithDomain.indexOf ( '?' ) < 0 && pageWithDomain.split ( '' ).reverse ()[ 0 ] != '/' ) {
			pageWithDomain += '/';
		}
		
		if ( pageWithDomain && pageWithDomain.indexOf ( '?' ) >= 0 ) {
			const baseUrlParts = pageWithDomain.split ( '?' );
			if ( baseUrlParts[ 0 ].split ( '' ).reverse ()[ 0 ] != '/' ) {
				pageWithDomain = `${baseUrlParts[ 0 ]}/?${baseUrlParts[ 1 ]}`;
			}
		}
		
		return pageWithDomain;
	}
	
	static pageIndex ( pages , page ) {
		return pages.map ( p => p.url ).indexOf ( page );
	}
	
	static pageExists ( pages , page ) {
		return this.pageIndex ( pages , page ) >= 0;
	}
}