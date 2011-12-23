(function(window, undefined){
    var self = {};

    self.Router = Backbone.Router.extend({
        routes: {
            ":user/":               "user",
            ":user/:set":           "user",
            "help":                 "help",    // #help
            "search/:query":        "search",  // #search/kiwis
            "search/:query/p:page": "search"   // #search/kiwis/p7
        },

        user: function(user, set){
            return false;
        },
        help: function() {
            return false;
        },

        search: function(query, page) {
            return false;
        }

    });

    self.term = Backbone.Model.extend();

    self.dataSet = Backbone.Collection.extend({
        model: self.term
    });

    self.flashCardSetView = Backbone.View.extend({
        el: $('#flash_cards_view'),

        render: function( event ){
            var compiled_template = _.template( $("#flash_cards_view_template").html() );
            this.el.html(
                compiled_template(
                    this.model.toJSON()
                )
            );
            return this; //recommended as this enables calls to be chained.
        },

        events: {
            "click button.back": "back",
            "click button.next": "next",
            "click div.flash_card": "flip"
        },
        back: function( event ){
            //executed when a form '#searchForm' has been submitted
        },
        next: function( event ){
            //executed when an element with class "reset" has been clicked.
        },
        flip: function( event ){

        }
    });


    window.studdio = self;
})(window);
