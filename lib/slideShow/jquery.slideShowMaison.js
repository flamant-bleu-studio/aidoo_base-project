/**
 * Plugin Jquery pour le module Gallerie Photo et Bloc Diaporama
 * 
 * Version 1.1
 * 
 * Les enfants doivent être des DIVs
 * Si pagination TRUE => chaque lien du paginateur doit avoir une class "[pageClass]" et les diapo un id "diapo[ID]"
 */
(function($) {

    $.gallery = function(element, options) {

    	// Defaults options
        var defaults = {
            startStopBtnId: null,
            
            usePagination : false,
            pageClass: "page",
            
            onNext  : function() {},
            onPrev  : function() {},
            onStart : function() {},
            onStop  : function() {}
        }

        var plugin = this;
        plugin.opts = {}

        var $element = $(element),  // reference to the jQuery version of DOM element the plugin is attached to
             element = element;        // reference to the actual DOM element

        var timer;
        var children = $element.children();
        var current;
        var running = false;
        var effectRunning = false;
             
        // the "constructor" method that gets called when the object is created
        plugin.init = function() {
            plugin.opts = $.extend({}, defaults, options);
       		
    		// Toutes les photos transparantes
    		children.hide();
    		// La première seulement s'affiche
    		current = $element.find('div:first');
    		
    		current.show().addClass("show");
    		
    	    plugin.startStop();
    	    
    	    if(plugin.opts.usePagination){
    	    	var pages = $element.find('a.'+plugin.opts.pageClass);

    	    	pages.live("click", function(){
    	    		plugin.goTo($(this).attr("rel"));
    	    		return false;
    	    	});
    	    	
        	}
        }

        plugin.startStop = function() {
        	if(running){
        		clearInterval(timer);
        		running = false;
        	}
        	else{
        		timer = setInterval(next, 7000);
        		running = true;
        	}
        }
        plugin.start = function() {
        	if(!running){
        		timer = setInterval(next, 7000);
        		running = true;
        	}
        }
        plugin.stop = function() {
        	if(running){
        		clearInterval(timer);
        		running = false;
        	}
        }
        plugin.reloadTimer = function() {
        	 plugin.stop();
        	 plugin.start();
        }
        plugin.next = function() {
        	next();
        }
        plugin.previous = function() {
        	previous();
        }
        plugin.goTo = function(index) {
        	goTo(index);
        }
        
        var next = function() {

        	if(effectRunning == true)
        		return;
        		
        	effectRunning = true;
			var next = (children.index(current) < children.length-1) ? current.next() : children.filter(':first');	
			
			if(!$.browser.msie){
				current.removeClass('show').fadeOut('400');
				next.addClass('show').fadeIn('400', function(){
					effectRunning = false;
				});
			}
			else {
				current.removeClass('show').fadeOut('400', function(){
					next.addClass('show').fadeIn('400'); 
					effectRunning = false;
				});
			}
			
			plugin.opts.onNext(next);

			current = next;
        }
        
        var previous = function() {
        	
        	if(effectRunning == true)
        		return;
        	
        	effectRunning = true;
			var prev = (children.index(current) != 0) ? current.prev() : children.filter(':last');
			
			
			if(!$.browser.msie){
				current.removeClass('show').fadeOut('400');
				prev.addClass('show').fadeIn('400', function(){
					effectRunning = false;
				});
			}
			else {
				current.removeClass('show').fadeOut('400', function(){
					prev.addClass('show').fadeIn('400');
					effectRunning = false;
				});
			}
			
			plugin.opts.onPrev(prev);
			
			current = prev;
        }
        
        var goTo = function(index) {

        	if(effectRunning == true)
        		return;
        		
        	effectRunning = true;
			var to = children.filter('#diapo'+index);


			if(!$.browser.msie){
				current.removeClass('show').fadeOut('400');
				to.addClass('show').fadeIn('400', function(){
					effectRunning = false;
				});
			}
			else {
				current.removeClass('show').fadeOut('400', function(){
					to.addClass('show').fadeIn('400');
					effectRunning = false;
				});
			}
			
			
			
			plugin.reloadTimer();
			current = to;
        }
        
        plugin.init();

    }

    $.fn.gallery = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('gallery')) {
                var plugin = new $.gallery(this, options);
                $(this).data('gallery', plugin);
            }
        });
    }

})(jQuery);