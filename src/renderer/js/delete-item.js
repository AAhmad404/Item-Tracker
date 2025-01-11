$(document).ready(() => {
    $('#delete-item-button').on('click', () => {
        if (!window.currentItem || !window.currentItem.id) {
            return;
        }

        window.electron.send('confirm-delete-item', { itemId: window.currentItem.id });
    });

    window.electron.on('item-deleted', (response) => {
        if (response.success) {
            showSuccessDialog('Item deleted successfully.');
        } else {
            console.error('Error occurred while attempting delete the item:', response.error);
            showErrorDialog('Failed to delete item. Please try again.');
        }
    });

    function showErrorDialog(message) {
        window.electron.send('show-error-dialog', { message });
    }

    function showSuccessDialog(message) {
        window.electron.send('show-success-dialog', { message });
    }
});
