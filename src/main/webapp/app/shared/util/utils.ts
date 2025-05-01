import _ from "lodash";

export const IsJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};


export const attachmentDTO = (obj: any, type: string) => {
  if (obj !== undefined) {
    const attachData: any = _.isArray(obj) ? obj : [obj];
    const attachObj = [];
    attachData.map((t: any) => {
      attachObj.push({
        "attachmentType": type, "name": t.name, "content": t.base64, "mimeType": "PDF"
      })
    });
    return attachObj;
  } else {
    return [];
  }
}

export const IsUndefined = (value: any) => value === undefined ? null : value;

export const IsMobileNumberUndefined = (code: any, number: any) => number === undefined ? null : code + number;