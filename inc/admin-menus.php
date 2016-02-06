<?php

class givewp_admin_menus {

	function menu_view() {
		echo '<style>.pie-legend li span{ display: inline-block; height: 10px; width: 10px; margin: 0 10px 0 0; }</style>';
		$user = wp_get_current_user();
		echo '<h2>Give Charts</h2>';

		echo '<div id="form_chart" style="width=45%;display:inline-block;margin:0 5% 0 0;">';
			echo '<h3>Best performing forms</h3>';
			echo '<canvas id="chart" height="450" width="450"></canvas>';
		echo '</div>';

		echo '<div id="month_chart" style="width=45%;display:inline-block">';
			echo '<h3>Month by Month</h3>';
			echo '<canvas id="bar" height="450" width="450"></canvas>';
		echo '</div>';
	}
}



?>