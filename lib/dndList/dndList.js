
var sitemapHistory = {
    stack: new Array(),
    temp: null,
    //takes an element and saves it's position in the sitemap.
    //note: doesn't commit the save until commit() is called!
    //this is because we might decide to cancel the move
    saveState: function(item) {
        sitemapHistory.temp = { item: $(item), itemParent: $(item).parent(), itemAfter: $(item).prev() };
    },
    commit: function() {
        if (sitemapHistory.temp != null) sitemapHistory.stack.push(sitemapHistory.temp);
    },
    //restores the state of the last moved item.
    restoreState: function() {
        var h = sitemapHistory.stack.pop();
        if (h == null) return;
        if (h.itemAfter.length > 0) {
            h.itemAfter.after(h.item);
        }
        else {
            h.itemParent.prepend(h.item);
        }
		//checks the classes on the lists
		$('#sitemap li.sm2_liOpen').not(':has(li)').removeClass('sm2_liOpen');
		$('#sitemap li:has(ul li):not(.sm2_liClosed)').addClass('sm2_liOpen');
    }
}

//init functions
$(function() {
	
	$.fn.dndList = function(params) {
		
		var defaults = {
				draggableItemClass : "drag",
		        openNodeClass : "dnd_listOpen",
		        closeNodeClass : "dnd_listClosed",
		        expanderClass : "dnd_expander"
		    };   
		
		params = $.extend(defaults, params); 
		
	    $(this).find('li').prepend('<div class="dropzone"></div>');
	
	    $(this).find('dl, .dropzone').droppable({
	        accept: function(d) { 
	            if(d.parents().has($(this))){
	                return true;
	            }
	        },
	        tolerance: 'pointer',
	        drop: function(e, ui) {
	    	
	            var li = $(this).parent();
	            var child = !$(this).hasClass('dropzone');
	            
	            if (child && li.children('ul').length == 0) {
	                li.append('<ul/>');
	            }
	            
	            if (child) 
	            {
	                li.addClass(params.openNodeClass).removeClass(params.closeNodeClass).children('ul').append(ui.draggable);
	            }
	            else 
	            {
	                li.before(ui.draggable);
	            }
	            
	            $(this).find('li.'+params.openNodeClass).not(':has(li:not(.ui-draggable-dragging))').removeClass(params.openNodeClass);
	            li.find('dl,.dropzone').css({ backgroundColor: ''});
	            sitemapHistory.commit();
	            
	            if($(this).hasClass('dropzone'))
	            {
	            	params.onDropInterline.call(this, {
	            		src : $(ui.draggable).attr('id').substr(4),
	            		dst : $(this).parent().attr("id").substr(4)
	            	});
	            }
	            else
	            {
	            	params.onDropElement.call(this, {
	            		src : $(ui.draggable).attr('id').substr(4),
	            		dst : $(this).parent().attr("id").substr(4)
	            	});
	            }            
	            
	        },
	        over: function() {
	            $(this).filter('dl').css({ backgroundColor: '#ccc' });
	            $(this).filter('.dropzone').css({ backgroundColor: '#aaa' });
	        },
	        out: function() {
	            $(this).filter('dl').css({ backgroundColor: '' });
	            $(this).filter('.dropzone').css({ backgroundColor: '' });
	        }
	    });
	    
	    $(this).find('li.'+params.draggableItemClass).draggable({
	        handle: 'img',
	        opacity: .8,
	        addClasses: false,
	        helper: 'clone',
	        zIndex: 100,
	        start: function(e, ui) {
	            sitemapHistory.saveState(this);
	        }
	    });

	    // History
	    $('.sitemap_undo').click(sitemapHistory.restoreState);
	    $(document).bind('keypress', function(e) {
	        if (e.ctrlKey && (e.which == 122 || e.which == 26))
	            sitemapHistory.restoreState();
	    });
	    
	    
	    // Toggle
		$('.'+params.expanderClass).live('click', function() {
			$(this).parent().parent().toggleClass(params.openNodeClass).toggleClass(params.closeNodeClass);
			return false;
		});
		
		return this;
	}
});

