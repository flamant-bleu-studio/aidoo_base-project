<?php
	/*
	 * == PAS TOUCHE MINOUCHE == 
	 * 
	 * Fichier chargé de vérifier et inclure la configuration du multi-site
	 * Rien n'est à modifier ici !
	 */


	if(!is_array($array_multi))
		die("Tableau 'array_multi' de configuration des sites inexistant");

	if(MULTI_SITE_ACTIVE === false){
		$key = key($array_multi);
	}
	else if(MULTI_SITE_ACTIVE === true){
		$key = array_search($_SERVER["SERVER_NAME"], $array_multi);
		
		if(!$key)
			die("Aucun multi-site correspondant");
	}

	/*
	 * ==== Multi site ====
	 * Si un ID de site est stocké en cookie, on inclut le fichier de configuration concerné  
	 */
	
	if($_COOKIE["multi_site"]["change"]){
		$key = (int)$_COOKIE["multi_site"]["id"];
		
		if(!array_key_exists($key, $array_multi))
			die("invalid key multi-site");
	}
	
	define("MULTI_SITE_ID", $key);
	define("MULTI_SITE_PREFIX", $key."_");

	include_once 'config_'.$key.'.php';
	
	global $multi_site_prefix;
	$multi_site_prefix = MULTI_SITE_PREFIX;