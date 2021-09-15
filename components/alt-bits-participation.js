const BitsParticipationTemplate = document.createElement('template');
BitsParticipationTemplate.innerHTML = `
    <style>
        :host{
            display: block;
            padding: 16px 8px;
            margin-left: -8px;
            margin-right: -8px
        }
        :host>div{
            display: flex;
            align-items: center;
            column-gap: 8px
        }
        :host .participation-content{
            flex: 1;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            row-gap: 4px;
        }
        :host .participation-category{
            font-size: 1rem; 
            font-weight: 600;
            background-color: var(--bits-participation_badge-background);
            padding: 2px 8px;
            border-radius: 16px;
            color: var(--bits-participation_badge-color);
            margin-left: -2px
        }
        :host .participation-date{
            color: grey;
            font-weight: 600;
        }
        :host .participation-description{
            font-size: 1.1rem;
            font-weight: 600
        }
        :host .participation-score{
            height: 32px;
            width: 32px;
            border-radius: 16px;
            background-color: var(--bits-participation_score-background);
            color: var(--bits-participation_score-color);
            line-height: 32px;
            text-align: center;
        }
    </style>
    <div>
        <div class='participation-content'>
            <div class='participation-data'>
                <span class='participation-category'>Categoria</span>
                <span class='participation-date'>Fecha</span>
            </div>
            <div class='participation-description'>Descripcion</div>
        </div>
        <div class='participation-score'>3</div>
    </div>
`

class BitsParticipation extends HTMLElement {
    static get observedAttributes(){
        return ['participation-date', 'participation-category', 'participation-description', 'participation-score'];
    }
    get date(){
        return this.getAttribute('participation-date');
    }
    get category(){
        return this.getAttribute('participation-category');
    }
    get description(){
        return this.getAttribute('participation-description');
    }
    get score(){
        return this.getAttribute('participation-score');
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this.render();
    }
    attributeChangedCallback(){
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append( BitsParticipationTemplate.content.cloneNode(true) );
        this.shadowRoot.querySelector('.participation-category').innerHTML = this.category;
        this.shadowRoot.querySelector('.participation-date').innerHTML = this.date;
        this.shadowRoot.querySelector('.participation-description').innerHTML = this.description;
        this.shadowRoot.querySelector('.participation-score').innerHTML = this.score;
    }
}

customElements.define('alt-bits-participation', BitsParticipation);