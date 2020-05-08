const path = require("path");

module.exports = {
    name: "ttt-setting",
    mode: "development", //실서비스 production
    devtool: "eval",
    resolve: {
        extensions: [".jsx", ".js"],
    },
    entry: {
        app: ["./client.jsx"],
    }, //입력

    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ["@babel/plugin-proposal-class-properties", "react-hot-loader/babel"],
                },
            },
        ],
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js",
        publicPath: "/dist/",
    }, // 출력
};
