import React, { createRef } from "react";
import { LoadingPage, LoadingPageProps } from "../loading/LoadingPage";
import { SmartRefreshControl, SmartRefreshControlProps } from "../refresh/android-smart-refresh/SmartRefreshControl";
import { WhiteSpace } from "../space/WhiteSpace";
import { ActivityIndicator, FlatList, FlatListProps, ImageSourcePropType, ListRenderItemInfo, RefreshControl, RefreshControlProps, Text, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../button/Button";
import { XBarSpace } from "../space/XBarSpace";
import { Empty } from "../feedback/Empty";
import { Color, DynamicColor, DynamicThemeStyleSheet, ThemeSelector } from "../../styles";
import { isAndroid, isIOS } from "../../utils/PlatformTools";
import { rpx } from "../../utils/StyleConsts";
import { SmartRefreshControlClassicsHeader } from "../refresh/android-smart-refresh/ClassicsHeader";
import { ColumnView } from "../layout/ColumnView";
import CheckTools from "../../utils/CheckTools";
import ArrayUtils from "../../utils/ArrayUtils";
import TimeUtils from "../../utils/TimeUtils";

export interface FlatListWapperListItem {
  /**
   * 渲染类型，可以是头部或者尾部，，默认是普通
   * * 如果是普通，则渲染此数据会调用 renderItem 回调
   * * 如果是 head 头部，则渲染此数据会调用 renderHeader 回调
   * * 如果是 footer 尾部，则渲染此数据会调用 renderFooter 回调
   */
  renderType?: 'head'|'footer'|'normal'|'loader'|'empty',
}
export interface FlatListWapperLoadDataRet<T extends FlatListWapperListItem> {
  /**
   * 数据
   */
  data: T[],
  /**
   * 返回这个至表示是否还有更多数据
   */
  hasMoreData: boolean,
}
export interface FlatListWapperProps<T extends FlatListWapperListItem> extends Omit<FlatListProps<T>, 'data'|'renderItem'|'keyExtractor'> {
  /**
   * 预设的头部固定数据，会自动追加至数据头部，通常可以用于头部吸附
   */
  preHeaderData?: T[],
  /**
   * 预设的头部固定数据，会自动追加至数据头部，通常可以用于头部吸附
   */
  preFooterData?: T[],
  /**
   * 主键生成
   */
  keyExtractor?: ((item: T, index: number) => string) | undefined
  /**
   * 加载数据回调
   */
  loadData?: (current: number, pageSize: number, isRefresh: boolean) => Promise<FlatListWapperLoadDataRet<T>>;
  /**
   * 加载数据完成后处理回调
   */
  solveData?: (data: T[]) => T[];
  /**
   * 渲染头
   */
  renderHeader?: (item: T, i: number) => JSX.Element;
  /**
   * 渲染普通条目
   */
  renderItem?: (item: T, i: number) => JSX.Element;
  /**
   * 渲染尾条目
   */
  renderFooter?: (item: T, i: number) => JSX.Element;
  /**
   * 渲染底部加载指示器
   */
  renderLoader?: (props: FlatListLoaderProps) => JSX.Element;
  /**
   * 是否在列表底部添加安全区 (特别是ios，建议全屏的列表加上这个)，默认否
   */
  addXBarSpace?: boolean;
  /**
   * 是否在列表底部添加安全区高度
   */
  addBottomSpace?: number;
  /**
   * 渲染空页面
   */
  renderEmptyPage?: (state: 'empty'|'error'|'loading', text: string, retry: () => void, err: unknown) => JSX.Element|undefined;
  /**
   * 自定义渲染列表
   */
  renderList?: (props: FlatListProps<T>) => JSX.Element,
  /**
   * 加载中页面的自定义属性
   */
  loadingPageProps?: LoadingPageProps;
  /**
   * 加载中文字，默认是“加载中”
   */
  loadingText?: string;
  /**
   * 数据全部加载完成文字，默认是“到底啦”
   */
  loadFinishText?: string;
  /**
   * 没有数据时的底部文字，默认是“没有数据”
   */
  loadFinishNoneText?: string;
  /**
   * 列表初始化的时候是否需要加载一次数据，默认是
   */
  loadDataAtStart?: boolean;
  /**
   * 重新加载按钮文字，默认是“重试”
   */
  retryText?: string;
  /**
   * 加载数据页大小，默认20
   */
  pageSize?: number;
  /**
   * 加载页码跳页，默认1
   */
  pageStep?: number;
  /**
   * 指定列表加载失败时是否显示错误页面，默认是
   */
  showLoadErrorPage?: boolean;
  /**
   * 指定列表加载是是否显示加载中页面，默认是
   */
  showLoadingPage?: boolean;
  /**
   * 指定列表没有数据时是否显示空页，默认是
   */
  showEmptyPage?: boolean;
  /**
   * 显示底部加载器？，默认是
   */
  showLoader?: boolean;
  /**
   * 指定列表滚动到底部时是否触发加载下一页，默认是。如果设置为否，你需要自己调用加载函数
   */
  canLoadMore?: boolean;
  /**
   * 指定列表是否可以下拉刷新，默认是
   */
  canPullRefresh?: boolean;
  /**
   * 错误提示文字前缀，默认是“加载失败 ”
   */
  errorPrefix?: string;
  /**
   * 外层样式
   */
  containerStyle?: ViewStyle;
  /**
   * 空页样式
   */
  emptyStyle?: ViewStyle;
  /**
   * 空页显示图片, 如果指定了 renderEmptyPage 自定义渲染，则此属性无效。
   */
  emptyImage?: ImageSourcePropType,
  /**
   * android 下拉刷新样式
   */
  androidRefreshProps?: SmartRefreshControlProps;
  /**
   * ios 下拉刷新样式
   */
  iosRefreshProps?: Omit<RefreshControlProps, 'refreshing'>;
}

interface FlatListWapperState<T> {
  refreshing: boolean,
  data: T[],
  loading: boolean,
  error: boolean,
  hasMore: boolean,
  lastErrorString: string,
}

/**
 * 一个列表的封装组件，提供了分页，上拉刷新，下拉加载，空页，错误页功能
 *
 * 使用方法：
 * ```
 * <FlatListWapper<DataInterface>
 *   { ...props }
 *   renderItem={renderItem}
 * />
 * ```
 */
export class FlatListWapper<T extends FlatListWapperListItem> extends React.Component<FlatListWapperProps<T>, FlatListWapperState<T>> {

  static defaultProps = {
    loadFinishNoneText: "没有数据",
    loadingText: "加载中",
    loadFinishText: "没有更多了",
    retryText: "重试",
    errorPrefix: '加载失败 ',
  };

  state: Readonly<FlatListWapperState<T>> = {
    refreshing: false,
    data: this.getIntitalData(),
    loading: false,
    error: false,
    hasMore: false,
    lastErrorString: '',
  };

  private loadingLock = false;

  private refreshRef = createRef<SmartRefreshControl>();

  /**
     * 加载数据
     * @param isRefresh 是否是刷新
     * @param wipeData 刷新时是保留之前数据还是清除全部数据
     */
  async loadData(isRefresh: boolean, wipeData?: boolean) {
    const props = this.props;
    this.loadingLock = true;
    if (typeof props.loadData === 'function') {

      if (this.state.loading)
        return null;
      //没有更多数据，返回
      if (!this.state.hasMore && !isRefresh) {
        this.setState({
          error: false,
          loading: false,
          refreshing: false,
        });
        return null;
      }

      if (isRefresh)
        this.currentPage = 1; //刷新页码=1
      else if (!this.state.error)
        this.currentPage += (props.pageStep || 1); //页码+1

      try {
        //如果刷新时需要清除全部数据，则加载之前清除
        if (isRefresh && wipeData === true) {
          //追加头部固定数据
          this.setState({
            data: (props.preHeaderData ? props.preHeaderData.concat() : []).concat({ renderType: 'loader' } as T),
          });
        }
        //设置加载状态
        this.setState({
          error: false,
          loading: true,
        });

        const dataRet = await props.loadData(this.currentPage, props.pageSize || 20, isRefresh);

        //console.log('loadData ' + isRefresh + ' ' +  currentPage.current + ' hasMoreData ' + dataRet.hasMoreData);

        if (isRefresh) {
          //刷新，之前的数据就直接不要了
          let array = [] as T[];
          if (props.preHeaderData) {
            //追加头部固定数据
            array.push(...props.preHeaderData);
            array.push(...dataRet.data);
          }
          else
            array.push(...dataRet.data);

          this.currentDataCount = dataRet.data.length;

          props.solveData && (array = props.solveData(array));

          //追加loader占位
          if (array.length > 0)
            array.push({ renderType: 'loader' } as T);
          if (this.currentDataCount === 0)
            array.push({ renderType: 'empty' } as T);

          //更新
          this.setState({
            data: array,
            hasMore: dataRet.hasMoreData,
            loading: false,
          });
        } else {
          this.currentDataCount += dataRet.data.length;

          //不是刷新，直接把数据拼接到旧数组
          this.setState((prevState) => {
            let newData = prevState.data.concat();
            //拼接loader占位之前需要移除数据最后一位的loader占位
            if (newData.length > 0 && newData[newData.length - 1].renderType === 'loader')
              ArrayUtils.removeAt(newData, newData.length - 1);
            if (newData.length > 0 && newData[newData.length - 1].renderType === 'empty')
              ArrayUtils.removeAt(newData, newData.length - 1);

            props.solveData && (newData = props.solveData(newData));

            //追加数据和loader占位
            newData.push(...dataRet.data);
            //追加loader占位
            if (newData.length > 0)
              newData.push({ renderType: 'loader' } as T);
            if (this.currentDataCount === 0)
              newData.push({ renderType: 'empty' } as T);

            return {
              data: newData,
              hasMore: dataRet.hasMoreData,
              loading: false,
            };
          });
        }
        return dataRet;
      } catch (e) {
        //加载失败
        const errorString = '' + e;
        this.setState((prevState) => {
          const newData = prevState.data.concat();

          //拼接loader占位之前需要移除数据最后一位的loader占位
          if (newData.length > 0 && newData[newData.length - 1].renderType === 'loader')
            ArrayUtils.removeAt(newData, newData.length - 1);
          if (newData.length > 0 && newData[newData.length - 1].renderType === 'empty')
            ArrayUtils.removeAt(newData, newData.length - 1);

          this.currentDataCount = newData.length;

          //追加loader占位
          if (newData.length > 0)
            newData.push({ renderType: 'loader' } as T);
          if (this.currentDataCount === 0)
            newData.push({ renderType: 'empty' } as T);
          return {
            data: newData,
            lastErrorString: (this.props.errorPrefix || FlatListWapper.defaultProps.errorPrefix) + errorString,
            error: true,
            loading: false,
          };
        });
      }
    } else {
      //没有配置loadData函数
      this.setState({
        lastErrorString: 'Not configue loadData! ',
        error: true,
        loading: false,
      });
    }
    return null;
  }

  /**
   * 强制手动更新数据
   * @param fn 处理数据，处理完成后返回的数据将会被更新到列表上
   */
  forceUpdateData(fn: (data: T[]) => T[]) {
    this.setState((prevState) => {
      return { data: fn(prevState.data.concat()) };
    });
  }

  /**
   * 强制手动更新数据(回调版)
   * @param findFn 查找数据，返回true则认为查找到了
   * @param solveFn 处理单条数据，如果在上面的查找中没有找到数据，则这个回调不会被调用
   */
  forceUpdateDataOne(findFn: (value: T, index: number, obj: T[]) => boolean, solveFn: (item: T) => void) {
    this.forceUpdateData((data) => {
      const newItem = data.find(findFn);
      if (newItem) solveFn(newItem);
      return data;
    });
  }

  /**
   * 手动触发刷新
   * @param wipeData 刷新时是保留之前数据还是清除全部数据
   * @param setState 刷新时是否设置下拉组件的状态，默认是
   */
  async refresh(wipeData?: boolean, setState?: boolean) {
    if (this.state.loading)
      return null;

    if (setState !== false) {
      //设置刷新状态
      this.setState({ refreshing: true });
    }
    const retData = await this.loadData(true, wipeData);

    await TimeUtils.waitTimeOut(isIOS ? 600 : 300);

    if (setState !== false) {
      //设置刷新状态
      this.setState({ refreshing: false });
    }
    return retData;
  }

  currentPage = 0;
  currentDataCount = 0;
  firstDataLoaded = false;

  componentDidMount() {
    setTimeout(() => {
      //加载第一次数据
      if (this.props.loadDataAtStart !== false && !this.firstDataLoaded) {
        this.firstDataLoaded = true;
        this.loadData(true);
      }
    }, 400);
  }
  componentDidUpdate() {
    //切换刷新状态的时候停止android下拉刷新组件
    if (isAndroid && !this.state.refreshing)
      this.refreshRef.current?.finishRefresh();
  }

   //第一次加载的时候拼接一下头部数据
  private getIntitalData() {
    const arr = this.props.preHeaderData ? this.props.preHeaderData.concat() : [];
    if (arr.length > 0)
      arr.push({ renderType: 'loader' } as T);
    return arr;
  }

  //渲染底部加载器
  private renderLoader() : JSX.Element {
    const props = this.props;
    const showEmptyPage = props.showEmptyPage !== false;
    const showLoadingPage = props.showLoadingPage !== false;
    const loadFinishNoneText = CheckTools.emptyOrNullToDefault(props.loadFinishNoneText, FlatListWapper.defaultProps.loadFinishNoneText);
    const loadFinishText = CheckTools.emptyOrNullToDefault(props.loadFinishText, FlatListWapper.defaultProps.loadFinishText);
    const retryText = CheckTools.emptyOrNullToDefault(props.retryText, FlatListWapper.defaultProps.retryText);
    const loadingText = CheckTools.emptyOrNullToDefault(props.loadingText, FlatListWapper.defaultProps.loadingText);

    const loaderProps : FlatListLoaderProps = {
      loading: this.state.loading,
      loadError: this.state.error,
      loadingText: loadingText,
      loadFinish: !this.state.hasMore,
      loadFinishText: loadFinishText,
      loadFinishNoneText: loadFinishNoneText,
      loadErrorText: this.state.lastErrorString,
      retryText: retryText,
      empty: this.currentDataCount === 0 && !showEmptyPage,
      onRetry: this.onRefresh,
    };
    return (
      //如果为空并且显示空页，则不显示加载器
      (this.currentDataCount !== 0 || (this.currentDataCount === 0 && !showEmptyPage && !showLoadingPage)) ?
      <ColumnView width="100%" key="flatListLoaderAndBottom">
        { props.renderLoader ? props.renderLoader(loaderProps) : <FlatListLoader {...loaderProps} /> }
        { props.addXBarSpace ? <XBarSpace /> : <></> }
        { (props.addBottomSpace && props.addBottomSpace > 0) ? <WhiteSpace size={props.addBottomSpace} /> : <></> }
      </ColumnView> : <></>
    );
  }

  private onEndReached = () => {
    if (this.props.canLoadMore !== false && !this.state.error && !this.state.loading
      && this.currentDataCount >= (this.props.pageSize || 10) - 2 //只有当前数据条数大于一页大小，才可以加载数据
    ) {
      this.loadData(false);
    }
  }

  private onRefresh = () => {
    this.refresh();
  };

  //渲染条目
  private renderItem = (info: ListRenderItemInfo<T>) => {
    const props = this.props;
    const type = info.item.renderType;
    if (type === 'head' && props.renderHeader)
      return props.renderHeader(info.item, info.index);
    else if (type === 'footer' && props.renderFooter)
      return props.renderFooter(info.item, info.index);
    else if (type === 'loader')
      return props.showLoader !== false ? this.renderLoader() : <></>;
    else if (type === 'empty')
      return this.renderEmpty();
    else if (props.renderItem)
      return (props.renderItem(info.item, info.index));
    return <View/>;
  }

  //渲染空数据页
  private renderEmpty() {
    const { error, lastErrorString } = this.state;
    const props = this.props;
    const showLoadErrorPage = props.showLoadErrorPage !== false;
    const showEmptyPage = props.showEmptyPage !== false;
    const loadFinishNoneText = CheckTools.emptyOrNullToDefault(props.loadFinishNoneText, FlatListWapper.defaultProps.loadFinishNoneText);
    const retryText = CheckTools.emptyOrNullToDefault(props.retryText, FlatListWapper.defaultProps.retryText);

    if (!error && showEmptyPage) {
      const customElement = props.renderEmptyPage ? props.renderEmptyPage('empty', loadFinishNoneText, this.onRefresh, null) : undefined;
      if (customElement)
        return customElement;
      return (
        <Empty
          key="emptyPage"
          style={{...styles.emptyView,...props.emptyStyle}}
          pointerEvents="none"
          image={props.emptyImage || "default"}
          description={loadFinishNoneText}
        />
      );
    }
    if (error && showLoadErrorPage) {
      const customElement = props.renderEmptyPage ? props.renderEmptyPage('empty', lastErrorString, this.onRefresh, null) : undefined;
      if (customElement)
        return customElement;
      return (
        <Empty key="errorPage" style={{...styles.emptyView,...props.emptyStyle}} pointerEvents="box-none" image="error" description={lastErrorString}>
          <WhiteSpace />
          <Button shape="round" radius={10} type="primary" onPress={this.onRefresh}>{retryText}</Button>
        </Empty>
      );
    }
  }

  //渲染
  render(): React.ReactNode {
    //属性
    const canPullRefresh = this.props.canPullRefresh !== false;
    const props = this.props;
    const showLoadingPage = props.showLoadingPage !== false;
    const loadingText = props.loadingText || FlatListWapper.defaultProps.loadingText;

    const listProps = {
      onEndReachedThreshold: 0.1,
      refreshControl: (canPullRefresh ? (isAndroid ?
        <SmartRefreshControl
          ref={this.refreshRef}
          renderHeader={() => <SmartRefreshControlClassicsHeader spinnerStyle="fixBehind" />}
          onRefresh={this.onRefresh}
          { ...this.props.androidRefreshProps }
        /> :
        <RefreshControl
          title="拼命加载中"
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          { ...this.props.iosRefreshProps }
        />) : undefined),
      ...props ,
      style: props.style,
      data: this.state.data,
      renderItem: this.renderItem,
      keyExtractor: (i, k) => {
        if (i.renderType === 'loader') return 'loader' + k;
        if (i.renderType === 'empty') return 'empty' + k;
        return (props.keyExtractor ? props.keyExtractor(i, k) : k.toString());
      },
      onEndReached: this.onEndReached,
    } as FlatListProps<T>;

    //渲染
    return (
      <View style={[styles.view, props.containerStyle]}>
        {
          //渲染全屏加载中页面
          (this.state.loading && showLoadingPage && this.currentDataCount === 0) ?
            (props.renderEmptyPage?.('loading', loadingText, this.onRefresh, null) || <LoadingPage style={styles.absView} { ...props.loadingPageProps} loadingText={loadingText} />)
           : <></>
        }
        { this.props.renderList ? this.props.renderList(listProps) : <FlatList<T> {...listProps} /> }
      </View>
    );
  }
}

export interface FlatListLoaderProps {
  loading?: boolean,
  loadError?: boolean,
  loadingText: string,
  loadFinish?: boolean,
  loadFinishText: string,
  loadFinishNoneText: string,
  loadErrorText: string,
  empty: boolean,
  retryText?: string,
  onRetry?: () => void;
}

/**
 * 列表组件的底部加载器
 */
export function FlatListLoader(props: FlatListLoaderProps) {
  return (<View style={styles.loaderView}>
    { props.loading ? <ActivityIndicator color={ThemeSelector.color(Color.primary)} size={20} /> : <></> }
    <Text style={styles.loaderText}>{
      (props.loading) ?
        props.loadingText :
          (props.loadError ? props.loadErrorText :
            (props.empty ? props.loadFinishNoneText : props.loadFinishText))
      }</Text>
    { props.loadError ? <TouchableOpacity style={styles.loaderRetry} onPress={props.onRetry}>
      <Text style={styles.loaderRetryText}>{ props.retryText || '重试'}</Text>
    </TouchableOpacity> : <></> }
  </View>);
}

const styles = DynamicThemeStyleSheet.create({
  view: {
    flex: 1,
    position: 'relative',
    alignSelf: 'stretch',
  },
  absView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: 100,
    top: 0,
  },
  emptyView: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: rpx(200),
  },
  loaderView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  loaderText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: DynamicColor(Color.textSecond),
  },
  loaderRetry: {

  },
  loaderRetryText: {
    fontSize: 14,
    color: DynamicColor(Color.primary),
  },
});

