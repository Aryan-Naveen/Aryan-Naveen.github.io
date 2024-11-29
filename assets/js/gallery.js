function updateMain(url, caption, type) {
    const mainMedia = document.getElementById('main-media');
    const mainCaption = document.getElementById('main-caption');
  
    if (type === 'image') {
      mainMedia.outerHTML = `<img id="main-media" src="${url}" alt="Main Display">`;
    } else if (type === 'video') {
      mainMedia.outerHTML = `
        <video id="main-media" controls autoplay>
          <source src="${url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
    }
    mainCaption.textContent = caption;
  }
  