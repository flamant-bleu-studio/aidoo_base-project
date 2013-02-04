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

	$temps_debut = microtime(true);
	
	require_once "config/config.php";
	require_once "config/multi.php";
	
    // Real folder from which the cms files will be included
    defined('BASE_PATH') || define('BASE_PATH', CMS_PATH . '/'.CMS_VERSION);
    
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
    
    $application->setBootstrap(APPLICATION_PATH ."/Bootstrap_classic.php", "Bootstrap_classic");
    
    // Bootstrap and run run run !
	$application->bootstrap()->run();
	
	$temps_fin = microtime(true);
	//echo 'Temps d\'execution : '.round($temps_fin - $temps_debut, 4);