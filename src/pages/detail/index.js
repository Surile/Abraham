import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtPage } from "@/components";
import { fetchDetail } from "@/client";
import "./index.scss";

export default class Detail extends Component {
  state = {
    data: {}
  };

  componentWillMount() {
    this.fetchDetail(this.$router.params.id);
  }

  fetchDetail(id) {
    fetchDetail(id).then(res => {
      this.setState({
        data: res.data
      });
    });
  }

  render() {
    return (
      <AtPage>
        <View className='content'>
          <View className='detail_content--title'>{this.state.data.title}</View>
          <View className='detail-content-image flex flex__align--center flex__justify--center'>
            <Image src='https://wx4.sinaimg.cn/large/006a7eb0ly1g4r8o15tiyj305k05kgli.jpg' />
          </View>
          <View className='detail_content--description'>
            {this.state.data.description}
          </View>
          <View className='detail_put--in'>
            <View className='title'>{this.state.data.title}投放指南</View>
            <View className='itme'>
              用过的餐巾纸、尿片等由于沾有各类污迹，无回收利用价值，宜作为其他垃圾进行处理。
            </View>
            <View className='itme'>
              用过的餐巾纸、尿片等由于沾有各类污迹，无回收利用价值，宜作为其他垃圾进行处理。
            </View>
            <View className='itme'>
              用过的餐巾纸、尿片等由于沾有各类污迹，无回收利用价值，宜作为其他垃圾进行处理。
            </View>
          </View>
        </View>
      </AtPage>
    );
  }
}
