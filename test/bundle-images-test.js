import test from 'ava';
import 'babel-core/register';
import bundleImages from '../lib/bundle-images';

test('bundleImages() simple', t => {
  const components = [{
    role: 'photo',
    URL: 'http://example.com/beep-boop.jpg'
  }];
  const expectedComponents = [{
    role: 'photo',
    URL: 'bundle://image-0.jpg'
  }];
  const expectedBundlesToUrls = {
    'image-0.jpg': 'http://example.com/beep-boop.jpg'
  };
  const actualBundlesToUrls = bundleImages(components);
  const actualComponents = components;

  t.deepEqual(actualBundlesToUrls, expectedBundlesToUrls);
  t.deepEqual(actualComponents, expectedComponents);
});

test('bundleImages() on bundled image', t => {
  const components = [{
    role: 'photo',
    URL: 'bundle://beep-boop.jpg'
  }];
  const expectedComponents = [{
    role: 'photo',
    URL: 'bundle://beep-boop.jpg'
  }];
  const expectedBundlesToUrls = {};
  const actualBundlesToUrls = bundleImages(components);
  const actualComponents = components;

  t.deepEqual(actualBundlesToUrls, expectedBundlesToUrls);
  t.deepEqual(actualComponents, expectedComponents);
});
