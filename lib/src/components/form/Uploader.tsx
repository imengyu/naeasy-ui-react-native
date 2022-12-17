import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Image, ViewStyle, ImageStyle, StyleSheet, View, ActivityIndicator, Text, TextStyle, ImageURISource, Linking } from "react-native";
import { ImagePicker } from "../../native";
import { Color } from "../../styles";
import { ThemeContext, useThemeContext } from "../../theme/Theme";
import { DynamicColor, useThemeStyles } from "../../theme/ThemeStyleSheet";
import { deviceWidth } from "../../utils";
import { Icon } from "../basic";
import { IconButton } from "../button";
import { Dialog } from "../dialog";
import { Toast } from "../feedback";
import { ColumnView, RowView } from "../layout";
import { ImagePreview } from "../media";

export interface UploaderItem {
  /**
   * 上传文件源路径
   */
  filePath: string;
  /**
   * 文件的大小(B)
   */
  size?: number;
  /**
   * 指示当前文件是否是图片，如果设置为 true，则预览时会调用 ImagePreview 打开，否则会调用 Linking.openURL 预览资源。
   */
  isImage?: boolean;
  /**
   * 在已上传列表中显示的预览图像，为空时使用 filePath
   */
  previewPath?: string;
  /**
   * 当前状态
   */
  state: 'notstart'|'uploading'|'success'|'fail';
  /**
   * 当失败时显示
   */
  message?: string;
}
export interface UploaderAction {
  /**
   * 当前上传条目
   */
  item: UploaderItem;
  /**
   * 当上传进度变化时需要调用
   * @param precent 当前上传百分比，0-100
   */
  onProgress: (precent: number) => void;
  /**
   * 当开始上传时需要调用
   */
  onStart: (message?: string) => void;
  /**
   * 当上传失败时需要调用
   * @param error 当前错误信息，会显示在条目中
   */
  onError: (error: unknown) => void;
  /**
   * 当上传完成时需要调用
   */
  onFinish: (message?: string) => void;
}

export interface UploaderProps {
  /**
   * 最大上传数
   * @default 1
   */
  maxUploadCount?: number;
  /**
   * 最大上传文件的大小(B)，为 0 则不限制，超过大小的文件会被自动过滤，这些文件信息可以通过 onOverSize 事件获取。
   * @default 0 不限制
   */
  maxFileSize?: number;
  /**
   * 是否禁用文件上传。
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否显示文件已上传列表。
   * @default true
   */
  showUpload?: boolean;
  /**
   * 是否在已上传列表条目中显示删除按钮。
   * @default true
   */
  showDelete?: boolean;
  /**
   * 是否在用户添加图片后自动进行上传，否则不会自动上传，你可以手动调用上传进行统一上传。
   * @default true
   */
  uploadWhenAdded?: boolean;
  /**
   * 当用户多选，或者手动统一上传多个条目时，要如何并发上传。
   * * all：同时触发多个上传任务
   * * sequential：按顺序执行上传任务，只有前一个上传完成，后一个才会开始。
   * @default 'all'
   */
  uploadQueueMode?: 'all'|'sequential';
  /**
   * 条目的默认图片
   */
  itemDefaultSource?: ImageURISource | number | undefined;
  /**
   * 条目的大小
   * @default { width: 80, height: 80 }
   */
  itemSize?: { width: number, height: number };
  /**
   * 列表自定义外层样式
   */
  itemListStyle?: ViewStyle;
  /**
   * 条目的自定义外层样式
   */
  itemStyle?: ViewStyle;
  /**
   * 条目的自定义图片样式
   */
  itemImageStyle?: ImageStyle;
  /**
   * 条目的自定义信息遮罩样式
   */
  itemMaskTextStyle?: TextStyle;
  /**
   * 条目的自定义信息容器样式
   */
  itemMaskStyle?: ViewStyle;
  /**
   * 初始列表中的条目
   * @default []
   */
  intitalItems?: UploaderItem[];
  /**
   * 上传处理。不提供则无法上传
   * @required true
   */
  upload: (item: UploaderAction) => void;
  /**
   * 可以自定义渲染整个上传区域的样式。通常可以用在单独上传例如头像上传。
   */
  renderUploader?: (props: UploaderHoleProps) => JSX.Element;
  /**
   * 可以自定义渲染每个条目的样式。
   */
  renderUploadItem?: (props: UploaderListItemProps) => JSX.Element;
  /**
   * 可以自定义渲染添加按钮。
   */
  renderAddButton?: (props: UploaderListAddItemProps) => JSX.Element;
  /**
   * 自定义选择文件组件，你可以调用自己的文件选择器。默认调用 ImagePicker 选择文件.
   */
  onPickImage?: () => Promise<UploaderItem[]>;
  /**
   * 通过此函数可以在上传前进行校验和处理，Promise.resolve 表示校验通过，Promise.reject 表示校验失败。支持返回一个新的文件对象，可用于自定义处理，例如压缩图片。
   */
  onBeforeAdd?: (item: UploaderItem) => Promise<UploaderItem|undefined>;
  /**
   * 自定义上传失败文件点击的事件。不提供默认是重新上传。
   */
  onRetryClick?: (item: UploaderItem) => void;
  /**
   * 自定义已上传文件点击的事件。不提供默认是调用 ImagePreview 进行预览。
   */
  onPreviewClick?: (item: UploaderItem) => void;
  /**
   * 自定义已上传文件点击删除按钮的事件。Promise.resolve 表示可以删除，Promise.reject 表示不可以删除。
   */
  onDeleteClick?: (item: UploaderItem) => Promise<void>;
  /**
   * 当上传文件超过大小时返回
   */
  onOverSize?: (item: UploaderItem) => void;
  /**
   * 当上传文件超过数量时返回
   */
  onOverCount?: (count: number, max: number) => void;
}
export interface UploaderInstance {

  /**
   * 获取已上传列表数据
   */
  getList: () => UploaderItem[];
  /**
   * 设置已上传列表数据
   */
  setList: (list: UploaderItem[]) => void;
  /**
   * 强制从已上传列表更新某个条目。如果条目在列表中不存在，则会添加到末尾。
   */
  updateListItem: (item: UploaderItem) => void;
  /**
   * 强制从已上传列表删除某个条目
   */
  deleteListItem: (item: UploaderItem) => void;
  /**
   * 开始手动上传所有条目
   */
  startUploadAll: () => Promise<void>;
  /**
   * 开始手动上传指定条目
   */
  startUpload: (item: UploaderItem) => Promise<void>;
  /**
   * 获取现在是否全部条目处于已上传并且完成状态
   */
  isAllUploadSuccess: () => boolean;
  /**
   * 获取现在是否有任意一个条目正在上传状态
   */
  isAnyUploading: () => boolean;
  /**
   * 获取现在是否有任意一个条目处于失败状态
   */
  isAnyFail: () => boolean;
  /**
   * 调用此函数与用户手动点击添加按钮效果相同
   */
  pick: () => void;
}

const isImageExt = [
  '.png',
  '.jpg',
  '.jpeg',
  '.bmp',
  '.webp',
];

/**
 * 上传组件
 */
export const Uploader = forwardRef<UploaderInstance, UploaderProps>((props, ref) => {

  const themeContext = useThemeContext();

  const {
    disabled = false,
    maxUploadCount = 1,
    maxFileSize = 0,
    showDelete = true,
    showUpload = true,
    uploadWhenAdded = true,
    uploadQueueMode = 'all',
    itemSize = themeContext.getThemeVar('UploaderItemSize', { width: deviceWidth / 4 - 15, height: deviceWidth / 4 - 15 }),
    onPickImage,
    onOverCount,
    onOverSize,
    onDeleteClick,
    onRetryClick,
    onPreviewClick,
    upload,
    renderUploadItem,
    renderAddButton,
    renderUploader,
  } = props;

  const [ currentUpladList, setCurrentUpladList ] = useState<UploaderItem[]>(props.intitalItems || []);

  //上传按钮点击
  function onUploadPress() {
    if (disabled) {
      return;
    }
    if (maxUploadCount > 1 && maxUploadCount - currentUpladList.length <= 0) {
      onOverCount ?
        onOverCount(maxUploadCount, currentUpladList.length) :
        Toast.text(`最多上传 ${maxUploadCount} 个文件哦！`);
      return;
    }

    const items = onPickImage ?
      onPickImage() :
      new Promise<UploaderItem[]>((resolve, reject) => {
        ImagePicker.pick({
          type: 'all',
          maxSelectNum: maxUploadCount - currentUpladList.length,
        }).then((res) => {
          resolve(res.result.map(item => ({
            filePath: item.path,
            previewPath: item.videoThumbnailPath,
            size: item.size,
            state: 'notstart',
          } as UploaderItem)));
        }).catch(reject);
      });

    items
      .then((res) => {
        if (maxFileSize > 0)
          res = res.filter((item) => {
            if (item.size && item.size > maxFileSize) {
              onOverSize?.(item);
              return false;
            }
            return true;
          });
        //添加条目
        setCurrentUpladList((prev) => prev.concat(res));
        //自动上传
        if (uploadWhenAdded)
          startUploadMulitItem(res);
      })
      .catch((e) => console.warn('PickImage failed', e));
  }
  //条目点击
  function onItemPress(item: UploaderItem) {
    if (item.state === 'fail') {
      onRetryClick ?
        onRetryClick(item) :
        //重试上传
        startUploadItem(item);
    } else {
      onPreviewClick ?
        onPreviewClick(item) :
        onItemPreview(item); //默认预览
    }
  }
  //条目预览
  function onItemPreview(item: UploaderItem) {
    //判断后缀是不是图片
    const previewPath = item.previewPath || item.filePath;
    let isImage = item.isImage;
    if (item.isImage === undefined) {
      for (const ext of isImageExt) {
        if (previewPath.endsWith(ext)) {
          isImage = true;
          break;
        }
      }
    }

    if (isImage) {
      ImagePreview.show({
        imageUrls: [ previewPath ],
      });
    } else {
      Linking.openURL(previewPath);
    }
  }
  //条目删除点击
  function onItemDeletePress(item: UploaderItem) {
    onDeleteClick ?
      onDeleteClick(item).then(() => {
        deleteListItem(item);
      }).catch(() => {}) :
      Dialog.confirm({
        title: '提示',
        content: '是否确认删除此文件？',
      }).then((confirm) => {
        if (confirm)
          deleteListItem(item);
      });
  }
  //更新列表条目
  function updateListItem(item: UploaderItem) {
    setCurrentUpladList((prev) => {
      const newList = prev.concat();
      const index = prev.findIndex((k) => k.filePath === item.filePath);
      index >= 0 ? newList[index] = { ...item } : newList.push(item);
      return newList;
    });
  }
  //删除列表条目
  function deleteListItem(item: UploaderItem) {
    setCurrentUpladList((prev) => prev.filter((k) => k.filePath !== item.filePath));
  }
  //开始上传条目
  function startUploadItem(item: UploaderItem) {
    return new Promise<void>((resolve, reject) => {
      if (item.state === 'success') {
        resolve();
        return;
      }
      upload({
        item,
        onError(error) {
          item.state = 'fail';
          item.message = ('' + error) || '上传失败';
          updateListItem(item);
          reject(error);
        },
        onFinish(message) {
          item.state = 'success';
          item.message = message || '上传完成';
          updateListItem(item);
          resolve();
        },
        onProgress(precent) {
          item.state = 'uploading';
          item.message = precent ? `${precent}%` : '上传中...';
          updateListItem(item);
        },
        onStart(message) {
          item.state = 'uploading';
          item.message = message || '上传中...';
          updateListItem(item);
        },
      });
    });
  }
  //开始上传条目
  function startUploadMulitItem(items: UploaderItem[]) : Promise<void> {
    if (uploadQueueMode === 'sequential')
      return items.reduce((promiseChain, currentItem) =>
        promiseChain.then(() => startUploadItem(currentItem)).catch(() => startUploadItem(currentItem)),
        Promise.resolve()
      );
    else
      return Promise.all(items.map(item => startUploadItem(item))) as unknown as Promise<void>;
  }

  useImperativeHandle(ref, () => ({
    startUploadAll() {
      return startUploadMulitItem(currentUpladList);
    },
    startUpload(item) {
      return startUploadItem(item);
    },
    setList(list) {
      setCurrentUpladList(list);
    },
    getList() {
      return currentUpladList;
    },
    deleteListItem(item) {
      deleteListItem(item);
    },
    updateListItem(item) {
      updateListItem(item);
    },
    pick() {
      onUploadPress();
    },
    isAllUploadSuccess: () => {
      return currentUpladList.every(k => k.state === 'success');
    },
    isAnyUploading: () => {
      return currentUpladList.find(k => k.state === 'uploading') !== undefined;
    },
    isAnyFail: () => {
      return currentUpladList.find(k => k.state === 'fail') !== undefined;
    },
  }));


  function renderAddBtn() : JSX.Element {
    return (
      disabled ? <></> : (
        renderAddButton ?
          renderAddButton({ onPress: onUploadPress, itemSize }) :
          <UploaderListAddItem onPress={onUploadPress} itemSize={itemSize} style={props.itemStyle} />
      )
    );
  }
  function renderItemsList() : JSX.Element {
    return (
      <RowView wrap style={[ styles.itemList, props.itemListStyle as ViewStyle ]}>
        {currentUpladList.map((item, index) => (
          renderUploadItem ?
            renderUploadItem({
              key: index,
              item: item,
              onPress: () => onItemPress(item),
              onDeletePress: () => onItemDeletePress(item),
              style: props.itemStyle,
              imageStyle: props.itemImageStyle,
              itemMaskStyle: props.itemMaskStyle,
              itemMaskTextStyle: props.itemMaskTextStyle,
              itemSize,
              showDelete: showDelete,
              defaultSource: props.itemDefaultSource,
            }) :
            <UploaderListItem
              key={index}
              item={item}
              showDelete={showDelete}
              onPress={() => onItemPress(item)}
              onDeletePress={() => onItemDeletePress(item)}
              style={props.itemStyle}
              imageStyle={props.itemImageStyle}
              itemMaskStyle={props.itemMaskStyle}
              itemMaskTextStyle={props.itemMaskTextStyle}
              defaultSource={props.itemDefaultSource}
              itemSize={itemSize}
            />
        ))}
        { currentUpladList.length < maxUploadCount ? renderAddBtn() : <></> }
      </RowView>
    );
  }

  return (
    renderUploader ?
      renderUploader({ onPress: onUploadPress, items: currentUpladList }) :
      (showUpload ? renderItemsList() : renderAddBtn())
  );
});

export interface UploaderListItemProps {
  key: unknown,
  item: UploaderItem;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  itemMaskTextStyle?: TextStyle;
  itemMaskStyle?: ViewStyle;
  itemSize: { width: number, height: number };
  showDelete: boolean;
  defaultSource: ImageURISource | number | undefined;
  onPress: () => void;
  onDeletePress: () => void;
}
export interface UploaderListAddItemProps {
  style?: ViewStyle;
  itemSize: { width: number, height: number };
  onPress: () => void;
}
export interface UploaderHoleProps {
  items: UploaderItem[],
  onPress: () => void;
}


const styles = StyleSheet.create({
  item: {
    position: 'relative',
    borderRadius: 10,
    backgroundColor: Color.grey.light,
    marginHorizontal: 2,
    marginBottom: 2,
  },
  itemImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 10,
    zIndex: 5,
  },
  itemList: {
  },
  itemMask: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 10,
  },
  itemMaskText: {
    marginTop: 5,
    color: '#fff',
  },
  itemDeleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 30,
    backgroundColor: '#fff',
  },
  itemAddButton: {
    backgroundColor: DynamicColor(Color.grey),
    borderRadius: 10,
    marginHorizontal: 2,
    marginBottom: 2,
  },
});

function UploaderListAddItem(props: UploaderListAddItemProps) {
  const themeStyles = useThemeStyles(styles);
  const themeContext = useThemeContext();

  return (
    <IconButton
      icon="add"
      size={themeContext.getThemeVar('UploaderAddIconSize', 30)}
      buttonStyle={{ ...themeStyles.itemAddButton, ...props.style, ...props.itemSize }}
      onPress={props.onPress}
    />
  );
}

class UploaderListItem extends React.Component<UploaderListItemProps> {

  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  shouldComponentUpdate(nextProps: Readonly<UploaderListItemProps>): boolean {
    return this.props.item.state !== nextProps.item.state
      || this.props.item.filePath !== nextProps.item.filePath
      || this.props.item.previewPath !== nextProps.item.previewPath
      || this.props.item.message !== nextProps.item.message;
  }
  render(): React.ReactNode {
    const { item, itemSize } = this.props;
    const itemMaskTextStyle = [ styles.itemMaskText, this.props.itemMaskTextStyle ];
    const itemMaskStyle = [ styles.itemMask, this.props.itemMaskStyle ];
    const itemMaskTextColor = (this.props.itemMaskTextStyle?.color || styles.itemMaskText.color) as string;
    const iconSize = this.context.getThemeVar('UploaderListItemIconSize', 26);
    return (
      <ColumnView touchable onPress={this.props.onPress} style={[styles.item, this.props.style as ViewStyle, itemSize]}>
        {
          this.props.showDelete ?
            <IconButton icon="delete-filling" color={Color.danger} buttonStyle={styles.itemDeleteButton} onPress={this.props.onDeletePress} /> :
            <></>
        }
        {
          item.state === 'uploading' ?
            <View style={itemMaskStyle}>
              <ActivityIndicator color={itemMaskTextColor} size={iconSize} />
              <Text style={itemMaskTextStyle}>{item.message}</Text>
            </View> :
            <></>
        }
        {
          item.state === 'fail' ?
            <View style={itemMaskStyle}>
              <Icon icon="error" color={itemMaskTextColor} size={iconSize} />
              <Text style={itemMaskTextStyle}>{item.message}</Text>
            </View> :
            <></>
        }
        <Image source={{ uri: item.previewPath || item.filePath }} defaultSource={this.props.defaultSource} style={[styles.itemImage, this.props.imageStyle, itemSize]} />
      </ColumnView>
    );
  }
}
