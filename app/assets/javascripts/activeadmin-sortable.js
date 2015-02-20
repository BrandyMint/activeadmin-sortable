(function($) {
  $(document).ready(function() {
    $('.handle').closest('tbody').activeAdminSortable();
  });

  $.fn.activeAdminSortable = function() {
    this.sortable({
      update: function(event, ui) {
        var item = ui.item.find('[data-sort-url]')
        var url = item.data('sort-url');
        var actionOnSuccess = item.data('sort-success-action')

        $.ajax({
          url: url,
          type: 'post',
          data: { position: ui.item.index() + 1 },
          error: function() { alert("Saving sortable error"); },
          success: function() { if (actionOnSuccess=='nothing') { return; } else { window.location.reload(); } }
        });
      }
    });

    this.disableSelection();
  }
})(jQuery);
