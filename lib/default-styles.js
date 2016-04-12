const fontNames = {
  regular: 'HelveticaNeue',
  italic: 'HelveticaNeue-Italic',
  bold: 'HelveticaNeue-Bold',
  boldItalic: 'HelveticaNeue-BoldItalic'
};

export default {
  componentTextStyles: {
    bodyStyle: {
      fontName: fontNames.regular,
      fontSize: 18
    },
    bylineStyle: {
      fontName: fontNames.regular,
      fontSize: 13
    },
    captionStyle: {
      fontName: fontNames.regular,
      fontSize: 10
    },
    titleStyle: {
      fontName: fontNames.bold,
      fontSize: 36
    },
    heading1Style: {
      fontName: fontNames.bold,
      fontSize: 32
    },
    heading2Style: {
      fontName: fontNames.bold,
      fontSize: 24
    },
    heading3Style: {
      fontName: fontNames.bold,
      fontSize: 19
    },
    heading4Style: {
      fontName: fontNames.bold,
      fontSize: 16
    },
    heading5Style: {
      fontName: fontNames.bold,
      fontSize: 13
    },
    heading6Style: {
      fontName: fontNames.bold,
      fontSize: 11
    }
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
    }
  },
  componentLayouts: {
    bodyLayout: {
      columnStart: 1,
      columnSpan: 6,
      contentInset: {
        left: true,
        right: true
      }
    }
  },
  layout: {
    columns: 8,
    width: 1024,
    margin: 0,
    gutter: 40
  }
};
