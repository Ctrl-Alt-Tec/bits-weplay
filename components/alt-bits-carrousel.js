const BitsCarrouselTemplate = document.createElement('template');
BitsCarrouselTemplate.innerHTML = `
    <style>
        :host{
            display: inline-flex;
            align-items: center;
            column-gap: 1em;
        }
        :host>*:hover{
            transform: scale(1.04)
        }
    </style>
`;

class BitsCarrousel extends HTMLElement{
    participants = {};
    static get observedAttributes(){
        return ['max-size', 'min-size', 'max-value'];
    }
    get maxValue(){
        if(!this.isConnected) return 1;
        let number = Number.parseFloat(this.getAttribute('max-value'));
        if(Number.isNaN(number) || number <=0){
            console.error("Invalid max-value");
            return 1
        }
        return number;
    }
    get minSize(){
        if(!this.isConnected) return 1;
        let number = Number.parseFloat(this.getAttribute('min-size'));
        if(Number.isNaN(number)){
            console.error("Invalid min-size");
            return '10px'
        }
        return this.getAttribute('min-size');
    }
    get maxSize(){
        if(!this.isConnected) return 1;
        let number = Number.parseFloat(this.getAttribute('max-size'));
        if(Number.isNaN(number) || number<=0){
            console.error("Invalid max-size");
            return '10px'
        }
        return this.getAttribute('max-size');
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue){
        Object.values(this.participants).forEach(item=>{
            item.setAttribute(name, newValue);
        })
    }
    render(){
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(BitsCarrouselTemplate.content.cloneNode(true));
        this.shadowRoot.append(...Object.values(this.participants));
    }
    addParticipant({ name, id, score, participations, data }){
        if(score > this.maxValue) this.setAttribute('max-value', score);
        let circle = document.createElement('alt-bits-circle');
        circle.setAttribute('tabindex', 0);
        circle.setAttribute('value', score);
        circle.setAttribute('badge', name);
        circle.setAttribute('min-size', this.minSize);
        circle.setAttribute('max-size', this.maxSize);
        circle.setAttribute('max-value', this.maxValue);
        
        this.participants[id] = circle;
        this.render();

        return circle;
    }
    highlightParticipant(id){
        /**@type {HTMLElement} */
        let participant = this.participants[id];
        if(participant == undefined) return;
        participant.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
        participant.click();
    }
    selectRandom(){
        // Store here all the id's
        let names = [];
        // For each participant
        Object.keys(this.participants).forEach(id=>{
            // Store id as many times as they have points
            for(let i = 0; i<this.participants[id].value; i++){
                names.push(id);
            }
        });
        // Randomnize array
        let names_random = randomnizeArray(names);
        // Get random index
        let index = Math.randomFrom1(names_random.length);
        let winnerID = names_random[index];
        this.highlightParticipant(winnerID);
        return winnerID;
    }
}

const randomnizeArray = array => {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

Math.randomFrom1 = (max) => Math.floor( Math.random() * (max) ) + 1

customElements.define('alt-bits-carrousel', BitsCarrousel);