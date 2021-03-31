const globby = require('globby');
const path = require('path');
const fs = require('fs');
const fm = require('front-matter');

async function mapPostsToJson() {
  // Get File Data
  const directory = path.join(__dirname, '..', '_posts')
  const filePaths = await globby(directory, {
    expandDirectories: {
      files:['*.md'],
    }
  })

  // Map Data
  const postsData = await filePaths.map((filePath) => {
    try {
      const postData = fs.readFileSync(filePath, 'utf-8', (err, data) => (data))
      const fmData = fm(postData)
      const { attributes: { draft, author, title, tags }, body } = fmData
      const postId = path.basename(filePath).replace('.md', '')

      const mappedPost = {
        [postId]: {
          draft: draft,
          externalId: null,
          author: author,
          title: title,
          tags: tags,
          body: body
        }
      }
      console.log({mappedPost});
      return mappedPost
    } catch(e) {
      console.log({error: e});
    }
  })
  // output JSON to _data/posts-data.json
}

mapPostsToJson()

// ---json post object:
// {
//   "2018-04-27-its-always-your-fault": {
//     "draft": "false",
//     "externalId": "194541",
//     "author": "Josh Teperman",
//     "title": "It's always your fault",
//     "tags": "ruby OOP",
//     "body": "Rear-ended the car in front of you? Your fault..."
//   }
// }

// const path = require('path')
// const fs = require('fs')
// const globby = require('globby')
// const cp = require("child_process")

// function installDeps(functionDir, cb) {
//   cp.exec("npm i", { cwd: functionDir }, cb)
// }

// (async () => {
//   const findJSFiles = ['*/package.json', '!node_modules', '!**/node_modules']
//   const directory = path.join(__dirname, '..', 'functions')
// 	const foldersWithDeps = await globby(findJSFiles, { cwd: directory })

//   const folders = foldersWithDeps.map(fnFolder => {
//     return fnFolder.substring(0, fnFolder.indexOf("package.json"))
//   }).map((folder) => {
//     installDeps(path.join(__dirname, '..', 'functions', folder), () => {
//       console.log(`${folder} dependencies installed`)
//     })
