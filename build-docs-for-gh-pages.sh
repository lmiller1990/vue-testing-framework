cd packages/docs
yarn docs:build
packages/docs/.vuepress/dist docs
git add docs
git commit -m "docs: build latest docs"
