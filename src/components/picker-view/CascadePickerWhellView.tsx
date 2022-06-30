import React from "react";
import PickerWhellView, { PickerWhellViewProps } from "./PickerWhellView";

/**
 * 级联数据定义
 */
export interface CascadePickerWhellItem {
  /**
   * 数据文本
   */
  label: string;
  /**
   * 数据数值
   */
  value?: string|number|undefined;
  /**
   * 父级数值，如果没有父级，可设置 null
   */
  parentValue?: string|number|null|undefined;
}

export interface CascadePickerWhellViewProps extends Omit<PickerWhellViewProps, 'options'|'selectedIndex'|'onValueChange'> {
  /**
   * 数据
   */
  options: CascadePickerWhellItem[];
  /**
   * 初始选中的项目数值
   */
  selectValues?: string[];
  /**
   * 设置滚动数据列数
   */
  numberOfComponents: number;
  /**
   * 选中条目事件
   */
  onValueChange?: (selectIndex: CascadePickerWhellItem[]) => void;
}

interface CascadePickerWhellViewState {
  data: string[][];
  selectedIndex: number[];
}

/**
 * 这个是带级联的选择器组件
 */
export class CascadePickerWhellView extends React.Component<CascadePickerWhellViewProps, CascadePickerWhellViewState> {

  state: Readonly<CascadePickerWhellViewState> = {
    data: [],
    selectedIndex: [],
  };

  selectedIndexLast = [] as number[];

  //用户选中项更改
  private onValueChange = (sel: number[]) => {
    //获取选中索引更改的列
    let changedIndex = -1;
    for (let i = 0; i < this.props.numberOfComponents; i++) {
      if (sel[i] !== this.selectedIndexLast[i]) {
        changedIndex = i;
        break;
      }
    }
    //仅从更改的列开始更改，防止一下全部更改
    if (changedIndex >= 0) {
      this.setDataArray(changedIndex, sel);
    }
  };

  private dataArray = [] as CascadePickerWhellItem[][];

  //通知更改
  private emitChange() {
    if (this.props.onValueChange) {
      this.props.onValueChange(this.getSelectedData());
    }
  }

  /**
   * 获取当前选中的数据
   */
  public getSelectedData() {
    const selData = [] as CascadePickerWhellItem[];
    const selArray = this.state.selectedIndex;
    for (let i = 0; i < selArray.length; i++)
      selData[i] = this.dataArray[i][selArray[i]];
    return selData;
  }

  //更新级联选择的数据
  private setDataArray(startIndex: number, selCurrent: number[]|null) {
    const numberOfComponents = this.props.numberOfComponents;

    if (startIndex >= numberOfComponents)
      return;

    this.setState((prevState) => {

      const options = this.props.options;
      const selectValues = this.props.selectValues || new Array(numberOfComponents).fill(null);
      const selectedIndex = prevState.selectedIndex.concat() || [];
      const data = [] as string[][];

      for (let i = 0; i < numberOfComponents; i++) {
        if (typeof selectedIndex[i] === 'undefined' || selectedIndex[i] < 0)
          selectedIndex[i] = 0;
      }

      //按列筛选数据
      for (let i = 0; i < numberOfComponents; i++) {

        if (i === 0) {
          //筛选顶级数据
          this.dataArray[0] = options.filter((item) => typeof item.parentValue === 'undefined' || item.parentValue == null);
          //生成显示数据
          data.push(this.dataArray[0].map((item) => item.label));
        }
        else {
          if (typeof selectedIndex[i - 1] === 'undefined')
            selectedIndex[i - 1] = 0;
          //上一列选中的数据
          const sel = this.dataArray[i - 1][selectedIndex[i - 1]];
          if (!sel)
            break;
          //筛选当前列数据
          this.dataArray[i] = options.filter((item) => (item.parentValue === sel.value));
          //生成显示数据
          data.push(this.dataArray[i].map((item) => item.label));
        }

        //计算选中索引
        const selectValue = selectValues[i];
        if (selectValue)
          selectedIndex[i] = options.findIndex((item) => (item.value === selectValue || item.label === selectValue));
        else if (typeof selectedIndex[i] === 'undefined')
          selectedIndex[i] = 0;
        else if (selCurrent)
          selectedIndex[i] = selCurrent[i];
        //防止选项因为级联数据变化而溢出
        if (selectedIndex[i] >= this.dataArray[i].length)
          selectedIndex[i] = this.dataArray[i].length - 1;
      }

      if (selCurrent)
        setTimeout(() => this.emitChange(), 100);

      this.selectedIndexLast = selectedIndex.concat();

      //console.log(selectedIndex, data);

      return {
        data,
        selectedIndex,
      };
    });
  }

  componentDidMount() {
    this.setDataArray(0, null);
  }
  componentWillUnmount() {

  }

  render(): React.ReactNode {
    return (
      <PickerWhellView
        { ...this.props }
        options={this.state.data}
        selectedIndex={this.state.selectedIndex}
        onValueChange={this.onValueChange}
      />
    );
  }
}


