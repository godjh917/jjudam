<?php
/* Custom JS by Zmes
=============================================== */
function zmes_enqueue_scripts() {
  $childUrl  = get_stylesheet_directory_uri();
  $childPath = get_stylesheet_directory();

  wp_enqueue_script(
    'cleave',
    $childUrl . '/js/cleave.min.js',
    array(),
    filemtime( $childPath . '/js/cleave.min.js' ),
    true
  );
  wp_enqueue_script(
    'zmesPlugin',
    $childUrl . '/js/zmes.plugin.js',
    array( 'jquery', 'cleave' ),
    filemtime( $childPath . '/js/zmes.plugin.js' ),
    true
  );
  wp_enqueue_script(
    'zmes',
    $childUrl . '/js/zmes.custom.js',
    array( 'jquery', 'cleave', 'zmesPlugin' ),
    filemtime( $childPath . '/js/zmes.custom.js' ),
    true
  );

}
add_action( 'wp_enqueue_scripts', 'zmes_enqueue_scripts' );
