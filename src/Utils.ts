let unique = 0;

export const uuid = (prefix: string): string => {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
};

export const validEvents = [
  'Activate',
  'AddUndo',
  'BeforeAddUndo',
  'BeforeExecCommand',
  'BeforeGetContent',
  'BeforeRenderUI',
  'BeforeSetContent',
  'BeforePaste',
  'Blur',
  'Change',
  'ClearUndos',
  'Click',
  'CommentChange', // TODO has not been in angular
  'CompositionEnd',
  'CompositionStart',
  'CompositionUpdate',
  'ContextMenu',
  'Copy',
  'Cut',
  'Dblclick',
  'Deactivate',
  'Dirty',
  'Drag',
  'DragDrop',
  'DragEnd',
  'DragGesture',
  'DragOver',
  'Drop',
  'ExecCommand',
  'Focus',
  'FocusIn',
  'FocusOut',
  'GetContent',
  'Hide',
  'Init',
  'Input',
  'KeyDown',
  'KeyPress',
  'KeyUp',
  'LoadContent',
  'MouseDown',
  'MouseEnter',
  'MouseLeave',
  'MouseMove',
  'MouseOut',
  'MouseOver',
  'MouseUp',
  'NodeChange',
  'ObjectResizeStart',
  'ObjectResized',
  'ObjectSelected',
  'Paste',
  'PostProcess',
  'PostRender',
  'PreProcess',
  'ProgressState',
  'Redo',
  'Remove',
  'Reset',
  'ResizeEditor', // TODO only in svelte and angular, not in Vue – add to changelog at least. also check react.
  'SaveContent',
  'SelectionChange',
  'SetAttrib',
  'SetContent',
  'Show',
  'Submit',
  'Undo',
  'VisualAid'
];

export const isTextarea = (element?: Element | null): element is HTMLTextAreaElement =>
  element?.tagName.toLowerCase() === 'textarea';

export const normalizePluginArray = (plugins?: string | string[]): string[] => {
  if (typeof plugins === 'undefined' || plugins === '') {
    return [];
  }

  return Array.isArray(plugins) ? plugins : plugins.split(/[ ,]/);
};

export const mergePlugins = (initPlugins?: string | string[], inputPlugins?: string | string[]) =>
  normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
