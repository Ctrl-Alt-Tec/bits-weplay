const SETTINGS = {
    columnNames: {
        member: {
            name: member => `${member['Nombre(s)']} ${member['Apellido Paterno']} ${member['Apellido Materno']}` || 'Unasigned',
            id: member => member['Matrícula'],
            score: member =>  member?._participations?.total || 1,
            participations: member => member?._participations.participations
        },
        participation: {
            date: participation => participation['Fecha'], 
            category: participation => participation['Categoría'], 
            description: participation => participation['Descripción'], 
            score: participation => participation['Bits']
        }
    }
}