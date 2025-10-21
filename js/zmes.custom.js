(function($){
  // ! 모바일에서만 전화되도록
  const $callMeButton = $("#call-me a.nectar-button:first-child, .call-me");
  $callMeButton.callMeCheck();
  // ! modal popup
  $(document).customModal({
    triggers: {
      '.modalPolicy': '#dialog_policy',
      '.modalTerms': '#dialog_terms',
      '.register': '#dialog_contact'
    },
    preventAutoFocus: true
  });
})(jQuery);
