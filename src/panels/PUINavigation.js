/**
 * Created by fdimonte on 24/04/2015.
 */

var PUINavigation = (function(PUIElementContainer){

    /**
     * PUINavigation Class
     *
     * @constructor
     */
    function PUINavigation() {
        PUIElementContainer.call(this,'navigation','navigation','navigation');
    }

    /**
     * PUINavigation prototype
     *
     * @type {PUIElementContainer}
     */
    PUINavigation.prototype = Object.create(PUIElementContainer.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PUINavigation.prototype.getElement = function() {
        return $('<nav/>').append('<ul/>');
    };

    PUINavigation.prototype.initEvents = function() {
        this.setEvent('click','a',function(e){
            this.trigger('click',$(e.currentTarget).data('panel'));
        });
    };

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    PUINavigation.prototype.addTab = function(name,label) {
        this.$el.find('ul').append(
            $('<li/>').append($('<a/>').data('panel',name).text(label))
        );
    };

    return PUINavigation;

}(PUIElementContainer));
