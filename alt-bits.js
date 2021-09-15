import './components/alt-bits-circle.js'
import './components/alt-bits-carrousel.js'
import './components/alt-bits-participant.js'
import './components/alt-bits-participant-detail.js'
import './components/alt-bits-participation.js'
import './components/ui-modal.js'
// import SETTINGS from './settings.js'

// if(SETTINGS == undefined) throw "Missing configuration settings";

async function AltBits(SETTINGS){
    let raw = await fetch(SETTINGS.baseURL);
    let json = await raw.json();
    let members = Object.values(json.members).sort((a, b)=>(b?._participations?.total || 0) - (a?._participations.total || 0));
    members.forEach(member=>{
        console.log(member)
        let memberCircle = document.querySelector('alt-bits-carrousel').addParticipant({
            name: SETTINGS.columnNames.member.name(member),
            id: SETTINGS.columnNames.member.id(member),
            score: SETTINGS.columnNames.member.score(member)
        });
        let memberDetail = document.createElement('alt-bits-participant-details');
        memberDetail.setAttribute('participant-name', SETTINGS.columnNames.member.name(member));
        memberDetail.setAttribute('participant-id', SETTINGS.columnNames.member.id(member))
        memberDetail.setAttribute('participant-score', SETTINGS.columnNames.member.score(member));

        SETTINGS.columnNames.member.participations(member)?.forEach(participation=>{
            memberDetail.addParticipation({
                date: SETTINGS.columnNames.participation.date(participation), 
                category: SETTINGS.columnNames.participation.category(participation), 
                description: SETTINGS.columnNames.participation.description(participation), 
                score: SETTINGS.columnNames.participation.score(participation)
            })
        })
        memberCircle.addEventListener('click', ()=>{
            memberCircle.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
            let modal = document.createElement('ui-modal');
            modal.append(memberDetail);
            document.body.append(modal);
        })
    })
}

export default AltBits;
// load();
