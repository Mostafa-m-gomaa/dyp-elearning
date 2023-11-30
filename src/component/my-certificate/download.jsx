import React from 'react';

function DownloadImageButton({ imageUrl, filename }) {
  const handleDownload = () => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/jpeg');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  return (
    <button onClick={handleDownload}>
      Download image
    </button>
  );
}

export default DownloadImageButton;