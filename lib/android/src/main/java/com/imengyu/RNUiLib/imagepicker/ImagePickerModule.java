package com.imengyu.RNUiLib.imagepicker;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.widget.ImageView;

import androidx.annotation.Keep;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.CustomTarget;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.hjq.permissions.OnPermissionPageCallback;
import com.hjq.permissions.XXPermissions;
import com.luck.picture.lib.basic.PictureSelectionCameraModel;
import com.luck.picture.lib.basic.PictureSelectionModel;
import com.luck.picture.lib.basic.PictureSelector;
import com.luck.picture.lib.config.SelectMimeType;
import com.luck.picture.lib.engine.CropFileEngine;
import com.luck.picture.lib.entity.LocalMedia;
import com.luck.picture.lib.interfaces.OnCallbackListener;
import com.luck.picture.lib.interfaces.OnPermissionsInterceptListener;
import com.luck.picture.lib.interfaces.OnRequestPermissionListener;
import com.luck.picture.lib.interfaces.OnResultCallbackListener;
import com.yalantis.ucrop.UCrop;
import com.yalantis.ucrop.UCropImageEngine;

import java.util.ArrayList;
import java.util.List;

public class ImagePickerModule extends ReactContextBaseJavaModule {

  private ReactApplicationContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "NaImagePicker";
  }
  public ImagePickerModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  private ReadableArray javaLocalMediaToJsArray(ArrayList<LocalMedia> result) {
    WritableArray array = new WritableNativeArray();
    for (LocalMedia m : result) {
      WritableMap map = new WritableNativeMap();
      map.putDouble("id", m.getId());
      map.putDouble("bucketId", m.getBucketId());
      map.putString("path", m.getAvailablePath());
      map.putString("contentPath", m.getPath());
      map.putString("originalPath", m.getOriginalPath());
      map.putString("mimeType", m.getMimeType());
      map.putString("videoThumbnailPath", m.getVideoThumbnailPath());
      map.putDouble("duration", m.getDuration());
      map.putDouble("width", m.getWidth());
      map.putDouble("height", m.getHeight());
      map.putDouble("size", m.getSize());
      array.pushMap(map);
    }
    return array;
  }

  /**
   * 选择相机拍照
   */
  @Keep
  @ReactMethod
  public void camera(ReadableMap options, Callback callback, Callback cancelCallback) {

    String type = options.getString("type");

    int chooseMode = 0;
    boolean crop = false;
    ReadableMap cropOptions = null;

    if (type == null || type.equals("image"))
      chooseMode = SelectMimeType.ofImage();
    else if (type.equals("video"))
      chooseMode = SelectMimeType.ofVideo();
    else if (type.equals("all"))
      chooseMode = SelectMimeType.ofAll();

    PictureSelectionCameraModel model = PictureSelector.create(getCurrentActivity()).openCamera(chooseMode);

    if (options.hasKey("crop")) {
      cropOptions = options.getMap("crop");
      if (cropOptions != null)
        crop = true;
    }
    if (options.hasKey("minFileSize"))
      model.setSelectMinFileSize(options.getInt("minFileSize"));
    if (options.hasKey("maxFileSize"))
      model.setSelectMaxFileSize(options.getInt("maxFileSize"));
    if (options.hasKey("minDurationSecond"))
      model.setSelectMinDurationSecond(options.getInt("minDurationSecond"));
    if (options.hasKey("maxDurationSecond"))
      model.setSelectMaxDurationSecond(options.getInt("maxDurationSecond"));
    if (options.hasKey("recordVideoMaxSecond"))
      model.setRecordVideoMaxSecond(options.getInt("recordVideoMaxSecond"));
    if (options.hasKey("recordVideoMinSecond"))
      model.setRecordVideoMinSecond(options.getInt("recordVideoMinSecond"));

    model.setPermissionsInterceptListener(new OnPermissionsInterceptListener() {
      @Override
      public void requestPermission(Fragment fragment, String[] permissionArray, OnRequestPermissionListener call) {
        XXPermissions.with(fragment)
                .permission(permissionArray)
                .request((permissions, all) -> {
                  call.onCall(permissionArray, all);
                });
      }
      @Override
      public boolean hasPermissions(Fragment fragment, String[] permissionArray) {
        // 验证权限是否申请成功
        return XXPermissions.isGranted(fragment.getContext(), permissionArray);
      }
    });

    if (crop)
      model.setCropEngine(new MyCropFileEngine(cropOptions));

    model.forResult(new OnResultCallbackListener<LocalMedia>() {
      @Override
      public void onResult(ArrayList<LocalMedia> result) {
        callback.invoke(javaLocalMediaToJsArray(result));
      }
      @Override
      public void onCancel() {
        cancelCallback.invoke();
      }
    });
  }

  /**
   * 选择相册照片
   */
  @Keep
  @ReactMethod
  public void pick(ReadableMap options, Callback callback, Callback cancelCallback) {

    String type = options.getString("type");

    int chooseMode = 0;
    if (type == null || type.equals("image"))
      chooseMode = SelectMimeType.ofImage();
    else if (type.equals("video"))
      chooseMode = SelectMimeType.ofVideo();
    else if (type.equals("all"))
      chooseMode = SelectMimeType.ofAll();

    int minSelectNum = 1;
    int maxSelectNum = 9;
    int minVideoSelectNum = 1;
    int maxVideoSelectNum = 9;
    boolean showCamera = false;
    boolean crop = false;
    ReadableMap cropOptions = null;

    if (options.hasKey("crop")) {
      cropOptions = options.getMap("crop");
      if (cropOptions != null)
        crop = true;
    }
    if (options.hasKey("showCamera"))
      showCamera = options.getBoolean("showCamera");
    if (options.hasKey("minSelectNum"))
      minSelectNum = options.getInt("minSelectNum");
    if (options.hasKey("maxSelectNum"))
      maxSelectNum = options.getInt("maxSelectNum");
    if (options.hasKey("minVideoSelectNum"))
      minVideoSelectNum = options.getInt("minVideoSelectNum");
    if (options.hasKey("maxVideoSelectNum"))
      maxVideoSelectNum = options.getInt("maxVideoSelectNum");

    PictureSelectionModel model = PictureSelector.create(getCurrentActivity()).openGallery(chooseMode);

    model.setImageEngine(GlideEngine.createGlideEngine())
    .setMinSelectNum(minSelectNum)
    .setMaxSelectNum(maxSelectNum)
    .setMaxVideoSelectNum(maxVideoSelectNum)
    .setMinVideoSelectNum(minVideoSelectNum)
    .isDisplayCamera(showCamera);

    if (options.hasKey("selectedData")) {
      ReadableArray arr = options.getArray("selectedData");
      List<LocalMedia> list = new ArrayList<>();

      for (int i = 0; i < arr.size(); i++) {
        LocalMedia media = new LocalMedia();
        ReadableMap data = arr.getMap(i);
        media.setId((long)data.getDouble("id"));
        media.setPath(data.getString("path"));
        list.add(media);
      }
      model.setSelectedData(list);
    }
    if (options.hasKey("minFileSize"))
      model.setSelectMinFileSize(options.getInt("minFileSize"));
    if (options.hasKey("maxFileSize"))
      model.setSelectMaxFileSize(options.getInt("maxFileSize"));
    if (options.hasKey("minDurationSecond"))
      model.setSelectMinDurationSecond(options.getInt("minDurationSecond"));
    if (options.hasKey("maxDurationSecond"))
      model.setSelectMaxDurationSecond(options.getInt("maxDurationSecond"));
    if (options.hasKey("imageSpanCount"))
      model.setImageSpanCount(options.getInt("imageSpanCount"));
    if (options.hasKey("filterMaxFileSize"))
      model.setFilterMaxFileSize(options.getInt("filterMaxFileSize"));
    if (options.hasKey("filterMinFileSize"))
      model.setFilterMinFileSize(options.getInt("filterMinFileSize"));
    if (options.hasKey("filterVideoMaxSecond"))
      model.setFilterVideoMaxSecond(options.getInt("filterVideoMaxSecond"));
    if (options.hasKey("filterVideoMinSecond"))
      model.setFilterVideoMinSecond(options.getInt("filterVideoMinSecond"));
    if (options.hasKey("recordVideoMaxSecond"))
      model.setRecordVideoMaxSecond(options.getInt("recordVideoMaxSecond"));
    if (options.hasKey("recordVideoMinSecond"))
      model.setRecordVideoMinSecond(options.getInt("recordVideoMinSecond"));
    if (crop)
      model.setCropEngine(new MyCropFileEngine(cropOptions));

    model.setPermissionsInterceptListener(new OnPermissionsInterceptListener() {
      @Override
      public void requestPermission(Fragment fragment, String[] permissionArray, OnRequestPermissionListener call) {
        XXPermissions.with(fragment)
                .permission(permissionArray)
                .request((permissions, all) -> {
                  call.onCall(permissionArray, all);
                });
      }
      @Override
      public boolean hasPermissions(Fragment fragment, String[] permissionArray) {
        // 验证权限是否申请成功
        return XXPermissions.isGranted(fragment.getContext(), permissionArray);
      }
    });
    model.forResult(new OnResultCallbackListener<LocalMedia>() {
      @Override
      public void onResult(ArrayList<LocalMedia> result) {
        callback.invoke(javaLocalMediaToJsArray(result));
      }
      @Override
      public void onCancel() {
        cancelCallback.invoke();
      }
    });
  }

  private class MyCropFileEngine implements CropFileEngine {
    private final ReadableMap cropOptions;

    public MyCropFileEngine(ReadableMap cropOptions) {
      this.cropOptions = cropOptions;
    }

    @Override
    public void onStartCrop(Fragment fragment, Uri srcUri, Uri destinationUri, ArrayList<String> dataSource, int requestCode) {
      UCrop.Options options = buildOptions(cropOptions);
      UCrop uCrop = UCrop.of(srcUri, destinationUri, dataSource);
      uCrop.withOptions(options);
      uCrop.setImageEngine(new UCropImageEngine() {
        @Override
        public void loadImage(Context context, String url, ImageView imageView) {
          if (!ImageLoaderUtils.assertValidRequest(context)) {
            return;
          }
          Glide.with(context).load(url).override(180, 180).into(imageView);
        }
        @Override
        public void loadImage(Context context, Uri url, int maxWidth, int maxHeight, OnCallbackListener<Bitmap> call) {
          Glide.with(context).asBitmap().load(url).override(maxWidth, maxHeight).into(new CustomTarget<Bitmap>() {
            @Override
            public void onResourceReady(@NonNull Bitmap resource, @Nullable Transition<? super Bitmap> transition) {
              if (call != null) {
                call.onCall(resource);
              }
            }
            @Override
            public void onLoadCleared(@Nullable Drawable placeholder) {
              if (call != null) {
                call.onCall(null);
              }
            }
          });
        }
      });
      uCrop.start(fragment.requireActivity(), fragment, requestCode);
    }
  }

  /**
   * 配制UCrop，可根据需求自我扩展
   */
  private UCrop.Options buildOptions(ReadableMap cropOptions) {
    UCrop.Options options = new UCrop.Options();
    if (cropOptions.hasKey("aspectRatio")) {
      ReadableArray array = cropOptions.getArray("aspectRatio");
      if (array != null && array.size() == 2)
        options.withAspectRatio((float)array.getDouble(0), (float)array.getDouble(1));
    }
    if (cropOptions.hasKey("maxResultSize")) {
      ReadableArray array = cropOptions.getArray("maxResultSize");
      if (array != null && array.size() == 2)
        options.withMaxResultSize(array.getInt(0), array.getInt(1));
    }
    if (cropOptions.hasKey("hideBottomControls"))
      options.setHideBottomControls(cropOptions.getBoolean("hideBottomControls"));
    if (cropOptions.hasKey("freeStyleCropEnabled"))
      options.setFreeStyleCropEnabled(cropOptions.getBoolean("freeStyleCropEnabled"));
    if (cropOptions.hasKey("showCropFrame"))
      options.setShowCropFrame(cropOptions.getBoolean("showCropFrame"));
    if (cropOptions.hasKey("showCropGrid"))
      options.setShowCropGrid(cropOptions.getBoolean("showCropGrid"));
    if (cropOptions.hasKey("circleDimmedLayer"))
      options.setCircleDimmedLayer(cropOptions.getBoolean("circleDimmedLayer"));
    if (cropOptions.hasKey("isCropDragSmoothToCenter"))
      options.isCropDragSmoothToCenter(cropOptions.getBoolean("isCropDragSmoothToCenter"));
    if (cropOptions.hasKey("isForbidSkipMultipleCrop"))
      options.isForbidSkipMultipleCrop(cropOptions.getBoolean("isForbidSkipMultipleCrop"));
    if (cropOptions.hasKey("isForbidCropGifWebp"))
      options.isForbidCropGifWebp(cropOptions.getBoolean("isForbidCropGifWebp"));
    if (cropOptions.hasKey("maxScaleMultiplier"))
      options.setMaxScaleMultiplier(cropOptions.getInt("maxScaleMultiplier"));
    options.setStatusBarColor(Color.WHITE);
    return options;
  }
}

