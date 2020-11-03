const isWindows = () => navigator.platform.indexOf('Win') > -1

if (isWindows) {
  document.body.classList.add('isWindows')
}
