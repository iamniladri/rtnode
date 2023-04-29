"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_router = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = require("../../controllers/product/product");
const product = new product_1.Product();
const create_product = product.productAdd();
const get_products = product.productFetch();
const register = product.register();
const login = product.login();
exports.product_router = express_1.default.Router();
exports.product_router.get("/welcomes", get_products);
exports.product_router.post("/create_product", create_product);
exports.product_router.post("/register", register);
exports.product_router.post("/login", login);
