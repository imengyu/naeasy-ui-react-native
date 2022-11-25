import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";
import { Color, ThemeColor, ThemeSelector } from "../../styles";
import { rpx, selectStyleType } from "../../utils";
import { ColumnView } from "../layout";

export interface SkeletonProps {
  /**
   * 加载等待时的占位元素
   */
  placeholder?: JSX.Element;
  /**
   * 为 true 时，显示占位元素。反之则显示子组件
   */
  loading?: boolean;
  /**
   * 是否展示动画效果
   */
  active?: boolean;
  /**
   * 实际内容
   */
  children?: JSX.Element|JSX.Element[];
  /**
   * 占位元素颜色
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

  const color = ThemeSelector.colorNoNull(props.color, Color.skeleton);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeAnimInstance = useRef<Animated.CompositeAnimation|null>(null);

  //渐变动画
  useEffect(() => {
    if (active) {
      fadeAnimInstance.current = Animated.loop(Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
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
  }, [ active, fadeAnim ]);

  return (
    <SkeletonAContext.Provider value={{ fadeAnim, color }}>
      { loading ? placeholder : children }
    </SkeletonAContext.Provider>
  );
}

export namespace Skeleton {

  type SkeletonItemSize = 'sm'|'md'|'lg';

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
    shape?: 'circle'|'square',
    size?: SkeletonItemSize,
    style?: ViewStyle,
  }) {
    return (
      <BaseBox style={[
        selectStyleType(props.shape, 'circle', {
          circle: styles.skeletonAvatarCircle,
          square: styles.skeletonAvatar,
        }),
        selectStyleType(props.size, 'md', {
          sm: styles.skeletonAvatarSm,
          md: styles.skeletonAvatarMd,
          lg: styles.skeletonAvatarLg,
        }),
        props.style,
      ]}
    />);
  }
  /**
   * 标题占位组件
   */
  export function Title(props: {
    size?: SkeletonItemSize,
    style?: ViewStyle,
  }) {
    return <BaseBox
      style={[
        selectStyleType(props.size, 'md', {
          sm: styles.skeletonTitleSm,
          md: styles.skeletonTitleMd,
          lg: styles.skeletonTitleLg,
        }),
        styles.skeletonTitle,
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
    return <BaseBox
      style={[
        styles.skeletonImage,
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
     */
    rows?: number;
    style?: ViewStyle,
  }) {
    const rows = props.rows || 4;
    return <ColumnView>
      { new Array(rows).fill(null).map((_, i) => <BaseBox
        key={i}
        style={[
          i === rows - 1 ? styles.skeletonParagraphLast : styles.skeletonParagraph,
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
    return <BaseBox
      style={[
        styles.skeletonButton,
        props.style,
      ]}
    />;
  }
}

const styles = StyleSheet.create({
  skeletonAvatar: {
    borderRadius: 5,
  },
  skeletonAvatarCircle: {
    borderRadius: 500,
  },
  skeletonAvatarSm: {
    width: rpx(50),
    height: rpx(50),
  },
  skeletonAvatarMd: {
    width: rpx(80),
    height: rpx(80),
  },
  skeletonAvatarLg: {
    width: rpx(150),
    height: rpx(150),
  },
  skeletonTitle: {
    borderRadius: 5,
    width: '100%',
  },
  skeletonTitleSm: {
    height: rpx(50),
  },
  skeletonTitleMd: {
    height: rpx(70),
  },
  skeletonTitleLg: {
    height: rpx(130),
  },
  skeletonImage: {
    borderRadius: 5,
  },
  skeletonParagraph: {
    borderRadius: 5,
    width: '100%',
    height: rpx(32),
    marginBottom: rpx(20),
  },
  skeletonParagraphLast: {
    borderRadius: 5,
    width: '60%',
    height: rpx(32),
    marginBottom: 0,
  },
  skeletonButton: {
    borderRadius: 5,
    width: rpx(155),
    height: rpx(82),
  },
});
