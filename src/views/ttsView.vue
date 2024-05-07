<template>
  <div class="body">
    <table style="width: 100%">
      <tr>
        <td>标题</td>
        <td><input v-model="title" /></td>
      </tr>
      <tr>
        <td>内容</td>
        <td><textarea rows="20" v-model="content" /></td>
      </tr>
      <tr>
        <td>发音人</td>
        <td>
          <select v-model="voice">
            <option
              v-for="(item, index) in voices"
              :key="index"
              :value="item.voice"
            >
              {{ item.name }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td>语速([0-100])</td>
        <td><input v-model="speed" /></td>
      </tr>
      <tr>
        <td>音量([0-100])</td>
        <td><input v-model="volume" /></td>
      </tr>
      <tr>
        <td>音高([0-100])</td>
        <td><input v-model="pitch" /></td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button @click="handlePlay">
            {{ isPlaying }}----{{ ttsRecorder.status }}
          </button>
        </td>
      </tr>
    </table>

    <button
      @click="
        getBase64FromImageUrl(
          'https://greeting-vue.oss-cn-qingdao.aliyuncs.com/images/background/1334/bg_12.jpg'
        )
      "
    >
      图片跨域
    </button>
  </div>
</template>

<script>
import TTSRecorder from "../tts/onlineTTS";
const ttsRecorder = new TTSRecorder();

const voices = [
  { voice: "xiaoyan", name: "默人" },
  { voice: "x3_xiaodu", name: "成都话" },
  { voice: "x3_yezi_sc", name: "四川话1" },
  { voice: "x2_xiaorong", name: "四川话2" },
  { voice: "x2_xiaoqian", name: "东北话" },
  { voice: "x2_xiaofei", name: "合肥话" },
  { voice: "x2_xiaokun", name: "河南话" },
  { voice: "x2_xiaoqiang", name: "湖南话" },
  { voice: "x_xiaomei", name: "广东话" },
  { voice: "x2_xiaobao", name: "内蒙古方言" },
  { voice: "x2_xiaodong", name: "山东话" },
  { voice: "x3_ziling", name: "上海话" },
  { voice: "x2_xiaoying", name: "陕西话" },
  { voice: "x_yuer", name: "台湾普通话1" },
  { voice: "x_xiaolin", name: "台湾普通话2" },
  { voice: "x2_xiaowang", name: "湖北话" },
  { voice: "x3_xiaoyue", name: "香港粤语" },
  { voice: "x2_BoCn_YangJin", name: "藏语" },
];

// const ttsRecorder = new TTSRecorder()
// function audioPlay(text='我是默认文本',voiceName='xiaoyan'){
//   ttsRecorder.setParams({
//     voiceName,
//     tte: 'UTF8',
//     text ,
//     // speed : 50 ,
//     // voice : 50
//   })
//   if (['init', 'endPlay', 'errorTTS'].indexOf(ttsRecorder.status) > -1) {
//     ttsRecorder.start()
//   } else {
//     ttsRecorder.stop()
//   }
// }
export default {
  data() {
    return {
      title: "雷锋",
      content:
        "记得队长曾对雷锋说的一句话:“雷锋出差一千里,好事做了一火车。”这就是雷锋。",
      isPlaying: "立即合成",
      ttsRecorder: ttsRecorder,
      voices: voices,
      voice: "xiaoyan",
      speed: 45,
      volume: 50,
      pitch: 50,
    };
  },
  mounted() {
    //handlePlay()
  },
  methods: {
    handlePlay() {
      this.ttsRecorder.setParams({
        voiceName: this.voice,
        tte: "UTF8",
        text: this.content,
        // speed : 50 ,
        // voice : 50
      });

      // 播放的回调函数
      this.ttsRecorder.onWillStatusChange = function (s, status) {
        /*
        play -- 播放中
        endPlay --播放结束
        init --重置播放
        errorTTS --播放错误
        ttsing --正在建立播放链接
        */
        // 监听播放状态
        console.log("监听播放状态");
        console.log(s);
        console.log(status);
      };

      if (
        ["init", "endPlay", "errorTTS"].indexOf(this.ttsRecorder.status) > -1
      ) {
        this.ttsRecorder.start();
        this.isPlaying = "停止合成";
      } else {
        this.ttsRecorder.stop();
        this.isPlaying = "立即合成";
      }
    },
    getBase64FromImageUrl(URL) {
      var img = new Image();
      img.src = URL;
      img.setAttribute("crossOrigin", "anonymous"); // 跨域
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL("image/png");

        alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
      };
    },
  },
};
</script>
<style lang="less" scoped>
.body {
  width: 100%;
  height: 100%;
}
textarea {
  width: 100%;
  height: 100%;
}
</style>
