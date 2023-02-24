import colors from "../constants/colours"

export const notifications = [
    {
        id: 1,
        title: 'Nouveau rendez-vous',
        content: 'Rendez-vous pris pour Lundi, 12 Fevrier 2023 à 14h à la clinique Fouda.',
        date: '12 Jan 2023',
        triggeredBy: 'Rendez-vous',
        status: 'new',
        color: colors.warning,
        bg: colors.transp_warning
    },

    {
        id: 2,
        title: 'Rendez-vous annulé',
        content: 'Votre rendez-vous initialement prévu pour Lundi, 12 Février 2023 à 14h à la clinique Fouda vient d’être annulé.',
        date: '12 Jan 2023',
        triggeredBy: 'Rendez-vous',
        status: 'canceled',
        color: colors.danger,
        bg: colors.transp_danger
    },

    {
        id: 3,
        title: 'Rendez-vous terminé',
        content: 'Nous espérons que votre consultation s’est bien déroulé. N’hésité pas à nous partager votre avis.',
        date: '12 Jan 2023',
        triggeredBy: 'Rendez-vous',
        status: 'completed',
        color: colors.success,
        bg: colors.transp_success
    }
]

export const practiciens = [
    {
        id: 1,
        name: 'Tiemeni Happi',
        center: 'Clinique FOUDA',
        cost: 15000
    },
    {
        id: 2,
        name: 'Embolo Emma',
        center: 'Clinique FOUDA',
        cost: 15000
    },
    {
        id: 3,
        name: 'Tabou Blondin',
        center: 'Clinique FOUDA',
        cost: 15000
    },
    {
        id: 4,
        name: 'Tiemeni Happi',
        center: 'Clinique FOUDA',
        cost: 15000
    }, {
        id: 5,
        name: 'Embolo Emma',
        center: 'Clinique FOUDA',
        cost: 15000
    }
]

export const appointmentDate = [
    {
        id: 1,
        date: 'Jeudi, 12 Fev'
    },
    {
        id: 2,
        date: 'Jeudi, 12 Fev'
    },
    {
        id: 3,
        date: 'Jeudi, 12 Fev'
    },
    {
        id: 4,
        date: 'Jeudi, 12 Fev'
    },
    {
        id: 5,
        date: 'Jeudi, 12 Fev'
    }
]

export const disponibilites = [
    {
        id: 1,
        period: '10h30'
    },
    {
        id: 2,
        period: '11h30'
    },
    {
        id: 3,
        period: '12h30'
    },
    {
        id: 4,
        period: '14h30'
    },
    {
        id: 5,
        period: '15h30'
    },
    {
        id: 6,
        period: '16h45'
    },
    {
        id: 7,
        period: '18h30'
    },
]

export const motifs = [
    {
        id: 1,
        label: 'Motif 1',
        value: 'Motif 1'
    },
    {
        id: 2,
        label: 'Motif 2',
        value: 'Motif 2'
    },
    {
        id: 3,
        label: 'Motif 3',
        value: 'Motif 3'
    },
    {
        id: 4,
        label: 'Motif 4',
        value: 'Motif 4'
    }
]