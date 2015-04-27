/**
 * Created by fdimonte on 24/04/2015.
 */

var PUIPanel = (function(PUIElementContainer){

    /**
     * PUIPanel Class
     *
     * @param name
     * @param title
     * @constructor
     */
    function PUIPanel(name,title) {
        PUIElementContainer.call(this,name,title,'panel');
        this.addComponents();
    }

    /**
     * PUIPanel prototype
     *
     * @type {PUIElementContainer}
     */
    PUIPanel.prototype = Object.create(PUIElementContainer.prototype);

    /* *******************************
     * IMPLEMENT CUSTOM METHODS
     * *******************************/

    PUIPanel.prototype.addComponents = function() {
        // this method must be overridden in order to add
        // every child needed by the PUIPanel instance
    };

    return PUIPanel;

}(PUIElementContainer));
