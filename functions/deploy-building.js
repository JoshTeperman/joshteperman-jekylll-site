const fetch = require('node-fetch');
const fs = require('fs');
const fm = require('front-matter');

const apiBaseUri = 'https://dev.to/api';
const createPostPath = `${apiBaseUri}/articles`;

const handler = async function () {
  try {
    const fileData = fs.readFileSync('_posts/2018-04-27-its-always-your-fault.md', 'utf-8', (err, data) => {
      return JS0N.stringify(data);
    })
    const { attributes, body } = fm(fileData)
    const articleParams = {
      article: {
        title: attributes.title,
        body_markdown: body,
        published: false,
        tags: attributes.tags.split(' ')
      }
    }

    const response = await fetch(createPostPath, {
      method: 'post',
      body: JSON.stringify(articleParams),
      headers: { 'api-key': process.env.DEVTO, 'content-type': 'application/json' }
    })

    if (response.ok) {
      const json = await response.json()
      return {
        statusCode: 200,
        body: JSON.stringify({data: json})
      }
    } else {
      console.log('Server Error');
      return {
        statusCode: response.status,
        message: response.statusText
      }
    }

  } catch (e) {
    console.log({error: e})
  }
};

module.exports = { handler }
