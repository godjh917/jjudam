<?php
function add_footer_button() { ?>

<div id="footer_container_fullwidth">
  <div class="containerbox">
    <div class="inner_left"><a href="tel:1666-3336" class="call-me"><i style="margin-right: 10px;" class="nectar-menu-icon fa fa-phone"></i> <strong>전화문의</strong></a></div>
    <div class="inner_right"><a class="register" href="#"><strong>주담 한도조회 +</strong></a></div>
  </div>
</div>

<?php }
add_action( 'wp_footer', 'add_footer_button' );
