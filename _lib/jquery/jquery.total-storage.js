/**
 * TotalStorage
 *
 * Copyright (c) 2011 Jared Novack & Upstatement (upstatement.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Total Storage is the conceptual the love child of jStorage by Andris Reinman, 
 * and Cookie by Klaus Hartl -- though they 
 */

/**
 * Create a local storage parameter
 *
 == What makes it TOTAL Storage? ==
 
 * The browser doesn't support local storage it will fall-back to cookies! (Using the
   wonderful $.cookie plugin).
 * Send it strings, numbers even complex object arrays! TotalStorage does not care.
   Your efforts to defeat it will prove futile. 
 * Simple as shit. jStorage and some other very well-written plugins provide a bevy of
   options for expiration, security and so forth. Frequently this is more power than you
   need and vulnerable to confusion if you're just want it to work (JWITW)
   
 * @desc Set the value of a key to a string
 * @example $.totalStorage('the_key', 'the_value');
 * @desc Set the value of a key to a number
 * @example $.cookie('the_key', 800.2);
 * @desc Set the value of a key to a complex Array
 * @example	var myArray = new Array();
 *			myArray.push({name:'Jared', company:'Upstatement', zip:63124});
			myArray.push({name:'McGruff', company:'Police', zip:60652};
			$.totalStorage('people', myArray);
			//to return:
			$.totalStorage('people');
 *
 * @name $.totalStorage
 * @cat Plugins/Cookie
 * @author Jared Novack/jared@upstatement.com
 */

;(function($){

	/* Variables I'll need throghout */

	function trace(m){
		try {
			console.log(m);
		} catch(e){}
	}

	var ls;
	var supported = true;
	if (typeof localStorage == 'undefined' || typeof JSON == 'undefined') {
		supported = false;
	} else {
		ls = localStorage;
	}
	
	/* Make the methods public */

	$.totalStorage = function(key, value, options){
		return $.totalStorage.impl.init(key, value);
	}
	
	$.totalStorage.setItem = function(key, value){
		return $.totalStorage.impl.setItem(key, value);
	}
	
	$.totalStorage.getItem = function(key){
		return $.totalStorage.impl.getItem(key);
	}
	
	$.totalStorage.getAll = function(){
		return $.totalStorage.impl.getAll();
	}
	
	/* Object to hold all methods: public and private */
	
	$.totalStorage.impl = {
		
		init: function(key, value){
			if (typeof value != 'undefined') {
				return this.setItem(key, value);	
			} else {
				return this.getItem(key);
			}
		},
		
		setItem: function(key, value){
			if (!supported){
				try {
					$.cookie(key, value);
					return true;
				} catch(e){
					trace('Local Storage not supported by this browser. Install the cookie plugin on your site to take advantage of the same functionality');
				}
			}
			var saver = JSON.stringify(value);
			ls.setItem(key, saver);
			return saver;
		},
		
		getItem: function(key){
			if (!supported){
				try {
					return this.parseResult($.cookie(key));
				} catch(e){
					return null;
				}
 			}
			return this.parseResult(ls.getItem(key));
		},	
		
		getAll: function(){
			var items = new Array();
			if (!supported){
				try {
					
				} catch(e){
					return null;
				}
			}
			for (var i in ls){
				if (i.length){
					items.push({key:i, value:this.parseResult(ls.getItem(i))});
				}
			}
			return items;
		},
		
		parseResult: function(res){
			var ret;
			try {
				ret = JSON.parse(res);
				if (ret == 'true'){
					ret = true;
				}
				if (ret == 'false'){
					ret = false;
				}
				if (parseFloat(ret) == ret){
					ret = parseFloat(ret);
				}
			} catch(e){}
			return ret;
		}
	}

})(jQuery);

