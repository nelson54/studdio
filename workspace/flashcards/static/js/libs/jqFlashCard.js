(function( $ ){

 var settings = {
	url : ''
 };
 
 var cards;
 var html;
 var methods = {
    init : function( options ) { 
		methods.settings(options);
		
		methods.load();
		
		$('div.ui-flashcard.selected').live( 'click', methods.flip );
		$('button.ui-flashcard-prev').live( 'click', methods.prev );
		$('button.ui-flashcard-next').live( 'click', methods.next );
    },
    show : function( ) {

    },
    hide : function( ) { 
      // GOOD
    },
    update : function( data ) {
      cards = data;
      html = methods.createHTML(cards);
      $('body').append(html);
      methods.first();
      methods.show();
    },
    load : function( data ){
		$.getJSON( 
			settings.url,
			function(data){methods.update(data)}
		);
    },
    createHTML : function (){
      var wrapper = '<div class="ui-flashcard-group" />';
      var flashcard = '<div class="ui-flashcard" />';
      var front = '<div class="ui-flashcard-front" />';
      var back = '<div class="ui-flashcard-back" />';
      window.html = $(wrapper);
      var appHtml = $('<div class="ui-flashcard-app" />');
      var left = '<div class="ui-flashcard-pannel-left"><button class="ui-flashcard-prev"><img src="http://nelson54.github.com/FlashDB/arrow-left.png"></button></div>';
      var right = '<div class="ui-flashcard-pannel-right"><button class="ui-flashcard-next"><img src="http://nelson54.github.com/FlashDB/arrow-right.png"></button></div>';
      var bottom = '<div class="ui-flashcard-pannel-bottom" />';
      $.each(cards, function(i, card){
        window.html = $(window.html).append(
          $(flashcard).append(
          	$('<div />').append( $(front).append($('<span />').text(card.term)) )
          	            .append( $(back).append($('<span />').text(card.definition)) ).html()
          )
        );
      });
      appHtml = $(appHtml).append(left).append(window.html).append(right).append(bottom);
      
      return (appHtml);
    },
    flip : function (){
    		$('div.selected').toggleClass('flip');
	    	$('div.selected div').toggleClass('ui-flashcard-face').addClass('animate');
	    	setTimeout("$('div.selected div').removeClass('animate');",500)
    },
    first : function(){
    	$('div.ui-flashcard').removeClass('flip');
    	$("div.ui-flashcard").removeClass('selected');
    	$("div.ui-flashcard").eq(0).addClass('selected first');
    	$("div.ui-flashcard").eq(1).addClass('next');
    	$("div.ui-flashcard").eq(-1).addClass('previous last');
    	$("div.ui-flashcard div.ui-flashcard-front").addClass('ui-flashcard-face');
    	$("div.ui-flashcard div.ui-flashcard-back").removeClass('ui-flashcard-face');
    },
    next : function(){
    	$('div.ui-flashcard-group').addClass('prevent-transform');
    	$('div.ui-flashcard').removeClass('flip');
    	if( $("div.next").hasClass('last') ){
	    	$("div.previous").removeClass('previous');
	    	$("div.selected").removeClass('selected').addClass('previous');
	    	$("div.last").removeClass('next').addClass('selected');
	    	$("div.first").addClass('next');
	    	$("div.ui-flashcard div.ui-flashcard-back").removeClass('ui-flashcard-face');
	    	$("div.ui-flashcard div.ui-flashcard-front").addClass('ui-flashcard-face');
    	} else {
	    	$("div.previous").removeClass('previous');
	    	$("div.selected").removeClass('selected').addClass('previous');
	    	$("div.next").removeClass('next').addClass('selected').next().addClass('next');
	    	$("div.ui-flashcard div.ui-flashcard-back").removeClass('ui-flashcard-face');
	    	$("div.ui-flashcard div.ui-flashcard-front").addClass('ui-flashcard-face');
	    }
	    return($('div.ui-flashcard-group').removeClass('prevent-transform'));
    },
    prev : function(){
    	$('div.ui-flashcard-group').addClass('prevent-transform')
    	$('div.ui-flashcard').removeClass('flip');
    	if( $("div.previous").hasClass('first') ){
    		$("div.next").removeClass('next');
    		$("div.selected").removeClass('selected').addClass('next');
	    	$("div.previous").removeClass('previous').addClass('selected');
	    	$("div.last").addClass('previous');
	    	$("div.ui-flashcard div.ui-flashcard-back").removeClass('ui-flashcard-face');
	    	$("div.ui-flashcard div.ui-flashcard-front").addClass('ui-flashcard-face');
    	} else {
    		$("div.next").removeClass('next');
    		$("div.selected").removeClass('selected').addClass('next');
	    	$("div.previous").removeClass('previous').addClass('selected').prev().addClass('previous');
	    	$("div.ui-flashcard div.ui-flashcard-back").removeClass('ui-flashcard-face');
	    	$("div.ui-flashcard div.ui-flashcard-front").addClass('ui-flashcard-face');
	    }
	    return($('div.ui-flashcard-group').removeClass('prevent-transform'));
    },
    settings : function(options){
		$.extend( settings, options);
    }
  };
	  
  $.fn.jqFlashCard = function( method ) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.jqFlashCard' );
    } 
  };
})( jQuery );