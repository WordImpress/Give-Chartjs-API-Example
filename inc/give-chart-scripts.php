<?php

class give_charts_scripts {

	function admin_scripts() {
		$user = wp_get_current_user();
		wp_enqueue_script( 'give-charts', GIVE_CHARTS_URL . 'build/js/give-api-app.js', array( 'jquery' ), GIVE_CHARTS_VERISON, false );


		if( $user ) {
			$local_object = array(
				'key' => Give()->api->get_user_public_key($user->ID),
				'token' => Give()->api->get_token($user->ID)
			);
		} else {
			$local_object = array(
				'key' => false,
				'token' => false
			);
		}

		$local_object['give_api_url'] = get_bloginfo('wpurl') . '/give-api/v1';

		wp_localize_script( 'give-charts', 'give_local', $local_object );

	}
}