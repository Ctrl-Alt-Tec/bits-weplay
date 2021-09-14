const ModalWindowTemplate = document.createElement('template');
ModalWindowTemplate.innerHTML = `
    <style>
        :host>div{
            position: fixed;
            top: 0; bottom: 0; left: 0; right: 0;
            background-color: rgba(240,240,240,0.6);
            backdrop-filter: blur(16px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px
        }
        :host modal{
            margin-top: 8px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
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