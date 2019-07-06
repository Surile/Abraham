import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { findAllType } from "@/client";
import AtPage from "@/components";
import { AtSearchBar } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  static options = {
    addGlobalClass: true
  };

  config = {
    navigationBarTitleText: "垃圾分类指南"
  };

  state = {
    types: [],
    value: ""
  };

  componentWillMount() {}

  componentDidMount() {
    this.fetchTypes();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  fetchTypes() {
    findAllType().then(res => {
      this.setState({
        types: res.data
      });
    });
  }

  onChange(value) {
    this.setState({
      value: value
    });
  }
  onActionClick() {
    if (!this.state.value) {
      return;
    }
    Taro.navigateTo({
      url: `../search/index?val=${this.state.value}`
    });
  }

  onNav(id) {
    Taro.navigateTo({
      url: `../detail/index?id=${id}`
    });
  }
  render() {
    return (
      <AtPage>
        <View className='search'>
          <AtSearchBar
            showActionButton
            placeholder='请输入正确名称（包括材质）'
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
        </View>
        <View className='hot-search'>
          <View className='hot-search_title'>热门搜索</View>
          <View className='hot-search_item flex flex--warp'>
            <View className='item'>面膜</View>
          </View>
        </View>
        <View className='content'>
          <View className='content_title'>日常垃圾分类指南</View>
          <View className='flex flex--wrap'>
            {this.state.types.map(item => (
              <View
                onClick={this.onNav.bind(this, item.id)}
                key={item.id}
                className='item flex flex__justify--between'
              >
                <View className='flex'>
                  <View className='item_image'>
                    <Image src={item.icon} />
                  </View>
                  <View className='item_text flex flex__direction--column'>
                    <Text>{item.title}</Text>
                    <Text className='text_english'>{item.describe}</Text>
                  </View>
                </View>
                <View className='icon'>
                  <Image src='https://ws4.sinaimg.cn/large/006a7eb0ly1g4qgt9xu5qj305k05kmwy.jpg' />
                </View>
              </View>
            ))}
          </View>
          <View className='remarks'>
            备注：湿垃圾（又名厨余垃圾、易腐垃圾、餐厨垃圾），干垃圾（又名其他垃圾），生活垃圾分类同时包括：装修垃圾和大件垃圾
          </View>
          <View className='footer_text'>
            参与垃圾分类，保护地球家园，共创美好未来
          </View>
        </View>
      </AtPage>
    );
  }
}
