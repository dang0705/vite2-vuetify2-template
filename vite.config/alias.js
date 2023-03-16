import path from 'node:path';
const workspace = path.join(__dirname, '../');
const resolvePath = (dir) => path.join(workspace, dir);

export const resolve = {
  alias: {
    '@': resolvePath('src'),
    '@plugins': resolvePath('src/plugins'),
    '@store': resolvePath('src/store'),
    '@utils': resolvePath('src/utils'),
    '@configs': resolvePath('src/configs')
  }
};
