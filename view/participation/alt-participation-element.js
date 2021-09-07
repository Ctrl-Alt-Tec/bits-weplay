import Constants from '../../constants.js';
class ParticipationElement extends HTMLElement{
    get description(){
        return this.getAttribute('participation-description');
    }
    get date(){
        return this.getAttribute('participation-date');
    }
    get weight(){
        return `+${this.getAttribute('participation-weight')} ${Constants.participationWeightSuffix}`;
    }
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this.render();
    }
    render(){
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'view/participation/alt-participation-element.css';
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(link);

        let date = document.createElement('div');
        date.className = 'date';
        date.innerHTML = this.date;

        let description = document.createElement('div');
        description.className = 'description';
        description.innerHTML = this.description;

        let weight = document.createElement('div');
        weight.className = 'weight';
        weight.innerHTML = this.weight;

        this.shadowRoot.append(date, description, weight);
    }
}

customElements.define('alt-participation-element', ParticipationElement);