const BitsParticipantTemplate = document.createElement('template');
BitsParticipantTemplate.innerHTML = `
    <style>
        :host{
            display: flex;
            align-items: center;
            padding: 4px 0px;
            column-gap: 4px;
        }
        :host img, 
        :host .participant-score{
            flex-shrink: 0;
            flex-grow: 0;
        }
        :host img{
            height: 40px;
            width: 40px;
        }
        :host>div{
            flex: 1;
            display: flex;
            flex-direction: column;
            row-gap: 4px
        }
        :host .participant-name{
            font-size: 1.2rem;
            font-weight: 600
        }
        :host .participant-id{
            color: grey;
        }
        :host .participant-score{
            flex-basis: 32px;
            height: 32px;
            width: 32px;
            border-radius: 16px;
            background: black;
            color: white;
            font-size: 0.8rem;
            line-height: 32px;
            text-align: center;
        }
        :host([hide-score="true"]) .participant-score{
            display: none;
        }
    </style>
    <img />
    <div>
        <div class='participant-name'></div>
        <div class='participant-id'></div>
    </div>
    <div class='participant-score'></div>
`;

class BitsParticipant extends HTMLElement{
    static get observedAttributes(){
        return ['participant-name', 'participant-id', 'participant-score', 'hide-score'];
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
    get shouldHideScore(){
        return this.getAttribute('hide-score') == 'true';
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    attributeChangedCallback(){
        this.render();
    }
    connectedCallback(){
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(BitsParticipantTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('img').setAttribute('src', `http://ctrl-alt-tec-api.herokuapp.com/utils/identicon/${this.id}`)
        this.shadowRoot.querySelector('.participant-name').innerHTML = this.name;
        this.shadowRoot.querySelector('.participant-id').innerHTML = this.id;
        this.shadowRoot.querySelector('.participant-score').innerHTML = this.score;
    }
}
customElements.define('alt-bits-participant', BitsParticipant);