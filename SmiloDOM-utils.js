
globalThis["card"] = (properties,content,text) => {
  let _properties = properties;
  let _content = content;
  let _text = text;

  if (properties instanceof Element) {
    _properties = {};
    _content = properties;
    _text = content;
  }

  let childStyle = {
    padding: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }

  let baseStyle = {
    padding: "0px",
    boxSizing: "border-box",
    display: "flex",
    flex: "1 1",
    flexDirection: "column",
    cursor: "pointer",
  };

  let card = { ..._properties, ...{
    style: { ...(_properties.style || {}),...baseStyle},
    childrenList: [
      div({
        style: childStyle,
        childrenList: [
          _content instanceof Element ? _content : createTag("div")({childrenList: [_content]})
        ]
      }),
      div({
        style: childStyle,
        childrenList: [
          _text instanceof Element ? _text : createTag("span")({childrenList: [_text]})
        ]
      })
    ]
  } }

  let el = div(card)
  el.classList.add("card");
  return el;
}

globalThis["wrap"] = (properties) => {
  let _properties = properties || {};

  let baseStyle = {
    padding: "0px",
    display: "flex",
    flexWrap: "wrap",
  };

  return div({ ..._properties, ...{
    style: { ...(_properties.style || {}),...baseStyle},
  } });
}
