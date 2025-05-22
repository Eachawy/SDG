import _ from "lodash";
import { countryCode } from "./date-utils";

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

export const getFileSize = (content: any) => {
  const base64Data = content.split(',')[1] || content;
  const padding = (base64Data.match(/=*$/) || [''])[0].length;
  let sizeInBytes = (base64Data.length * 3) / 4 - padding;
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (sizeInBytes >= 1024 && i < units.length - 1) {
    sizeInBytes /= 1024;
    i++;
  }
  return `${sizeInBytes.toFixed(2)} ${units[i]}`;

}

export const getFileType = (base64String) => {
  const match = base64String.match(/^data:(.+?);base64,/);
  return match ? match[1] : 'Unknown';
};

export const removeCountryCode = (mobileNum: any) => {
  return String(mobileNum).substring(3, mobileNum.length)
}

export const getCountryCodeObj = (mobileNum: any) => {
  const code = String(mobileNum).substring(0, 3);
  return _.find(countryCode, (item) => item.name === ('+' + code))
}


export const setInitAttachFile = (attach: any) => {
  if (attach) {
    const data = {
      ...attach,
      base64: attach?.content
    }
    return data;
  }
  return undefined;
}