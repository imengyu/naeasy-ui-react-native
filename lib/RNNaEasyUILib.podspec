require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name             = "RNNaEasyUILib"
  s.version          = package['version']
  s.summary          = package['description']
  s.license          = package['license']

  s.authors          = package['author']
  s.homepage         = package['homepage']
  s.platforms        = { :ios => "9.0" }

  s.source           = { :git => "https://github.com/imengyu/imengyu-ui-lib.git", :tag => "v#{s.version}" }
  s.ios.source_files = "ios/**/*.{h,m,mm}"
  s.resource         = 'ios/BRPickerView/Base/BRPickerView.bundle'

  s.dependency 'React-Core'
  s.dependency 'HXPHPicker'
end
