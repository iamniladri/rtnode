"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const database_1 = require("./config/database");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const product_1 = require("./routes/product/product");
const PORT = process.env.PORT || 3030;
const app = express_1.default();
database_1.connect();
app.use(body_parser_1.default.urlencoded({ extended: false }));
//app.use(express.static('/public'));
app.get("/", (req, res, next) => {
    res.status(200).sendFile(path_1.default.resolve(__dirname, 'public/html/', 'contactus.html'));
});
app.get("/login", (req, res, next) => {
    res.status(200).sendFile(path_1.default.resolve(__dirname, 'public/html/', 'login.html'));
});
app.use(product_1.product_router);
app.listen(PORT);
console.log("server listen at port " + PORT);
