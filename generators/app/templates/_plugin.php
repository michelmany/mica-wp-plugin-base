<?php
/*
Plugin Name: <%= name %>
Plugin URI: <%= uri %>
Description: <%= description %>
Version: <%= version %>
Author: <%= author %>
Author URI: <%= author_url %>
License: <%= license %>
License URI: <%= license_uri %>
*/

defined( 'ABSPATH' ) or die();

define( 'PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'PLUGIN_URL', plugin_dir_url( __FILE__ ) );

if ( file_exists( PLUGIN_PATH . 'vendor/autoload.php' ) ) {
	require_once PLUGIN_PATH . 'vendor/autoload.php';
}
/**
 * Initialize all the core classes of the plugin
 */
if ( class_exists( 'Inc\\Init' ) ) {
	Inc\Init::registerServices();
}
