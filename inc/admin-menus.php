<?php

class givewp_admin_menus {

	function menu_view() {
		$user = wp_get_current_user();
		echo '<h2>Give Charts</h2>';
		//echo '<canvas id="bar" height="450" width="600"></canvas>';
		echo '<canvas id="chart" height="450" width="600"></canvas>';
	}
}



?>