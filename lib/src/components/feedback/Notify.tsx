import React, { createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import CheckTools from '../../utils/CheckTools';
import { Portal } from '../../portal';
import { ActivityIndicator, Animated, ListRenderItemInfo, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { deviceHeight, selectStyleType } from '../../utils';
import { Icon, IconProp } from '../basic/Icon';
import { Button } from '../button/Button';
import { Color } from '../../styles';
import { useDidMountEffect } from '../../hooks/CommonHooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeRender, useThemeContext } from '../../theme/Theme';
import { DynamicColorVar, DynamicVar, useThemeStyles } from '../../theme/ThemeStyleSheet';

//#region 创建容器与删除

const defaultProps = {
  type: 'message',
  showIcon: true,
  duration: 3500,
} as NotifyOptions;

let currentDefaultProps = { ...defaultProps } as NotifyOptions;
let currentNotifyId = 0;
let currentNotifyContainerOpen = false;
let currentNotifyRef = createRef<NotifyContainerInstance>();

function createNotify(options: NotifyOptions) : NotifyInstance {
  const notifyItem = {
    id: ++currentNotifyId,
    timeout: -1,
    closed: false,
    ...defaultProps,
    ...options,
  } as NotifyItem;

  if (currentNotifyContainerOpen === false) {
    currentNotifyContainerOpen = true;
    currentNotifyRef = createRef<NotifyContainerInstance>();
    let currentNotifyKey = Portal.add(
      <NotifyContainer
        ref={currentNotifyRef}
        onCloseStart={() => { currentNotifyContainerOpen = false; }}
        onCloseAnimFinish={() => { Portal.remove(currentNotifyKey); currentNotifyKey = 0; }}
      />
    );
    setTimeout(() => currentNotifyRef.current?.addNotify(notifyItem), currentNotifyKey === 0 ? 800 : 200);
  } else {
    currentNotifyRef.current?.addNotify(notifyItem);
  }

  //设置定时器，延迟关闭
  if (notifyItem.duration as number > 0) {
    notifyItem.timeout = setTimeout(() => {
      notifyItem.timeout = 0;
      if (!notifyItem.closed) {
        notifyItem.closed = true;
        currentNotifyRef.current?.deleteNotify(notifyItem.id);
      }
    }, notifyItem.duration) as unknown as number;
  }

  return {
    close() {
      if (!notifyItem.closed) {
        notifyItem.closed = true;
        currentNotifyRef.current?.deleteNotify(notifyItem.id);
      }
    },
    update(newOptions) {
      if (!notifyItem.closed)
        currentNotifyRef.current?.updateNotify(notifyItem.id, newOptions);
    },
  };
}
function destroyAllNotify() {
  if (currentNotifyRef.current) {
    currentNotifyRef.current?.close();
  }
}

//#endregion

//#region 通知渲染容器

const styles = StyleSheet.create({
  container:  {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: DynamicVar('NotifyContainerMaxHeight', deviceHeight * 0.3),
    backgroundColor: 'transparent',
  },
  containerInner:  {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 5,
  },
  notifyClickable: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: DynamicVar('NotifyClickablePaddingVertical', 15),
    paddingHorizontal: DynamicVar('NotifyClickablePaddingHorizontal', 20),
  },
  notify: {
    marginTop: DynamicVar('NotifyMarginTop', 10),
    marginHorizontal: DynamicVar('NotifyMarginHorizontal', 20),
    backgroundColor: DynamicColorVar('NotifyBackgroundColor', Color.light),
    borderRadius: DynamicVar('NotifyBorderRadius', 25),
    elevation: DynamicVar('NotifyElevation', 5),
    shadowColor: DynamicColorVar('NotifyShadowColor', Color.black),
    shadowOpacity: DynamicVar('NotifyShadowOpacity', 0.15),
    shadowOffset: DynamicVar('NotifyShadowOffset', { width: 0, height: 2 }),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  notifyText: {
    marginHorizontal: DynamicVar('NotifyTextMarginHorizontal', 5),
    fontSize: DynamicVar('NotifyTextFontSize', 14),
    color: DynamicColorVar('NotifyTextColor', Color.black),
  },
  messageItemStyle: { backgroundColor: DynamicColorVar('NotifyMessageBackgroundColor', Color.notify) },
  loadingItemStyle: { backgroundColor: DynamicColorVar('NotifyLoadingBackgroundColor', Color.notify) },
  errorItemStyle: { backgroundColor: DynamicColorVar('NotifyErrorBackgroundColor', Color.danger) },
  successItemStyle: { backgroundColor: DynamicColorVar('NotifySuccessBackgroundColor', Color.success) },
  waringItemStyle: { backgroundColor: DynamicColorVar('NotifyWaringBackgroundColor', Color.warning) },
});

export interface NotifyInstance {
  /**
   * 更新当前显示的通知内容
   */
  update: (options: Omit<NotifyOptions, 'duration'|'onClick'|'onButtonClick'>) => void;
  /**
   * 关闭当前通知
   */
  close: () => void;
}
interface NotifyItem extends NotifyOptions {
  id: number;
  timeout: number;
  closed: boolean;
  delAnimFlg: boolean;
}
interface NotifyContainerInstance {
  close: () => void;
  deleteNotify: (id: number) => void;
  addNotify: (options: NotifyItem) => void;
  updateNotify: (id: number, options: NotifyOptions) => void;
}
interface NotifyContainerProps {
  onCloseAnimFinish: () => void;
  onCloseStart: () => void;
}

//条目组件
function NotifyItemControl(props: {
  item: NotifyItem,
  first: boolean,
  removeFlag: boolean,
  canRemove: boolean,
  onRemoveAnimFinish: () => void,
}) {
  const { item, first, removeFlag, canRemove, onRemoveAnimFinish } = props;

  const themeContext = useThemeContext();
  const themeStyles = useThemeStyles(styles);
  const themeVars = themeContext.getThemeVars({
    NotifySideAnimDuration: 500,
    NotifyFadeAnimDuration: 300,
  });

  let icon = item.icon || selectStyleType(item.type, 'message', {
    message: themeContext.getThemeVar('NotifyMessageIcon', ''),
    error: themeContext.getThemeVar('NotifyErrorIcon', 'delete-filling'),
    waring: themeContext.getThemeVar('NotifyWaringIcon', 'warning-filling'),
    success: themeContext.getThemeVar('NotifySuccessIcon', 'success-filling'),
    loading: themeContext.getThemeVar('NotifyLoadingIcon', 'loading'),
  });

  const animSideValue = useRef(new Animated.Value(first ? 0 : -deviceHeight));
  const animOpacityValue = useRef(new Animated.Value(first ? 1 : 0));


  const colorStyle = selectStyleType(item.type, 'message', {
    message: themeStyles.messageItemStyle,
    loading: themeStyles.loadingItemStyle,
    error:  themeStyles.errorItemStyle,
    success: themeStyles.successItemStyle,
    waring: themeStyles.waringItemStyle,
  });
  const textColor = themeContext.resolveThemeColor(selectStyleType(item.type, 'message', {
    message: themeContext.getThemeVar('NotifyMessageTextColor', Color.text),
    loading: themeContext.getThemeVar('NotifyLoadingTextColor', Color.text),
    error: themeContext.getThemeVar('NotifyErrorTextColor', Color.white.light),
    success: themeContext.getThemeVar('NotifySuccessTextColor', Color.white.light),
    waring: themeContext.getThemeVar('NotifyWaringTextColor', Color.white.light),
  }) || Color.primary);

  useDidMountEffect(() => {
    if (!first) {
      Animated.parallel([
        Animated.timing(animSideValue.current, {
          toValue: 0,
          duration: themeVars.NotifySideAnimDuration,
          useNativeDriver: true,
        }),
        Animated.timing(animOpacityValue.current, {
          toValue: 1,
          duration: themeVars.NotifyFadeAnimDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  });
  useEffect(() => {
    if (removeFlag) {
      Animated.parallel([
        Animated.timing(animOpacityValue.current, {
          toValue: 0,
          duration: themeVars.NotifyFadeAnimDuration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onRemoveAnimFinish();
      });
    }
  }, [ themeVars, removeFlag, onRemoveAnimFinish ]);

  //执行移除动画
  function removeByUser() {
    Animated.parallel([
      Animated.timing(animOpacityValue.current, {
        toValue: 0,
        duration: themeVars.NotifyFadeAnimDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemoveAnimFinish();
    });
  }

  function onClick() {
    removeByUser();
    item.onClick && item.onClick();
  }
  function onButtonClick() {
    removeByUser();
    item.onButtonClick && item.onButtonClick();
  }

  return (
    <Animated.View style={[ themeStyles.notify, colorStyle, item.style, {
      transform: [{ translateY: animSideValue.current }],
      opacity: animOpacityValue.current,
    }]}>
      <TouchableOpacity style={themeStyles.notifyClickable} activeOpacity={0.8} onPress={canRemove ? onClick : undefined}>
        {
          //加载中提示
          (item.showIcon && icon !== '') ?
            (icon === 'loading' ?
              <ActivityIndicator size="small" color={textColor} /> :
              <Icon icon={icon} color={textColor} {...item.iconProps} style={item.textStyle} />) :
            <></>
        }
        {
          //主内容
          typeof item.content === 'string' ?
            <Text style={[ themeStyles.notifyText, { color: textColor }, item.textStyle ]}>{item.content}</Text> :
            item.content
        }
        {
          //一个附加按钮
          !CheckTools.isNullOrEmpty(item.button) ? <Button type="text" padding={0} onPress={onButtonClick}>{item.button}</Button> :
          <></>
        }
      </TouchableOpacity>
    </Animated.View>
  );
}
//条目容器组件
const NotifyContainer = forwardRef<NotifyContainerInstance, NotifyContainerProps>((props, ref) => {

  const [ notifys, setNotifys ] = useState<NotifyItem[]>([]);

  const animSideValue = useRef(new Animated.Value(-deviceHeight));

  const themeStyles = useThemeStyles(styles);

  const insets = useSafeAreaInsets();

  function doCloseContainer() {
    props.onCloseStart();
    animSideValue.current.setValue(0);
    Animated.timing(animSideValue.current, {
      toValue: -deviceHeight,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      props.onCloseAnimFinish();
    });
  }

  useDidMountEffect(() => {
    Animated.timing(animSideValue.current, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  });

  //立即删除子条目，无动画
  function realRemoveItem(id: number) {
    if (notifys.length === 1 && notifys[0].id === id) {
      doCloseContainer();
      return;
    }
    //删除一个条目
    setNotifys(prev => {
      return prev.filter(k => k.id !== id);
    });
  }
  //运行动画后再删除条目
  function animRemoveItem(id: number) {
    if (notifys.length === 1 && notifys[0].id === id) {
      doCloseContainer();
      return;
    }
    //删除一个条目
    setNotifys(prev => {
      return prev.map(k => {
        if (k.id === id) {
          k.delAnimFlg = true;
          return k;
        }
        return k;
      });
    });
  }

  useImperativeHandle(ref, () => ({
    close: () => {
      //关闭容器
      doCloseContainer();
    },
    deleteNotify: (id: number) => {
      animRemoveItem(id);
    },
    addNotify: (options: NotifyItem) => {
      //添加一个条目
      setNotifys(prev => {
        return prev.concat(options);
      });
    },
    updateNotify: (id: number, options: NotifyOptions) => {
      //更新一个条目
      setNotifys(prev => {
        return prev.map(k => {
          return k.id === id ? {
            ...k,
            ...options,
          } : k;
        });
      });
    },
  }));

  function renderNotifyItem(info: ListRenderItemInfo<NotifyItem>) {
    return <ThemeRender>{() => (
      <NotifyItemControl
        item={info.item}
        first={info.index === 0}
        removeFlag={info.item.delAnimFlg}
        canRemove={!info.item.duration || info.item.duration <= 0}
        onRemoveAnimFinish={() => realRemoveItem(info.item.id)}
      />)
    }</ThemeRender>;
  }

  return (
    <Animated.FlatList
      style={[
        themeStyles.container,
        {
          transform: [{ translateY: animSideValue.current }],
          marginTop: insets.top,
        },
      ]}
      contentContainerStyle={themeStyles.containerInner}
      pointerEvents="box-none"
      data={notifys}
      renderItem={renderNotifyItem}
    />
  );
});

//#endregion

export interface NotifyOptions {
  /**
   * 类型
   */
  type?: 'success'|'waring'|'error'|'message'|'loading';
  /**
   * 左侧图标
   */
  icon?: string;
  /**
   * 图标自定义属性
   */
  iconProps?: IconProp;
  /**
   * 是否显示指定类型的图标
   */
  showIcon?: boolean;
  /**
   * 展示时长(ms)，值为 0 时，notify 不会消失。默认：1500
   */
  duration?: number;
  /**
   * 展示文案
   */
  content: string | React.ReactNode;
  /**
   * 允许你在消息右侧添加一个指定文字的按钮，点击此按钮会触发 onButtonClick 事件。
   */
  button?: string;
  /**
   * 自定义文字样式
   */
  textStyle?: TextStyle;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 用户点击消息时发出此事件
   */
  onClick?: () => void;
  /**
   * 用户点击右侧按钮时发出事件。
   */
  onButtonClick?: () => void;
}

/**
 * 在页面顶部展示消息提示。
 */
export const Notify = {
  /**
   * 展示提示
   * @param options 参数
   */
  show(options: NotifyOptions) : NotifyInstance {
    return createNotify(options);
  },
  /**
   * 关闭提示
   */
  clear() {
    destroyAllNotify();
  },
  /**
   * 	重置默认配置，对所有 Notify 生效
   */
  resetDefaultOptions() {
    currentDefaultProps = { ...defaultProps };
  },
  /**
   * 修改默认配置，对所有 Notify 生效
   * @param options 配置
   */
  setDefaultOptions(options: NotifyOptions) {
    currentDefaultProps = {
      ...currentDefaultProps,
      ...options,
    };
  },
};
