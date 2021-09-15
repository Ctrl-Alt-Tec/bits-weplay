const BitsCircleTemplate = document.createElement('template');
BitsCircleTemplate.innerHTML = `
    <style>
        :host{
            display: flex;
            flex-direction: column;
            row-gap: 4px;
            align-items: center;
        }
        :host .circle{
            background: black;
            color: white;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        :host .badge{
            width: 200px;
            padding: 4px;
            font-weight: 600;
            font-size: 1.1rem;
            text-align: center;
        }
        :host .badge:empty{
            display: none;
        }
    </style>
    <div class='circle'></div>
    <div class='badge'></div>
`

class BitsCircle extends HTMLElement{
    static get observedAttributes(){
        return ['min-size', 'max-size', 'max-value', 'value', 'badge'];
    }
    get badge(){
        let badge = this.getAttribute('badge');
        return badge == 'null' || badge == null ? '' : badge;
    }
    get value(){
        if(!this.isConnected) return 1;
        let number = Number.parseFloat(this.getAttribute('value'));
        if(Number.isNaN(number)){
            console.log("Invalid value");
            return 1;
        }
        return number;
    }
    get maxValue(){
        if(!this.isConnected) return 1;
        let number = Number.parseFloat(this.getAttribute('max-value'));
        if(Number.isNaN(number) || number <=0){
            console.error("Invalid max-value");
            return this.value
        }
        return number;
    }
    get minSize(){
        if(!this.isConnected) return 1;
        let number = Number.parseFloat(this.getAttribute('min-size'));
        if(Number.isNaN(number)){
            console.error("Invalid min-size");
            return this.value
        }
        return number;
    }
    get maxSize(){
        if(!this.isConnected) return 1;
        let number = Number.parseFloat(this.getAttribute('max-size'));
        if(Number.isNaN(number) || number<=0){
            console.error("Invalid max-size");
            return this.value
        }
        return number;
    }
    get units(){
        if(!this.isConnected) return 'px';
        let maxSizeUnits = this.getAttribute('max-size')?.split(/\d+/g)[1]?.toLowerCase();
        let minSizeUnits = this.getAttribute('min-size')?.split(/\d+/g)[1]?.toLowerCase();
        if(maxSizeUnits != minSizeUnits){
            console.error("Units must be equal. Will use px");
            return 'px';
        }
        return maxSizeUnits;
    }
    get size(){
        if(!this.isConnected) return 1;
        let b = this.minSize/this.maxSize;
        let x = this.value/this.maxValue;
        let f = (1 - b)*x+b;
        if(Number.isNaN(f)){
            console.error("Unable to calculate size");
            return 1;
        }
        return this.maxSize*f;
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(BitsCircleTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('.circle').style.width = this.size + this.units;
        this.shadowRoot.querySelector('.circle').style.height = this.size + this.units;
        this.shadowRoot.querySelector('.circle').style.fontSize = this.size/2 + this.units;
        this.shadowRoot.querySelector('.circle').innerHTML = this.value;
        this.shadowRoot.querySelector('.badge').innerHTML = this.badge;

    }
}
customElements.define('alt-bits-circle', BitsCircle);