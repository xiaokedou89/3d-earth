function generateCaptcha() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 160;
  canvas.height = 40;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const captchaText = generateCaptchaText();
  for (let i = 0; i < captchaText.length; i++) {
    const textColor = getRandomColor();
    ctx.font = '24px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(captchaText[i], (canvas.width / (captchaText.length + 1)) * (i + 1), canvas.height / 2);
  }

  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
    ctx.stroke();
  }

  return {
    src: canvas.toDataURL('image/png'),
    value: captchaText
  };
}

function generateCaptchaText() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const captchaLength = 4;
  let captcha = '';

  for (let i = 0; i < captchaLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    captcha += chars[randomIndex];
  }

  return captcha;
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
