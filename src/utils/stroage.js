export const getItem = key => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data) // 解析失败就会抛出异常
  } catch (error) {
    return data
  }
}

export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const removeItem = key => {
  localStorage.removeItem(key)
}
