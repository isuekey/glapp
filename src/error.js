
class WebglError extends Error {
  constructor(name, query, message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = name;
    this.desc = `the query is: ${query}. result is:${message}`;
  }
}

module.exports = WebglError;
