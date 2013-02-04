<?php

/**
 * CMS Aïdoo
 *
 * Copyright (C) 2013  Flamant Bleu Studio
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */

	/**
	 * Configuration par site
	 * Toute constante définie ici peut être surchargée par la configuration générale.
	 */
	 
	 // GENERAL
	defined('INACTIF')				|| define('INACTIF', false);
	
	// Le dossier de ressources spécifique au site
	defined('RESOURCES_FOLDER')		|| define('RESOURCES_FOLDER', RESOURCES_FOLDERS . '/cms_start');
	
	// Dossiers d'upload
	defined('UPLOAD_FOLDER')		|| define('UPLOAD_FOLDER', RESOURCES_FOLDER . '/upload');
	defined('MULTIUPLOAD_FOLDER') 	|| define('MULTIUPLOAD_FOLDER', RESOURCES_FOLDER . '/multi_upload');

	// Styles TINY_MCE
	defined("TINYMCE_STYLES") 		|| define("TINYMCE_STYLES", "
		[
	        {title : 'Titre', block : 'h1', classes : 'titre_h1'},
			{title : 'Justifie', inline : 'div', styles : {'text-align' : 'justify'}}
	    ]
	");
	
	// Diaporama (attention: les clés sont stockées en BDD, ne jamais les intervertire si le site contient déjà des diaporamas !)
	defined("DIAPORAMA_SIZE") 		|| define("DIAPORAMA_SIZE", '{
		"0":{"width":"700","height":"200"}, 
		"1":{"width":"670","height":"270"}
	}');
	
	//defined("CONFIG_HOMEPAGE") 		|| define("CONFIG_HOMEPAGE", '{"action": "view", "controller": "front", "module": "documents", "params": {"id": "8"}}');
	
	/*
	// Middle Office
	defined('CMS_MIDDLE_USER_GROUPE') 	|| define('CMS_MIDDLE_USER_GROUPE', 5);
	defined('CMS_MIDDLE_LOGIN_PAGE') 	|| define('CMS_MIDDLE_LOGIN_PAGE', '/users/login');
	defined('CMS_MIDDLE_INDEX') 		|| define('CMS_MIDDLE_INDEX', 'articles_middle/my-articles');
	*/
	
	/*
	// Facebook Connect API
	defined("FACEBOOK_APPID") || define('FACEBOOK_APPID', "xxxx");
	defined("FACEBOOK_SECRET") || define('FACEBOOK_SECRET', "xxxxxxxx");
	*/
	
	/*
	// Emails
	defined("EMAIL_FROM") || define('EMAIL_FROM', "no-reply@nomdedomaine.ext");
	defined("EMAIL_SIGN") || define('EMAIL_SIGN', "nomdusite");
	*/
	
	/*
	// IMMOBILIER
	defined("IMMO_XML_FOLDER") 		|| define("IMMO_XML_FOLDER", "cms_intensimmo");
	defined("IMMO_MEMBER_GROUP_ID") || define('IMMO_MEMBER_GROUP_ID', 4);
	defined("IMMO_SIGN") 			|| define('IMMO_SIGN', "intensimmo.com");
	*/
	
	/*
	// Configuration module Selectup
	defined("VEHICULE_XML_FOLDER") 		|| define("VEHICULE_XML_FOLDER", "cms_local");
	define('su_visuel_max_update_time', 30); // Temps maximum d'execution du script de MAJ des vignettes (0 = illimité)
	define('visuel_clean_delay', 2592000); // Temps de conservation des vignettes (30 jours)
	define('visuel_thumbs_max_width', null);
	define('visuel_thumbs_max_height', 72);
	
	defined(“VEHICULE_DIRECTION_GROUP”) || define(“VEHICULE_DIRECTION_GROUP”, “0”); //0=occasion 1=neuf autre=les VD ne remontent pas
		
	define('CONFIG_SELECTUP_DEFAULT_SEARCHVIEW', "tableau"); // présentation par défaut des résultats de recherche (tableau/list/grid)
	define('CONFIG_SELECTUP_DEFAULT_PAGEVIEW', "tableau"); // présentation pages de recherche (tableau/list/grid)
	
	*/
