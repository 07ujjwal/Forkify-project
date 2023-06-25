import { TIMEOUT_SEC } from "./config";
import { async } from "regenerator-runtime";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchProduct = fetch(url);
    const resource = await Promise.race([fetchProduct, timeout(TIMEOUT_SEC)]);
    console.log(resource);
    const data = await resource.json();

    if (!resource.ok) throw new Error(`${data.message} (${resource.status})`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

// sending data to Api.....
export const sentJSON = async function (url, uploadData) {
  try {
    const fetchProduct = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const resource = await Promise.race([fetchProduct, timeout(TIMEOUT_SEC)]);
    console.log(resource);
    const data = await resource.json();

    if (!resource.ok) throw new Error(`${data.message} (${resource.status})`);

    return data;
  } catch (err) {
    console.log(err);
  }
};
