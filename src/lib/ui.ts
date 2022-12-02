const init = (thisObj: typeof globalThis) => {
  let w =
    thisObj instanceof Panel
      ? thisObj
      : new Window('palette', 'Mivtzai Utils', undefined, { resizeable: true });
  if (w == null) w;
  w = w as Window;

  const tpanel = w.add('tabbedpanel');

  const quickActionsTab = tpanel.add('tab', undefined, ['Quick Actions']);

  const btnsGrp = quickActionsTab.add('group');
  const tvaiBtn = btnsGrp.add('button', undefined, 'T');
  const scaleBtn = btnsGrp.add('button', undefined, 'S');
  const logosBtn = btnsGrp.add('button', undefined, 'L');
  const illustrationBtn = btnsGrp.add('button', undefined, 'I');
  const formatLayerBtn = btnsGrp.add('button', undefined, 'F');
  const textReverseBtn = btnsGrp.add('button', undefined, 'R');
  const bgBtn = btnsGrp.add('button', undefined, 'BG');
  const IsraelMapBtn = btnsGrp.add('button', undefined, 'IL');
  const GazaMapBtn = btnsGrp.add('button', undefined, 'GA');
  const numCountBtn = btnsGrp.add('button', undefined, 'N');

  const iconsTab = tpanel.add('tab', undefined, ['Icons']);
  const texturesTab = tpanel.add('tab', undefined, ['Textures']);

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
