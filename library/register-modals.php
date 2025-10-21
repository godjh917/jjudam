<?php
function add_modals() {
  readfile( get_stylesheet_directory() . '/modal/policy.html' );
  readfile( get_stylesheet_directory() . '/modal/terms.html' );
  require( get_stylesheet_directory() . '/modal/contact.php' );
}
add_action( 'wp_footer', 'add_modals' );
