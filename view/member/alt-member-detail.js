import Constants from "../../constants.js";

class MemberDetail extends HTMLElement{
    get photoURL(){
        return this.getAttribute('img-src');
    }
    get name(){
        return this.getAttribute('member-name');
    }
    get memberID(){
        return this.getAttribute('member-id');
    }
    get total(){
        return this.getAttribute('member-total')+ ' bits';
    }
    get academicProgram(){
        return this.getAttribute('member-academic-program');
    }
    get academicSemester(){
        return this.getAttribute('member-academic-semester');
    }
    participations = [];

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
        link.href = 'view/member/alt-member-detail.css';
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(link);
    
        this.shadowRoot.append(this.renderHeader(), this.renderSectionAcademicInfo(), this.renderSectionParticipations());
    }

    renderHeader(){
        let header = document.createElement('header');
        let profilePic = document.createElement('img');
        profilePic.src = this.photoURL;
        let name = document.createElement('h1');
        name.className = 'name';
        name.innerHTML = this.name;
        let memberID = document.createElement('h2');
        memberID.className = 'memberID';
        memberID.innerHTML = this.memberID;
        let total = document.createElement('span');
        total.className = 'total';
        total.innerHTML = this.total;
        header.append(profilePic, name, memberID, total);
        return header;
    }

    renderSectionAcademicInfo(){
        let section = document.createElement('section');
        section.innerHTML = `<strong>Carrera:</strong> ${this.academicProgram} <strong>Semestre:</strong> ${this.academicSemester}`;
        return section;
    }

    renderSectionParticipations(){
        let section = document.createElement('section');
        section.innerHTML = `<h1>Participaciones</h1>`;
        this.participations.forEach(participation=>{
            section.append(participation);
        })
        return section;
    }

    addParticipation(participation){
        let item = document.createElement('alt-participation-element');
        item.setAttribute('participation-description', participation[Constants.participationDescriptionIndex])
        item.setAttribute('participation-date', participation[Constants.participationDateIndex])
        item.setAttribute('participation-weight', participation[Constants.participationWeightIndex])
        this.participations.push(item);
    }

}

customElements.define('alt-member-detail', MemberDetail)