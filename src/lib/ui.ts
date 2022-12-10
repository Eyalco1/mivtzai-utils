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
  const tvaiBtn = QABtnsGrp.add('button', undefined, 'Tunnel');
  const scaleBtn = QABtnsGrp.add('button', undefined, 'Pop');
  const logosBtn = QABtnsGrp.add('button', undefined, 'Logos');
  const illustrationBtn = QABtnsGrp.add('button', undefined, 'Illustration');
  const formatLayerBtn = QABtnsGrp.add(
    'button',
    undefined,
    'Format Layer Name'
  );
  const textReverseBtn = QABtnsGrp.add('button', undefined, 'Reverse Text');
  const bgBtn = QABtnsGrp.add('button', undefined, 'BG');
  const IsraelMapShapeBtn = QABtnsGrp.add(
    'button',
    undefined,
    'Israel Map Shape'
  );
  const GazaMapShapeBtn = QABtnsGrp.add('button', undefined, 'Gaza Map Shape');
  const numCountBtn = QABtnsGrp.add('button', undefined, 'Counting Numbers');
  const israelMapPic = QABtnsGrp.add('button', undefined, 'Israel Google Maps');
  // const testBtn = QABtnsGrp.add('button', undefined, '!TEST!');

  // testBtn.onClick = () => {
  //   openFs(
  //     'C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Kyle_Paper_Dark.jpg'
  //   );
  // };

  const iconsTab = tpanel.add('tab', undefined, ['Icons']);

  const IconsBtnsGrp = iconsTab.add('group');
  const boomBtn = IconsBtnsGrp.add('button', undefined, 'Boom!');
  const tunnelBtn = IconsBtnsGrp.add('button', undefined, 'Tunnel');

  const circleCheck = iconsTab.add('checkbox', undefined, 'Circle');
  const circleColorGrp = iconsTab.add('group');
  const circleColorText = circleColorGrp.add(
    'statictext',
    undefined,
    'Circle Color'
  );
  const circleColorDD = circleColorGrp.add('dropdownlist', undefined, [
    'White',
    'Black',
    'Red'
  ]);
  const iconColorGrp = iconsTab.add('group');
  const iconColorText = iconColorGrp.add('statictext', undefined, 'Icon Color');
  const iconColorDD = iconColorGrp.add('dropdownlist', undefined, [
    'Black',
    'White',
    'Red'
  ]);

  circleColorDD.selection = iconColorDD.selection = 0;

  const locationsTab = tpanel.add('tab', undefined, ['Locations']);

  const locBtnsGrp = locationsTab.add('group');
  const kindergardenBtn = locBtnsGrp.add('button', undefined, 'Kindergarden');
  const medicalBtn = locBtnsGrp.add('button', undefined, 'Medical Clinic');

  const texturesTab = tpanel.add('tab', undefined, ['Textures']);

  const texBtnsGrp = texturesTab.add('group');
  const paperBtn = texBtnsGrp.add('button', undefined, 'Paper');

  // Quick Actions
  tvaiBtn.onClick = createTvaiStroke;
  scaleBtn.onClick = scaleWithOvershoot;
  logosBtn.onClick = importLogos;
  illustrationBtn.onClick = createIllustrationText;
  formatLayerBtn.onClick = formatLayerName;
  textReverseBtn.onClick = textReverse;
  bgBtn.onClick = createBg;
  IsraelMapShapeBtn.onClick = createIsraelMap;
  GazaMapShapeBtn.onClick = createGazaMap;
  numCountBtn.onClick = createCountingText;
  israelMapPic.onClick = importIsraelGoogleMaps;
  // Icons
  boomBtn.onClick = () => {
    createExplosionIcon(
      circleColorDD.selection.toString() as ColorDropdown,
      iconColorDD.selection.toString() as ColorDropdown,
      circleCheck.value
    );
  };
  tunnelBtn.onClick = () => {
    createTunnelIcon(
      circleColorDD.selection.toString() as ColorDropdown,
      iconColorDD.selection.toString() as ColorDropdown,
      circleCheck.value
    );
  };

  // Locations
  kindergardenBtn.onClick = () => {
    const lang = getLanguageFromKeyboard();
    createKindergardenLocation(lang);
  };

  medicalBtn.onClick = () => {
    const lang = getLanguageFromKeyboard();
    createMedicalLocation(lang);
  };

  // Textures
  paperBtn.onClick = () => {
    importAndLoopTexture(
      `${File(
        '.'
      )}/Scripts/ScriptUI Panels/MivtzaiUtils Assets/Textures/Kyle_Paper_Dark.jpg`
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
