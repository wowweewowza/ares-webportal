function changeLayer(layerId, imagePath) {
    const layer = document.getElementById(layerId);
    if (imagePath === "") {
        layer.src = ""; // Empty so it hides the png
        layer.style.display = "none";
    } else {
        layer.src = imagePath; // Updates to selected png
        layer.style.display = "block";
    }
}

async function downloadSymbol() {
    const imageSources = ['base', 'type', 'containability', 'ease_of_use', 'danger_level']
        .map((layerId) => document.getElementById(layerId).getAttribute('src'))
        .filter(Boolean);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // let's debug some shit
    if (!ctx) {
        console.error("Unable to create a canvas context.");
        return;
    }

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    try {
        const images = await Promise.all(imageSources.map(loadImage));

        canvas.width = images[0].naturalWidth;
        canvas.height = images[0].naturalHeight;

        images.forEach((img) => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        });

        const blob = await new Promise((resolve, reject) => {
            canvas.toBlob((result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(new Error("Unable to generate PNG image."));
                }
            }, 'image/png');
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'custom-combination.png';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 0); // no more waiting
    } catch (error) {
        console.error("Error generating dynamic image:", error);
    }
}