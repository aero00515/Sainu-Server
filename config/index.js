import * as devConfig from './dev.conf.json';
import * as prodConfig from './prod.conf.json';

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
