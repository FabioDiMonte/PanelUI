/**
 * Created by fdimonte on 24/04/2015.
 */

var PUIPanelComponentGroup = (function($, PUIElement){

    /**
     * PUIPanelComponentGroup Class
     *
     * @param components
     * @constructor
     */
    function PUIPanelComponentGroup(components) {
        this.components = components;
        PUIElement.call(this,'group');
    }

    /**
     * PUIPanelComponentGroup prototype
     *
     * @type {PUIElement}
     */
    PUIPanelComponentGroup.prototype = Object.create(PUIElement.prototype);

    /* *******************************
     * OVERRIDE SUPER CLASS METHODS
     * *******************************/

    PUIPanelComponentGroup.prototype.getElement = function() {
        var $block = $('<div/>').addClass('block');
        for(var i=0;i<this.components.length;i++){
            $block.append(this.components[i].toDom());
        }
        return $block;
    };

    return PUIPanelComponentGroup;

}(PUIElement));
