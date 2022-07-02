package com.imengyu.RNUiLib.smartrefresh.header;

import android.content.Context;
import android.graphics.drawable.BitmapDrawable;
import android.view.View;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;

import com.facebook.react.views.view.ReactViewGroup;
import com.imengyu.RNUiLib.utils.DensityUtil;
import com.scwang.smart.refresh.layout.api.RefreshHeader;
import com.scwang.smart.refresh.layout.api.RefreshKernel;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.constant.RefreshState;
import com.scwang.smart.refresh.layout.constant.SpinnerStyle;

public class AnyHeader extends ReactViewGroup implements RefreshHeader {
    private RefreshKernel mRefreshKernel;
    private int mBackgroundColor;
    private Integer mPrimaryColor;
    private SpinnerStyle mSpinnerStyle = SpinnerStyle.Translate;

    public AnyHeader(Context context) {
        super(context);
        initView(context);
    }


    private void initView(Context context) {
        setMinimumHeight(DensityUtil.dip2px(context, 60));
    }
    public void setView(View v){
        addView(v);
    }
    @NonNull
    public View getView() {
        return this;
    }

    @NonNull
    @Override
    public SpinnerStyle getSpinnerStyle() {
        return this.mSpinnerStyle;//指定为平移，不能null
    }

    @Override
    public void onInitialized(@NonNull RefreshKernel kernel, int height, int extendHeight) {
        mRefreshKernel = kernel;
        mRefreshKernel.requestDrawBackgroundFor(this, mBackgroundColor);
    }
    @Override
    public void onMoving(boolean isDragging, float percent, int offset, int height, int maxDragHeight) {

    }
    /**
     * 设置主题色
     * @param colors
     */
    @Override
    public void setPrimaryColors(int... colors) {
        if(colors.length>0) {
            if (!(getBackground() instanceof BitmapDrawable) && mPrimaryColor == null) {
                setPrimaryColor(colors[0]);
                mPrimaryColor = null;
            }
        }
    }

    public AnyHeader setPrimaryColor(@ColorInt int primaryColor) {
        mBackgroundColor = mPrimaryColor =primaryColor;
        if (mRefreshKernel != null) {
            mRefreshKernel.requestDrawBackgroundFor(this, mPrimaryColor);
        }
        return this;
    }

    public AnyHeader setSpinnerStyle(SpinnerStyle style){
        this.mSpinnerStyle = style;
        return this;
    }

    @Override
    public void onReleased(@NonNull RefreshLayout refreshLayout, int height, int extendHeight) {

    }

    @Override
    public void onStartAnimator(@NonNull RefreshLayout refreshLayout, int height, int extendHeight) {

    }

    @Override
    public int onFinish(@NonNull RefreshLayout refreshLayout, boolean success) {
        return 500;//延迟500毫秒之后再弹回
    }

    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {

    }

    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }

    @Override
    public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, @NonNull RefreshState newState) {

    }
}
