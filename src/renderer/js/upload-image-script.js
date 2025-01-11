$(document).ready(() => {
    const itemInfoFileUploader = $('#item-info-file-uploader');
    const addItemFileUploader = $('#add-item-file-uploader');

    function createUploadImageHandler(section) {
        return function(event) {
            const fileUploadInput = event.target;

            if (!fileUploadInput.value) {
                return;
            }

            const image = fileUploadInput.files[0];

            if (!image.type.includes('image')) {
                return alert('Only images are allowed!');
            }

            if (image.size > 500_000) {
                return alert('Maximum upload size is 500 KB!');
            }

            const filename = image.name;

            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);

            fileReader.onload = (fileReaderEvent) => {
                const imageUrl = fileReaderEvent.target.result;
                if (section === 'item-information') {
                    const itemImage = $(`#item-information-image`);
                    itemImage.css('background-image', `url(${imageUrl})`);
                    $('#item-info-popup-image').attr('src', imageUrl);

                    itemImage.data('filename', filename);
                } else {
                    const itemImage = $(`#add-item-image`);
                    itemImage.css('background-image', `url(${imageUrl})`);
                    $('#add-item-popup-image').attr('src', imageUrl);

                    itemImage.data('filename', filename);
                }
            }
        };
    }

    window.triggerFileUpload = function(section) {
        if (section === 'item-information') {
            itemInfoFileUploader.off('change').on('change', createUploadImageHandler(section));
            itemInfoFileUploader.click();
        } else {
            addItemFileUploader.off('change').on('change', createUploadImageHandler(section));

            addItemFileUploader.click();
        }
    }
});
