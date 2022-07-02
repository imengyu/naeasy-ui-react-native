package com.imengyu.RNUiLib.smartrefresh.header;

import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.ColorInt;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.imengyu.RNUiLib.R;
import com.imengyu.RNUiLib.utils.DensityUtil;
import com.scwang.smart.drawable.ProgressDrawable;
import com.scwang.smart.drawable.view.PathsView;
import com.scwang.smart.refresh.layout.api.RefreshHeader;
import com.scwang.smart.refresh.layout.api.RefreshKernel;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.constant.RefreshState;
import com.scwang.smart.refresh.layout.constant.SpinnerStyle;

/**
 * Created by painter.g on 2018/3/12.
 */

public class DefaultHeader extends RelativeLayout implements RefreshHeader {
    private TextView mHeaderText;//标题文本
    private PathsView mArrowView;//下拉箭头
    private ImageView mProgressView;//刷新动画视图
    private ProgressDrawable mProgressDrawable;//刷新动画
    private SpinnerStyle mSpinnerStyle = SpinnerStyle.Translate;
    protected RefreshKernel mRefreshKernel;
    protected int mBackgroundColor;
    protected int mAccentColor;

    public DefaultHeader(Context context) {
        super(context);
        this.initView(context);
    }

    public DefaultHeader(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        this.initView(context);
    }

    public DefaultHeader(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.initView(context);
    }

    private void initView(Context context) {
        RelativeLayout parent = new RelativeLayout(context);
        RelativeLayout.LayoutParams rlParent = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        rlParent.addRule(RelativeLayout.CENTER_IN_PARENT,RelativeLayout.TRUE);


        RelativeLayout.LayoutParams rlArrowView = new RelativeLayout.LayoutParams(DensityUtil.dip2px(context, 20), DensityUtil.dip2px(context, 20));
        mArrowView = new PathsView(context);
        mArrowView.setId(R.id.arrow_view);
        //mArrowView.parserPaths("M20,12l-1.41,-1.41L13,16.17V4h-2v12.17l-5.58,-5.59L4,12l8,8 8,-8z");
        mArrowView.setBackgroundResource(R.drawable.ic_refresh_arrow);
        parent.addView(mArrowView, rlArrowView);


        RelativeLayout.LayoutParams rlHeaderText= new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        rlHeaderText.addRule(RelativeLayout.RIGHT_OF,mArrowView.getId());
        rlHeaderText.leftMargin = DensityUtil.dip2px(context, 20);
        mHeaderText = new TextView(context);
        mHeaderText.setText("下拉开始刷新");
        parent.addView(mHeaderText,rlHeaderText);

        RelativeLayout.LayoutParams rlProgressView = new RelativeLayout.LayoutParams(DensityUtil.dip2px(context, 20),DensityUtil.dip2px(context, 20));
        rlProgressView.addRule(RelativeLayout.ALIGN_RIGHT,mArrowView.getId());
        mProgressDrawable = new ProgressDrawable();
        mProgressView = new ImageView(context);
        mProgressView.setImageDrawable(mProgressDrawable);
        parent.addView(mProgressView,rlProgressView);


        addView(parent,rlParent);
        setMinimumHeight(DensityUtil.dip2px(context, 60));
    }

    @NonNull
    public View getView() {
        return this;//真实的视图就是自己，不能返回null
    }

    @NonNull
    @Override
    public SpinnerStyle getSpinnerStyle() {
        return this.mSpinnerStyle;
    }
    public void setSpinnerStyle(SpinnerStyle style) {
        this.mSpinnerStyle = style;
    }

    @Override
    public void onStartAnimator(@NonNull RefreshLayout layout, int headHeight, int extendHeight) {
        mProgressDrawable.start();//开始动画
    }

    @Override
    public int onFinish(@NonNull RefreshLayout layout, boolean success) {
        mProgressDrawable.stop();//停止动画
        if (success) {
            mHeaderText.setText("刷新完成");
        } else {
            mHeaderText.setText("刷新失败");
        }
        return 500;//延迟500毫秒之后再弹回
    }
    @Override
    public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, RefreshState newState) {
        switch (newState) {
            case None:
            case PullDownToRefresh:
                mHeaderText.setText("下拉开始刷新");
                mArrowView.setVisibility(VISIBLE);//显示下拉箭头
                mProgressView.setVisibility(GONE);//隐藏动画
                mArrowView.animate().rotation(0);//还原箭头方向
                break;
            case Refreshing:
                mHeaderText.setText("正在刷新");
                mProgressView.setVisibility(VISIBLE);//显示加载动画
                mArrowView.setVisibility(GONE);//隐藏箭头
                break;
            case ReleaseToRefresh:
                mHeaderText.setText("释放立即刷新");
                mArrowView.animate().rotation(180);//显示箭头改为朝上
                break;
        }
    }

    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }

    @Override
    public void onInitialized(@NonNull RefreshKernel kernel, int height, int extendHeight) {
        mRefreshKernel = kernel;
        mRefreshKernel.requestDrawBackgroundFor(this, mBackgroundColor);

    }

    @Override
    public void onMoving(boolean isDragging, float percent, int offset, int height, int maxDragHeight) {

    }
    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {
    }
    @Override
    public void onReleased(@NonNull RefreshLayout refreshLayout, int height, int extendHeight) {

    }

    @Override
    public void setPrimaryColors(@ColorInt int... colors) {
    }

    public void setPrimaryColor(@ColorInt int primaryColor) {
        mBackgroundColor = primaryColor;
        if (mRefreshKernel != null) {
            mRefreshKernel.requestDrawBackgroundFor(this, primaryColor);
        }
    }
    public void setAccentColor(int accentColor){
        mAccentColor = accentColor;
        if(mArrowView != null)
            mArrowView.setBackgroundTintList(ColorStateList.valueOf(accentColor));
        if(mProgressDrawable != null)
            mProgressDrawable.setColor(accentColor);
        mHeaderText.setTextColor(accentColor);
    }


}
