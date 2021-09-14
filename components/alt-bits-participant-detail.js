const BitsParticipantDetailTemplate = document.createElement('template');
BitsParticipantDetailTemplate.innerHTML = `
    <style>
        :host{
            padding: 16px;
            background: rgba(0,0,0,0.9);
            display: block; 
            position: relative;
        }
        :host alt-bits-participation:hover{
            border-radius: 8px;
            background: whitesmoke;
        }
    </style>
    <header>
        <alt-bits-circle min-size="130px" max-size="130px" value="1" max-value="1" badge="Bits"></alt-bits-circle>
        <alt-bits-participant participant-name="Ricardo" participant-id="A01025025" participant-score="31" hide-score="true"></alt-bits-participant>
    </header>
    <section>
        <h1>Información de participante</h1>
    </section>
    <hr>
    <section class='participations'>
        
    </section>
`;

class BitsParticipantDetail extends HTMLElement{
    participations = [];
    static get observedAttributes(){
        return ['participant-name', 'participant-id', 'participant-score'];
    }
    get name(){
        return this.getAttribute('participant-name');
    }
    get id(){
        return this.getAttribute('participant-id');
    }
    get score(){
        return this.getAttribute('participant-score');
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(name, oldValue, newValue){
        this.populateValues();
    }
    render(){
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(BitsParticipantDetailTemplate.content.cloneNode(true));
        this.populateValues();
        this.populateParticipations();
    }
    populateValues(){
        this.shadowRoot.querySelector('alt-bits-circle')?.setAttribute('max-value', this.score)
        this.shadowRoot.querySelector('alt-bits-circle')?.setAttribute('value', this.score)
        this.shadowRoot.querySelector('alt-bits-participant')?.setAttribute('participant-name', this.name)
        this.shadowRoot.querySelector('alt-bits-participant')?.setAttribute('participant-id', this.id)
        this.shadowRoot.querySelector('alt-bits-participant')?.setAttribute('participant-score', this.score)
    }
    populateParticipations(){
        if(this.shadowRoot.querySelector('.participations') == null) return;
        this.shadowRoot.querySelector('.participations').innerHTML = '';
        this.shadowRoot.querySelector('.participations')?.append(...this.participations);
    }
    addParticipation({date, category, description, score}){
        let participation = document.createElement('alt-bits-participation');
        participation.setAttribute('participation-date', date);
        participation.setAttribute('participation-category', category);
        participation.setAttribute('participation-description', description);
        participation.setAttribute('participation-score', score);
        this.participations.push(participation);
        this.populateParticipations();
    }
}
customElements.define('alt-bits-participant-details', BitsParticipantDetail);