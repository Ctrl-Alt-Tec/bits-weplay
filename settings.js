export default {
    columnNames: {
        member: {
            name: member => member['NOMBRE DEL INTEGRANTE'] || 'Unasigned',
            id: member => member['MATRÍCULA'],
            score: member =>  member?._participations?.total || 1,
            participations: member => member?._participations?.participations
        },
        participation: {
            date: participation => participation['FECHA'], 
            category: description => 'Puntos por participación', 
            description: participation => participation['CONCEPTO'], 
            score: participation => participation['PUNTUACIÓN']
        }
    },
    baseURL: 'http://ctrl-api.hackclub.com/api/participation?org=weplay'
}