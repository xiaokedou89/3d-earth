const themeConfig = [
  {
    key: 'theme-red',
    color: '#cf1322',
    theme: 'linear-gradient(135.68deg, #f5222d 1.15%, #a8071a 100%)'
  },
  {
    key: 'theme-blue',
    color: '#0062d9',
    theme: 'linear-gradient(135.68deg, #0079fe 1.15%, #004ab3 100%)'
  }
];
let localThemeKey = localStorage.getItem('theme');

if (!localThemeKey) {
  localThemeKey = 'theme-red';
  localStorage.setItem('theme', localThemeKey);
}
const head = document.head;

head.innerHTML += `<link rel="stylesheet" href="/assets/theme/${localThemeKey}.css">`;
head.innerHTML += `<link rel="stylesheet" href="/assets/element-ui/${localThemeKey}/element-theme.css">`;
head.innerHTML += '<link rel="stylesheet" href="/assets/element-ui/custom.css">';


