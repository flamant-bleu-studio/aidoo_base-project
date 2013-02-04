$(document).ready( function() {
	
	var forms = $('div[id|="search-vehicule"]');
	var current_form;
	
	forms.each(function(){

		current_form				= $(this);
		var current_concession 		= current_form.find('#fck_id_concession');
		var current_carrosserie 	= current_form.find('#carrosserie');
		var current_marque  		= current_form.find('#marque');
		var current_modele 			= current_form.find('#modele');
		var current_version 		= current_form.find('#version');
		var current_ville 			= current_form.find('#ville');
		var current_couleur 		= current_form.find('#couleur');
		var current_energie 		= current_form.find('#energie');
		var current_budget_min 		= current_form.find('#budget_min');
		var current_budget_max 		= current_form.find('#budget_max');
		var current_budget_min_conf	= current_form.find('#conf_budget_min');
		var current_budget_max_conf = current_form.find('#conf_budget_max');
		var current_km_min 			= current_form.find('#km_min');
		var current_km_max 			= current_form.find('#km_max');
		var current_km_min_conf		= current_form.find('#conf_km_min');
		var current_km_max_conf		= current_form.find('#conf_km_max');
		var current_annee_min 		= current_form.find('#annee_min');
		var current_annee_max 		= current_form.find('#annee_max');
		var current_annee_min_conf	= current_form.find('#conf_annee_min');
		var current_annee_max_conf	= current_form.find('#conf_annee_max');
	
	// ----- INITIALISATION -----
		
		
	// Si le champs marque n'existe pas
	if (current_marque.length == 0) {
		get_datas(["modele"]); // Count & init de la liste des modèles
	}
	else {
		get_datas([]); // Count
		
		if(current_marque.val() == 0) {
			current_modele.attr("disabled", "disabled");
			current_version.attr("disabled", "disabled");
		}
		if(current_modele.val() == 0) {
			current_version.attr("disabled", "disabled");
		}
	}

	
	// ----- EVENTS -----
	
	// Type
	current_form.find('input[name="type"]').live("change", function(elem){
		
		if(current_form.find('input[name="type"]:checked').val() == '1')
			current_form.find('#toSwitchIfNeuf').hide("slow");
		else
			current_form.find('#toSwitchIfNeuf').show("slow");
		
		toUpdate = new Array();
		
		if(current_marque.length != 0)
		{
			current_marque.val("0");
			toUpdate.push("marque");
		}
		
		if(current_modele.length != 0)
		{
			current_modele.val("0");
			if(current_marque.length == 0)
				toUpdate.push("modele");
		}
		
		get_datas(toUpdate);
		
		if(current_marque.length != 0 && current_modele.length != 0)
		{
			current_modele.attr("disabled", "disabled");
			current_version.attr("disabled", "disabled");
		}
	});
	
	// Carosserie
	if (current_carrosserie.length != 0) {
		current_carrosserie.live("change", function(){
			
			type_marque = current_marque.prop('tagName').toLowerCase();

			if(type_marque == "select")
				current_marque.val("0").attr("disabled", "disabled");
			
			current_modele.val("0").attr("disabled", "disabled");
			current_version.val("0").attr("disabled", "disabled");
			
			if(type_marque == "select")
				get_datas(["marque"]);
			else
				get_datas(["modele"]);
		});				
	}
	
	// Marque
	if (current_marque.length != 0) {
		current_marque.live("change", function(){
		
			current_modele.val("0").attr("disabled", "disabled");
			current_version.val("0").attr("disabled", "disabled");
			
			if($(this).val() == 0)
				get_datas([]);
			else
				get_datas(["modele"]);
		});				
	}
	
	// Modele
	if (current_modele.length != 0) {		
		current_modele.live("change", function(){
		
			current_version.val("0").attr("disabled", "disabled");
		
			if($(this).val() == 0)
				get_datas([]);
			else
				get_datas(["version"]);
			
		});	
	}
	
	// Version
	if (current_version.length != 0) {
		current_version.live("change", function(){
			get_datas([]);
		});
	}
	
	// Ville
	if (current_ville.length != 0) {
		current_ville.live("change", function(){
			get_datas([]);
		});
	}
	
	// Couleur
	if (current_couleur.length != 0) {
		current_couleur.live("change", function(){
			get_datas([]);
		});
	}
	
	// Energie
	if (current_energie.length != 0) {
		current_energie.live("change", function(){
			get_datas([]);
		});
	}
	
	// Budget
	if (current_form.find('#slider-budget').length != 0)	{
		initSlider("budget", 100);
	}
	
	// Kilométrage
	if (current_form.find('#slider-km').length != 0)	{
		initSlider("km", 1000);
	}
	
	// Ancienneté
	if (current_form.find('#slider-annee').length != 0) {
		initSlider("annee", 1);
	}
	
	function initSlider(name, step){
		current_form.find( "#slider-"+name ).slider({
			range: true,
			min: parseInt(current_form.find("#conf_"+name+"_min").val()),
			max: parseInt(current_form.find("#conf_"+name+"_max").val()),
			values: [parseInt(current_form.find("#"+name+"_min").val()), parseInt(current_form.find("#"+name+"_max").val())],
			step:step,
			animate: true,
			stop: function( event, ui ) {
				current_form.find( "#"+name+"_min" ).val(ui.values[ 0 ]);
				current_form.find( "#"+name+"_max" ).val(ui.values[ 1 ]);
				get_datas([]);
			},
			slide: function( event, ui ) {
				current_form.find( "#"+name+"_min_aff" ).text(ui.values[ 0 ]);
				current_form.find( "#"+name+"_max_aff" ).text(ui.values[ 1 ]);
			}
		});
	}
	
	
	// ----- FUNCTIONS -----
	
	function get_datas(to_update){
		
		current_form.find('.count').html("<img src='"+baseUrl+"/lib/selectup/images/ajax-loader.gif' />");
		
		current_form.find("#su_"+to_update[0]).append("<img src='"+baseUrl+"/lib/selectup/images/ajax-loader.gif' />");
		
		if(current_form.find('input[name="type"]:checked').length)
			var type = current_form.find('input[name="type"]:checked').val();
		else
			var type = current_form.find('input[name="type"]').val();

			var datas = {
				"type" 				: type,
				"fck_id_concession" : current_concession.val(),
				"carrosserie" 		: current_carrosserie.val(),
				"marque" 			: current_marque.val(),
				"modele" 			: current_modele.val(),
				"version" 			: current_version.val(),
				"ville" 			: current_ville.val(),
				"couleur"			: current_couleur.val(),
				"energie"			: current_energie.val(),
				"budget_min" 		: current_budget_min.val(),
				"budget_max" 		: current_budget_max.val(),
				"budget_min_conf" 	: current_budget_min_conf.val(),
				"budget_max_conf" 	: current_budget_max_conf.val(),
				"km_min" 			: current_km_min.val(),
				"km_max" 			: current_km_max.val(),
				"km_min_conf" 		: current_km_min_conf.val(),
				"km_max_conf" 		: current_km_max_conf.val(),
				"annee_min" 		: current_annee_min.val(),
				"annee_max" 		: current_annee_max.val(),
				"annee_min_conf" 	: current_annee_min_conf.val(),
				"annee_max_conf" 	: current_annee_max_conf.val()
			};
			
			$.post(
				baseUrl+'/ajax/selectup/refresh', 
				datas, 
				function(datas) {
					
					if (!datas['error']) 
					{
						$.each(to_update, function(key, value){
		            		
							if(value == "carrosserie")
								html = "Carrosseries";
							else if(value == "marque")
								html = "Marques";
							else if(value == "modele")
								html = "Modèles";
							else if(value == "version")
								html = "Versions";
							else if(value == "couleur")
								html = "Couleurs";
							else if(value == "energie")
								html = "Énergies";
							else if(value == "ville")
								html = "Villes";
							else
								return true;
							
							var elem = current_form.find("#"+value);
							var previousState = current_form.find("#"+value).val();
							
							elem.empty();
	            			
							elem.append("<option value='0'>"+html+"</option>");
	            									
							if(datas['data'][value].length > 0)
							{
								elem.attr('disabled', false);
								
								var toInsert = "";
		            			$.each(datas['data'][value], function(k, v){
		            				toInsert += "<option value='"+v+"'>"+v+"</option>";
		            			});
		            			elem.append(toInsert);
		            			elem.val(previousState);
							}
							else
								elem.attr('disabled', true);
						});
						
						current_form.find('.count').html(datas['data']['count']);
						current_form.find("#su_"+to_update[0]+" img").remove();

					}
					else 
					{
						alert(datas['message']);
					}
				
				},
				"json"
			);
	}
	
	});

});