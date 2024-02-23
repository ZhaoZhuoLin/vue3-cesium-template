export const requestCode = (code) => {
  let errMessage = "未知错误";
  switch (code) {
    case 400:
      errMessage = "请求失败！请您稍后重试";
      break;
    case 405:
      errMessage = "请求方式错误！请您稍后重试";
      break;
    case 408:
      errMessage = "请求超时！请您稍后重试";
      break;
    case 500:
      errMessage = "服务器端出错";
      break;
    case 501:
      errMessage = "网络未实现";
      break;
    case 502:
      errMessage = "网络错误";
      break;
    case 503:
      errMessage = "服务不可用";
      break;
    case 504:
      errMessage = "网络超时";
      break;
    default:
      errMessage = `其他连接错误 --${code}`;
  }
  return errMessage;
};
