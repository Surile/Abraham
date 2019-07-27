import Taro, { Component } from "@tarojs/taro";
import http from "@/utils/http";
import Index from "./pages/index";
import "./style/style.scss";
import TaroSdk from "./utils/wxSdk";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/detail/index",
      "pages/search/index",
      "pages/result/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#6190e8",
      navigationBarTitleText: "垃圾分类指南",
      navigationBarTextStyle: "white"
    }
  };

  componentWillMount() {
    http.login();
    TaroSdk.getBaiduToken();
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
