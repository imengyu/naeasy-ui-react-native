package com.imengyu.RNUiLib.smartrefresh.header;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.imengyu.RNUiLib.smartrefresh.smartrefreshlayout.SpinnerStyleConstants;
import com.scwang.smart.refresh.header.MaterialHeader;

public class MaterialHeaderManager extends ViewGroupManager<MaterialHeader> {
    @Override
    public String getName() {
        return "RCTMaterialHeader";
    }

    @Override
    protected MaterialHeader createViewInstance(ThemedReactContext reactContext) {
        return new MaterialHeader(reactContext);
    }
}
