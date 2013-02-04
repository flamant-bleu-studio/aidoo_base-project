$(document).ready( function() {

	// ----- EVENTS -----
	
	var i = counter;
	$(".add_crit").live("click", function(e){
		e.preventDefault();
		i++;
		
		var elem 		= $(this).parent().find(":first").clone();
		var elem_name 	= elem.attr("name");
		var datas 		= datasbrutes[elem_name];
		
		elem.attr("name", elem_name+i).removeAttr("id");
		
		elem.empty();
		
		var toInsert = "";
		$.each(datas, function(k, v){
			toInsert += "<option value='"+v+"'>"+v+"</option>";
		});
		elem.append(toInsert);
		
		$(this).before(elem.after("<button class='remove_crit'>-</button>"));
	});
	
	$(".remove_crit").live("click", function(e){
		e.preventDefault();
		
		$(this).prev().remove();
		$(this).remove();
	})
	
	
	// Type
	$('input[name="type"]').change(function(elem){
		get_datas(["carrosserie","marque","modele","version","ville","couleur","energie"]);
	}).click(function(elem){
		$(".selectAdminSearch").val("0");
	});
	
	// Carrosserie
	$('#carrosserie').change(function(){
		get_datas(["marque","modele","version","ville","couleur","energie"]);
	});				
	
	
	// Marque
	$('#marque').change(function(){
		get_datas(["carrosserie","modele","version","ville","couleur","energie"]);
	});				
	
	// Modele
	$('#modele').change(function(){
		get_datas(["carrosserie","marque","version","ville","couleur","energie"]);
	});	
	
	// Version
	$('#version').change(function(){
		get_datas(["carrosserie","marque","modele","ville","couleur","energie"]);
	});	
	
	// Couleur
	$('#couleur').change(function(){
		get_datas(["carrosserie","marque","version","modele","ville","energie"]);
	});	
	
	// Energie
	$('#energie').change(function(){
		get_datas(["carrosserie","marque","version","modele","ville","couleur"]);
	});
	
	// Ville
	$('#ville').change(function(){
		get_datas(["carrosserie","marque","modele","version","couleur","energie"]);
	});
	
	// Budget
	$('#budget_min').change(function(){
		get_datas([]);
	});
	$('#budget_max').change(function(){
		get_datas([]);
	});
	
	$( "#slider-budget" ).slider({
		range: true,
		min: parseInt($("#conf_budget_min").val()),
		max: parseInt($("#conf_budget_max").val()),
		values: [parseInt($("#budget_min").val()), parseInt($("#budget_max").val())],
		step:2000,
		animate: true,
		stop: function( event, ui ) {
			$( "#budget_min" ).val(ui.values[ 0 ]);
			$( "#budget_max" ).val(ui.values[ 1 ]);
			get_datas([]);
		},
		slide: function( event, ui ) {
			$( "#budget_min_aff" ).text(ui.values[ 0 ]);
			$( "#budget_max_aff" ).text(ui.values[ 1 ]);
		}
	});
	
	// Kilométrage
	$('#km_min').change(function(){
		get_datas([]);
	});
	$('#km_min').change(function(){
		get_datas([]);
	});
	
	$( "#slider-km" ).slider({
		range: true,
		min: parseInt($("#conf_km_min").val()),
		max: parseInt($("#conf_km_max").val()),
		values: [parseInt($("#km_min").val()), parseInt($("#km_max").val())],
		step:5000,
		animate: true,
		stop: function( event, ui ) {
			$( "#km_min" ).val(ui.values[ 0 ]);
			$( "#km_max" ).val(ui.values[ 1 ]);
			get_datas([]);
		},
		slide: function( event, ui ) {
			$( "#km_min_aff" ).text(ui.values[ 0 ]);
			$( "#km_max_aff" ).text(ui.values[ 1 ]);
		}
	});
	
	// Ancienneté
	$('#annee_min').change(function(){
		get_datas([]);
	});
	$('#annee_max').change(function(){
		get_datas([]);
	});
	
	$( "#slider-annee" ).slider({
		range: true,
		min: parseInt($("#conf_annee_min").val()),
		max: parseInt($("#conf_annee_max").val()),
		values: [parseInt($("#annee_min").val()), parseInt($("#annee_max").val())],
		step:1,
		animate: true,
		stop: function( event, ui ) {
			$( "#annee_min" ).val(ui.values[ 0 ]);
			$( "#annee_max" ).val(ui.values[ 1 ]);
			get_datas([]);
		},
		slide: function( event, ui ) {
			$( "#annee_min_aff" ).text(ui.values[ 0 ]);
			$( "#annee_max_aff" ).text(ui.values[ 1 ]);
		}
	});
	
	
	// ----- FUNCTIONS -----
	
	function get_datas(to_update){
			
		$('.count').html("<img src='"+baseUrl+"/lib/selectup/images/ajax-loader.gif' />");
		
			var datas = {
				"type" 			: $('input[name="type"]:checked').val(),
				"carrosserie" 	: $('#carrosserie').val(),
				"marque" 		: $('#marque').val(),
				"modele" 		: $('#modele').val(),
				"version" 		: $('#version').val(),
				"ville" 		: $('#ville').val(),
				"couleur"		: $('#couleur').val(),
				"energie"		: $('#energie').val(),
				"budget_min" 	: $('#budget_min').val(),
				"budget_max" 	: $('#budget_max').val(),
				"km_min" 		: $('#km_min').val(),
				"km_max" 		: $('#km_max').val(),
				"annee_min" 	: $('#annee_min').val(),
				"annee_max" 	: $('#annee_max').val()
				
			};
			
			$.post(
				baseUrl+'/ajax/selectup/refresh', 
				datas, 
				function(datas) {
					
					if (!datas['error']) 
					{
						$.each(to_update, function(key, value){
							if(value == "carrosserie")
								html = "Toutes les carrosseries";
							else if(value == "marque")
								html = "Toutes les marques";
							else if(value == "modele")
								html = "Tous les modèles";
							else if(value == "version")
								html = "Toutes les versions";
							else if(value == "couleur")
								html = "Toutes les couleurs";
							else if(value == "energie")
								html = "Toutes les énergies";
							else if(value == "ville")
								html = "Toutes les villes";
							else
								return true;
							
							var elem = $("#"+value);
							var previousState = $("#"+value).val();
							
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
						
						$('.count').html(datas['data']['count']);

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