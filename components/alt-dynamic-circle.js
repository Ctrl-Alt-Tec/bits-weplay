class DynamicCircle extends HTMLElement {
    // Respond to changes in these attributes
    static get observedAttributes(){
        return ['value', 'max-value', 'max-size', 'min-size']
    }
    /**
     * Returns value property with all needed verifications. Returns max-value when value is too big
     * @default 0
     * @returns {Number}
     */
    get value(){
        if(!this.isConnected) return 0;
        try{
            let number = Number.parseFloat(this.getAttribute('value'));
            if(Number.isNaN(number)) throw "Invalid value";
            if(number > this.maxValue){
                console.error("Value exceeds max-value");
                return this.maxValue;
            }
            return number;
        } catch(e){
            console.error(e);
            return 0;
        }
    }
    /**
     * Returns max-value property with all needed verifications
     * @default 100
     * @returns {Number}
     */
    get maxValue(){
        if(!this.isConnected) return 100;
        try{
            let number = Number.parseFloat(this.getAttribute('max-value'));
            if(Number.isNaN(number)) throw "Invalid max-value";
            if(number<=0) throw "Max value should be greater than 0"
            return number;
        } catch(e){
            console.error(e, this.getAttribute('max-value'));
            return 100;
        }
    }
    /**
     * Returns max-size property with all needed verifications
     * @default 10
     * @returns {Number}
     */
    get maxSize(){
        if(!this.isConnected) return 10;
        try{
            let number = Number.parseFloat(this.getAttribute('max-size'));
            if(Number.isNaN(number)) throw "Invalid max-size";
            return number;
        } catch(e){
            console.error(e, this.getAttribute('max-size'));
            return 10;
        }
    }
    /**
     * Returns min-size property with all needed verifications
     * @default 10
     * @returns {Number}
     */
    get minSize(){
        if(!this.isConnected) return 1;
        try{
            let number = Number.parseFloat(this.getAttribute('min-size'));
            if(Number.isNaN(number)) throw "Invalid min-size";
            return number;
        } catch(e){
            console.error(e);
            return 1;
        }
    }
    /**
     * Reads max-size and min-size to determine the css units used to measure. Units should be equal in both attributes.
     * @default 'px'
     * @returns {String}
     */
    get units(){
        if(!this.isConnected) return 'px';
        try{
            let maxSizeUnits = this.getAttribute('max-size')?.match(/(?<=\d+\s*)([a-zA-Z]+|%)/)?.[0]?.toLowerCase();
            let minSizeUnits = this.getAttribute('min-size')?.match(/(?<=\d+\s*)([a-zA-Z]+|%)/)?.[0]?.toLowerCase();
            if(maxSizeUnits != minSizeUnits) throw "Units must be equal. Will default to px";
            return maxSizeUnits;
        } catch(e){
            console.error(e);
            return 'px';
        }
    }
    /**
     * Calculates radius using formula from value, max-value, max-size and min-size
     */
    get radius(){
        if(!this.isConnected) return 0;
        try{
            let b = this.minSize/this.maxSize;
            let x = this.value/this.maxValue;
            let f = (1-b)*x+b;
            if(Number.isNaN(f)) throw "Unable to get radius";
            return this.maxSize*f;
        } catch(e){
            console.error(e);
            return 0;
        }
    }
    /**
     * This component changes size linearly according to value
     * @constructor
     */
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    // Called when the element is connected to the page
    connectedCallback(){
        this.render();
    }
    // Called when an attribute changes
    attributeChangedCallback(){
        this.render();
    }
    // Renders the component
    render(){
        // Empty
        this.shadowRoot.innerHTML = '';
        // Calculate size (with units)
        let size = this.radius+this.units;
        // Add content with css 
        let content = document.createElement('div');
        content.style.width = size;
        content.style.height = size;
        content.style.fontSize = this.radius/2+this.units;
        // Add slot to append content
        let slot = document.createElement('slot');
        content.append(slot);
        // Append to shadow
        this.shadowRoot.append(content);
    }
}
// Define element
customElements.define('alt-dynamic-circle', DynamicCircle);