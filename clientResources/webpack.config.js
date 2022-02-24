const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const amdModules = [
    "dojo/_base/declare",
    "dojo/topic",
    "dijit/_WidgetBase",
    "dijit/Destroyable",
    "dijit/layout/_LayoutWidget",
    "epi/dependency",
    "epi-cms/content-approval/command/CancelChanges",
    "epi/shell/command/_WidgetCommandProviderMixin",
    "epi-cms/ApplicationSettings",
    "epi/i18n!epi/cms/nls/externallinks",
    "xstyle/css!extended-external-links/external-links-list.css"
];

const config = {
    entry: {
        "external-links-view": "./src/components/external-links-view/external-links-view-wrapper.tsx",
        "external-links-component": "./src/components/external-links-component/external-links-component-wrapper.tsx",
        initializer: "./src/module-initializer.ts"
    },
    output: {
        filename: "[name].js",
        libraryTarget: "amd",
        libraryExport: "default",
        path: path.resolve(__dirname, "../src/ExtendedExternalLinks/ClientResources")
    },
    optimization: {
        //TODO: LINKS why it's not working
        splitChunks: {
            chunks: "all",
            name() {
                return "external-link-list-base";
            }
        },
        concatenateModules: false,
        chunkIds: "named"
    },
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
                    MiniCssExtractPlugin.loader,
                    //"style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: ["node_modules"],
                                // Prefer `dart-sass`
                                implementation: require("sass")
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "external-links-list.css"
        })
    ],
    externals: [
        function (context, request, callback) {
            if (request && amdModules.some((x) => request.startsWith(x))) {
                return callback(null, request);
            }

            callback();
        }
    ]
};

module.exports = (env, argv) => {
    config.devtool = argv.mode === "production" ? "source-map" : "eval-source-map";
    return config;
};
