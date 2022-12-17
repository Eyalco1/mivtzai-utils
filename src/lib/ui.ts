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

  const tvaiBtn = QABtnsRowOne.add('iconbutton', undefined, tvaiBinary, {
    style: 'toolbutton'
  });
  tvaiBtn.helpTip = 'Tunnel Illustration';

  const scaleBtn = QABtnsRowOne.add('iconbutton', undefined, popBinary, {
    style: 'toolbutton'
  });
  scaleBtn.helpTip = 'Pop Animation';

  const logosBtn = QABtnsRowOne.add('iconbutton', undefined, logosBinary, {
    style: 'toolbutton'
  });
  logosBtn.helpTip = 'Import IDF and Dotz Logos';

  const illustrationBtn = QABtnsRowOne.add(
    'iconbutton',
    undefined,
    illustrationBinary,
    { style: 'toolbutton' }
  );
  illustrationBtn.helpTip = 'Illustration Text';

  const QABtnsRowTwo = QABtnsGrp.add('group');
  const formatLayerBtn = QABtnsRowTwo.add(
    'iconbutton',
    undefined,
    formatBinary,
    { style: 'toolbutton' }
  );
  formatLayerBtn.helpTip = 'Format Layer Name';

  const textReverseBtn = QABtnsRowTwo.add(
    'iconbutton',
    undefined,
    textReverseBinary,
    { style: 'toolbutton' }
  );
  textReverseBtn.helpTip = 'Reverse Text';

  const bgBtn = QABtnsRowTwo.add('iconbutton', undefined, bgBinary, {
    style: 'toolbutton'
  });
  bgBtn.helpTip = 'Create Background';

  const IsraelMapShapeBtn = QABtnsRowTwo.add(
    'iconbutton',
    undefined,
    israelShapeBinary,
    { style: 'toolbutton' }
  );
  IsraelMapShapeBtn.helpTip = 'Israel Map Shape';

  const QABtnsRowThree = QABtnsGrp.add('group');
  const GazaMapShapeBtn = QABtnsRowThree.add(
    'iconbutton',
    undefined,
    gazaShapeBinary,
    { style: 'toolbutton' }
  );
  GazaMapShapeBtn.helpTip = 'Gaza Map Shape';

  const numCountBtn = QABtnsRowThree.add(
    'iconbutton',
    undefined,
    countingNumbersBinary,
    { style: 'toolbutton' }
  );
  numCountBtn.helpTip = 'Counting Numbers';

  const frameBtn = QABtnsRowThree.add('iconbutton', undefined, frameBinary, {
    style: 'toolbutton'
  });
  frameBtn.helpTip = 'Animated Frame';

  const israelMapPic = QABtnsRowThree.add(
    'iconbutton',
    undefined,
    ILMapPhotoBinary,
    { style: 'toolbutton' }
  );
  israelMapPic.helpTip =
    'Israel Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels';

  const gazaMapPic = QABtnsRowThree.add(
    'iconbutton',
    undefined,
    GAMapPhotoBinary,
    { style: 'toolbutton' }
  );
  gazaMapPic.helpTip =
    'Gaza Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels';

  const openFinderBtn = QABtnsRowThree.add(
    'iconbutton',
    undefined,
    folderBinary,
    { style: 'toolbutton' }
  );
  openFinderBtn.helpTip = `Open Project Folder in ${
    getOS() === 'Win' ? 'Explorer' : 'Finder'
  }`;

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

  const iconDDGrp = iconsGrp.add('group');
  iconDDGrp.add('statictext', undefined, 'Icon:');
  const iconsList: IconID[] = ['Boom', 'Tunnel'];
  const iconDD = iconDDGrp.add('dropdownlist', undefined, iconsList);
  iconDD.preferredSize[0] = 100;
  iconDD.selection = 0;

  const IconsBtnsGrp = iconsGrp.add('group');
  IconsBtnsGrp.alignChildren = 'left';

  // const boomBtn = IconsBtnsGrp.add('button', undefined, 'Boom!');
  // const tunnelBtn = IconsBtnsGrp.add('button', undefined, 'Tunnel');

  const circleCheck = iconsGrp.add('checkbox', undefined, 'Circle');
  const circleColorGrp = iconsGrp.add('group');
  circleColorGrp.add('statictext', undefined, 'Circle Color:');
  const circleColorDD = circleColorGrp.add('dropdownlist', undefined, [
    'White',
    'Black',
    'Red'
  ]);
  const iconColorGrp = iconsGrp.add('group');
  iconColorGrp.add('statictext', undefined, 'Icon Color:');
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

  const locationsGrp = locationsTab.add('group');
  locationsGrp.orientation = 'column';
  locationsGrp.alignChildren = 'left';

  const locationsDDGrp = locationsGrp.add('group');
  locationsDDGrp.add('statictext', undefined, 'Location:');
  const locationsList: LocationID[] = [
    'Kindergarden',
    'Medical Clinic',
    'Sports',
    'University'
  ];
  const locationsDD = locationsDDGrp.add(
    'dropdownlist',
    undefined,
    locationsList
  );
  locationsDD.preferredSize[0] = 100;
  locationsDD.selection = 0;

  const langDDGrp = locationsGrp.add('group');
  langDDGrp.add('statictext', undefined, 'Language:');
  const langDD = langDDGrp.add('dropdownlist', undefined, [
    'Hebrew',
    'English',
    'Arabic'
  ]);
  langDD.preferredSize[0] = 100;
  langDD.selection = 0;

  const locationsCreateBtn = locationsGrp.add(
    'button',
    undefined,
    'Create Location'
  );
  locationsCreateBtn.preferredSize[0] = 100;

  locationsCreateBtn.onClick = () => {
    const id = locationsDD.selection.toString() as LocationID;
    const lang = langDD.selection.toString() as Lingo;
    createLocationFromId(id, lang);
  };

  // const kindergardenBtn = locationsGrp.add('button', undefined, 'Kindergarden');
  // const medicalBtn = locationsGrp.add('button', undefined, 'Medical Clinic');

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
  frameBtn.onClick = createAnimatedFrame;
  openFinderBtn.onClick = openProjectInFinder;
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
  // kindergardenBtn.onClick = () => {
  //   const lang = getLanguageFromKeyboard();
  //   createKindergardenLocation(lang);
  // };

  // medicalBtn.onClick = () => {
  //   const lang = getLanguageFromKeyboard();
  //   createMedicalLocation(lang);
  // };

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
