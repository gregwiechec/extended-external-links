const path = require("path");
const config = {
    entry: {
        "external-links-widget": "./src/components/external-links-view/external-links-widget-wrapper.tsx",
        "external-links-component": "./src/components/external-links-component/external-links-component-wrapper.tsx"
    },
    output: {
        filename: "[name].js",
        libraryTarget: "amd",
        libraryExport: "default",
        path: path.resolve(__dirname, "../src/ExtendedExternalLinks/ClientResources")
    },
    /*optimization: {
        splitChunks: {
            chunks: 'all',
            name() {
                return 'base';
            }
        },
        concatenateModules: false,
        chunkIds: 'named'
    },*/
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/"
                        }
                    }
                ]
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["node_modules"]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [],
    externals: [
        "dojo/_base/declare",
        "dojo/topic",
        "dijit/_WidgetBase",
        "dijit/Destroyable",
        "epi-cms/ApplicationSettings",
        "epi-cms/_ContentContextMixin",
        "epi/shell/command/_WidgetCommandProviderMixin", //TODO: LINKS add module methods to definitions
        "epi/shell/command/_Command" //TODO: LINKS do not use this dependency
    ]
};

module.exports = (env, argv) => {
    config.devtool = argv.mode === "production" ? "source-map" : "eval-source-map";
    return config;
};
