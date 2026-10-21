(() => {
  const languageButton = document.querySelector('.language-toggle');
  if (!languageButton) return;

  const storageKey = 'jinming-portfolio-language';
  const originalAttributes = new WeakMap();
  const englishTitle = document.title;
  let translations = {};
  let currentLanguage = 'en';

  const getTextNodes = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest('script,style,noscript,.language-toggle,[aria-hidden="true"]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  };

  function applyLanguage(language) {
    currentLanguage = language;
    const chinese = language === 'zh';
    document.documentElement.lang = chinese ? 'zh-CN' : 'en';
    document.title = chinese ? (translations[englishTitle] || englishTitle) : englishTitle;

    for (const node of getTextNodes()) {
      if (!node.__jinmingEnglish) node.__jinmingEnglish = node.nodeValue;
      const english = node.__jinmingEnglish;
      const trimmed = english.trim();
      const leading = english.slice(0, english.indexOf(trimmed));
      const trailing = english.slice(english.indexOf(trimmed) + trimmed.length);
      node.nodeValue = chinese && translations[trimmed]
        ? leading + translations[trimmed] + trailing
        : english;
    }

    document.querySelectorAll('[alt],[title],[aria-label],[placeholder]').forEach((element) => {
      for (const attribute of ['alt', 'title', 'aria-label', 'placeholder']) {
        if (!element.hasAttribute(attribute)) continue;
        if (!originalAttributes.has(element)) originalAttributes.set(element, {});
        const originals = originalAttributes.get(element);
        if (originals[attribute] === undefined) originals[attribute] = element.getAttribute(attribute);
        const english = originals[attribute];
        element.setAttribute(attribute, chinese ? (translations[english] || english) : english);
      }
    });

    languageButton.textContent = chinese ? 'English' : '中文';
    languageButton.setAttribute('aria-label', chinese ? 'Switch language to English' : '切换为中文');
    languageButton.setAttribute('aria-pressed', String(chinese));
    try { localStorage.setItem(storageKey, language); } catch (_) { /* Storage may be disabled. */ }
  }

  languageButton.addEventListener('click', () => applyLanguage(currentLanguage === 'en' ? 'zh' : 'en'));

  const translationUrl = new URL('translations.zh.json', document.currentScript.src);
  fetch(translationUrl)
    .then((response) => {
      if (!response.ok) throw new Error('Translation file could not be loaded');
      return response.json();
    })
    .then((dictionary) => {
      translations = dictionary;
      let preferred = 'en';
      try { preferred = localStorage.getItem(storageKey) || 'en'; } catch (_) { /* Use English by default. */ }
      applyLanguage(preferred === 'zh' ? 'zh' : 'en');
      languageButton.disabled = false;
    })
    .catch(() => {
      translations = { Projects: '项目', Collaborations: '合作项目', 'Role: Designer': '角色：设计师', 'Role: Assistant': '角色：助理', 'Role: Collaborative Designer': '角色：合作设计师' };
      languageButton.disabled = false;
      languageButton.title = 'Some translations may be unavailable';
    });
})();
