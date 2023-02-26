module.exports = () => {
  return {
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      [
        "@babel/plugin-transform-runtime",
        {
          regenerator: true,
        },
      ],
      "@babel/plugin-proposal-class-properties",
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
          },
        },
      ],
      "@babel/preset-react",
    ],
  };
};
