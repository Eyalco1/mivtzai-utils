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
  QABtnsGrp.orientation = 'column';
  QABtnsGrp.alignChildren = 'left';

  const QABtnsRowOne = QABtnsGrp.add('group');
  const tvaiBtn = QABtnsRowOne.add('button', undefined, 'Tunnel');
  const scaleBtn = QABtnsRowOne.add('button', undefined, 'Pop');
  const logosBtn = QABtnsRowOne.add('button', undefined, 'Logos');
  const illustrationBtn = QABtnsRowOne.add('button', undefined, 'Illustration');

  const QABtnsRowTwo = QABtnsGrp.add('group');
  const formatLayerBtn = QABtnsRowTwo.add(
    'button',
    undefined,
    'Format Layer Name'
  );
  const textReverseBtn = QABtnsRowTwo.add('button', undefined, 'Reverse Text');
  const bgBtn = QABtnsRowTwo.add('button', undefined, 'BG');
  const IsraelMapShapeBtn = QABtnsRowTwo.add(
    'button',
    undefined,
    'Israel Map Shape'
  );

  const QABtnsRowThree = QABtnsGrp.add('group');
  const GazaMapShapeBtn = QABtnsRowThree.add(
    'button',
    undefined,
    'Gaza Map Shape'
  );
  const numCountBtn = QABtnsRowThree.add(
    'button',
    undefined,
    'Counting Numbers'
  );
  const israelMapPic = QABtnsRowThree.add(
    'button',
    undefined,
    'Israel Google Maps'
  );
  // const testBtn = QABtnsGrp.add('button', undefined, '!TEST!');

  // testBtn.onClick = () => {
  //   openFs(
  //     'C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Kyle_Paper_Dark.jpg'
  //   );
  // };

  const iconsTab = tpanel.add('tab', undefined, ['Icons']);

  const iconsGrp = iconsTab.add('group');
  iconsGrp.orientation = 'column';
  iconsGrp.alignChildren = 'left';

  const iconDD = iconsGrp.add('dropdownlist', undefined, ['Boom', 'Tunnel']);
  iconDD.preferredSize[0] = 100;
  iconDD.selection = 0;

  const IconsBtnsGrp = iconsGrp.add('group');
  IconsBtnsGrp.alignChildren = 'left';

  // const boomBtn = IconsBtnsGrp.add('button', undefined, 'Boom!');
  // const tunnelBtn = IconsBtnsGrp.add('button', undefined, 'Tunnel');

  const circleCheck = iconsGrp.add('checkbox', undefined, 'Circle');
  const circleColorGrp = iconsGrp.add('group');
  const circleColorText = circleColorGrp.add(
    'statictext',
    undefined,
    'Circle Color:'
  );
  const circleColorDD = circleColorGrp.add('dropdownlist', undefined, [
    'White',
    'Black',
    'Red'
  ]);
  const iconColorGrp = iconsGrp.add('group');
  const iconColorText = iconColorGrp.add(
    'statictext',
    undefined,
    'Icon Color:'
  );
  const iconColorDD = iconColorGrp.add('dropdownlist', undefined, [
    'Black',
    'White',
    'Red'
  ]);

  circleColorDD.selection = iconColorDD.selection = 0;

  const iconCreateBtn = iconsGrp.add('button', undefined, 'Create Icon');
  iconCreateBtn.preferredSize[0] = 100;

  iconCreateBtn.onClick = () => {
    const id = iconDD.selection.toString() as IconID;
    createIconFromId(
      id,
      circleColorDD.selection.toString() as ColorDropdown,
      iconColorDD.selection.toString() as ColorDropdown,
      circleCheck.value
    );
  };

  const locationsTab = tpanel.add('tab', undefined, ['Locations']);

  const locBtnsGrp = locationsTab.add('group');
  locBtnsGrp.alignChildren = 'left';

  const kindergardenBtn = locBtnsGrp.add('button', undefined, 'Kindergarden');
  const medicalBtn = locBtnsGrp.add('button', undefined, 'Medical Clinic');

  const texturesTab = tpanel.add('tab', undefined, ['Textures']);

  const texBtnsGrp = texturesTab.add('group');
  texBtnsGrp.alignChildren = 'left';

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
  // boomBtn.onClick = () => {
  //   createExplosionIcon(
  //     circleColorDD.selection.toString() as ColorDropdown,
  //     iconColorDD.selection.toString() as ColorDropdown,
  //     circleCheck.value
  //   );
  // };
  // tunnelBtn.onClick = () => {
  //   createTunnelIcon(
  //     circleColorDD.selection.toString() as ColorDropdown,
  //     iconColorDD.selection.toString() as ColorDropdown,
  //     circleCheck.value
  //   );
  // };

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
