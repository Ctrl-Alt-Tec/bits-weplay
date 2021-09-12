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
    render(){
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.padding = '16px 0px'
        this.shadowRoot.innerHTML = '';

        let div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.rowGap = '2px';
        div.style.flexGrow = '1';

        let description = document.createElement('div');
        description.style.fontSize = '1.2rem';
        description.style.fontWeight = '600';
        description.innerHTML = this.description;

        let score = document.createElement('div');
        score.innerHTML = this.score;
        Object.assign(score.style, {
            height: '44px', 
            width: '44px', 
            borderRadius: '22px', 
            backgroundColor: 'black', 
            color: 'white', 
            fontSize: '24px'
        })

        div.append(this.renderInfo(), description);

        this.shadowRoot.append(div, score);

    }
    renderInfo(){
        let container = document.createElement('div');
        Object.assign(container.style, {
            display: 'flex', 
            columnGap: '8px',
            alignItems: 'center'
        });
        let category = document.createElement('span');
        category.innerHTML = this.category;
        Object.assign(category.style, {
            padding: '4px 8px',
            borderRadius: '16px', 
            backgroundColor: 'grey',
            color: 'white',
            fontWeight: '600',
            fontSize: '1rem'
        });
        let date = document.createElement('span');
        date.innerHTML = this.date;
        Object.assign(date.style, {
            color: 'grey',
            fontWeight: '606'
        });
        container.append(category, date);
        return container;
    }

}

customElements.define('alt-bits-participation', BitsParticipation);