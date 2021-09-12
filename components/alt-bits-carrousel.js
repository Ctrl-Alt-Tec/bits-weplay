class BitsCarrouselParticipant extends DynamicCircle{
    static get observedAttributes(){
        return ['participant-name']
    }
    get participantName(){
        return this.getAttribute('participant-name');
    }
    constructor(){
        super();
    }
    attributeChangedCallback(name, oldValue, newValue){
        super.attributeChangedCallback(name, oldValue, newValue);
        this.render();
    }
    render(){
        super.render();
        this.style.display = 'flex'
        this.style.flexDirection = 'column';
        this.style.alignItems = 'center';
        this.innerHTML = '';
        this.append(this.renderFill());
        this.shadowRoot.append(this.renderBadge());
    }
    renderBadge(){
        let badge = document.createElement('div');
        badge.style.fontSize = '1rem';
        badge.style.fontWeight = 'bold';
        badge.style.margin = '8px';
        badge.style.width = '240px';
        badge.style.textAlign = 'center';
        badge.innerHTML = this.participantName;
        return badge;
    }
    renderFill(){
        let fill = document.createElement('div');
        fill.style.height = '100%';
        fill.style.width = '100%';
        fill.style.borderRadius = '10000px';
        fill.style.background = 'black';
        fill.style.color = 'white';
        fill.style.fontSize = 'inherit';
        fill.style.display = 'flex';
        fill.style.alignItems = 'center';
        fill.style.justifyContent = 'center';
        fill.innerHTML = this.value;
        return fill;
    }
}
customElements.define('alt-bits-carrouselparticipant', BitsCarrouselParticipant);

class BitsCarrousel extends HTMLElement{
    /**@type {Object<String, HTMLElement>} */
    participants = {};
    static get observedAttributes(){
        return ['max-size', 'min-size', 'max-score'];
    }
    get maxSize(){
        return this.getAttribute('max-size');
    }
    get minSize(){
        return this.getAttribute('min-size');
    }
    get maxScore(){
        let maxScore = this.getAttribute('max-score');
        return maxScore == 'null' || maxScore == null ? 1 : maxScore;
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue){
        if(newValue == 'null' || newValue == null) return;
        if(name == 'max-size' || name == 'min-size' || name == 'max-score'){
            Object.values(this.participants).forEach(participant=>participant.setAttribute(name, newValue));
        }
    }
    render(){
        this.shadowRoot.innerHTML = '';
        let container = document.createElement('div');
        Object.assign(container.style, {
            display: 'flex',
            alignItems: 'center'
        })
        Object.values(this.participants).forEach(participant=>{
            container.append(participant);
        })
        this.shadowRoot.append(container);
    }
    addParticipant({name, id, score, data}){
        if(score > this.maxScore) this.setAttribute('max-score', score);
        let circle = document.createElement('alt-bits-carrouselparticipant');
        circle.setAttribute('max-size', this.maxSize);
        circle.setAttribute('min-size', this.minSize);
        circle.setAttribute('max-value', this.maxScore);
        circle.setAttribute('min-value', '0');
        circle.setAttribute('value', score);
        circle.setAttribute('participant-name', name);
        this.participants[id] = circle;
        this.render();
    }
    highlightParticipant(id){
        /**@type {HTMLElement} */
        let participant = this.participants[id];
        participant.scrollIntoView({block: 'center', inline: 'center'})
    }
}

customElements.define('alt-bits-carrousel', BitsCarrousel);