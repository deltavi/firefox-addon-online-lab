var menuContainer = document.querySelector('#menu');
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('buttonTitle')) {
    if (e.target.parentElement.classList.contains('buttonClosed')) {
      e.target.parentElement.classList.remove('buttonClosed');
    } else {
      e.target.parentElement.classList.add('buttonClosed');
    }
  }
  else if (e.target.getAttribute('url')) {
    browser.tabs.create({
      'url': e.target.getAttribute('url')
    });
    window.close();
    return;
  } else if (e.target.id === 'gotoGitHub') {
    
    browser.tabs.create({
      'url': 'https://github.com/deltavi/bookmarks/blob/master/online-lab.md'
    });
    window.close();
    return;
  }
});

function onError(error) {
  console.error(error);
}

initialize();
function initialize() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://raw.githubusercontent.com/deltavi/bookmarks/master/online-lab.md', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var resText = xhr.responseText;
        menuContainer.innerHTML = '';
        //menuContainer.innerText = xhr.responseText;
        var currentBox;
        var lines = resText.split('\n');
        for (line of lines) {
          var textLine = line.trim();
          if (textLine.indexOf('##') == 0) {
            textLine = textLine.substr(2).trim();
            currentBox = addButtonsBox(textLine);
          } else if (textLine.indexOf('*') == 0) {
            textLine = textLine.substr(1).trim();
            addButton(currentBox, textLine);
          }
        }
      } else {
        menuContainer.innerHTML = '<b>Error loading page:</b> Status code ' + xhr.status;
      }
    }
  }
  xhr.send();
}

function addDiv(item, text, cls) {
  var itemSub = document.createElement('div');
  itemSub.innerText = text;
  itemSub.setAttribute('class', cls);
  item.appendChild(itemSub);
  return itemSub;
}
function addButtonsBox(title) {
  var box = document.createElement('div');
  box.setAttribute('class', 'buttonClosed');
  addButtonTitle(box, title);
  menuContainer.appendChild(box);
  return box;
}
function addButton(item, text, url) {
  var data = extractData(text);
  var div = addDiv(item, data.title , 'button');
  var link = document.createElement('div');
  link.innerText = data.text;
  link.setAttribute('class', 'buttonLink');
  link.setAttribute('url', data.url);
  div.appendChild(link);
  div.setAttribute('url', data.url);
}
function addButtonTitle(item, text) {
  addDiv(item, text, 'buttonTitle');
}

function extractData(text) {
  var values = /(.*)\[(.*)\].*\((.*)\)/.exec(text)
  return {
    title: values[1],
    text: values[2],
    url: values[3]
  };
}