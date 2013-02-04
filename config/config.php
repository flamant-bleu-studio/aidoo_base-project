<?php

	/**
	 * Configuration global
	 * 
	 * Configuration commune à tous les sites.
	 * Chaque constante présente dans ce fichier surcharge celle dans la configuration d'un site
	 */
	 
    defined('PUBLIC_PATH')			|| define('PUBLIC_PATH', realpath(dirname(__FILE__).'/../')); // Apache DOC_ROOT
	
    defined('APPLICATION_ENV')		|| define('APPLICATION_ENV', 'development'); // Environnement d'application
	
    defined('CMS_PATH')				|| define('CMS_PATH', realpath(PUBLIC_PATH . '/../../CMS')); // Dossier contenant les versions du core du CMS
    defined('CMS_VERSION')			|| define('CMS_VERSION', 'current_version'); // Version du core du CMS
	
    defined('ZEND_LIB_VERSION') || define('ZEND_LIB_VERSION', "Zend_1.12.0"); // Version de la librairie ZEND (Default : "" // "Zend_1.12.0")
    //defined('ZEND_LIB_PATH') || define('ZEND_LIB_PATH', CMS_PATH . '/lib'); // Chemin du dossier contenant la version de la librairie ZEND
	
	defined('RESOURCES_FOLDERS')	|| define('RESOURCES_FOLDERS', '/resources'); // Dossiers de ressources des multi sites
	
    // Librairie en commun ("/common_lib" sur le serveur dédié || "/../common_lib" pour annuler le BASE_URL en local)
    defined('COMMON_LIB_PATH') || define('COMMON_LIB_PATH', '/../common_lib'); 
    
    // ADMIN URL & PATH
	defined('ADMIN_URL') || define('ADMIN_URL', '/../cms_adminskins/');
	//defined('ADMIN_URL') 		|| define('ADMIN_URL', '/common_lib/cms_adminskins/');
	defined('ADMIN_PATH') || define('ADMIN_PATH', realpath(PUBLIC_PATH . ADMIN_URL).'/');
	//defined('ADMIN_PATH') 		|| define('ADMIN_PATH', realpath("/var/www" . ADMIN_URL) . '/');
    defined('ADMIN_SKIN') || define('ADMIN_SKIN', 'fb'); // A régler sur "fb" ou "selectup"
	
	/*
	 * Multi site
	 */
	 define('MULTI_SITE_ACTIVE', false);
	 
	$array_multi = array(
		"1" => "www.cms.local"
	);
	
	/*
	 * Application
	 */
	define("UNIQUE_ID", "nomdusite");
	define("DISABLE_CORE_PAGE", false);
	define("REDIRECT_URI_SYSTEM_TO_REWRITE", true);
	
	// Cache navigateur
	define('CACHE_CSS_JS', false);
	define('CACHE_CSS_JS_MINI', true);
	define('CACHE_CSS_JS_GENERATE', "force");
	
