/**
 * Created by fdimonte on 24/04/2015.
 */

var PUIMain = (function($, PUINavigation){

    /**
     * PUIMain Class
     *
     * @constructor
     */
    function PUIMain(ID) {

        this.ID = ID;
        this.$el = $('#'+ID);
        if(this.$el.length==0) throw new Error('main UI not initialized: probably given ID does not exists in dom');

        this.panels = [];
        this.panelsMap = {};
        this.currentPanel = null;
        this.eventlog = false;

        this.nav = null;

    }

    /**
     * PUIMain prototype
     *
     * @type {{logEvents: logEvents, init: init, initNavigation: initNavigation, changePanel: changePanel, addPanel: addPanel}}
     */
    PUIMain.prototype = {

        init: function() {
            this.initNavigation();
        },

        initNavigation: function() {

            this.nav = new PUINavigation();

            this.nav.on('click',function(data,event){
                this.changePanel(data,200);
            }.bind(this));

            this.addPanel(this.nav);

        },

        logEvents: function(toggle) {
            this.eventlog = toggle;
        },

        changePanel: function(name,velocity) {

            var nextId = 'ic-'+name;
            var $next = $('#'+nextId);
            var canContinue = this.currentPanel == null || this.currentPanel.attr('id')!=nextId;

            if(canContinue) {
                this.currentPanel && this.currentPanel.fadeOut(velocity);
                this.currentPanel = $next;
                if(velocity) this.currentPanel.fadeIn(velocity);
                else this.currentPanel.show();
            }

        },

        addPanel: function(puiElement,name) {

            name || (name=puiElement.name);
            !(puiElement instanceof PUINavigation) && this.nav && this.nav.addTab(puiElement.name,name);

            this.panels.push(puiElement);
            this.panelsMap[puiElement.name] = puiElement;

            puiElement.addTo(this);

            this.$el.append(puiElement.toDom());

            return puiElement;

        }

    };

    return PUIMain;

}(jQuery, PUINavigation));
