## 媒体对象

`navigator.mediaDevices`提供访问连接媒体输入的设备，如照相机麦克风，屏幕共享等

## mediaDevices

### 事件

- ondevicechange = handle(event), 监听设备变化，系统设备发生变化时触发，event 不带设备信息，监听函数通过 enumerateDevices 来获取所有设备

### 方法

- MediaDevices.enumerateDevices() 获取系统中可用的媒体输入输出设备列表。
- MediaDevices.getSupportedConstraints(),返回 MediaTrackSupportedConstraints 对象，指明 mediaStreamTrack 接口可支持的约束属性。
- MediaDevices.getDisplayMedia() 提示用户选择显示器或一部分用于分享。
- MediaDevices.getUserMedia() 打开系统输入设备，返回对应的 MediaStream 流
  获取设备

```javascript
const stream = await navagator.mediaDevices.getUserMedia(constrants);
```
