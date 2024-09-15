document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.getElementById('image-container');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');

    let selectedImages = [];
    let originalClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let images = [...originalClasses];

    // Randomly pick one image to repeat
    const repeatIndex = Math.floor(Math.random() * 5);
    const repeatClass = originalClasses[repeatIndex];
    images.push(repeatClass);

    // Shuffle images array
    images = images.sort(() => Math.random() - 0.5);

    // Create image elements
    images.forEach((imgClass, index) => {
        const img = document.createElement('img');
        img.className = imgClass;
        img.src = `https://via.placeholder.com/100?text=${imgClass}`;
        img.dataset.index = index;
        img.addEventListener('click', () => handleImageClick(img));
        imageContainer.appendChild(img);
    });

    function handleImageClick(img) {
        // Check if the same image is clicked again
        if (selectedImages.includes(img)) {
            return;
        }

        selectedImages.push(img);

        if (selectedImages.length === 2) {
            verifyButton.style.display = 'block';
        }

        // Show Reset button
        resetButton.style.display = 'block';

        // Check for double-click on the same image
        if (selectedImages.length > 2) {
            verifyButton.style.display = 'none';
        }
    }

    resetButton.addEventListener('click', () => {
        // Reset the state
        selectedImages = [];
        verifyButton.style.display = 'none';
        para.style.display = 'none';
        resetButton.style.display = 'none';

        // Reset image border or state if necessary
    });

    verifyButton.addEventListener('click', () => {
        if (selectedImages.length === 2) {
            const [firstImg, secondImg] = selectedImages;
            if (firstImg.className === secondImg.className) {
                para.textContent = 'You are a human. Congratulations!';
            } else {
                para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
            }
            para.style.display = 'block';
        }

        verifyButton.style.display = 'none';
    });
});
