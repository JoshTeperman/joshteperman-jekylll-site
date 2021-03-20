
const axios = require('axios');

const apiBaseUri = 'https://dev.to/api';
const createPostPath = `${apiBaseUri}/articles'}`;

// POST /articles
//
// {
//   "article": {
//     "title": "Hello, World!",
//     "published": true,
//     "body_markdown": "Hello DEV, this is my first post",
//     "tags": [
//       "discuss",
//       "help"
//     ],
//     "series": "Hello series"
//   }
// }

// POST /articles (front-matter)
// {
//   "article": {
//     "body_markdown": "---\ntitle: Hello, World!\npublished: true\ntags: discuss, help\ndate: 20190701T10:00Z\nseries: Hello series\n---\n\nHello DEV, this is my first post\n"
//   }
// }

exports.handler = async (event, context, callback) => {
  // Step 1: Check if there are any unbublished posts (that have not been posted to Dev.to)
  // Step 2: Prepare post data
  // Step 3: POST post data to dev.to

  const postParams = {
    article: {
      title: 'Hello World!',
      published: true,
      body_markdown: 'HELLO DEV. Posting using a Netflify serverless function!',
      tags: ['netflify', 'serverless']
    }
  }
  const headers = { "api-key": process.env.DEVTO }

  result = await axios.post(createPostPath, {...postParams, ...headers })

  if (result.success) {
    console.log(result.data)
    return {
      status: result.status,
      body: JSON.stringify(result.data)
    }
  } else {
    return({
      status: result.status,
      error: result.error
    })
  }
};



