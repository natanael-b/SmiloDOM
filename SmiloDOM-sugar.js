
// Açúcares sintaticos
  
globalThis["hyperlink"] = (text,target) => {
  let childrenList = (Array.isArray(text) ? text : [text]);
  return a({
    href: target,
    childrenList: childrenList
  })
}

// Table
{
  globalThis["row"] = (list,tag) => {
    let childrenList = [];
    let cell = tag === "th" ? th : td;
    for (let item of list) {
      if (typeof item === "number") {
        childrenList.push(cell({
          style: {
            textAlign: 'right'
          },
          childrenList: [item]
        }));
        continue;
      }
      childrenList.push(cell([item]));
    }
    return tr({
      childrenList: childrenList
    })
  }
  
  globalThis["table"] = (data,alt) => {
    if (typeof(data) === "string") {
      if (data.startsWith("#") || data.startsWith(".")) {
        return createTag("table")(data,alt);
      }
    }
    if (!Array.isArray(data)) return createTag("table")(data,alt);
    let childrenList = [];
    let headerList = [];
    let [header, ...list] = data;;
  
    for (let item of list) {
      if (item instanceof Element) {
        childrenList.push(item);
        continue;
      }
      childrenList.push(row(item));
    }
  
    headerList.push(row(header,"th"))
  
    return createTag("table")({
      childrenList: [
        thead({childrenList: headerList}),
        tbody({childrenList: childrenList})
      ]
    });
  }
}

globalThis["field"] = (text, data,options) => {
  if (data.type === "checkbox") return label({
    childrenList: [
      input(data),
      text
    ]
  });

  if (data.type === "select") {
    let _options = [];
    for (let [k,v] of Object.entries(options)) {
      _options.push(option({
        value: v,
        text: k
      }));
    }
    return label({
      childrenList: [
        text instanceof Element ? text : span(text),
        select(data,_options)
      ]
    });
  };

  return label({
    childrenList: [
      text instanceof Element ? text : span(text),
      input(data)
    ]
  });
};

globalThis["button"] = (text, onclick) => {
  if (typeof(text) === "string") {
    if (text.startsWith("#") || text.startsWith(".")) {
      return createTag("button")(text, onclick);
    }
  }

  if (!(typeof onclick === "function")) {
    return createTag("button")(text, onclick);
  }

  return createTag("button")({
    onclick: () => onclick(),
    childrenList: [
      text instanceof Element ? text : span(text),
    ]
  });
};

globalThis["reset"] = (text,onclick) => {
  let btn = button(text,onclick);
  btn.type = "reset";
  return btn;
}

globalThis["submit"] = (text,onclick) => {
  let btn = button(text,onclick);
  btn.type = "submit";
  return btn;
}

globalThis["details"] = (text, children) => {
  if (typeof(text) === "string") {
    if (text.startsWith("#") || text.startsWith(".")) {
      return createTag("details")(text, children);
    }
  }

  return createTag("details")({
    childrenList: [
      summary({childrenList: [text]}),
      ...(Array.isArray(children) ? children : children ? [p(children)] : "")]
  });
};

globalThis["img"] = (src, alt) => {
  if (typeof(src) === "string") {
    if (src.startsWith("#") || src.startsWith(".")) {
      return createTag("img")(src, alt);
    }
  }
  if (typeof src === "object") return createTag("img")(src, alt);
  return createTag("img")({
    src: src,
    alt: alt || ""
  });
};

globalThis["figure"] = (img, text) => {
  if (typeof(img) === "string") {
    if (img.startsWith("#") || img.startsWith(".")) {
      return createTag("figure")(img, text);
    }
  }

  return createTag("figure")({
    childrenList: [
      img instanceof Element ? img : createTag("img")({src: img}),
      text instanceof Element ? text : figcaption([text])
    ]
  });
};
