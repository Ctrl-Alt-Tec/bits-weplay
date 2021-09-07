class ModalElement extends HTMLElement{
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
        link.href = 'view/ui/alt-ui-modal.css';
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(link);

        let modal = document.createElement('modal');
        this.shadowRoot.append(modal);

        let slot = document.createElement('slot');
        modal.append(slot);

        this.addEventListener('click', this.close.bind(this));
        modal.addEventListener('click', e=>{
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    }

    close(){
        this.remove();
    }

}

customElements.define('alt-ui-modal', ModalElement)