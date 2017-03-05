document.addEventListener('click', (e) => {
  if (e.target.id === 'gotoGitHub') {
    browser.tabs.create({
      'url': e.target.innerText
    });
  }
});