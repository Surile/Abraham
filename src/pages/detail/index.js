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
            <Image src={this.state.data.image} />
          </View>
          <View className='detail_content--description'>
            {this.state.data.description}
          </View>
          <View className='detail_put--in'>
            <View className='title'>{this.state.data.title}投放指南</View>
            {this.state.data.details.map(item => (
              <View key={item.id} className='itme'>
                {item.text}
              </View>
            ))}
          </View>
        </View>
      </AtPage>
    );
  }
}
