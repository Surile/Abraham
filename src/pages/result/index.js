import Taro, { Component } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import TaroSdk from "@/utils/wxSdk";
import "./index.scss";

export default class Result extends Component {
  state = {
    path: "",
    data: [],
    value: ""
  };
  componentWillMount() {
    if (this.$router.params.path) {
      this.setState({
        path: this.$router.params.path
      });
      var time = Taro.getStorageSync("time");
      var accessToken = Taro.getStorageSync("access_token");
      var curTime = new Date().getTime();
      var timeNum = new Date(parseInt(curTime - time) * 1000).getDay();
      if (timeNum > 28 || !accessToken) {
        TaroSdk.getBaiduToken();
      } else {
        this.uploadFile({
          token: accessToken,
          file: this.$router.params.path
        });
      }
    } else {
      Taro.navigateBack();
    }
  }

  uploadFile(params) {
    TaroSdk.aiPhoto(params).then(res => {
      this.setState({
        data: res.result
      });
    });
  }

  onSearch(val) {
    Taro.redirectTo({
      url: `../search/index?val=${val}`
    });
  }

  onNext() {
    const value = this.state.value
      ? this.state.value
      : this.state.data[0].keyword;
    Taro.redirectTo({
      url: `../search/index?val=${value}`
    });
  }

  onChange(e) {
    this.setState({
      value: e.detail.value
    });
  }

  render() {
    return (
      <View className='container'>
        <View className='preview flex flex__align--center flex__justify--center'>
          <Image mode='aspectFit' src={this.state.path} />
        </View>
        <View className='content'>
          <View className='content_tile'>
            <View className='title'>你的垃圾是</View>
            {this.state.data.length !== 0 && (
              <View className='content_val'>{this.state.data[0].keyword}</View>
            )}
          </View>

          <View className='content_item '>
            <View className='title'>不对么，那么是不是</View>

            <View className='flex flex--wrap'>
              {this.state.data.map(item => (
                <View
                  className='item'
                  onClick={this.onSearch.bind(this, item.keyword)}
                  key={item.score}
                >
                  {item.keyword}
                </View>
              ))}
            </View>
          </View>

          <View className='content_footer'>
            <Input
              onInput={this.onChange.bind(this)}
              value={this.state.value}
              placeholder='蠢AI让我们人类告诉你是什么'
            />
          </View>
        </View>

        <View onClick={this.onNext} className='btn_next'>
          下一步
        </View>
      </View>
    );
  }
}
