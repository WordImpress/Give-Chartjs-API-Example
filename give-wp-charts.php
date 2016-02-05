<?php
/**
 * Plugin Name: Give Charts - The Better Way
 * Description: A better way to Chart your Give data
 * Author: Roy Sivan
 * Author URI: http://www.roysivan.com
 * Version: 0.1
 * Plugin URI: https://github.com/WordImpress/Give-Chartjs-API-Example
 * License: GPL3+
 * Text Domain: givewp-charts
 */

define( 'GIVE_CHARTS_DIR', plugin_dir_path( __FILE__ ) );
define( 'GIVE_CHARTS_URL', plugin_dir_url( __FILE__ ) );
define( 'GIVE_CHARTS_VERISON', '0.1' );

require_once 'inc/admin-menus.php';
require_once 'inc/give-chart-scripts.php';


class give_wp_charts {

	function give_charts_menu() {
		$give_menu = new givewp_admin_menus();
		add_submenu_page(
			'edit.php?post_type=give_forms',
			'Give Charts',
			'Give Charts',
			'manage_options',
			'give-charts',
			array( $give_menu, 'menu_view' )
		);
	}

	function admin_scripts() {
		$give_scripts = new give_charts_scripts();
		$give_scripts->admin_scripts();
	}

}

$give_charts = new give_wp_charts();

/**
 * Scripts
 */
add_action( 'admin_enqueue_scripts', array( $give_charts, 'admin_scripts' ) );

/**
 * Admin Menu
 */
add_action( 'admin_menu', array( $give_charts, 'give_charts_menu' ) );





?>