import path from 'path';
import fs from 'fs';
import superagent from 'superagent';

export interface Analyzer {
  analyzer: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, '../../data/course.json')
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyzer(html, this.filePath);
    this.writeFile(fileContent);
  }
  constructor(private url: string, private analyzer: any) {
    this.initSpiderProcess();
  }
}

export default Crowller;