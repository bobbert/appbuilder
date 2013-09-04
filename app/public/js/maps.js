$(document).ready(function() {
	$('body').on('click', 'button.edit-toggle', function() {
		$row = $(this).closest('tr');
		if ($row.hasClass('editmode')) {
			$row.removeClass('editmode');
			$(this).text('Edit');
		}
		else {
			$row.addClass('editmode');
			$(this).text('Cancel');
		}
	})

})