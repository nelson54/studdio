(function( $ ){

 var settings = {
	url : ''
 };
 
 var dataSets;
 var html;
 var methods = {
    init : function( options ) { 
		methods.settings(options);
		
		methods.load();
    },
    show : function( ) {

    },
    hide : function( ) { 
      // GOOD
    },
    update : function( data ) {
      dataSets = data;
      html = methods.createHTML(data);
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
    createHTML : function ( dataSets){
	  var wrapper = '<table class="ui-paginate-table" />';
	  
	  var thead = '<thead><tr><th>Month</th><th>Savings</th></tr></thead>';
	  
	  var row = '<tr />';
	  var dataElement = '<td />';
	  window.appHTML = $(wrapper).append(thead);
	  $.each(dataSets, function(i, set){
	  	$(window.appHTML).append(
	  		$(row).append(
  				$('<td />').text(set.Title)
  			).append(
  				$('<td />').text(set.Description)
  			)
	  	)
	  
	  })
	  return(window.appHTML)
    },
    first : function(){

    },
    next : function(){

    },
    prev : function(){

    },
    settings : function(options){
		$.extend( settings, options);
    }
  };
	  
  $.fn.jqPaginate = function( method ) {
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