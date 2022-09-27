import Vue from 'vue'

import * as user from './user.js' /* 这个就可以将所有导出的内容一次性拿到 */
import * as HomePage from './HomePage.js' /* 这个就可以将所有导出的内容一次性拿到 */
import * as search from './search.js' /* 这个就可以将所有导出的内容一次性拿到 */
import * as aritcle from './aritcle' /* 这个就可以将所有导出的内容一次性拿到 */
import * as comment from './comment' /* 这个就可以将所有导出的内容一次性拿到 */

Vue.prototype.apis = {
  user, HomePage, search, aritcle, comment
}
