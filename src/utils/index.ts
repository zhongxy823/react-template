export const jsonParse = (value: string): any => {
    return JSON.parse(value, (k: any, v: any) => {
      try {
        // 将正则字符串转成正则对象
        if (eval(decodeURIComponent(v)) instanceof RegExp) {
          return eval(decodeURIComponent(v));
        }
        return v;
      } catch (e) {
        return v;
        // nothing
      }
    });
  };
  
  export const jsonStringify = (value: object, type = 2): any => {
    return JSON.stringify(
      value,
      (k: any, v: any) => {
        if (v instanceof RegExp) {
          return encodeURIComponent(v.toString());
        }
        return v;
      },
      type,
    );
  };