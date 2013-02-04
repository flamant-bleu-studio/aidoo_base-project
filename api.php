<?php
	$temps_debut = microtime(true);

	require_once "config/config.php";
	require_once "config/multi.php";
		
    // Real folder from which the cms files will be included
    defined('BASE_PATH') || define('BASE_PATH', CMS_PATH . '/'.CMS_VERSION);
    
    // Global json
    defined('_API_') || define('_API_', true);
    
    // Define path to application directory
    defined('APPLICATION_PATH') || define('APPLICATION_PATH', BASE_PATH . '/application');

    // Set include path to Zend (and other) libraries
    
	set_include_path(
		BASE_PATH .'/library' .
		PATH_SEPARATOR . get_include_path() .
        PATH_SEPARATOR . '.'
	); 
	
	if(defined('ZEND_LIB_PATH')){
		set_include_path(
			ZEND_LIB_PATH .
			PATH_SEPARATOR . get_include_path() .
	        PATH_SEPARATOR . '.'
		); 
	}
	
	require_once "Zend/Application.php";

    // Création de l'application
    $application = new Zend_Application(
        APPLICATION_ENV,
        PUBLIC_PATH . '/config/application.ini'
    );

    $application->setBootstrap(APPLICATION_PATH ."/Bootstrap_api.php", "Bootstrap_api");
    
    // Bootstrap and run run run !
	$application->bootstrap()->run();

	$temps_fin = microtime(true);
	//echo 'Temps d\'execution : '.round($temps_fin - $temps_debut, 4);
                
