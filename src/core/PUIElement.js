/**
 * Created by fdimonte on 24/04/2015.
 */

var PUIElement = (function(){

    /**
     * PUIElement Class
     *
     * @param name
     * @param title
     * @constructor
     */
    function PUIElement(name,title) {

        this.name = name;
        this.title = title || name;

        this.parent = null;
        this.mainUI = null;
        this.enabled = true;
        this.elements = [];
        this.elementsMap = {};

        this.listeners = {};
        this.$el = this.getElement();
        this.initEvents();

    }

    /**
     * PUIElement prototype
     *
     * @type {{getElement: getElement, initEvents: initEvents, addChild: addChild, toDom: toDom, setEvent: setEvent, on: on, off: off, trigger: trigger}}
     */
    PUIElement.prototype = {

        // overridable methods

        getElement: function() {return null;},
        initEvents: function() {/* does nothing right now */},
        setValue: function() {/* it must be overridden */},
        getValue: function() {/* it must be overridden */},

        // public methods

        addTo: function(parent) {
            this.parent = parent;
            this.mainUI = parent.mainUI || parent;
            this.updateChildrenHierarchy();
        },

        addChild: function(child) {
            this.elements.push(child);

            var comp;
            if(child.components){
                for(var c=0;c<child.components.length;c++){
                    comp = child.components[c];
                    comp.addTo(this);
                    this.elementsMap[comp.name] = comp;
                }
            }else {
                child.addTo(this);
                this.elementsMap[child.name] = child;
            }
        },

        updateChildrenHierarchy: function() {
            var child,
                elems = this.components ? this.components : this.elements;

            for(var i=0;i<elems.length;i++){
                child = elems[i];
                child.mainUI = this.mainUI;
                child.updateChildrenHierarchy();
            }
        },

        toDom: function() {
            for(var c=0;c<this.elements.length;c++){
                this.$el.append(this.elements[c].toDom());
            }
            return this.$el;
        },

        enable: function() {
            this.enabled = true;
            this.$el.addClass('enabled');
            this.$el.removeClass('disabled');
        },
        disable: function() {
            this.enabled = false;
            this.$el.addClass('disabled');
            this.$el.removeClass('enabled');
        },
        toggle: function() {
            this.enabled ? this.disable() : this.enable();
        },

        setEvent: function(event,child,callback){
            if(typeof(child)=='function')
                this.$el.on(event,child.bind(this));
            else if(typeof(child)=='string')
                this.$el.on(event,child,callback.bind(this));
        },
        on: function(event,callback) {
            this.listeners[event] || (this.listeners[event]=[]);
            this.listeners[event].push(callback);
        },
        off: function(event) {
            this.listeners[event] = null;
        },
        trigger: function(event,data) {
            if(!this.listeners[event]) return;
            this.mainUI && this.mainUI.eventlog && console.log('trigger: ',this.name,event,data);
            for(var c=0; c<this.listeners[event].length; c++){
                this.listeners[event][c](data,event);
            }
        }
    };

    return PUIElement;

}());
