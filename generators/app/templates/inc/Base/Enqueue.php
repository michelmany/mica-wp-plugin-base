<?php

namespace Inc\Base;

class Enqueue extends BaseController
{
	private string $UTM_GRABBER_VERSION = '1.0.0';
	private string $COOKIES_FRONT_HANDLER = 'cookies-front';
	private string $COOKIES_EDITOR_HANDLER = 'cookies-editor';

	public function register(): void
	{
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_front_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_scripts' ) );
	}

	/**
	 * @return void
	 */
	public function enqueue_editor_scripts(): void
	{
		wp_enqueue_script(
			$this->COOKIES_EDITOR_HANDLER,
			$this->plugin_url . 'dist/cookies-editor.js',
			array(),
			$this->UTM_GRABBER_VERSION,
			true
		);
	}

	/**
	 * @return void
	 */
	public function enqueue_front_scripts(): void
	{
		wp_enqueue_script(
			'js.cookie',
			$this->plugin_url . 'dist/js.cookie.js',
			array( 'jquery' ),
			'3.0.0'
		);

		wp_enqueue_script(
			$this->COOKIES_FRONT_HANDLER,
			$this->plugin_url . 'dist/cookies-front.js',
			array( 'js.cookie' ),
			$this->UTM_GRABBER_VERSION,
			true
		);

		wp_localize_script(
			$this->COOKIES_FRONT_HANDLER,
			'eqd_utm_obj',
			$this->generate_UTMs_for_url()
		);

		// Get URL string from Plugin Options
		wp_localize_script(
			$this->COOKIES_FRONT_HANDLER,
			'eqd_url_from_option',
			array(
				'url' => carbon_get_theme_option( 'eqd_utm_grabber_url' ),
			)
		);
	}
}
