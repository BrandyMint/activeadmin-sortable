(function($) {
  $(document).ready(function() {
    $('.handle').closest('tbody').activeAdminSortable();
  });

  $.fn.activeAdminSortable = function() {
    this.sortable({
      helper: function (e, tr) {
          var originals = tr.children();
          var helper = tr.clone();
          helper.children().each(function (index) {
              $(this).width(originals.eq(index).width());
          });
          return helper;
      },
      handle: ".handle",
      axis: "y",
      placeholder: "ui-state-highlight",
      update: function(event, ui) {
        var item = ui.item.find('[data-sort-url]')
        var url  = item.data('sort-url');
        var actionOnSuccess = item.data('sort-success-action')
        var position = item.data('data-sort-position') || (ui.item.index() + 1);
        var method   = item.data('data-sort-post') || 'post'
        var customParams = typeof item.data('sort-custom-params') === 'object' ? item.data('sort-custom-params') : {}

        $.ajax({
          url:  url,
          type: method,
          data: $.extend(customParams, { position: position }),
          error: function() { alert("Saving sortable error"); },
          success: function() { if (actionOnSuccess=='nothing') { return; } else { window.location.reload(); } }
        });
      }
    });

    this.disableSelection();
  }
})(jQuery);
