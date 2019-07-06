import Taro, { Component } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image, Button } from "@tarojs/components";
import "./index.scss";

export default class AtPage extends Component {
  state = {
    images: []
  };

  render() {
    return (
      <View className='container'>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots={this.state.images.length !== 0}
          autoplay
        >
          <SwiperItem>
            <Image
              mode='aspectFit'
              src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3211900468,3571714130&fm=15&gp=0.jpg'
            />
          </SwiperItem>
        </Swiper>
        {this.props.children}
        <Button className='share'>分享给朋友</Button>
      </View>
    );
  }
}
