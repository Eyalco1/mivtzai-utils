const init = (thisObj: typeof globalThis) => {
  let w =
    thisObj instanceof Panel
      ? thisObj
      : new Window('palette', 'Mivtzai Utils', undefined, { resizeable: true });
  if (w == null) w;
  w = w as Window;

  const tpanel = w.add('tabbedpanel');

  const quickActionsTab = tpanel.add('tab', undefined, ['Quick Actions']);

  const QABtnsGrp = quickActionsTab.add('group');
  const tvaiBtn = QABtnsGrp.add('button', undefined, 'T');
  const scaleBtn = QABtnsGrp.add('button', undefined, 'S');
  const logosBtn = QABtnsGrp.add('button', undefined, 'L');
  const illustrationBtn = QABtnsGrp.add('button', undefined, 'I');
  const formatLayerBtn = QABtnsGrp.add('button', undefined, 'F');
  const textReverseBtn = QABtnsGrp.add('button', undefined, 'R');
  const bgBtn = QABtnsGrp.add('button', undefined, 'BG');
  const IsraelMapBtn = QABtnsGrp.add('button', undefined, 'IL');
  const GazaMapBtn = QABtnsGrp.add('button', undefined, 'GA');
  const numCountBtn = QABtnsGrp.add('button', undefined, 'N');
  const testBtn = QABtnsGrp.add('button', undefined, '!TEST!');

  testBtn.onClick = () => {
    openFs(
      'C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Kyle_Paper_Dark.jpg'
    );
  };

  const iconsTab = tpanel.add('tab', undefined, ['Icons']);
  const locationsTab = tpanel.add('tab', undefined, ['Locations']);
  const texturesTab = tpanel.add('tab', undefined, ['Textures']);

  const TexBtnsGrp = texturesTab.add('group');
  const kylePaperBtn = TexBtnsGrp.add('button', undefined, 'Kyle');

  // Quick Actions
  tvaiBtn.onClick = createTvaiStroke;
  scaleBtn.onClick = scaleWithOvershoot;
  logosBtn.onClick = importLogos;
  illustrationBtn.onClick = createIllustrationText;
  formatLayerBtn.onClick = formatLayerName;
  textReverseBtn.onClick = textReverse;
  bgBtn.onClick = createBg;
  IsraelMapBtn.onClick = createIsraelMap;
  GazaMapBtn.onClick = createGazaMap;
  numCountBtn.onClick = createCountingText;
  // Textures
  kylePaperBtn.onClick = () => {
    importAndLoopTexture(
      'C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Kyle_Paper_Dark.jpg'
    );
  };

  w.layout.layout(true);
  w.layout.resize();
  w.onResizing = w.onResize = () => {
    w = w as Window;
    w.onResize = () => {
      w.layout.resize();
    };
  };
  if (w != null && w instanceof Window) {
    w.center();
    w.show();
  }
};
