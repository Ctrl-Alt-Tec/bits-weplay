const ModalWindowTemplate = document.createElement('template');
ModalWindowTemplate.innerHTML = `
    <style>
        :host>div{
            position: fixed;
            top: 0; bottom: 0; left: 0; right: 0;
            background-color: var(--ui-modal_background);
            backdrop-filter: var(--ui-modal_backdrop-filter);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px
        }
        :host modal{
            margin-top: 8px;
            max-width: var(--ui-modal_max-width);
            width: 100%;
            max-height: var(--ui-modal_max-height);
            overflow: auto        
        }
    </style>
    <div>
        <modal>
            <slot></slot>
        </modal>
    </div>
`

class ModalWindow extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback(){
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(ModalWindowTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('div').addEventListener('click', this.close.bind(this));
        this.shadowRoot.querySelector('modal').addEventListener('click', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
        })
    }
    close(){
        this.remove();
    }
}
customElements.define('ui-modal', ModalWindow);