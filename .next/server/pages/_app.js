/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/components/Navbar.tsx":
/*!***********************************!*\
  !*** ./src/components/Navbar.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst Navbar = ()=>{\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"bg-gray-900 text-white shadow-md\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container mx-auto flex justify-between items-center p-4\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                    href: \"/\",\n                    className: \"text-2xl font-bold hover:text-gray-400 transition\",\n                    children: \"User Management\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n                    lineNumber: 13,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    onClick: ()=>setIsOpen(!isOpen),\n                    className: \"md:hidden text-white text-2xl focus:outline-none\",\n                    children: \"☰\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n                    lineNumber: 18,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: `md:flex md:items-center md:space-x-6 ${isOpen ? \"block\" : \"hidden\"} md:block`,\n                    children: session ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: \"/profile\",\n                                className: \"hover:text-gray-300 transition\",\n                                children: \"Profile\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n                                lineNumber: 29,\n                                columnNumber: 15\n                            }, undefined),\n                            session.user.role === \"admin\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: \"/tenants/create\",\n                                className: \"hover:text-gray-300 transition\",\n                                children: \"Create Tenant\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n                                lineNumber: 34,\n                                columnNumber: 17\n                            }, undefined),\n                            session.user.role === \"manager\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: \"/users\",\n                                className: \"hover:text-gray-300 transition\",\n                                children: \"Manage Users\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n                                lineNumber: 40,\n                                columnNumber: 17\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.signOut)(),\n                                className: \"bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition\",\n                                children: \"Logout\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n                                lineNumber: 45,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                        href: \"/auth/login\",\n                        className: \"bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition\",\n                        children: \"Login\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n                    lineNumber: 26,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n            lineNumber: 11,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\components\\\\Navbar.tsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9OYXZiYXIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBc0Q7QUFDekI7QUFDSTtBQUVqQyxNQUFNSSxTQUFTO0lBQ2IsTUFBTSxFQUFFQyxNQUFNQyxPQUFPLEVBQUUsR0FBR04sMkRBQVVBO0lBQ3BDLE1BQU0sQ0FBQ08sUUFBUUMsVUFBVSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUVyQyxxQkFDRSw4REFBQ007UUFBSUMsV0FBVTtrQkFDYiw0RUFBQ0M7WUFBSUQsV0FBVTs7OEJBRWIsOERBQUNSLGtEQUFJQTtvQkFBQ1UsTUFBSztvQkFBSUYsV0FBVTs4QkFBb0Q7Ozs7Ozs4QkFLN0UsOERBQUNHO29CQUNDQyxTQUFTLElBQU1OLFVBQVUsQ0FBQ0Q7b0JBQzFCRyxXQUFVOzhCQUNYOzs7Ozs7OEJBS0QsOERBQUNDO29CQUFJRCxXQUFXLENBQUMscUNBQXFDLEVBQUVILFNBQVMsVUFBVSxTQUFTLFNBQVMsQ0FBQzs4QkFDM0ZELHdCQUNDOzswQ0FDRSw4REFBQ0osa0RBQUlBO2dDQUFDVSxNQUFLO2dDQUFXRixXQUFVOzBDQUFpQzs7Ozs7OzRCQUloRUosUUFBUVMsSUFBSSxDQUFDQyxJQUFJLEtBQUsseUJBQ3JCLDhEQUFDZCxrREFBSUE7Z0NBQUNVLE1BQUs7Z0NBQWtCRixXQUFVOzBDQUFpQzs7Ozs7OzRCQUt6RUosUUFBUVMsSUFBSSxDQUFDQyxJQUFJLEtBQUssMkJBQ3JCLDhEQUFDZCxrREFBSUE7Z0NBQUNVLE1BQUs7Z0NBQVNGLFdBQVU7MENBQWlDOzs7Ozs7MENBS2pFLDhEQUFDRztnQ0FDQ0MsU0FBUyxJQUFNYix3REFBT0E7Z0NBQ3RCUyxXQUFVOzBDQUNYOzs7Ozs7O3FEQUtILDhEQUFDUixrREFBSUE7d0JBQUNVLE1BQUs7d0JBQWNGLFdBQVU7a0NBQWdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUS9HO0FBRUEsaUVBQWVOLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQWF5dXNoXFxPbmVEcml2ZVxcRGVza3RvcFxcTGFzdCBwYWtrYVxcdXNlci1tYW5hZ2VtZW50LWFwcFxcc3JjXFxjb21wb25lbnRzXFxOYXZiYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVNlc3Npb24sIHNpZ25PdXQgfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IE5hdmJhciA9ICgpID0+IHtcclxuICBjb25zdCB7IGRhdGE6IHNlc3Npb24gfSA9IHVzZVNlc3Npb24oKTtcclxuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPG5hdiBjbGFzc05hbWU9XCJiZy1ncmF5LTkwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC1hdXRvIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBwLTRcIj5cclxuICAgICAgICB7Lyog4pyFIEJyYW5kaW5nIC8gTG9nbyAqL31cclxuICAgICAgICA8TGluayBocmVmPVwiL1wiIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCBob3Zlcjp0ZXh0LWdyYXktNDAwIHRyYW5zaXRpb25cIj5cclxuICAgICAgICAgIFVzZXIgTWFuYWdlbWVudFxyXG4gICAgICAgIDwvTGluaz5cclxuXHJcbiAgICAgICAgey8qIOKchSBNb2JpbGUgTWVudSBUb2dnbGUgKi99XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKCFpc09wZW4pfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwibWQ6aGlkZGVuIHRleHQtd2hpdGUgdGV4dC0yeGwgZm9jdXM6b3V0bGluZS1ub25lXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICDimLBcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgey8qIOKchSBOYXZiYXIgTGlua3MgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtZDpmbGV4IG1kOml0ZW1zLWNlbnRlciBtZDpzcGFjZS14LTYgJHtpc09wZW4gPyBcImJsb2NrXCIgOiBcImhpZGRlblwifSBtZDpibG9ja2B9PlxyXG4gICAgICAgICAge3Nlc3Npb24gPyAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9wcm9maWxlXCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1ncmF5LTMwMCB0cmFuc2l0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICBQcm9maWxlXHJcbiAgICAgICAgICAgICAgPC9MaW5rPlxyXG5cclxuICAgICAgICAgICAgICB7c2Vzc2lvbi51c2VyLnJvbGUgPT09IFwiYWRtaW5cIiAmJiAoXHJcbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL3RlbmFudHMvY3JlYXRlXCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1ncmF5LTMwMCB0cmFuc2l0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgIENyZWF0ZSBUZW5hbnRcclxuICAgICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICB7c2Vzc2lvbi51c2VyLnJvbGUgPT09IFwibWFuYWdlclwiICYmIChcclxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvdXNlcnNcIiBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWdyYXktMzAwIHRyYW5zaXRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgTWFuYWdlIFVzZXJzXHJcbiAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2lnbk91dCgpfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctcmVkLTYwMCBweC00IHB5LTIgcm91bmRlZC1sZyBob3ZlcjpiZy1yZWQtNzAwIHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIExvZ291dFxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvYXV0aC9sb2dpblwiIGNsYXNzTmFtZT1cImJnLWJsdWUtNjAwIHB4LTQgcHktMiByb3VuZGVkLWxnIGhvdmVyOmJnLWJsdWUtNzAwIHRyYW5zaXRpb25cIj5cclxuICAgICAgICAgICAgICBMb2dpblxyXG4gICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmF2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiJdLCJuYW1lcyI6WyJ1c2VTZXNzaW9uIiwic2lnbk91dCIsIkxpbmsiLCJ1c2VTdGF0ZSIsIk5hdmJhciIsImRhdGEiLCJzZXNzaW9uIiwiaXNPcGVuIiwic2V0SXNPcGVuIiwibmF2IiwiY2xhc3NOYW1lIiwiZGl2IiwiaHJlZiIsImJ1dHRvbiIsIm9uQ2xpY2siLCJ1c2VyIiwicm9sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Navbar.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Navbar */ \"./src/components/Navbar.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n // ✅ Import Navbar\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_1__.SessionProvider, {\n        session: pageProps.session,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"container mx-auto px-4 py-6\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\pages\\\\_app.tsx\",\n                    lineNumber: 15,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Aayush\\\\OneDrive\\\\Desktop\\\\Last pakka\\\\user-management-app\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWtEO0FBQ1QsQ0FBQyxrQkFBa0I7QUFDN0I7QUFJL0IsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUMvQyxxQkFDRSw4REFBQ0osNERBQWVBO1FBQUNLLFNBQVNELFVBQVVDLE9BQU87OzBCQUV6Qyw4REFBQ0osMERBQU1BOzs7OzswQkFHUCw4REFBQ0s7Z0JBQUtDLFdBQVU7MEJBQ2QsNEVBQUNKO29CQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWhDO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQWF5dXNoXFxPbmVEcml2ZVxcRGVza3RvcFxcTGFzdCBwYWtrYVxcdXNlci1tYW5hZ2VtZW50LWFwcFxcc3JjXFxwYWdlc1xcX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2Vzc2lvblByb3ZpZGVyIH0gZnJvbSBcIm5leHQtYXV0aC9yZWFjdFwiO1xuaW1wb3J0IE5hdmJhciBmcm9tIFwiQC9jb21wb25lbnRzL05hdmJhclwiOyAvLyDinIUgSW1wb3J0IE5hdmJhclxuaW1wb3J0IFwiLi4vc3R5bGVzL2dsb2JhbHMuY3NzXCI7XG5cbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxTZXNzaW9uUHJvdmlkZXIgc2Vzc2lvbj17cGFnZVByb3BzLnNlc3Npb259PlxuICAgICAgey8qIOKchSBHbG9iYWwgTmF2YmFyICovfVxuICAgICAgPE5hdmJhciAvPlxuICAgICAgXG4gICAgICB7Lyog4pyFIFBhZ2UgQ29udGVudCB3aXRoIFNwYWNpbmcgKi99XG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBweC00IHB5LTZcIj5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9tYWluPlxuICAgIDwvU2Vzc2lvblByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcbiJdLCJuYW1lcyI6WyJTZXNzaW9uUHJvdmlkZXIiLCJOYXZiYXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInNlc3Npb24iLCJtYWluIiwiY2xhc3NOYW1lIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();