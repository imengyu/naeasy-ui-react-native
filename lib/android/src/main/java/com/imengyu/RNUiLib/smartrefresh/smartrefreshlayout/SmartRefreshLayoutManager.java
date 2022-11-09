package com.imengyu.RNUiLib.smartrefresh.smartrefreshlayout;

import android.graphics.Color;
import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.imengyu.RNUiLib.smartrefresh.header.AnyHeader;
import com.imengyu.RNUiLib.utils.DensityUtil;
import com.scwang.smart.refresh.layout.api.RefreshFooter;
import com.scwang.smart.refresh.layout.api.RefreshHeader;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.constant.RefreshState;
import com.scwang.smart.refresh.layout.listener.OnMultiListener;
import com.scwang.smart.refresh.layout.listener.OnRefreshListener;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * SmartRefreshLayout插件的封装
 */

public class SmartRefreshLayoutManager extends ViewGroupManager<ReactSmartRefreshLayout>{

    //返回给rn的组件名
    protected static final String REACT_CLASS = "SmartRefreshLayout";

    private ReactSmartRefreshLayout smartRefreshLayout;
    private RCTEventEmitter mEventEmitter;
    private ThemedReactContext themedReactContext;

    private static final String COMMAND_FINISH_REFRESH_NAME = "finishRefresh";
    private static final int COMMAND_FINISH_REFRESH_ID = 1;

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected ReactSmartRefreshLayout createViewInstance(@NonNull ThemedReactContext reactContext) {
        smartRefreshLayout = new ReactSmartRefreshLayout(reactContext);
        smartRefreshLayout.setEnableLoadMore(false);//暂时禁止上拉加载
        themedReactContext = reactContext;
        mEventEmitter = reactContext.getJSModule(RCTEventEmitter.class);
        return smartRefreshLayout;
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        final Map<String, Object> constants = new HashMap<>();
        for (Events event : Events.values())
            constants.put(event.toString(), MapBuilder.of("registrationName", event.toString()));
        return constants;
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                COMMAND_FINISH_REFRESH_NAME, COMMAND_FINISH_REFRESH_ID
        );
    }
    /**
     * 最大显示下拉高度/Header标准高度
     */
    @ReactProp(name="maxDragRate",defaultFloat = 2.0f)
    public void setMaxDragRate(ReactSmartRefreshLayout view,float maxDragRate){
        view.setHeaderMaxDragRate(maxDragRate);
    }
    /**
     * 显示下拉高度/手指真实下拉高度=阻尼效果
     */
    @ReactProp(name = "dragRate",defaultFloat = 0.5f)
    public void setDragRate(ReactSmartRefreshLayout view,float dragRate){
        view.setDragRate(dragRate);
    }
    /**
     * 是否使用越界拖动
     */
    @ReactProp(name="overScrollDrag",defaultBoolean = true)
    public void setOverScrollDrag(ReactSmartRefreshLayout view,boolean overScrollDrag){
        view.setEnableOverScrollDrag(overScrollDrag);
    }
    /**
     * 是否启用越界回弹
     */
    @ReactProp(name = "overScrollBounce",defaultBoolean = true)
    public void setOverScrollBounce(ReactSmartRefreshLayout view,boolean overScrollBounce){
        view.setEnableOverScrollBounce(overScrollBounce);
    }
    /**
     * 设置为纯滚动
     */
    @ReactProp(name = "pureScroll",defaultBoolean = false)
    public void setPureScroll(ReactSmartRefreshLayout view,boolean pureScroll){
        view.setEnablePureScrollMode(pureScroll);
    }
    /**
     * 通过RefreshLayout设置主题色
     */
    @ReactProp(name = "primaryColor")
    public void setPrimaryColor(ReactSmartRefreshLayout view, String primaryColor){
        if (primaryColor == null) view.setPrimaryColors(Color.TRANSPARENT);
        else view.setPrimaryColors(Color.parseColor(primaryColor));
    }
    /**
     * 设置headerHeight
     */
    @ReactProp(name = "headerHeight")
    public void setHeaderHeight(ReactSmartRefreshLayout view,float headerHeight){
        if(headerHeight != 0.0f) {
            view.setHeaderHeight(headerHeight);

        }
    }
    /**
     * 是否启用下拉刷新功能
     */
    @ReactProp(name="enableRefresh",defaultBoolean = true)
    public void setEnableRefresh(ReactSmartRefreshLayout view,boolean enableRefresh){
        view.setEnableRefresh(enableRefresh);
    }

    /**
     * 是否启用自动刷新
     */
    @ReactProp(name = "autoRefresh",defaultBoolean = false)
    public void setAutoRefresh(ReactSmartRefreshLayout view, ReadableMap autoRefresh){
        boolean isAutoRefresh=false;Integer time=null;
        if(autoRefresh.hasKey("refresh")){
            isAutoRefresh=autoRefresh.getBoolean("refresh");
        }
        if(autoRefresh.hasKey("time")){
            time=autoRefresh.getInt("time");
        }
        if(isAutoRefresh){
            if(time!=null && time>0){
                view.autoRefresh(time);
            }else{
                view.autoRefresh();
            }
        }
    }
    @Override
    public void receiveCommand(@NonNull ReactSmartRefreshLayout root, String commandId, @Nullable ReadableArray args) {
        if (args != null && commandId.equals(String.valueOf(COMMAND_FINISH_REFRESH_ID))) {
            int delayed = args.getInt(0);
            boolean success = args.getBoolean(1);
            boolean noMoreData = args.getBoolean(2);
            if (delayed >= 0) {
                root.finishRefresh(delayed, success, noMoreData);
            } else {
                root.finishRefresh(success);
            }
        }

        super.receiveCommand(root, commandId, args);
    }

    @Override
    public void addView(ReactSmartRefreshLayout parent, View child, int index) {
        switch (index){
            case 0:
                RefreshHeader header;
                if(child instanceof RefreshHeader){
                    header = (RefreshHeader)child;
                }else{
                    header = new AnyHeader(themedReactContext);
                    ((AnyHeader)header).setView(child);
                }
                parent.setRefreshHeader(header);
                //parent.setRefreshHeader(new MaterialHeader(themedReactContext).setShowBezierWave(true));
                break;
            case 1:
                parent.setRefreshContent(child);
                break;
            case 2:
                //RefreshFooter footer=(RefreshFooter)child;
                //parent.setRefreshFooter(footer);
                break;
            default:
                break;

        }
    }

    @Override
    public void addViews(ReactSmartRefreshLayout parent, List<View> views) {
        super.addViews(parent, views);
    }

    @Override
    protected void addEventEmitters(@NonNull ThemedReactContext reactContext, final ReactSmartRefreshLayout view) {


        /**
         * 必须设置OnRefreshListener，如果没有设置，
         * 则会自动触发finishRefresh
         *
         * OnRefreshListener和OnSimpleMultiPurposeListener
         * 中的onRefresh都会触发刷新，只需写一个即可
         */
        view.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(@NonNull RefreshLayout refreshLayout) {

            }
        });
        view.setOnMultiListener(new OnMultiListener() {
            private int getTargetId(){
                return view.getId();
            }

            @Override
            public void onHeaderMoving(RefreshHeader header, boolean isDragging, float percent, int offset, int headerHeight, int maxDragHeight) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putDouble("percent",percent);
                writableMap.putDouble("offset", DensityUtil.px2dip(reactContext, offset));
                writableMap.putDouble("headerHeight", DensityUtil.px2dip(reactContext, headerHeight));
                mEventEmitter.receiveEvent(getTargetId(),Events.HEADER_PULLING.toString(),writableMap);

            }

            @Override
            public void onHeaderReleased(RefreshHeader header, int headerHeight, int extendHeight) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putDouble("headerHeight", DensityUtil.px2dip(reactContext, headerHeight));
                writableMap.putDouble("extendHeight", DensityUtil.px2dip(reactContext, extendHeight));
                mEventEmitter.receiveEvent(getTargetId(),Events.HEADER_RELEASED.toString(),writableMap);
            }


            @Override
            public void onHeaderStartAnimator(RefreshHeader header, int headerHeight, int extendHeight) {

            }

            @Override
            public void onHeaderFinish(RefreshHeader header, boolean success) {

            }

            @Override
            public void onFooterMoving(RefreshFooter footer, boolean isDragging, float percent, int offset, int footerHeight, int maxDragHeight) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putDouble("percent",percent);
                writableMap.putDouble("offset",DensityUtil.px2dip(reactContext, offset));
                writableMap.putDouble("footerHeight",DensityUtil.px2dip(reactContext, footerHeight));
                mEventEmitter.receiveEvent(getTargetId(), Events.FOOTER_MOVING.toString(),writableMap);
            }

            @Override
            public void onFooterReleased(RefreshFooter footer, int footerHeight, int maxDragHeight) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putDouble("maxDragHeight",DensityUtil.px2dip(reactContext, maxDragHeight));
                writableMap.putDouble("footerHeight",DensityUtil.px2dip(reactContext, footerHeight));
                mEventEmitter.receiveEvent(getTargetId(), Events.FOOTER_RELEASED.toString(),writableMap);
            }

            @Override
            public void onFooterStartAnimator(RefreshFooter footer, int footerHeight, int maxDragHeight) {

            }

            @Override
            public void onFooterFinish(RefreshFooter footer, boolean success) {

            }

            @Override
            public void onLoadMore(@NonNull RefreshLayout refreshLayout) {
                mEventEmitter.receiveEvent(getTargetId(),Events.LOAD_MORE.toString(),null);
            }

            @Override
            public void onRefresh(@NonNull RefreshLayout refreshLayout) {
                mEventEmitter.receiveEvent(getTargetId(),Events.REFRESH.toString(),null);
            }

            @Override
            public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, @NonNull RefreshState newState) {
                switch (newState) {
                    case None:
                    case PullDownToRefresh:
                        mEventEmitter.receiveEvent(getTargetId(),Events.PULL_DOWN_TO_REFRESH.toString(),null);
                        break;
                    case Refreshing:

                        break;
                    case ReleaseToRefresh:
                        mEventEmitter.receiveEvent(getTargetId(),Events.RELEASE_TO_REFRESH.toString(),null);
                        break;
                }

            }
        });
    }

    private int getTargetId(){
        return smartRefreshLayout.getId();
    }
}
