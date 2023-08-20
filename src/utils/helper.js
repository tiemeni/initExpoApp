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
        img: require('../assets/img/pub1.jpg'),
        center: 'Clinique FOUDA',
        cost: 15000
    },
    {
        id: 2,
        name: 'Embolo Emma',
        img: require('../assets/img/logo.png'),
        center: 'Clinique FOUDA',
        cost: 15000
    },
    {
        id: 3,
        name: 'Tabou Blondin',
        img: require('../assets/img/logo.png'),
        center: 'Clinique FOUDA',
        cost: 15000
    },
    {
        id: 4,
        name: 'Tiemeni Happi',
        img: require('../assets/img/logo.png'),
        center: 'Clinique FOUDA',
        cost: 15000
    }, {
        id: 5,
        name: 'Embolo Emma',
        img: require('../assets/img/logo.png'),
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

export const specialites = [
    {
        id: 1,
        value: "Ophtalmologie"
    },
    {
        id: 2,
        value: "Oncologie"
    },
    {
        id: 3,
        value: "Allergologie"
    },
    {
        id: 4,
        value: "Pneumologie"
    },
    {
        id: 5,
        value: "Ondontostomatologie"
    },
    {
        id: 6,
        value: "Gériaitrie"
    }
]

export const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

export const sortArray = (key, array) => {
    const sorted = array.reduce((rv, x) => {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
            el.values.push(x);
        } else {
            rv.push(
                { key: v, values: [x] }
            );
        }
        return rv;
    }, []);
    return sorted;
}

export const ajouterDuree = (date, duree) => {
    const [heure, minute] = date.split(':');
    const dureeEnMinutes = parseInt(duree, 10);

    let nouvelleHeure = parseInt(heure, 10);
    let nouveauMinute = parseInt(minute, 10) + dureeEnMinutes;

    // Gérer le dépassement de 60 minutes
    if (nouveauMinute >= 60) {
        const heuresSupplementaires = Math.floor(nouveauMinute / 60);
        nouvelleHeure += heuresSupplementaires;
        nouveauMinute = nouveauMinute % 60;
    }

    // Formater la nouvelle heure et minute
    const nouvelleHeureFormattee = nouvelleHeure.toString().padStart(2, '0');
    const nouveauMinuteFormattee = nouveauMinute.toString().padStart(2, '0');

    // Renvoyer la nouvelle date au format "hh:mm"
    return `${nouvelleHeureFormattee}:${nouveauMinuteFormattee}`;
}

export const dayOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
export const creneauxOfDay = ['08:00-17:00', '08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00']
export const generateKeyTab = tab => {
    let keyTab = []
    tab.forEach((e) => {
        keyTab.push(e.key)
    })
    return keyTab
}

export const generateValuesTab = (key, dispo) => {
    let valuesTab = []
    dispo.forEach((e) => {
        if (e.key === key) {
            valuesTab = e.values
        }
    })
    return valuesTab
}

export const goFromDayToNumber = (string) => {
    switch (string) {
        case "lundi":
            return 1;
        case "mardi":
            return 2;
        case "mercredi":
            return 3;
        case "jeudi":
            return 4;
        case "vendredi":
            return 5;
        case "samedi":
            return 6;
        case "dimanche":
            return 7;
    }
}

export const goFromNumberToDay = (n) => {
    switch (n) {
        case 1:
            return "lundi";
        case 2:
            return "mardi";
        case 3:
            return "mercredi";
        case 4:
            return "jeudi";
        case 5:
            return "vendredi";
        case 6:
            return "samedi";
        case 7:
            return "dimanche";
    }
}

export function calculerEcartEnMinutes(heure1, heure2) {
    const [heure1Heures, heure1Minutes] = heure1.split(':');
    const [heure2Heures, heure2Minutes] = heure2.split(':');

    const totalMinutes1 = parseInt(heure1Heures) * 60 + parseInt(heure1Minutes);
    const totalMinutes2 = parseInt(heure2Heures) * 60 + parseInt(heure2Minutes);

    const ecartEnMinutes = Math.abs(totalMinutes1 - totalMinutes2);

    return ecartEnMinutes;
}
