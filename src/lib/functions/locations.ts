const createKindergardenLocation = (lang: Lingo): void => {
  const comp = app.project.activeItem as CompItem;
  const textLayer = comp.layers.addText();
  const srcText = textLayer
    .property('ADBE Text Properties')
    .property('ADBE Text Document') as Property<any>;

  let text: string;
  if (lang === 'Hebrew') {
    text = 'גן ילדים';
  } else if (lang === 'English') {
    text = 'Kindergarden';
  } else if (lang === 'Arabic') {
    text = 'روضة أطفال';
  }

  srcText.setValue(text);
  const textDoc = srcText.value;
  textDoc.font = getFontFromLanguage(lang);
  textDoc.fontSize = 100;
  textDoc.applyFill = true;
  textDoc.fillColor = [1, 1, 1];
  textDoc.applyStroke = false;
  textDoc.tracking = 0;
  srcText.setValue(textDoc);
};