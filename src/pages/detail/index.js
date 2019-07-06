import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { fetchDetail } from "@/client";

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
    return <View>{this.state.data}</View>;
  }
}
