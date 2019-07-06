import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { serachDetail } from "@/client";

export default class Search extends Component {
  state = {
    data: {}
  };
  componentWillMount() {
    this.serachDetail(this.$router.params.val);
  }

  serachDetail(val) {
    serachDetail({
      title: val
    }).then(res => {
      this.setState({
        data: res.data
      });
    });
  }
  render() {
    return <View>{this.state.data}</View>;
  }
}
