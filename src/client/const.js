import JavascriptIcon from 'Components/Icons/Javascript';
import CSSIcon from 'Components/Icons/CSS';
import FileIcon from 'Components/Icons/File';
import ImageFileIcon from 'Components/Icons/ImageFile';

export const ASSETS_TYPE = [
  {
    key: 'totalAssetsSize',
    displayName: 'Total Assets Size',
    header: 'All Assets',
    icon: FileIcon,
  },
  {
    key: 'totalJSSize',
    displayName: 'Total Javascript Size',
    header: 'Javascript Files',
    icon: JavascriptIcon,
    className: 'javascript',
    showChunks: true,
  },
  {
    key: 'totalCSSSize',
    displayName: 'Total CSS Size',
    header: 'CSS Files',
    icon: CSSIcon,
    className: 'css',
    iconWidth: '2.2rem',
    showChunks: true,
  },
  {
    key: 'initialJSSize',
    displayName: 'Initial Javascript Size',
    header: 'Initial Javascript Files',
    icon: JavascriptIcon,
    className: 'javascript',
    showChunks: true,
  },
  {
    key: 'initialCSSSize',
    displayName: 'Initial CSS Size',
    header: 'Initial CSS Files',
    icon: CSSIcon,
    className: 'css',
    iconWidth: '2.2rem',
    showChunks: true,
  },
  {
    key: 'totalStaticFileSize',
    displayName: 'Total Media Files Size',
    header: 'All Media Files',
    icon: ImageFileIcon,
  },
];
