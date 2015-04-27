/**
 * Created by fdimonte on 24/04/2015.
 */

var PUIElementContainer = (function($, PUIElement){

    /**
     * PUIElementContainer Class
     *
     * @param name
     * @param title
     * @param type
     * @constructor
     */
    function PUIElementContainer(name,title,type) {
        this.type = type;
        PUIElement.call(this,name,title);
    }

    /**
     * PUIElementContainer prototype
     *
     * @type {PUIElement}
     */
    PUIElementContainer.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PUIElementContainer.prototype.getElement = function() {

        return $('<div/>').attr('id','ic-'+this.name).addClass('ic-'+this.type)
            .append(
            $('<p/>').text(this.title)
        );

    };

    return PUIElementContainer;

}(jQuery, PUIElement));
