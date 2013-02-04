(function () {
	var U = LnkWcb.util,
		params = U.urlDecode(window.location.search.substring(1)),
	/* ********** DEBUT CONFIG ********** */
		INTE_CFG = {
			canal: params.CODEBOUTON || $('.LnkWcbForm-canal').val() || 'COBREDIA0001', 
			// global selectors
			trigger: '.LnkWcbForm-trigger', // the trigger is the element that activates the container
			popupFile: '/lib/btnCallback/popup.htm',
			popupName: 'LnkWcbPopup', // This string parameter should not contain any blank space.
			popupAttributes: 'top=320,left=240,width=550,height=350,' +
				'resizable=no,menubar=no,toolbar=no,location=no,status=no'
		},
	/* ********** FIN CONFIG ********** */

		I;

	/**
	 * This helper function does the setup of the trigger button (aka "Le Bouton").
	 */
	function setupWcbTrigger() {
		try {
			I = LnkWcb.inteBtn = LnkWcb.inteBtn || {};

			$(INTE_CFG.trigger).click(function () {
				I.POPUP_WIN = window.open(INTE_CFG.popupFile+"?CODEBOUTON="+encodeURIComponent(INTE_CFG.canal), INTE_CFG.popupName, INTE_CFG.popupAttributes);
			});

			/* ----- Création d'un bouton de base pour gérer uniquement l'apparition du bouton dans cette fenêtre ----- */
			I.bouton = new LnkWcb.Bouton({
				canal: INTE_CFG.canal
			});
			
		I.bouton.onChannelState(function (etat, etatOuverture) { // masquer le bouton en canal inactif ou hors-limites
			if (!etat.estActif || !etat.peutRecevoirAppel || etatOuverture==="FERME" || etatOuverture==="FERIE" || etatOuverture==="SATURE") {
				$('.LnkWcbForm-trigger').hide();
				I.montrerBouton = false;
			}
			else { // saturé, fermé, férié ou ouvert
				
				$('.LnkWcbForm-trigger').show();
				I.montrerBouton = true;
			}
		});
		I.bouton.onChannelState(function (etat, etatOuverture) { // activer automatiquement le mode différé
			if (!etat.estActif || !etat.peutRecevoirAppel ) {
				F.find('input').attr("disabled", true); // disable all inputs
				I.afficherDiffere(false);
			}
			else {
				F.find('input').attr("disabled", false); // enable all inputs
				I.afficherDiffere(!etat.estOuvert); // refreshes the calendar
			}
		});
		
		I.bouton.onChannelState(function (etat, etatOuverture) { // afficher un bouton différent en mode ouvert/fermé
			if (etatOuverture !== "OUVERT") {
				$('.LnkWcbForm-trigger').addClass("LnkWcbForm-trigger-femeture");
			}
			else {
				$('.LnkWcbForm-trigger').removeClass("LnkWcbForm-trigger-femeture");
			}
		});
		
			I.bouton.estOuvert();
		}
		catch (exc) {
			LnkLog.log('LnkWcb.inteBtn', exc);
		}
	}

	try {
		$(setupWcbTrigger);
	} catch (ignoredExc) {
		// LnkLog.log('integration LnkWcbBouton', ignoredExc);
	}
})();

