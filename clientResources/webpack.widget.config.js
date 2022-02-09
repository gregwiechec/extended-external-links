const path = require("path");

module.exports = (env, argv) => {
    const webpackCommon = require("./webpack.config.common")(env, argv);
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

    webpackCommon.entry = "./src/index.tsx";

    webpackCommon.output = {
        filename: "external-links-widget.js",
        libraryTarget: "amd",
        libraryExport: "default",
        path: path.resolve(__dirname, "../src/ExtendedExternalLinks/ClientResources")
    };

    if (!webpackCommon.plugins) {
        webpackCommon.plugins = [];
        webpackCommon.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "disabled" }));
    }

    webpackCommon.externals = [
        "dojo/_base/declare",
        "dojo/topic",
        "dijit/_WidgetBase",
        "epi/i18n!epi/cms/nls/reviewcomponent",
        "epi-cms/ApplicationSettings",
        "epi-cms/_ContentContextMixin",
        "advanced-cms-approval-reviews/advancedReviewService"
    ];
    return webpackCommon;
};
