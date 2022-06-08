import express, {Request, Response, NextFunction} from 'express';
import router from './router';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

// 问题1： express库的类型定义文件.d.ts文件类型描述不准确:通过extends引入原类型
// 问题2： 当我使用中间件的时候，对req或者res做了修改之后，实际上类型并不能改变。

const app = express();
// 要写在router前面;
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req: Request, res: Response, next: NextFunction) => {
  req.teacherName = 'dell';
  next();
})
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret keys'],
    maxAge: 24 * 60 * 60 * 1000
  })
)

app.use(router);

app.listen(7001, () => {
  console.log('server is running')
});