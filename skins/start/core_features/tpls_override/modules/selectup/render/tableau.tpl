
{appendFile type="js" src="/lib/selectup/front.js"}
{appendFile type="css" src="/lib/selectup/style.css"}

<div id="search_vehicule_results" class="tableau">

	<div class="top">
	
		<div class="nb_results left">Résultats {$firstVehicule} à {$lastVehicule} sur {$nbvehicule}</div>
		<div id="results_params" class="right">
		
		    <!--Affichage <a href="{$baseUrl}{$pageUrlList}"><img src="{$baseUrl}/lib/selectup/images/sort_inline.png" /></a> 
		    				<a href="{$baseUrl}{$pageUrl}"><img src="{$baseUrl}/lib/selectup/images/sort_grid.png" /></a>
			Afficher uniquement les véhicules avec photo :  <a href="javascript:postFilter('WithImages')"><img src="{$baseUrl}/lib/selectup/images/picture.png" /></a>-->
		
			<form name="filterform" action="{$smarty.server.REQUEST_URI} " method="POST">
				<input type="hidden" name="filter" />
				<label for="resultsByPage">Nombre de résultats par pages : </label>
				<select name="resultsByPage" onchange="submit();">
					{html_options output=$valuesByPage values=$valuesByPage selected=$resultsByPage}
				</select>
			</form>	
		</div>
		<div class="clear"></div>
	</div>
	
	<div class="content">
	
		<div class="header_tableau">
		
			<div class="photos">Photos</div>
			
			<div class="ville">
				{if $sort == "ville" && $sortDir == "up"}
					<a href="javascript:postFilter('placeDown')">Ville</a><img src="{$baseUrl}/lib/selectup/images/fleche_bas.png" />
				{elseif $sort == "ville" && $sortDir == "down"}
					<a href="javascript:postFilter('placeUp')">Ville</a><img src="{$baseUrl}/lib/selectup/images/fleche_haut.png" />
				{else}	
					<a href="javascript:postFilter('placeUp')">Ville</a>
				{/if}
			</div>
			
			<div class="marque_modele">
				{if $sort == "Marque" && $sortDir == "up"}
					<a href="javascript:postFilter('marqueDown')">Marque</a><img src="{$baseUrl}/lib/selectup/images/fleche_bas.png" />
				{elseif $sort == "Marque" && $sortDir == "down"}
					<a href="javascript:postFilter('marqueUp')">Marque</a><img src="{$baseUrl}/lib/selectup/images/fleche_haut.png" />
				{else}	
					<a href="javascript:postFilter('marqueUp')">Marque</a>
				{/if}
				 et
				{if $sort == "Modele" && $sortDir == "up"}
					<a href="javascript:postFilter('modeleDown')">modèle</a><img src="{$baseUrl}/lib/selectup/images/fleche_bas.png" />
				{elseif $sort == "Modele" && $sortDir == "down"}
					<a href="javascript:postFilter('modeleUp')">modèle</a><img src="{$baseUrl}/lib/selectup/images/fleche_haut.png" />
				{else}	
					<a href="javascript:postFilter('modeleUp')">modèle</a>
				{/if}
			</div>
			
			<div class="energie">Energie</div>
			
			<div class="annee">
				{if $sort == "Collection" && $sortDir == "up"}
					<a href="javascript:postFilter('yearsDown')">Année</a><img src="{$baseUrl}/lib/selectup/images/fleche_bas.png" />
				{elseif $sort == "Collection" && $sortDir == "down"}
					<a href="javascript:postFilter('yearsUp')">Année</a><img src="{$baseUrl}/lib/selectup/images/fleche_haut.png" />
				{else}	
					<a href="javascript:postFilter('yearsUp')">Année</a>
				{/if}
			</div>
			
			<div class="km">
				{if $sort == "Kilometrage" && $sortDir == "up"}
					<a href="javascript:postFilter('kmDown')">Km</a><img src="{$baseUrl}/lib/selectup/images/fleche_bas.png" />
				{elseif $sort == "Kilometrage" && $sortDir == "down"}
					<a href="javascript:postFilter('kmUp')">Km</a><img src="{$baseUrl}/lib/selectup/images/fleche_haut.png" />
				{else}	
					<a href="javascript:postFilter('kmUp')">Km</a>
				{/if}
			</div>
			
			<div class="prix">
				{if $sort == "PrixTTC" && $sortDir == "up"}
					<a href="javascript:postFilter('priceDown')">Prix</a><img src="{$baseUrl}/lib/selectup/images/fleche_bas.png" />
				{elseif $sort == "PrixTTC" && $sortDir == "down"}
					<a href="javascript:postFilter('priceUp')">Prix</a><img src="{$baseUrl}/lib/selectup/images/fleche_haut.png" />
				{else}	
					<a href="javascript:postFilter('priceUp')">Prix</a>
				{/if}
			</div>
			
		</div>
		
		{if $fiches}
		
		{foreach from=$fiches item=item name=item_vehicule}
		
		<a class="table_link"  href="{$baseUrl}/selectup/fiche/{$item->fiche->id_vehicule}/{$item->fiche->Marque}-{$item->fiche->Modele}" />
		
			<div id="{$item->fiche->id_vehicule}" class="row_tableau {cycle values="bg_blanc,bg_gris"} {if $smarty.foreach.item_vehicule.last}last{/if}">
		
				<div class="photos">
					{if $item->visuels[0]}
					<img src="{$item->visuels[0].thumb}" height="100" />
					{else}
					<img src="{$baseUrl}/lib/selectup/images/no_visuel_small.jpg" height="100" />
					{/if}
				</div>
				
				<div class="ville">{$item->fiche->ville}</div>
				
				<div class="marque_modele">
					{$item->fiche->Marque} - {$item->fiche->Modele}<br/>{$item->fiche->Version}
				</div>
				
				<div class="energie">{$item->fiche->Energie}</div>
				
				<div class="annee">{$item->fiche->Collection}</div>
				
				<div class="km">{$item->fiche->Kilometrage|number_format:0:",":" "}</div>
				
				<div class="prix">{$item->fiche->PrixTTC|number_format:0:",":" "} €</div>
			
				<div class="info_hidden" style="display: none;visibility: hidden;">
					<div class="info_marque">{$item->fiche->Marque}</div>
					<div class="info_modele">{$item->fiche->Modele}</div>
					<div class="info_prix">{$item->fiche->PrixTTC}</div>
					<div class="info_img">{if $item->visuels[0]}{$item->visuels[0].thumb}{else}{$baseUrl}/lib/selectup/images/no_visuel_small.jpg{/if}</div>
					<div class="info_url">{$baseUrl}/selectup/fiche/{$item->fiche->id_vehicule}/{$item->fiche->Marque}-{$item->fiche->Modele}</div>
				</div>
				<div style="clear:both;"></div>
			</div>
		</a>
		{/foreach}
		{else}
		
		<div class="row_tableau no_result">
			Aucun résultat disponible pour cette recherche.
		</div>
		{/if}
	
	</div>
</div>
