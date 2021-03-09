/**
 * Loads the image from the file input and creates
 */
function loadFile() {
    if(typeof window.FileReader !== 'function') {
        alert('File reader not supported');
        return;
    }

    const $file = document.getElementById('file');
    if(!$file || !$file.files || !$file.files.length) {
        alert('No file to load');
        return;
    }

    const fr = new FileReader();
    const img = new Image();
    const $canvas = document.createElement('canvas');

    fr.onload = () => {
        img.src = fr.result;
    };

    img.onload = () => {
        $canvas.width = img.width;
        $canvas.height = img.height;
        
        let ctx = $canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        buildCSS(ctx.getImageData(0, 0, $canvas.width, $canvas.height));
    };

    fr.readAsDataURL($file.files[0]);
}

/**
 * Builds CSS rules for the given image
 * @param {ImageData} img - the image data to convert
 */
function buildCSS(img) {
    let data = img.data;
    let shadow = [];
    if(data.length % 4 !== 0) {
        alert('Invalid image data');
        return;
    }
    
    for(let i = 0; i < data.length; i += 4) {
        let r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];

        let pixelIndex = i / 4;
        let row = Math.floor(pixelIndex / img.width);
        let col = pixelIndex % img.width;

        shadow.push(`${col}px ${row}px 1px 1px rgba(${r}, ${g}, ${b}, ${a})`);
    }

    const $img = document.getElementById('img');
    $img.style.boxShadow = shadow.join(', ');
    $img.style.marginLeft = `-${img.width}px`;
    $img.style.marginTop = `-${img.height}px`;
}

