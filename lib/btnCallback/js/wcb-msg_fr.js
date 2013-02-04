(function () {

	var INTL = LnkWcb.intl,

		renouvelez = "Merci de renouveler votre demande.",

		differez = "Choisissez la date et l'heure \u00E0 laquelle nous pouvons vous rappeler.",

		autreMoyen = "Merci de nous joindre par un autre moyen.";



	INTL.setRsc('bouton-jquery', 'fr', {

		err: {

			blankTel: "Pr\u00E9cisez le num\u00E9ro de t\u00E9l\u00E9phone.",

			invalidTel: "Ce num\u00E9ro de t\u00E9l\u00E9phone [{tel}] n'est pas correct.",

			blankDate: "La date [{date}] est incorrecte. Elle doit respecter le format 'JJ/MM/AAAA hh:mm'.",

			blankChannel: "Choisissez un canal" // sp\u00E9cifique \u00E0 l'int\u00E9gration "bouton-jquery.html"

		},

		msg: {

			helloChannelState: "Bonjour, notre service de rappel est {channelStatus}",

			callStatus: "{userPhoneStatus}\n Votre correspondant : {agentPhoneStatus}.",

			delayedCallAccepted: "Votre demande a bien \u00E9t\u00E9 prise en compte.",

			okThanks: "Nous vous remercions de votre appel.",

			koPleaseCallLater: "{koReason}",

			fallback: "Tous nos conseillers sont en ligne. Merci de rappeler ult\u00E9rieurement."

		},

		channelStatus: {

			INACTIF: "d\u00E9sactiv\u00E9. "+autreMoyen,

			HORS_LIMITES: "provisoirement bloqu\u00E9. "+autreMoyen,

			SATURE: "malheureusement satur\u00E9, merci de renouveler votre appel ult\u00E9rieurement.",

			OUVERT: "disponible.\n Saisissez votre num\u00E9ro de t\u00E9l\u00E9phone et nous vous appelons imm\u00E9diatement.",

			FERME: "ferm\u00E9, merci de renouveler votre appel ult\u00E9rieurement.",

			FERIE: "exceptionnellement ferm\u00E9 aujourd'hui, merci de renouveler votre appel ult\u00E9rieurement."

		},

		userPhoneStatus: {

			INCONNU: "Comunication int\u00E9rrompue", // dialing not yet started

			APPEL_EN_COURS: "Communication en cours, merci de patienter...", // Processing, Dialing, Ringing

			MESSAGE_BIENVENUE: "Nous vous souhaitons la bienvenue", // Welcome message (only for user, not for agent)

			MUSIQUE_ATTENTE: "Merci de patienter...", // MusicOnHold (only for user in direct mode, and only for agent in reverse mode)

			COMMUNICATION_EN_COURS: "Communication en cours, merci de patienter...", // Up and not bridged

			COMMUNICATION_ETABLIE: "Communication \u00E9tablie.", // Up and bridged

			TOUCHE_APPUYEE: "La touche [{uDigit}] est appuy\u00E9e"

		},

		agentPhoneStatus: {

			INCONNU: "sera bient\u00F4t appel\u00E9", // dialing not yet started

			APPEL_EN_COURS: "est appel\u00E9", // Processing, Dialing, Ringing

			MUSIQUE_ATTENTE: "est en attente", // MusicOnHold (only for user in direct mode, and only for agent in reverse mode)

			COMMUNICATION_EN_COURS: "est en ligne", // Up and not bridged

			COMMUNICATION_ETABLIE: "est connect\u00E9", // Up and bridged

			TOUCHE_APPUYEE: "prend l'appel"

		},

		koReason: {

			user: {

				RACCROCHE_INTERNAUTE_AVANT_AGENT: "Vous avez raccroch\u00E9 avant que nous ne puissions vous mettre en relation. "+renouvelez,

				INVERSE_INABOUTI_INTERNAUTE: "Votre t\u00E9l\u00E9phone ne r\u00E9pond pas. "+renouvelez, // d\u00E9lai expir\u00E9 sur 2e (et dernier) appel

				INABOUTI_INTERNAUTE: "Votre t\u00E9l\u00E9phone ne r\u00E9pond pas. "+renouvelez, // d\u00E9lai expir\u00E9 sur 1er appel

				MACHINE: "Votre t\u00E9l\u00E9phone est sur r\u00E9pondeur. "+renouvelez // ne peut survenir que si la d\u00E9tection des r\u00E9pondeurs internautes est activ\u00E9e

			},

			CAUSE_INCONNUE: "Une erreur technique est survenue. "+renouvelez

		},

		errors: {

			userErrorTelephone: "Le num\u00E9ro de t\u00E9l\u00E9phone saisi est incorrect.",

			userErrorDate: "La date saisie est incorrecte.",

			userErrorDuplicateCall: "Un appel est d\u00E9j\u00E0 en cours pour ce num\u00E9ro de t\u00E9l\u00E9phone.",

			techError: "Une erreur technique est survenue (code {errCode}). Nous faisons tout notre possible pour r\u00E9tablir le service."

		},

		fallbacks: {

			CAUSE_DEBORDE: "Nous sommes actuellement indisponibles, merci de renouveler votre appel ult\u00E9rieurement.",

			CAUSE_FERME: "Nos bureaux sont actuellement ferm\u00E9s, merci de renouveler votre appel ult\u00E9rieurement. ",

			CAUSE_FERIE: "Nos bureaux sont exceptionnellement ferm\u00E9s ce jour, merci de renouveler votre appel ult\u00E9rieurement. "+differez,

			CAUSE_BLOQUE: "Ce bouton n'accepte plus aucune demande de rappel. "+autreMoyen, // canal d\u00E9sactiv\u00E9

			CAUSE_SATURE: "Toutes nos lignes sont occup\u00E9es, merci de renouveler votre appel ult\u00E9rieurement." // ne peut survenir que si la limite d'appel simultan\u00E9s est param\u00E9tr\u00E9e

		}

	});



	INTL.setRsc('calendar-jquery', 'fr', {

		pat: {

			hours: '{h24tps2}h',

			minutes: '{m60tps2}'

		}

	});

})();

