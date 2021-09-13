async function load(){
    // let raw = await fetch('http://ctrl-api.hackclub.com/api/participation?org=ctrl-alt-tec');
    let raw = await fetch('test.json')
    let json = await raw.json();
    let members = Object.values(json.members).sort((a, b)=>(b?._participations?.total || 0) - (a?._participations.total || 0));

    let participations = {};

    members.forEach(member=>{
        document.querySelector('#bits-carrousel').addParticipant({
            name: `${member['Nombre(s)']} ${member['Apellido Paterno']} ${member['Apellido Materno']}` || 'Unasigned',
            id: member['Matrícula'],
            score: member?._participations?.total || 1
        })
    })



}

load()