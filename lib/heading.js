import assert from 'assert';
import renderTextItems from './text-items';

export default function (headerType, children) {
  assert(headerType >= 1 && headerType <= 6);

  return renderTextItems(`heading${headerType}`, children, {
    textStyle: `heading${headerType}Style`
  });
}
