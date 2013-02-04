
/* Fonction de tri des résultats de recherche */
function postFilter( selectedtype )
{
  document.filterform.filter.value = selectedtype ;
  document.filterform.submit() ;
}


/* Favoris */
$("#search_vehicule_results a.btn_toggleFav").live('click', function(){
	var id = $(this).parent().parent().attr("id")
	var ulCompteur = $(".blocTypemaselectionVehicules ul");
	
	if($(this).attr("rel") == "off")
	{
		
		if(parseInt(ulCompteur.attr("rel")) >= 5)
		{
			alert("Vous pouvez sélectionner 5 véhicules au maximum.");
			return false;
		}
		
		var li = $("#"+id);
		var id = li.attr("id");
		var infos = li.find("div.info_hidden");

		var newElem = $("#template_fav_item").clone();
		
		newElem.attr("id", "fav_"+id)
		.find("a:first").attr("rel",id).next("a").attr("href", infos.find("div.info_url").html())
		.find("img").attr("src", infos.find("div.info_img").html());

		newElem.find("div span:first").html(infos.find(".info_marque").html())
		.next().html(infos.find(".info_modele").html())
		.next().html(infos.find(".info_prix").html()+"€");
		
		newElem.show().appendTo(ulCompteur);
		
		$("#btn_toggleFav_"+id).attr("rel", "on").find("img").attr("src", skinUrl+"/images/favoris_on.gif");
		
		$(".blocTypemaselectionVehicules").show();
		
		var newVal = parseInt(ulCompteur.attr("rel"))+1;
		ulCompteur.attr("rel", newVal);
		$("#count_vfavoris").html(newVal);
				
		addFav(id, function(results){
			if (results["exceed"]=='yes')
				alert("Vous pouvez sélectionner 5 véhicules au maximum.");
		});
		
	}
	else
	{
		$("#fav_"+id).fadeOut("fast", function(){
			$(this).remove();
		});
		$("#btn_toggleFav_"+id).attr("rel", "off").find("img").attr("src", skinUrl+"/images/favoris_off.gif");

		var newVal = parseInt(ulCompteur.attr("rel"))-1;
		ulCompteur.attr("rel", newVal);
		$("#count_vfavoris").html(newVal);
		
		if(newVal <= 0)
			$(".blocTypemaselectionVehicules").hide();
		
		removeFav(id, function(){});	
	}
	
	return false;
});


$("#fiche_vehicule .fiche_ajoutez a").live('click', function(){
	var id = $(this).attr("rel");
	var lien = $(this);
	
	addFav(id, function(results){
		if (results["exceed"])
		{
			alert("Vous pouvez sélectionner 5 véhicules au maximum.");
		}
		else
		{
			lien.fadeOut("400").next().delay("400").fadeIn();
			$("#count_vfavoris").html(parseInt($("#count_vfavoris").html())+1);
		}
	});
	
	return false;
});

$(".blocTypemaselectionVehicules a.del_fav").live('click', function()
{
	var id = $(this).attr("rel");
	var ulCompteur = $(".blocTypemaselectionVehicules ul");
	
	$("#fav_"+id).fadeOut("fast", function(){
		$(this).remove();
	});
	
	var newVal = parseInt(ulCompteur.attr("rel"))-1;
	ulCompteur.attr("rel", newVal);
	$("#count_vfavoris").html(newVal);
	
	if(newVal <= 0)
		$(".blocTypemaselectionVehicules").hide();
	
	$("#btn_toggleFav_"+id).attr("rel", "off").find("img").attr("src", skinUrl+"/images/favoris_off.gif");
	
	removeFav(id, function(){});
	
	return false;
});

$("#selection_vehicule .del_compare").live('click', function()
{
	var id = $(this).attr("id");
	$('.grid_'+id).hide();
	
	$("#count_vfavoris").html(parseInt($("#count_vfavoris").html())-1);
	
	removeFav(id, function(){});
	
	return false;
});

function addFav(id, onComplete){

	$.ajax({
		type: "POST",
		url: baseUrl+'/ajax/selectup/addtofavorite/',
		dataType: "json",
		data: {
			'id' : id
		},
		cache: false,
		error: function(results){
			alert("Erreur : Le véhicule "+id+" n\'a pas pu être ajouté aux favoris ...\nActualisez la page et réessayez.");
		},
		success: function(results){
			if(results["error"] == true)
				alert("Erreur : Le véhicule "+id+" n\'a pas pu être ajouté aux favoris ...\nActualisez la page et réessayez.");
			
			onComplete(results);
		}
	});
}

function removeFav(id, onComplete){

	$.ajax({
		type: "POST",
		url: baseUrl+'/ajax/selectup/deltofavorite/',
		dataType: "json",
		data: {
			'id' : id
		},
		cache: false,
		error: function(results){
			alert("Erreur : Le véhicule "+id+" n\'a pas pu être retiré des favoris ...\nActualisez la page et réessayez.");
		},
		success: function(results){
			if(results["error"] == true)
				alert("Erreur : Le véhicule "+id+" n\'a pas pu être retiré des favoris ...\nActualisez la page et réessayez.");
			
			onComplete(results);
		}
	});
}



/* Onglets fiche véhicule */ 
$('#tabMenu > li').live('click',function(){
	$('#tabMenu > li').removeClass('selected');
	$(this).addClass('selected');
	$('#tabBody div.tabBody_box').slideUp('1500');
	$('#tabBody div.tabBody_box:eq(' + $('#tabMenu > li').index(this) + ')').slideDown('1500');
}).live('mouseover',function() {
	$(this).addClass('mouseover');
	$(this).removeClass('mouseout');   
}).live('mouseout',function() {
	$(this).addClass('mouseout');
	$(this).removeClass('mouseover');    
});


/* Fiche véhicule */

$("#ajoutez a").live('click', function(){
	var id = $(this).attr("rel")
	
	$(this).fadeOut(500, function(){
		$(this).parent().find("span").fadeIn();
	});
	
	$.ajax({
		type: "POST",
		url: baseUrl+'/ajax/selectup/addtofavorite/',
		dataType: "json",
		data: {
			'id' : id
		},
		cache: false,
		error: function(results){
			alert("Erreur : Le véhicule "+id+" n\'a pas pu être ajouté aux favoris ...\nActualisez la page et réessayez.");
		},
		success: function(results){
			if(results["error"] == true)
				alert("Erreur : Le véhicule "+id+" n\'a pas pu être ajouté aux favoris ...\nActualisez la page et réessayez.");
		}
	});
	
	return false;
});

/* Listing résultats recherche selectup dynamique (affichage d'info supplémentaire par extension)*/

$(document).ready(function() {

	/* Set du nombre de vehicules selectionnés en header (a coté mon compte) */
	$("#count_vfavoris").html($(".blocTypemaselectionVehicules ul").attr("rel"));
	
	$(".item_vehicule_grid").hover( 
		function(){
			var elem = $("#extended_infos-" + this.id);
			elem.css({"display":"block"});
			elem.stop().animate({"opacity": 1, top: "10"}, {duration:"slow"});
		}, 
		function(){
			var elem = $("#extended_infos-" + this.id);
			elem.stop().animate(
				{"opacity": 0, top: "-47"},{duration:"fast", complete : function(){
					elem.css({"display":"none"});
				}}
			);
		}
	);
	
	/* GalleryView, Image fiche véhicule*/
	if(jQuery().galleryView) {
		$('#photos_vehicule').galleryView({
			panel_width: 320,
			panel_height: 242,
			frame_width: 60,
			frame_height: 60
		});
	}
	/* FancyBox */
	if(jQuery().fancybox) {

		$('#onglet_photos a[rel=grouped_elements], #photos_vehicule a[rel=grouped_elements]').fancybox({
			'hideOnContentClick': true,
			'opacity'		: true,
			'overlayShow'	: false,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic'
		});
	}
});