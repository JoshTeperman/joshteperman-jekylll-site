const fetch = require('node-fetch');
const fs = require('fs');
const fm = require('front-matter');

const apiBaseUri = 'https://dev.to/api';
const createPostPath = `${apiBaseUri}/articles}`;

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

const handler = async function () {
  // Step 1: Map through _posts and return fileData if unpublished ("published" attr is null)
  // Step 2: Map post data For each of the unpublished posts ...
  // {
  //   fileData,
  //   frontmatter,
  //   attributes,
  //   body,
  //   title,
  //   published,
  //   body_markdown,
  //   tags
  // }
  // Step 3: POST post data to dev.to
  // Step 4: if result.ok then update file published date
  // return { statusCode: 200, body: JSON.stringify({message: 'test function'}) }

  try {
    const fileData = await fs.readFileSync('_posts/its-always-your-fault.md', 'utf-8', (err, data) => {
      return JS0N.stringify(data);
    })

    const { attributes, body, frontmatter } = fm(fileData)

    const articleParams = JSON.stringify(
      {
        article: {
          title: attributes.title,
          published: false,
          body_markdown: body,
          tags: [attributes.tags]
        }
      }
    )

    const response = await fetch(createPostPath, {
      method:'post',
      body: articleParams,
      headers: { 'api-key': process.env.DEVTO, 'Content-Type': 'application/json' }
    })

    const json = await response.json()

    console.log({json: json});

    return {
      statusCode: 200,
      body: JSON.stringify({data: json})
    }
  } catch (e) {
    console.log({error: e})
  }
};


module.exports = { handler }
