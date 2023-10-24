const axios = require('axios');
const fs = require('fs');

// Define the list of URLs to download data from
const urls = [
  'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
  'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
  'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
  'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
  'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
  'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
  'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt'
  // Add more URLs here if needed
];

// Function to download data from a single URL
async function downloadData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error downloading data from ${url}: ${error.message}`);
    return null;
  }
}

// Function to download data from multiple URLs and write to file
async function downloadAndWriteToTestFile(urls) {
  try {
    const dataPromises = urls.map(url => downloadData(url));
    const dataArray = await Promise.all(dataPromises);

    const aggregatedData = dataArray.join('\n');

    fs.writeFile('http.txt', aggregatedData, err => {
      if (err) throw err;
      console.log('Data has been successfully written to test.txt');
    });
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Call the function to download data from URLs and write to file
downloadAndWriteToTestFile(urls);
