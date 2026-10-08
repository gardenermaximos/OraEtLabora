module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{js,cjs,mjs}': ['prettier --write'],
  '*.{json,md,css}': ['prettier --write'],
}
