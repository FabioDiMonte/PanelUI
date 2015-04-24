/**
 * Created by fdimonte on 24/04/2015.
 */

var PUIPanelComponent = (function(PUIElementContainer){

    /**
     * PUIPanelComponent Class
     *
     * @param panel
     * @param name
     * @param title
     * @constructor
     */
    function PUIPanelComponent(panel,name,title) {
        PUIElementContainer.call(this,panel+'-'+name,title,'panel-component');
    }

    /**
     * PUIPanelComponent prototype
     *
     * @type {PUIElementContainer}
     */
    PUIPanelComponent.prototype = Object.create(PUIElementContainer.prototype);

    return PUIPanelComponent;

}(PUIElementContainer));
