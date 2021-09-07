class MemberElement extends HTMLElement{
    get name(){
        return this.getAttribute('member-name');
    }

    get memberID(){
        return this.getAttribute('member-id');
    }

    get icon(){
        return `http://ctrl-api.hackclub.com/utils/identicon/${this.memberID}`;
    }


    constructor(){
        super();
        this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = 'Hello! I am a user';
    }
}

customElements.define('alt-member-element', MemberElement)