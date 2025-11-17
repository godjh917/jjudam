<?php
function add_footer_cf7() {
  if (is_front_page()) { ?>
    <div id="footer_container_cf7">
      <?php echo do_shortcode('[contact-form-7 id="22fe5a1" title="주담 문의 pc"]'); ?>
    </div>
<?php }

}
add_action( 'wp_footer', 'add_footer_cf7' );
