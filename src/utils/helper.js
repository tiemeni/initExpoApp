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