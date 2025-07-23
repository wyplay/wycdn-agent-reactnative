import Foundation

@objc(Wycdn)
class WycdnModule: NSObject {
  @objc
  func startWycdn(_ resolve: @escaping RCTPromiseResolveBlock,
                  rejecter reject: @escaping RCTPromiseRejectBlock) {
    WycdnAgentBridge.start()
    resolve(nil)
  }

  @objc
  func stopWycdn(_ resolve: @escaping RCTPromiseResolveBlock,
                 rejecter reject: @escaping RCTPromiseRejectBlock) {
    WycdnAgentBridge.stop()
    resolve(nil)
  }

  @objc
  func loadDefaultProperties(_ resolve: @escaping RCTPromiseResolveBlock,
                             rejecter reject: @escaping RCTPromiseRejectBlock) {
    WycdnAgentBridge.loadDefaultProperties()
    resolve(nil)
  }

  @objc
  func setConfigFromAssets(_ configAssetFileName: String,
                           resolver resolve: @escaping RCTPromiseResolveBlock,
                           rejecter reject: @escaping RCTPromiseRejectBlock) {
    WycdnAgentBridge.loadProperties(configAssetFileName)
    resolve(nil)
  }

  @objc
  func setConfigProperty(_ key: String,
                         value: String,
                         resolver resolve: @escaping RCTPromiseResolveBlock,
                         rejecter reject: @escaping RCTPromiseRejectBlock) {
    WycdnAgentBridge.setProperty(key, toValue: value)
    resolve(nil)
  }
}
