import JavascriptIcon from 'UI/Icons/Javascript';
import CSSIcon from 'UI/Icons/CSS';
import FileIcon from 'UI/Icons/File';
import ImageFileIcon from 'UI/Icons/ImageFile';

export const ASSETS_TYPE = [
  {
    key: 'totalAssetsSize',
    displayName: 'Total Assets Size',
    icon: FileIcon,
  },
  {
    key: 'totalJSSize',
    displayName: 'Total Javascript Size',
    icon: JavascriptIcon,
    className: 'javascript',
  },
  {
    key: 'totalCSSSize',
    displayName: 'Total CSS Size',
    icon: CSSIcon,
    className: 'css',
    iconWidth: '2.2rem',
  },
  {
    key: 'initialJSSize',
    displayName: 'Initial Javascript Size',
    icon: JavascriptIcon,
    className: 'javascript',
  },
  {
    key: 'initialCSSSize',
    displayName: 'Initial CSS Size',
    icon: CSSIcon,
    className: 'css',
    iconWidth: '2.2rem',
  },
  {
    key: 'totalStaticFileSize',
    displayName: 'Total Media Files Size',
    icon: ImageFileIcon,
  },
];
