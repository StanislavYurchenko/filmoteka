import { alert, notice, info, success, error, defaultModules, defaults, } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/Material.css';

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 1500;
defaults.width = '300px';

defaultModules.set(PNotifyMobile, {});

export { alert, notice, info, success, error };