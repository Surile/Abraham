import Taro, { Component } from "@tarojs/taro";
import { View, Block, Image } from "@tarojs/components";
import { serachDetail } from "@/client";
import { AtSearchBar } from "taro-ui";
import { AtPage } from "@/components";
import "./index.scss";

export default class Search extends Component {
  state = {
    data: {},
    value: ""
  };
  componentWillMount() {
    if (this.$router.params.val) {
      this.setState({
        value: this.$router.params.val
      });
      this.serachDetail(this.$router.params.val);
    } else {
      Taro.navigateBack();
    }
  }

  onChange(val) {
    if (!val) {
      Taro.navigateBack();
    }
    this.setState({
      value: val
    });
  }

  onActionClick() {
    if (!this.state.value) {
      return;
    }
    this.serachDetail(this.state.value);
  }

  serachDetail(val) {
    serachDetail({
      title: val
    }).then(res => {
      this.setState({
        data: res.data ? res.data : ""
      });
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
        {Object.keys(this.state.data).length === 0 ? (
          <Block>
            <View className='type flex flex__direction--column flex__justify--center flex__align--center'>
              <View className='title'>{this.state.value}</View>
              <View className='type_title'>未搜索到分类</View>
              <View className='description'>
                物品太过独特，词库紧急补充中...
              </View>
            </View>
          </Block>
        ) : (
          <Block>
            <View className='type flex flex__direction--column flex__justify--center flex__align--center'>
              <View className='title'>{this.state.data.title}</View>
              <View className='type_title'>
                属于{this.state.data.type.title}
              </View>
              <Image src={this.state.data.type.image} />
            </View>
            <View className='put'>
              <View className='put-type_title'>
                {this.state.data.type.title}投放指导
              </View>
              {this.state.data.type.details.map(item => (
                <View key={item.id} className='item'>
                  {item.text}
                </View>
              ))}
            </View>
          </Block>
        )}
      </AtPage>
    );
  }
}
