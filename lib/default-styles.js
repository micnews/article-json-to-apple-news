const fontNames = {
  regular: 'HelveticaNeue',
  italic: 'HelveticaNeue-Italic',
  bold: 'HelveticaNeue-Bold',
  boldItalic: 'HelveticaNeue-BoldItalic'
};

export default {
  componentTextStyles: {
    'default-body': {
      fontName: fontNames.regular,
      fontSize: 18
    },
    'default-quote': {
      fontName: fontNames.italic,
      fontSize: 26,
      textAlignment: 'center'
    },
    'default-byline': {
      fontName: fontNames.regular,
      fontSize: 13
    },
    'default-caption': {
      fontName: fontNames.regular,
      fontSize: 10
    },
    'default-title': {
      fontName: fontNames.bold,
      fontSize: 36
    },
    'default-heading1': {
      fontName: fontNames.bold,
      fontSize: 32
    },
    'default-heading2': {
      fontName: fontNames.bold,
      fontSize: 24
    },
    'default-heading3': {
      fontName: fontNames.bold,
      fontSize: 19
    },
    'default-heading4': {
      fontName: fontNames.bold,
      fontSize: 16
    },
    'default-heading5': {
      fontName: fontNames.bold,
      fontSize: 13
    },
    'default-heading6': {
      fontName: fontNames.bold,
      fontSize: 11
    },
    headerCaptionTextStyle: {},
    embedCaptionTextStyle: {},
    quoteStyle: {},
    quoteTextStyle: {}
  },
  textStyles: {
    bodyBoldStyle: {
      fontName: fontNames.bold
    },
    bodyItalicStyle: {
      fontName: fontNames.italic
    },
    bodyBoldItalicStyle: {
      fontName: fontNames.boldItalic
    },
    bodyLinkTextStyle: {
      textColor: '#48BFEE',
      underline: true
    },
    headerCaptionTextStyle: {},
    embedCaptionTextStyle: {},
    quoteTextStyle: {}
  },
  componentStyles: {
    headerStyle: {},
    embedStyle: {},
    embedMediaStyle: {},
    headerEmbedStyle: {},
    headerEmbedMediaStyle: {},
    quoteStyle: {},
    quoteTextStyle: {}
  },
  componentLayouts: {
    bodyLayout: {
      columnStart: 1,
      columnSpan: 6,
      contentInset: {
        left: true,
        right: true
      }
    },
    titleLayout: {},
    bylineLayout: {},
    quoteLayout: {
      columnStart: 1,
      columnSpan: 6,
      contentInset: {
        left: true,
        right: true,
        bottom: true
      }
    },
    quoteTextLayout: {},
    headerLayout: {
      ignoreDocumentMargin: true
    },
    paragraphLayout: {},
    embedLayout: {},
    embedMediaLayout: {},
    headerEmbedLayout: {
      ignoreDocumentMargin: true
    },
    headerEmbedMediaLayout: {
      ignoreDocumentMargin: true
    },
    headerCaptionLayout: {},
    embedCaptionLayout: {}
  },
  layout: {
    columns: 8,
    width: 1024,
    margin: 0,
    gutter: 40
  }
};
