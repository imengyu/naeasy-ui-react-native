import React, { createRef } from 'react';
import { findNodeHandle, HostComponent, NativeSyntheticEvent, requireNativeComponent, StyleSheet, UIManager, View, ViewStyle } from 'react-native';
import { Color } from '../../styles';
import { ThemeColor, ThemeContext } from '../../theme/Theme';
import { isAndroid, isIOS } from '../../utils/PlatformTools';

const ComponectIOSName = 'RCTUIPickerView';
const ComponectAndroidName = 'RCTPickerWheelView';

interface PickerWhellViewSelectEvent {
  /**
   * 选中项的索引
   */
  index: number;
}
interface PickerWhellViewIOSSelectEvent {
  /**
   * 选中行的索引
   */
  row: number;
  /**
   * 选中列的索引
   */
  component: number;
}

interface PickerWhellViewAndroidProps {
  style?: ViewStyle,
  /**
   * 数据
   */
  options?: string[];
  /**
  * 设置当前选中的条目
  */
  currentItem?: number;
  /**
  * 选中项文字颜色设置
  */
  textColorCenter?: ThemeColor;
  /**
  * 未选中项文字颜色设置
  */
  textColorOut?: ThemeColor;
  /**
   * 文字大小
   */
  textSize?: number;
  /**
   * 滚轮是否渐变透明的开关
   *
   * @platform Android
   */
  alphaGradient?: boolean;
  /**
   * 是否循环滚动
   *
   * @platform Android
   */
  cyclic?: boolean;
  /**
   * 分割线颜色设置
   *
   * @platform Android
   */
  dividerColor?: ThemeColor;
  /**
    * 分隔线类型
    *
    * @platform Android
    */
  dividerType?: 'FILL'|'WARP'|'CIRCLE';
  /**
    * 分割线宽度
    *
    * @platform Android
    */
  dividerWidth?: number;
  /**
    * 内容对齐方式 支持
    * * PickerWhellView.GravityBOTTOM
    * * PickerWhellView.GravityCENTER
    * * PickerWhellView.GravityCENTER_HORIZONTAL
    * * PickerWhellView.GravityCENTER_VERTICA
    * * PickerWhellView.GravityTOP
    * * PickerWhellView.GravityLEFT
    * * PickerWhellView.GravityRIGHT
    *
    * @platform Android
    */
  gravity?: number;
  /**
    * 单位（Label）填null或空串不显示
    *
    * @platform Android
    */
  label?: string;
  /**
    * 滚轮间距设置（1.2-2.0倍，此为文字高度的间距倍数）
    *
    * @platform Android
    */
  lineSpacingMultiplier?: number;
  /**
   * 设置X轴偏移量，形成弧度
   *
   * @platform Android
   */
  textXOffset?: number;
   /**
    * 设置滚轮滚动高度
    *
    * @platform Android
    */
  totalScrollY?: number;
  /**
   * 选中条目事件
   */
  onItemSelected?: (e: NativeSyntheticEvent<PickerWhellViewSelectEvent>) => void;
}
interface PickerWhellViewIOSProps {
  style?: ViewStyle,
  /**
    * 数据IOS
    *
    * @platform iOS
    */
  data?: string[]|string[][];
  /**
   * 选中项
   */
  selectedIndex?: number[],
  /**
   * 设置行高
   *
   * @platform iOS
   */
  rowHeight?: number;
  /**
   * 选中条目事件
   */
  onSelectRow?: (e: NativeSyntheticEvent<PickerWhellViewIOSSelectEvent>) => void;
}

export interface PickerWhellViewProps {
  style?: ViewStyle,
  /**
   * 指定高度
   */
  height?: number,
  /**
   * 数据
   */
  options?: string[][];
  /**
    * 设置选中项
    */
  selectedIndex?: number[];
  /**
   * Android 组件自定义样式
   */
  androidProps?: Omit<PickerWhellViewAndroidProps, 'options'|'currentItem'|'onItemSelected'>;
  /**
   * Android 组件自定义样式
   */
  iosProps?: Omit<PickerWhellViewIOSProps, 'options'|'selectedIndex'|'numberOfComponents'|'onSelectRow'>;
  /**
   * 选中条目事件
   */
  onValueChange?: (selectIndex: number[]) => void;
}

let PickerWhellViewAndroid : HostComponent<PickerWhellViewAndroidProps>|null = null;
let PickerWhellViewIOS : HostComponent<PickerWhellViewIOSProps>|null = null;

const styles = StyleSheet.create({
  host: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    height: '100%',
  },
});

interface State {}

/**
 * 选择器的轮盘控件
 */
export class PickerWhellView extends React.Component<PickerWhellViewProps, State> {

  static contextType = ThemeContext;

  context!: React.ContextType<typeof ThemeContext>;

  constructor(props: PickerWhellViewProps) {
    super(props);
    if (!PickerWhellViewAndroid && isAndroid)
      PickerWhellViewAndroid = requireNativeComponent(ComponectAndroidName) as HostComponent<PickerWhellViewAndroidProps>;
    if (!PickerWhellViewIOS && isIOS)
      PickerWhellViewIOS = requireNativeComponent(ComponectIOSName) as HostComponent<PickerWhellViewIOSProps>;
  }

  private iosReloadAllComponents() {
    //向native层发送命令
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.iosViewRef.current),
      UIManager.getViewManagerConfig(ComponectIOSName).Commands.reloadAllComponents,
      []
    );
  }
  private iosSelectRow(options: {
    row: number,
    component: number,
    animated: boolean,
  }) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.iosViewRef.current),
      UIManager.getViewManagerConfig(ComponectIOSName).Commands.selectRow,
      [ options ]
    );
  }
  private iosReloadComponent(options: {
    component: number,
    data: string[],
  }) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.iosViewRef.current),
      UIManager.getViewManagerConfig(ComponectIOSName).Commands.reloadComponent,
      [ options ]
    );
  }

  private onIOSSelectRow = (e: NativeSyntheticEvent<PickerWhellViewIOSSelectEvent>) => {
    this.selectedIndex[e.nativeEvent.component] = e.nativeEvent.row;
    this.emitValueChange();
  }

  private iosViewRef = createRef<typeof PickerWhellViewIOS>();

  private iosRenderPicker() {
    //防止选中项有undefined出现
    const options = this.props.options;
    if (options) {
      this.selectedIndex = this.props.selectedIndex ? this.props.selectedIndex.concat() : options.map(() => 0);
      if (this.selectedIndex.length !== options.length) {
        for (let i = 0; i < options.length; i++) {
          if (this.selectedIndex[i] === undefined || this.selectedIndex[i] < 0)
            this.selectedIndex[i] = 0;
        }
      }
    }

    return (
      PickerWhellViewIOS ? <PickerWhellViewIOS
        { ...this.props.iosProps }
        ref={this.iosViewRef as any}
        style={this.props.style}
        data={this.props.options}
        selectedIndex={this.selectedIndex.concat()}
        onSelectRow={this.onIOSSelectRow}
      /> : <></>
    );
  }

  /**
   * 获取当前选中的项目索引
   */
  selectedIndex: number[] = [];

  /**
   * 强制重新加载所有列数据（仅iOS支持）
   */
  public reloadAllComponents() {
    if (isIOS)
      this.iosReloadAllComponents();
  }
  /**
   * 强制重新加载某个列的数据（仅iOS支持）
   * @param component 列
   * @param data 新数据
   */
  public reloadComponent(component: number, data: string[]) {
    if (isIOS)
      this.iosReloadComponent({ component, data });
  }
  /**
   * 手动选中指定行
   * @param row 行索引
   * @param component 列索引
   * @param animated 是否使用动画效果 (iOS)
   */
  public selectRow(row: number, component: number, animated?: boolean) {
    if (isIOS) {
      this.iosSelectRow({ row, component, animated: animated === true });
    } else if (isAndroid) {
      this.androidSetCurrentIndex(row, component);
    }
  }

  private emitValueChange() {
    setTimeout(() => {
      if (!this.noEmit && this.props.onValueChange)
        this.props.onValueChange(this.selectedIndex);
    }, 20);
  }

  private androidWhellRefs = [] as React.RefObject<HostComponent<PickerWhellViewAndroidProps> | null>[];

  private androidRenderWhells() {
    const data = this.props.options;
    if (!data)
      return;
    const count = data.length;
    const width = `${100 / count}%`;
    const arr = [] as JSX.Element[];

    this.selectedIndex = this.props.selectedIndex || data.map(() => 0);

    let xOffsetStart = count >= 2 ? (count / 2) * 20 : 0;

    this.androidWhellRefs.splice(0, this.androidWhellRefs.length);
    for (let i = 0; i < data.length; i++) {
      this.androidWhellRefs[i] = createRef<typeof PickerWhellViewAndroid>();
      arr.push(
        PickerWhellViewAndroid ? <PickerWhellViewAndroid
          { ...this.props.androidProps }
          ref={this.androidWhellRefs[i] as any}
          textColorCenter={this.context.resolveThemeColor(this.props.androidProps?.textColorCenter, Color.black)}
          textColorOut={this.context.resolveThemeColor(this.props.androidProps?.textColorCenter, Color.text)}
          key={'PickerWhellView' + i}
          style={{ ...styles.item, ...this.props.androidProps?.style, width: width }}
          options={data[i] as string[]}
          currentItem={this.selectedIndex[i]}
          textXOffset={xOffsetStart}
          onItemSelected={(e) => {
            this.selectedIndex[i] = e.nativeEvent.index;
            this.emitValueChange();
          }}
        /> : <></>
      );
      xOffsetStart -= (i === Math.ceil(count / 2) ? 40 : 20);
    }
    return arr;
  }
  private androidSetCurrentIndex(row: number, component: number) {
    const ref = this.androidWhellRefs[row];
    if (ref) {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(ref.current),
        UIManager.getViewManagerConfig(ComponectAndroidName).Commands.selectRow,
        [ component ]
      );
    }
  }

  noEmit = false;

  componentWillUnmount() {
    this.noEmit = true;
  }
  render(): React.ReactNode {
    return (
      isAndroid ?
        <View style={[
          styles.host,
          this.props.style,
        ]}>{ this.androidRenderWhells() }</View> :
        (isIOS ? this.iosRenderPicker() : <></>)
    );
  }
}
