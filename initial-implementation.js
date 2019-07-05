const extRegex = '\.[^.\\/:*?"<>|\r\n]+$'
const httpRegex = '^(http|https):\/\/'

class Validator() {
  constructor (path) {
    this.path = path
  }

  async init() {
    const [ext] = this.path.match(extRegex)
    let schema = null
    if (this.path.match(httpRegex)) {
      return axios.get(this.path).then((res) => {
        if (ext === '.json') {
          schema = res
        } else if (ext === '.yaml' || ext === '.yml') {
          schema = yaml.parse(res)
        }
        this.schema = schema
      })
    } else {
      if (ext === '.json') {
        return new Promise((resolve, reject) => {
          fs.readFile(this.path, 'utf8', (err, data) => {
            if (err) return reject(err)
            this.schema = JSON.parse(data)
            resolve()
          })
        }
      } else if (ext === '.yaml' || ext === '.yml') {
        this.schema = yaml.load(this.path)
      }
    }    
  }

  validate(type, payload) {
    // Here we validate `payload` 
    // against `this.schema[type]`
  }
}