//
//  NaImagePickerModule.swift
//  RNTest
//
//  Created by roger on 2022/11/16.
//

import Foundation
import HXPHPicker
import AVFoundation

@objc(NaImagePicker)
class NaImagePicker: NSObject {

  @objc(addEvent:location:date:)
  func addEvent(name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
  }
  
  @objc(pick:successCallback:errorCallback:)
  func pick(options: NSDictionary,
            successCallback: @escaping(RCTResponseSenderBlock),
            errorCallback: @escaping(RCTResponseSenderBlock)) -> Void {
    
    // 设置与微信主题一致的配置
    let config = PhotoTools.getWXPickerConfig()
    
    var selectOptions = PickerAssetOptions.photo
    
    //类型判断
    let options_type = options["type"] as? String
    let options_showCamera = options["showCamera"] as? Bool
    let options_selectTogether = options["selectTogether"] as? Bool
    let options_maxSelectNum = options["maxSelectNum"] as? Int
    let options_maxVideoSelectNum = options["maxVideoSelectNum"] as? Int
    let options_imageSpanCount = options["imageSpanCount"] as? Int
    let options_minFileSize = options["minFileSize"] as? Int
    let options_maxFileSize = options["maxFileSize"] as? Int
    let options_minDurationSecond = options["minDurationSecond"] as? Int
    let options_maxDurationSecond = options["maxDurationSecond"] as? Int
    let options_crop = options["crop"] as? [String: Any]
    if (options_type != nil && options_type == "all") {
      selectOptions = [.photo, .video]
    } else if (options_type != nil  && options_type == "video") {
      selectOptions = PickerAssetOptions.video
    }
    if (options_showCamera != nil) {
      config.photoList.allowAddCamera = options_showCamera!;
    }
    if (options_selectTogether != nil) {
      config.allowSelectedTogether = options_selectTogether!;
    }
    if (options_maxSelectNum != nil) {
      config.maximumSelectedCount = 0;
      config.maximumSelectedPhotoCount = options_maxSelectNum!;
    } else {
      config.maximumSelectedPhotoCount = 9;
      config.maximumSelectedCount = 0;
    }
    if (options_maxVideoSelectNum != nil) {
      config.maximumSelectedVideoCount = options_maxVideoSelectNum!;
    }
    if (options_minDurationSecond != nil) {
      config.minimumSelectedVideoDuration = options_minDurationSecond!;
    }
    if (options_maxDurationSecond != nil) {
      config.maximumSelectedVideoDuration = options_maxDurationSecond!;
    }
    if (options_minFileSize != nil) {
      config.maximumSelectedVideoFileSize = options_minFileSize!;
    }
    if (options_maxFileSize != nil) {
      config.maximumSelectedPhotoFileSize = options_maxFileSize!;
    }
    if (options_imageSpanCount != nil) {
      config.photoList.rowNumber = options_imageSpanCount!;
    }
    if (options_crop != nil) {
      
    } else {
      
    }

    config.selectOptions = selectOptions
    
    Photo.picker(
        config
    ) { result, pickerController in
      
      var jsArray = [NSDictionary]()
      
      // 获取已选的图片
      result.getURLs { (result: Result<AssetURLResult, AssetError>, photoAsset: PhotoAsset, index: Int) in
        switch result {
          case .success(let response):
            var url = ""
            var mimeType = ""
            if response.mediaType == .photo {
              url = response.url.absoluteString
              mimeType = "image/*"
            } else {
              url = response.url.absoluteString
              mimeType = "video/*"
            }
            jsArray.append([
              "isNetworkAsset": photoAsset.isNetworkAsset,
              "isLocalAsset": photoAsset.isLocalAsset,
              "isGifAsset": photoAsset.isGifAsset,
              "path": url,
              "originalPath": url,
              "mimeType": mimeType,
              "videoThumbnailPath": "",
              "duration": photoAsset.videoDuration,
              "width": photoAsset.imageSize.width,
              "height": photoAsset.imageSize.height,
              "size": photoAsset.fileSize,
            ])
          case .failure(let error):
            print(error.localizedDescription)
        }
      } completionHandler: { (urls) in
        successCallback([ jsArray ])
      }
       
    } cancel: { pickerController in
      errorCallback([ "cancel" ])
    }
  }

  @objc(camera:successCallback:errorCallback:)
  func camera(options: [String:Any],
              successCallback: @escaping(RCTResponseSenderBlock),
              errorCallback: @escaping(RCTResponseSenderBlock)) -> Void {
    
    let config = CameraConfiguration()
    
    var captureType = CameraController.CaptureType.photo
    
    let options_type = options["type"] as? String
    let options_recordVideoMaxSecond = options["recordVideoMaxSecond"] as? Int
    let options_recordVideoMinSecond = options["recordVideoMinSecond"] as? Int
    
    
    //类型判断
    if (options_type != nil && options_type == "all") {
      captureType = CameraController.CaptureType.all
    } else if (options_type != nil && options_type == "video") {
      captureType = CameraController.CaptureType.video
    }
    
    if (options_recordVideoMaxSecond != nil) {
      config.videoMaximumDuration = Double(options_recordVideoMaxSecond! * 1000)
    }
    if (options_recordVideoMinSecond != nil) {
      config.videoMinimumDuration = Double(options_recordVideoMinSecond! * 1000)
    }        
    
    CameraController.capture(
        config: config,
        type: captureType
    ) { result, location in
      // result: 拍摄的结果
      // location: 如果允许定位的情况则会有当前定位信息
      switch result {
        case .image(let image):
          // image: 拍摄的图片
          let info = self.saveUIImage(image: image)
          let filePath = info["filePath"] as! String
          let fileSize = info["fileSize"] as! Int
                  
          successCallback([
            [
              "path": filePath,
              "originalPath": filePath,
              "mimeType": "image/jpeg",
              "videoThumbnailPath": "",
              "duration": 0,
              "width": image.size.width,
              "height": image.size.height,
              "size": fileSize,
            ]
          ])
          break
        case .video(let videoURL):
          //拍摄的视频
          let info = self.getVideoInfo(videoUrl: videoURL)
                  
          successCallback([
            [
              "path": videoURL.absoluteString,
              "originalPath": videoURL.absoluteString,
              "mimeType": "video/*",
              "videoThumbnailPath": "",
              "duration": info["duration"] as! Double,
              "width": info["width"] as! Double,
              "height": info["height"] as! Double,
              "size": info["size"] as! Double,
            ]
          ])
          break
      }
    }
  }
  
  //保存 UIImage 至缓存中
  func saveUIImage(image: UIImage) -> [String: Any] {
    let fileManager = FileManager.default
    let rootPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true).first! as NSString
    var dformatter = DateFormatter()
    dformatter.dateFormat = "yyyyMMddHHmmss"
    var dateStr = dformatter.string(from: Date())
    
    var filePath = "\(rootPath)/cameraImage\(dateStr).jpg"
    var fileSize = 0
  
    fileManager.createFile(atPath: filePath,
                           contents: image.jpegData(compressionQuality: 0.8),
                           attributes: nil)
    do {
      let fileinfo = try fileManager.attributesOfItem(atPath: filePath)
      fileSize = fileinfo[FileAttributeKey(rawValue: "NSFileSize")] as! Int
    }
    catch {}
    
    return [
      "filePath": filePath,
      "fileSize": fileSize,
    ]
  }
  //获取视频信息
  func getVideoInfo(videoUrl: URL) -> [String: Any] {
    var size = 0.0
    var width = 0.0
    var height = 0.0
    
    let filePath = videoUrl.absoluteString
    let fileManager = FileManager.default
    let avUrl = AVURLAsset.init(url: videoUrl)
    
    let tracks = avUrl.tracks(withMediaType: AVMediaType.video)
    
    if (tracks.count > 0) {
      let videoTrack = tracks[0]
      width = videoTrack.naturalSize.width
      height = videoTrack.naturalSize.height
    }
    
    do {
      let fileinfo = try fileManager.attributesOfItem(atPath: filePath)
      size = Double(fileinfo[FileAttributeKey(rawValue: "NSFileSize")] as! Int)
    }
    catch {}
    
    return [
      "duration": avUrl.duration,
      "width": width,
      "height": height,
      "size": size,
    ]
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  @objc
  func constantsToExport() -> [String: Any]! {
    return ["someKey": "someValue"]
  }

}
