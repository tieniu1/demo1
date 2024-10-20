/**
 * 本地存储的二次封装
 */

/**
 * 设置本地存储项
 * @param {string} key - 存储的键名
 * @param {any} value - 要存储的值
 */
export const setItem = (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error('设置本地存储时出错:', error);
  }
};

/**
 * 获取本地存储项
 * @param {string} key - 要获取的存储项的键名
 * @returns {any} 解析后的存储值，如果不存在或解析失败则返回null
 */
export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('获取本地存储时出错:', error);
    return null;
  }
};

/**
 * 移除本地存储项
 * @param {string} key - 要移除的存储项的键名
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('移除本地存储项时出错:', error);
  }
};

/**
 * 清空所有本地存储
 */
export const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('清空本地存储时出错:', error);
  }
};

