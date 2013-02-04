/* Fonction de tri des résultats de recherche */
function postFilter( selectedtype )
{
  document.filterform.filter.value = selectedtype ;
  document.filterform.submit() ;
}

$(document).ready(function() {	
	/* Onglets fiche */ 
	$('#tabMenu > li').live('click',function(){
		$('#tabMenu > li').removeClass('selected');
		$(this).addClass('selected');
		$('#tabBody div.tabBody_box').slideUp('1500');
		$('#tabBody div.tabBody_box:eq(' + $('#tabMenu > li').index(this) + ')').slideDown('1500', function(){if($(this).is('#localisation')){
			resizeMap();
		}});
	}).live('mouseover',function() { 
		$(this).addClass('mouseover');
		$(this).removeClass('mouseout');   
	}).live('mouseout',function() {
		$(this).addClass('mouseout');
		$(this).removeClass('mouseover');    
	});

	function resizeMap()
	{
	google.maps.event.trigger(map,'resize');
	map.setZoom( map.getZoom() );
	map.setCenter(mapCenter);
	}

	/* Ajout fiche depuis liste résultat */
	$("#list_results .immoAddSel, #fiche_bien_container .immoAddSel").live("click", function(e){
		e.preventDefault();
		var btn = $(this);
		var id = $(this).attr("rel");
		
		$.ajax({
			type: "POST",
			url: baseUrl+'/ajax/immo/addfav',
			dataType: "json",
			data: {
				'id' : id
			},
			cache: false,
			error: function(results){
				alert("Erreur : Le bien "+id+" n\'a pas pu être ajouté à votre sélection...\nActualisez la page et réessayez.");
			},
			success: function(results){
				if(results["error"] == true)
					alert(results["message"]);
				else {
					btn.text("Retirer de ma sélection").removeClass("immoAddSel").addClass("immoDelSel");
				}
				
			}
		});
	});
	/* Suppression fiche depuis liste résultat */
	$("#list_results .immoDelSel, #fiche_bien_container .immoDelSel").live("click", function(e){
		e.preventDefault();
		var btn = $(this);
		var id = $(this).attr("rel");
		
		$.ajax({
			type: "POST",
			url: baseUrl+'/ajax/immo/delfav',
			dataType: "json",
			data: {
				'id' : id
			},
			cache: false,
			error: function(results){
				alert("Erreur : Le bien "+id+" n\'a pas pu être retiré à votre sélection...\nActualisez la page et réessayez.");
			},
			success: function(results){
				if(results["error"] == true)
					alert(results["message"]);
				else {
					btn.text("Ajouter à ma sélection").removeClass("immoDelSel").addClass("immoAddSel");
				}
				
			}
		});
	});
	/* Suppression fiche depuis middle */
	$("#list_selection .immoDelSel").live("click", function(e){
		e.preventDefault();
		var btn = $(this);
		var id = $(this).attr("rel");

		$.ajax({
			type: "POST",
			url: baseUrl+'/ajax/immo/delfav',
			dataType: "json",
			data: {
				'id' : id
			},
			cache: false,
			error: function(results){
				alert("Erreur : Le bien "+id+" n\'a pas pu être retiré à votre sélection...\nActualisez la page et réessayez.");
			},
			success: function(results){
				if(results["error"] == true)
					alert(results["message"]);
				else {
					btn.parents(".item_bien").slideUp(500, function(){
						$(this).remove();
						if($("#list_selection .item_bien").length <= 0)
							$("#list_selection .no_bien").show();
					});
				}
				
			}
		});
	});
	
	/* Suppression alerte depuis middle */
	$("#list_alerts .immoDelAlert").live("click", function(e){
		e.preventDefault();
		var btn = $(this);
		var id = $(this).attr("rel");

		$.ajax({
			type: "POST",
			url: baseUrl+'/ajax/immo/delalert',
			dataType: "json",
			data: {
				'id' : id
			},
			cache: false,
			error: function(results){
				alert("Erreur : L'alerte "+id+" n\'a pas pu être supprimée...\nActualisez la page et réessayez.");
			},
			success: function(results){
				if(results["error"] == true)
					alert(results["message"]);
				else {
					btn.parents(".item_alert").slideUp(500, function(){
						$(this).remove();
						if($("#list_alerts .item_alert").length <= 0)
							$("#list_alerts .no_alert").show();
					});
				}
				
			}
		});
	});
	
	/* GalleryView, Image fiche véhicule*/

	if(jQuery().galleryView) {
		$('#photos_bien').galleryView({
			gallery_width: 320,
			panel_width: 320,
			panel_height: 242,
			frame_width: 60,
			frame_height: 60
		});
	}

	/* FancyBox */
	if(jQuery().fancybox) {

		$('#photos_bien a[rel=grouped_elements]').fancybox({
			'hideOnContentClick': true,
			'opacity'		: true,
			'overlayShow'	: false,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic'
		});
	}
	
	/* Moteur de recherche */
	
	var quartier_select = $(".search-immo-form select[name=quartier]");
	var ville_select = $(".search-immo-form select[name=ville_offre]");
		
	ville_select.live("change", function(){
		
		if($(this).find("option:selected").val() == "0"){
			quartier_select.attr("disabled", true).val("0");
		}
		else {
			
			var datas = {
					"ville" : $(this).val()
				};
			
			$.post(
				baseUrl+'/ajax/immo/refresh', 
				datas, 
				function(datas) {
					
					if (!datas['error']) 
					{
						quartier_select.empty();
	            			
						quartier_select.append("<option value='0'>Quartier</option>");

						if(datas['datas']["quartiers"])	{	
							quartier_select.attr('disabled', false);
							
							var toInsert = "";
	            			$.each(datas['datas']["quartiers"], function(k, v){
	            				toInsert += "<option value='"+k+"'>"+v+"</option>";
	            			});
	            			quartier_select.append(toInsert);

						}
						else
							quartier_select.attr('disabled', true);
				
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