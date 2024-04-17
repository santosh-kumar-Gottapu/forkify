import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // corrected from 'application/JSON'
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
/*
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
export const sendJSON = async function (url, uploadData) {
  try {
    // Create the fetch promise
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // corrected from 'application/JSON'
      },
      body: JSON.stringify(uploadData),
    });

    // Define a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, TIMEOUT_SEC * 1000);
    });

    // Race between fetch and timeout promises
    const res = await Promise.race([fetchPro, timeoutPromise]);

    // Check if fetch was successful
    if (!res.ok) {
      const data = await res.json();
      throw new Error(`${data.message} (${res.status})`);
    }

    // If everything is fine, return the data
    return await res.json();
  } catch (err) {
    throw err; // Rethrow the error for handling by the caller
  }
};
*/
