(function($){
  /**
   * * #register 섹션이 있으면 smooth 스크롤, 없으면 홈페이지로 가서 #register로 이동
   */
  $.fn.scrollUpdater = function(options) {
    var settings = $.extend({
      homepageUrl: window.location.origin || `${window.location.protocol}//${window.location.host}`,
      wpAdminBarSelector: '#wpadminbar',
      registerSelector: '#register',
      registerButtons: 'your_register_buttons',
      navButton: '.consulting a', // Optional: Set to null or omit if not needed
      updateHash: false
    }, options );

    var calculateWpAdminHeight = function() {
      var $wpAdmin = $(settings.wpAdminBarSelector);
      if ($wpAdmin.length > 0 && $wpAdmin.css('position') === 'fixed') {
        return $wpAdmin.outerHeight();
      }
      return 0;
    };

    var updateButtonHrefs = function() {
      if (!settings.navButton) {
        return;
      }
      var $buttonsToUpdate = $(settings.navButton).add($(settings.registerButtons));
      $buttonsToUpdate.attr('href', `${settings.homepageUrl}/#register`);
    };

    var extractHash = function(href) {
      if (!href) return null;
      var hashIndex = href.indexOf('#');
      if (hashIndex === -1) return null;
      return href.substring(hashIndex);
    };

    var handleRegisterButtonClick = function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      var targetSelector = extractHash(href);
      if (!targetSelector) {
        return false;
      }
      var $target = $(targetSelector);
      var wpAdminHeight = calculateWpAdminHeight();
      if ($target.length) {
        $('html, body').stop().animate({
          scrollTop: $target.offset().top - wpAdminHeight + 1
        }, 800, 'easeInOutCubic');
        if (settings.updateHash) {
          window.location.hash = targetSelector;
        }
      }
      return false;
    };

    var init = function() {
      var $register = $(settings.registerSelector);
      var $regiButton = $(settings.registerButtons);
      if ($register.length === 0) {
        updateButtonHrefs();
      } else {
        $regiButton.on('click', handleRegisterButtonClick);
      }
    };
    init();
    return this;
  };

  /**
   * * 모바일에서만 전화되도록
   */
  $.fn.callMeCheck = function(options) {
    const settings = $.extend({
      alertMessage: "전화는 휴대폰에서만 ^__,.__^",
      mobileCheck: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, options);

    return this.each(function() {
      const $element = $(this);
      $element.on('click.callMeCheck', function(e) {
        if (!settings.mobileCheck()) {
          e.preventDefault();
          alert(settings.alertMessage);
        }
      });
    });
  };

  /**
   * * smooth 스크롤
   */
  $.fn.scrollView = function() {
    const $wpAdmin    = $('#wpadminbar'),
          adminHeight = ($wpAdmin.length > 0 && $wpAdmin.css('position') === 'fixed') ? $wpAdmin.height() : 0;

    return this.each(function() {
      $('html, body').animate({
        scrollTop: $(this).offset().top - adminHeight + 1
      }, 800, 'easeInOutCubic');
    });
  };

  /**
   * * custom 모달(modal)
   */
  $.fn.customModal = function(options) {
    var settings = $.extend({
      modalSelector: 'dialog',
      closeButtonSelector: '.close',
      triggers: {
        // Example:
        // '.openModal1': '#modal1',
        // '.openModal2': '#modal2'
      },
      preventAutoFocus: false
    }, options );

    var $dialogs = $(settings.modalSelector);
    var $closeButtons = $dialogs.find(settings.closeButtonSelector);

    // Function to show modal
    var showModal = function($modal) {
      if ($modal.length) {
        $modal[0].showModal();

        if (!settings.preventAutoFocus) {
          var $firstFocusable = $modal.find('[tabindex]:first');
          if ($firstFocusable.length) {
            $firstFocusable.focus();
          }
        }

        // 추가: 강제로 모달 내부 스크롤을 상단으로
        requestAnimationFrame(function() {
          var $containers = $modal.find('.containers');
          if ($containers.length) {
            $containers[0].scrollTop = 0;
            $containers.scrollTop(0);
          }

          // 모달 자체도 상단으로
          $modal[0].scrollTop = 0;
        });
      }
    };

    // Function to close modal
    var closeModal = function($modal) {
      if ($modal.length) {
        $modal[0].close();
      }
    };

    // Bind trigger buttons
    if (Object.keys(settings.triggers).length > 0) {
      $.each(settings.triggers, function(triggerSelector, modalSelector) {
        $(triggerSelector).on('click', function(e) {
          e.preventDefault();
          var $modal = $(modalSelector);
          showModal($modal);
        });
      });
    }

    // Bind close buttons
    $closeButtons.on('click', function() {
      var $modal = $(this).closest(settings.modalSelector);
      closeModal($modal);
    });

    // Bind click outside to close
    $dialogs.on('click', function(e) {
      if (e.target === this) {
        closeModal($(this));
      }
    });

    return {
      showModal: showModal,
      closeModal: closeModal
    };
  };

  // ! 1. 하나만 있을 경우 (전화번호입력폼)
  /*
  if ($(".your_phone").length) {
    new Cleave('.your_phone', {
      prefix: '010',
      // noImmediatePrefix: true, // https://github.com/nosir/cleave.js/issues/605
      delimiter: '-',
      numericOnly: true,
      blocks: [3, 4, 4]
    });
  } */

  // ! 2. 여러개 있을 경우 (전화번호입력폼)
  const $yourPhoneFields = $('.your_phone');
  if ($yourPhoneFields.length) {
    $yourPhoneFields.each((index, element) => {
      new Cleave(element, {
        prefix: '010',
        delimiter: '-',
        numericOnly: true,
        blocks: [3, 4, 4]
      });
    });
  }

  // * 'TAB'키 누를 때 "010-" 선택되는거 방지
  const $phoneField = $('input[type="tel"]');
  $phoneField.on('focus', e => {
    const input = $(e.target);
    setTimeout(() => input[0].setSelectionRange(input.val().length, input.val().length), 0);
  });

  // * contact form 7 여러번 submit 방지
  const $wpcf7Submit = $(".wpcf7-submit");
  $wpcf7Submit.on('click', e => {
    if ($(".ajax-loader").hasClass('is-active')) {
      e.preventDefault();
    }
  });

})(jQuery);
