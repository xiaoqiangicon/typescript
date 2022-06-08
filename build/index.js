"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
// 问题1： express库的类型定义文件.d.ts文件类型描述不准确:通过extends引入原类型
// 问题2： 当我使用中间件的时候，对req或者res做了修改之后，实际上类型并不能改变。
var app = (0, express_1.default)();
// 要写在router前面;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    req.teacherName = 'dell';
    next();
});
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['secret keys'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(router_1.default);
app.listen(7001, function () {
    console.log('server is running');
});
