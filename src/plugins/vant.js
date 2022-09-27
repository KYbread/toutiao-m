import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 因为生产环境直接用CDN导入vant，所以现在开发直接就全部导入了，
// 反正最后用CDN也是全部导入，不能减少体积，而且CDN带缓存、自动寻找附近服务器，也不慢