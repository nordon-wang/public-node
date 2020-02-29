"use strict";

/** 
 * crypto 加密 
*/
const crypto = require('crypto');
/** 
 * 摘要算法 MD5 不可逆
 *  特点
 *    1）不可逆 
 *    2）但是相同内容摘要的结果相同， 有一点不同出来的结果完全不同
 *    3）摘要的结果长度相同
*/


const r = crypto.createHash('md5').update('123').update('456').digest('base64');
const r1 = crypto.createHash('md5').update('123456').digest('base64'); // console.log('r', r);
// console.log('r', r1);

/** 
 * sha1 sha256 加盐算法
*/

const s = crypto.createHmac('sha1', 'key').update('123456').digest('base64');
console.log('', s);