(function () {
	var U = LnkWcb.util,
		params = U.urlDecode(window.location.search.substring(1)),
	/* ********** DEBUT CONFIG ********** */
		INTE_CFG = {
			lang: 'fr',
			canal: params.CODEBOUTON || 'COBREDIA0001',
			// global selectors
			formId: 'LnkWcbForm',
			// relative selectors (relative to form root in 'formId')
			userStatus: '.user-status',
			errorStatus: '.user-errors',
			calleeInput: 'input[name="callee"]',
			dateInput: '.LnkWcbDateDiff',
			dateElem: '.lnk-wcb-date',
			timeElem: '.lnk-wcb-time'
		},
	/* ********** FIN CONFIG ********** */
		$ = LnkWcb.jQuery;
	/**
	/**
	 * Setup the open/close animation for CNIL legal notice.
	 * This custom animation is required to allow this inline element to move accordingly.
	 * The jQuery UI/Effects/Slide would not suit this need.
	 * 
	 * @param F {jQuery} a jQuery search result holding the WCB form
	 */
	function setupCnilAnimation(F) {
		var opening = false, open = false, closing = false;
		F.find('.LnkWcbCnil').mouseenter(function (event) {
			var E = $(this).find('.depliant'),
				W = E.parent('.enveloppe'),
				distance;
			if (opening || open) {
				return;
			}
			opening = true;
			E.show();
			W.css('width', 'auto');
			distance = E.width();
			W.css('width', 0);
			E.css({ position: 'relative', left: -distance }).animate({ left: '+=' + distance }, {
				duration: 'slow', queue: false,
				step: function () {
					W.css('width', String(distance + parseInt(E.css('left'), 10))+'px')
				},
				complete: function () {
					E.css({ position: 'static', left: 'auto' }).show();
					W.css('width', 'auto');
					opening = false;
					open = true;
					E.dequeue();
				}
			});
		}).mouseleave(function (event) {
			var E = $(this).find('.depliant'),
				W = E.parent('.enveloppe'),
				distance;
			if (closing || !open) {
				return;
			}
			closing = true;
			E.show();
			W.css('width', 'auto');
			distance = E.width();
			E.css({ position: 'relative', left: 0 }).animate({ left: '-=' + distance }, {
				duration: 'slow', queue: false,
				step: function () {
					W.css('width', String(distance + parseInt(E.css('left'), 10))+'px')
				},
				complete: function () {
					E.css({ position: 'static', left: 'auto' }).hide();
					W.css('width', 'auto');
					closing = false;
					open = false;
					E.dequeue();
				}
			});
		});
	}

	/**
	 * This helper function creates one integration bouton.
	 * 
	 * @param I {Object} the integration namespace
	 * @param cfgBouton {Object} the bouton config
	 * @param cfgCalendar {Object} the date picker config
	 */
	function setupWcbForm(I, cfgBouton, cfgCalendar) {
		var F = $(cfgBouton.formSel),
			ackEnded;
		I.montrerBouton = false;
		
        /* ----- Bouton ----- */
        I.bouton = new LnkWcb.BoutonJquery(cfgBouton);
		I.bouton.showUserStatus = function (msg) { // permettre le HTML dans les messages des intermédiaires d'appel
			$(this.cfg.formSel).find(this.cfg.userStatusElemRelSel).html(msg);
		};
		$('input[name="callee"]').focus(function () {  // permettre de supprimer le contenus du champs telephone onFocus
				$(this).val('');
		});
		I.bouton.onChannelState(function (etat, etatOuverture) { // activer automatiquement le mode différé
			if (!etat.estActif || !etat.peutRecevoirAppel || etatOuverture==="FERME" || etatOuverture==="FERIE" || etatOuverture==="SATURE") {
				F.find('input').attr("disabled", true); // disable all inputs
				I.afficherDiffere(false);
			}
			else {
				F.find('input').attr("disabled", false); // enable all inputs
				I.afficherDiffere(!etat.estOuvert || etat.estSature); // refreshes the calendar
			}
		});
		oldShowUserErrors = I.bouton.showUserErrors;
		I.bouton.showUserErrors = function () {
			var that = this, ret;
			ret = oldShowUserErrors.apply(this, arguments);
			F.find(that.cfg.userErrorsElemRelSel).show();
			setTimeout(function () {
				F.find(that.cfg.userErrorsElemRelSel).has("ul").fadeOut();
			}, 5000);
			return ret;
		};
		I.bouton.onSendCall(function (args, attrs) {
			F.find(this.cfg.userStatusElemRelSel).addClass('busy');
			F.find('input').attr("disabled", true); // prevent duplicate submits
		});
		ackEnded = function (status, params) {
			F.find(this.cfg.userStatusElemRelSel).removeClass('busy');
			F.find('input').attr("disabled", false); // re-enable form submits
		};
		I.bouton.onError(ackEnded);
		I.bouton.onEnded(ackEnded);
		I.bouton.onFallback(ackEnded);
		I.bouton.onFallback(function (status, params) { // activer automatiquement le mode différé
			if (status.debordementCause === 'CAUSE_BLOQUE' || status.debordementCause === 'CAUSE_FERME' || status.debordementCause === 'CAUSE_FERIE' || status.debordementCause === 'CAUSE_SATURE' || status.debordementCause === 'CAUSE_DEBORDE') {
				I.afficherDiffere(false);
				F.find('input').attr("disabled", true);
			}
			else {
				I.afficherDiffere(true);
			}
		});
		/* ----- Calendrier ----- */
		I.calendrier = new LnkWcb.CalendarJquery(U.putAll({
			bouton: I.bouton
		}, cfgCalendar));
		/* ----- Intégration ----- */
		I.afficherDiffere = function (afficher) {
			F.find('.panneau-date-differe').toggleClass('cacher', !afficher);
			if (afficher) {
				I.calendrier.refresh(); // vérif des horaires d'ouverture + démarrage du calendrier (destroy+init+show)
			}
			else {
				I.calendrier.hide();
			}
		};
		/* ----- Intégration Evènements Formulaire ----- */
		$('a[rel="external"]').attr('target', '_blank'); // corriger les liens ayant l'attribut rel="external"
		F.find('a.cnil').attr('href',
			// L'URL email ci-dessous est volontairement découpée en petits morceaux
			// pour emêcher que les spammeurs ne l'obtiennent trop facilement.
			[ 'mail','to',':cnil@','linkeo.','com?','subject=',encodeURIComponent('Accès données personnelles pour ' + cfgBouton.canal) ].join(''));
		setupCnilAnimation(F);
		F.find('.codeCanal').text(cfgBouton.canal);
		F.find('input[name="callee"]').keypress(function (event) { // filtrer les caractères saisis
			var c = String.fromCharCode(event.charCode);
			if (event.charCode && !/^[0-9+]$/.test(c)) { // interdire la saisie des caractères autres que '0' à '9' et '+'
				return false;
			}
		}).keyup(function (event) { // filtrer le contenu du champ pendant la saisie
			var E = $(this), val = E.val(), pos;
			val = val.replace(/[^0-9+]/g, ''); // éliminer les caractères autres que '0' à '9' et '+'
			val = (val.indexOf('+') === 0 ? '+' : '') + val.replace(/\+/g, ''); // supprimer les '+' qui ne sont pas au début
			val = val.replace(/^\+0+/, '+'); // éliminer les '0' qui suivent le '+' initial, s'il y en a un
			val = val.replace(/^000+/, '00'); // interdire plus de deux '0' initiaux
			if (val !== E.val()) {
				if (!E.parent().hasClass('warning')) {
					E.wrap('<span class="warning"/>'); // afficher un avertissement en cas de modification
				}
				E.val(val);
			}
		});
		F.submit(function () {
			var callee, date;
			callee = F.find(I.bouton.cfg.calleeInputRelSel).val();
			if (!F.find('.panneau-date-differe').hasClass('cacher')) {
				date = I.calendrier.getWcbDate(); // TODO: resolve the validation issue: input should be validated before it is converted to a JS Date object
				//LnkLog.log('date: [' + date + ']');
				//date = I.calendrier.getDateTime();
			}
			I.bouton.rappeler(callee, date);
			return false;
		});
		$(window).unload(function () {
			I.bouton.raccrocher();
		});
		/* ----- Lancement ----- */
		I.bouton.estOuvert(); // vérif de l'état du canal + refresh cal (à faire après le setup du bouton et du calendrier)
	};

	/**
	 * This helper function creates integration namespaces,
	 * and collects config options in order to create all integration boutons.
	 * <p>
	 * Customize here to add new boutons.
	 */
	function setupAllWcbForms() {
		var I, cfgBouton, cfgCalendar,
			params = U.urlDecode(window.location.search.substring(1));
		try {
			/* ----- Inits ----- */
			LnkWcb.intl.setLang(INTE_CFG.lang);
			/* ----- Lancement des enchainements d'initialisations ----- */
			I = LnkWcb.inte1 = LnkWcb.inte1 || {}; // création du namespace de l'intégration n°1
			cfgBouton = {
				canal: INTE_CFG.canal,
				grabbedFormId: INTE_CFG.formId,				// enable the 'grabForm' Trait
				formSel: '#'+INTE_CFG.formId,				// '#LnkWcbForm' by default
				userStatusElemRelSel: INTE_CFG.userStatus,	// '.user-status' by default
				userErrorsElemRelSel: INTE_CFG.errorStatus,	// '.user-errors' by default
				calleeInputRelSel: INTE_CFG.calleeInput,	// 'input[name="callee"]' by default
				dateInputRelSel: INTE_CFG.dateInput			// '.LnkWcbDateDiff' by default
			};
			cfgCalendar = {
				formSel: '#'+INTE_CFG.formId, // '#LnkWcbForm' by default
				dateContainerRelSel: INTE_CFG.dateElem, // '.lnk-wcb-date' by default
				timeContainerRelSel: INTE_CFG.timeElem // '.lnk-wcb-time' by default
				// , hoursSelectorClass: 'lnk-wcb-hours', // this is the default
				// minutesSelectorClass: 'lnk-wcb-minutes' // this is the default
				// , displayType: 'INLINE' // this is the default
			};
			setupWcbForm(I, cfgBouton, cfgCalendar);
		}
		catch (exc) {
			LnkLog.log('LnkWcb.inte1', exc);
		}
	};

	/**
	 * Create WCB integration when document is ready.
	 */
	try {
		$(setupAllWcbForms); // execute when the document is ready
	} catch (ignoredExc) {
		// LnkLog.log('integration LnkWcbPopup', ignoredExc);
	}
})();

		

/* Local variables: */
/* tab-width: 4     */
/* End:             */