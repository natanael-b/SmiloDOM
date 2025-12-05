  
{
    function createTag(name) {
        return function (properties,childrens) {
          let _properties = properties || {};
          if (Array.isArray(properties)){
            _properties = {childrenList : properties}
          }
          if (properties === null) {
            _properties = {childrenList: (typeof childrens === "object" ? childrens : [childrens])};
          }
          const el = document.createElement(name);
          if (typeof(properties) === "string") {
            if (properties.startsWith("#") || properties.startsWith(".")) {
              let selectors = properties.replaceAll(" ","").split(".").filter(s => s.length > 0);
              _properties = {classList: [], childrenList: (typeof childrens === "object" ? childrens : [childrens])};

              for (let selector of selectors) {
                if (selector.startsWith("#")) {
                  _properties.id = selector.slice(1);
                  continue;
                }
                _properties.classList.push(selector)
              }
            }
          }
          if (typeof(_properties) != "object") {
            el.appendChild(document.createTextNode(_properties));
            return el;
          }
          for (const [key, value] of Object.entries(_properties)) {
            if (key === "childrenList") continue;
            if (key === "classList") {
              if (typeof value === "string") {
                el["className"] = value;
                continue;
              }
              el["className"] = value.join(" ");
              continue;
            }
            if (key === "style" && typeof value === "object") {
                Object.assign(el.style, value);
                continue;
            }
            if (key in el) {
                el[key] = value;
                continue;
            }
            el.setAttribute(key, value);
          }

          _properties.childrenList = (_properties.childrenList || (typeof childrens === "object" ? childrens : [childrens]));
          if (_properties.childrenList[0] === undefined) _properties.childrenList.shift();

          _properties.childrenList.flat().forEach(child => {
            if (child instanceof Element) {
                el.appendChild(child);
                return;
            }
            el.appendChild(document.createTextNode(child));
          });
          return el;
        };
    }

    const htmlTags = [
        "a","abbr","address","area","article","aside","audio",
        "b","base","bdi","bdo","blockquote","body","br","button",
        "canvas","caption","cite","code","col","colgroup",
        "data","datalist","dd","del","details","dfn","dialog","div","dl","dt",
        "em","embed",
        "fieldset","figcaption","figure","footer","form",
        "h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html",
        "i","iframe","img","input","ins",
        "kbd",
        "label","legend","li","link",
        "main","map","mark","meta","meter",
        "nav","noscript",
        "object","ol","optgroup","option","output",
        "p","picture","pre","progress",
        "q",
        "rp","rt","ruby",
        "s","samp","script","search","section","select","slot","small","source","span","strong","style","sub","summary","sup",
        "table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track",
        "u","ul",
        "var","video",
        "wbr"
    ];

    htmlTags.forEach(child => globalThis[child] = createTag(child));
    globalThis["createTag"] = createTag;
}
  
  
