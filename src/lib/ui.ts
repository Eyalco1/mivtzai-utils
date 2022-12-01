const init = (thisObj: typeof globalThis) => {
  let w =
    thisObj instanceof Panel
      ? thisObj
      : new Window('palette', 'Mivtzai Utils', undefined, { resizeable: true });
  if (w == null) w;
  w = w as Window;

  const btnsGrp = w.add('group');
  const tvaiBtn = btnsGrp.add('button', undefined, 'T');
  const scaleBtn = btnsGrp.add('button', undefined, 'S');

  tvaiBtn.onClick = createTvaiStroke;
  scaleBtn.onClick = scaleWithOvershoot;

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
