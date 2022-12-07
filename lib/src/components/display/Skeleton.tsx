import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";
import { Color } from "../../styles";
import { ThemeColor, useThemeContext } from "../../theme/Theme";
import { DynamicVar, useThemeStyles } from "../../theme/ThemeStyleSheet";
import { rpx, selectStyleType } from "../../utils";
import { ColumnView } from "../layout";

export interface SkeletonProps {
  /**
   * 加载等待时的占位元素
   */
  placeholder?: JSX.Element;
  /**
   * 为 true 时，显示占位元素。反之则显示子组件
   * @default false
   */
  loading?: boolean;
  /**
   * 是否展示动画效果
   * @default false
   */
  active?: boolean;
  /**
   * 实际内容
   */
  children?: JSX.Element|JSX.Element[];
  /**
   * 占位元素颜色
   * @default Color.skeleton
   */
  color?: ThemeColor;
}

export interface SkeletonAContextInfo {
  fadeAnim: Animated.Value,
  color: string,
}
export const SkeletonAContext = React.createContext<SkeletonAContextInfo|null>(null);

/**
 * 骨架屏 在需要等待加载内容的位置提供的占位组件。
 */
export function Skeleton(props: SkeletonProps) {
  const {
    loading = false,
    active = false,
    placeholder = <></>,
    children,
  } = props;

  const themeContext = useThemeContext();
  const themeVars = themeContext.getThemeVars({
    SkeletonAnimDuration: 1000,
    SkeletonAnimMinOpacity: 0.3,
  });

  const color = themeContext.resolveThemeColor(props.color, Color.skeleton);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeAnimInstance = useRef<Animated.CompositeAnimation|null>(null);

  //渐变动画
  useEffect(() => {
    if (active) {
      fadeAnimInstance.current = Animated.loop(Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: themeVars.SkeletonAnimMinOpacity,
          duration: themeVars.SkeletonAnimDuration,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: themeVars.SkeletonAnimDuration,
          useNativeDriver: true,
        }),
      ]));
      fadeAnimInstance.current.start();
    }

    return () => {
      if (fadeAnimInstance.current) {
        fadeAnimInstance.current.stop();
        fadeAnimInstance.current = null;
      }
    };
  }, [ active, fadeAnim, themeVars ]);

  return (
    <SkeletonAContext.Provider value={{ fadeAnim, color }}>
      { loading ? placeholder : children }
    </SkeletonAContext.Provider>
  );
}

export namespace Skeleton {

  type SkeletonItemSize = 'sm'|'md'|'lg';

  /**
   * Skeleton 基础形状
   */
  export function BaseBox(props: {
    style: (ViewStyle|undefined)[],
  }) {
    return (
      <SkeletonAContext.Consumer>
        { context => (
          <Animated.View
            style={[
              (context ? { opacity: context.fadeAnim, backgroundColor: context.color } : {}), //anim
              ...props.style,
            ]}
          />
        ) }
      </SkeletonAContext.Consumer>
    );
  }
  /**
   * 头像占位组件
   */
  export function Avatar(props: {
    /**
     * 形状预设
     * @default 'circle'
     */
    shape?: 'circle'|'square',
    /**
     * 大小预设
     * @default 'md'
     */
    size?: SkeletonItemSize,
    style?: ViewStyle,
  }) {
    const themeStyles = useThemeStyles(styles);
    return (
      <BaseBox style={[
        selectStyleType(props.shape, 'circle', {
          circle: themeStyles.skeletonAvatarCircle,
          square: themeStyles.skeletonAvatar,
        }),
        selectStyleType(props.size, 'md', {
          sm: themeStyles.skeletonAvatarSm,
          md: themeStyles.skeletonAvatarMd,
          lg: themeStyles.skeletonAvatarLg,
        }),
        props.style,
      ]}
    />);
  }
  /**
   * 标题占位组件
   */
  export function Title(props: {
    /**
     * 大小预设
     * @default 'md'
     */
    size?: SkeletonItemSize,
    style?: ViewStyle,
  }) {
    const themeStyles = useThemeStyles(styles);
    return <BaseBox
      style={[
        selectStyleType(props.size, 'md', {
          sm: themeStyles.skeletonTitleSm,
          md: themeStyles.skeletonTitleMd,
          lg: themeStyles.skeletonTitleLg,
        }),
        themeStyles.skeletonTitle,
        props.style,
      ]}
    />;
  }
  /**
   * 图片占位组件
   */
  export function Image(props: {
    style?: ViewStyle,
  }) {
    const themeStyles = useThemeStyles(styles);
    return <BaseBox
      style={[
        themeStyles.skeletonImage,
        props.style,
      ]}
    />;
  }
  /**
   * 段落占位组件
   */
  export function Paragraph(props: {
    /**
     * 设置段落占位图的行数
     * @default 4
     */
    rows?: number;
    style?: ViewStyle,
  }) {
    const themeStyles = useThemeStyles(styles);
    const rows = props.rows || 4;
    return <ColumnView>
      { new Array(rows).fill(null).map((_, i) => <BaseBox
        key={i}
        style={[
          i === rows - 1 ? themeStyles.skeletonParagraphLast : themeStyles.skeletonParagraph,
          props.style,
        ]}
      />) }
    </ColumnView>;
  }
  /**
   * 按钮占位组件
   */
  export function Button(props: {
    style?: ViewStyle,
  }) {
    const themeStyles = useThemeStyles(styles);
    return <BaseBox
      style={[
        themeStyles.skeletonButton,
        props.style,
      ]}
    />;
  }
}

const styles = StyleSheet.create({
  skeletonAvatar: {
    borderRadius: DynamicVar('SkeletonAvatarRadius', 5),
  },
  skeletonAvatarCircle: {
    borderRadius: DynamicVar('SkeletonAvatarCircleRadius', 500),
  },
  skeletonAvatarSm: {
    width: DynamicVar('SkeletonAvatarSmWidth', rpx(50)),
    height: DynamicVar('SkeletonAvatarSmHeight', rpx(50)),
  },
  skeletonAvatarMd: {
    width: DynamicVar('SkeletonAvatarMdWidth', rpx(80)),
    height: DynamicVar('SkeletonAvatarMdHeight', rpx(80)),
  },
  skeletonAvatarLg: {
    width: DynamicVar('SkeletonAvatarLgWidth', rpx(150)),
    height: DynamicVar('SkeletonAvatarLgHeight', rpx(150)),
  },
  skeletonTitle: {
    borderRadius: DynamicVar('SkeletonTitleRadius', 5),
    width: DynamicVar('SkeletonTitleWidth', '100%'),
  },
  skeletonTitleSm: {
    height: DynamicVar('SkeletonTitleSmHeight', rpx(50)),
  },
  skeletonTitleMd: {
    height: DynamicVar('SkeletonTitleMdHeight', rpx(70)),
  },
  skeletonTitleLg: {
    height: DynamicVar('SkeletonTitleLgHeight', rpx(130)),
  },
  skeletonImage: {
    borderRadius: DynamicVar('SkeletonImageRadius', 5),
  },
  skeletonParagraph: {
    borderRadius: DynamicVar('SkeletonParagraphBorderRadius', 5),
    width: DynamicVar('SkeletonParagraphWidth', '100%'),
    height: DynamicVar('SkeletonParagraphHeight', rpx(32)),
    marginBottom: DynamicVar('SkeletonParagraphMarginBottom', rpx(20)),
  },
  skeletonParagraphLast: {
    borderRadius: DynamicVar('SkeletonParagraphLastBorderRadius', 5),
    width: DynamicVar('SkeletonParagraphLastWidth', '60%'),
    height: DynamicVar('SkeletonParagraphLastHeight', rpx(32)),
    marginBottom: DynamicVar('SkeletonParagraphMarginBottom', 0),
  },
  skeletonButton: {
    borderRadius: DynamicVar('SkeletonButtonBorderRadius', 5),
    width: DynamicVar('SkeletonButtonWidth', rpx(155)),
    height: DynamicVar('SkeletonButtonHeight', rpx(82)),
  },
});
