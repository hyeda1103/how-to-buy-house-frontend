import { Quill } from 'react-quill';

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static create(value: any) {
    const imgTag = super.create();
    imgTag.setAttribute('src', value.src);
    imgTag.setAttribute('alt', value.alt);
    imgTag.setAttribute('width', '100%');
    return imgTag;
  }

  static value(node: any) {
    return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
  }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

export { ImageBlot };
